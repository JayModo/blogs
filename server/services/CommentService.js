import mongoose from "mongoose"
const Schema = mongoose.Schema
const ObjectId = Schema.Types.ObjectId

const _model = new Schema({
  title: { type: String, required: true },
  name: { type: String, required: true },
  body: { type: String, required: true },
  blogId: { type: ObjectId, ref: 'comment', required: true }
}, { timestamps: true })

export default class CommentService {
  get repository() {
    return mongoose.model('comment', _model)
  }


}