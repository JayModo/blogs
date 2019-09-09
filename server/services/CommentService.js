import mongoose from "mongoose"
const Schema = mongoose.Schema
const ObjectId = Schema.Types.ObjectId

const _model = new Schema({
  blogId: { type: ObjectId, ref: 'blogs', required: true },
  // name: { type: String, required: true },
  body: { type: String, required: true },
  commentAuthor: { type: ObjectId, ref: 'User', required: true },
}, { timestamps: true })

export default class CommentService {
  get repository() {
    return mongoose.model('comment', _model)
  }


}