import { model } from "mongoose";
import { Schema } from "mongoose";
// import bcrypt from "bcrypt";

const messageSchema = new Schema({
  senderId: {
    type: String,
  },
  recipientId: {
    type: String,
  },
  text: {
    type: String,
  },
});

export const MessageModel = model("message", messageSchema);
