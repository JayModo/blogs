import mongoose from "mongoose"
import UserService from "./UserService"

const Schema = mongoose.Schema
const ObjectId = Schema.Types.ObjectId

const _model = new Schema({
    title: { type: String, required: true },
    //name: { type: ObjectId, ref: 'User' },
    summary: { type: String, required: true },
    author: { type: ObjectId, ref: 'User', required: true },
    body: { type: String, required: true },
    img: { type: String, default: 'https://placehold.it' },
    // _id: { type: ObjectId, ref: 'blog', required: true },
    //  comment: { type: ObjectId, ref: 'comment', default: null }
}, { timestamps: true })

export default class BlogsService {
    get repository() {
        return mongoose.model('blogs', _model)
    }
}
