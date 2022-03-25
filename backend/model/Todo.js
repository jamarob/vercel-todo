import mongoose from 'mongoose'
const { Schema, model } = mongoose

const schema = new Schema(
  {
    description: { type: String },
    done: { type: Boolean },
  },
  {
    versionKey: false,
    timestamps: true,
  }
)

export default model('Todo', schema)
