import { Schema, model } from "mongoose";

const Note = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  text: {
    type: String,
    required: true
  },
  profile: {
    type: String,
    required: true
  },
  checked: {
    type: Boolean,
    default: false,
    required: true
  }
});

export default model('Note', Note);

