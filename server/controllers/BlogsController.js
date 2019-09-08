import express from 'express'
import BlogsService from '../services/BlogsService';
import { Authorize } from '../middleware/authorize.js'
import { model } from 'mongoose';

let _blogsService = new BlogsService().repository

export default class BlogsController {
    constructor() {
        this.router = express.Router()
            //NOTE all routes after the authenticate method will require the user to be logged in to access
            .get('', this.getAll)
            .get('/:id', this.getByAuthor)
            .use(Authorize.authenticated)
            .post('', this.create)
            .put('/:id', this.edit)
            .delete('/:id', this.delete)
    }

    async getAll(req, res, next) {
        try {
            let data = await _blogsService.find({}).populate('author')
            return res.send(data)
        } catch (error) { next(error) }

    }

    async getByAuthor(req, res, next) {
        try {
            let data = await _blogsService.findById(req.params.id).populate('author')
            if (!data) {
                throw new Error("Invalid Id")
            }
            res.send(data)
        } catch (error) { next(error) }
    }

    async create(req, res, next) {
        try {
            //NOTE the user id is accessable through req.body.uid, never trust the client to provide you this information
            // req.body.author = req.session.uid
            req.body.author = req.session.uid
            let data = await _blogsService.create(req.body)
            res.send(data)
        } catch (error) { next(error) }
    }

    async edit(req, res, next) {
        try {
            let data = await _blogsService.findOneAndUpdate({ author: req.params.id }, req.body, { new: true })
            if (data) {
                return res.send(data)
            }
            throw new Error("invalid id")
        } catch (error) {
            next(error)
        }
    }

    async delete(req, res, next) {
        try {
            await _blogsService.findOneAndRemove({ _id: req.params.id })
            res.send("deleted blogs")
        } catch (error) { next(error) }

    }

}