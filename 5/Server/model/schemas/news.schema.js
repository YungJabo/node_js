import { model } from "mongoose";
import { Schema } from "mongoose";

const newsSchema = new Schema({
  created_at: {
    type: Date,
  },
  text: {
    type: String,
  },
  title: {
    type: String,
  },
  user: {
    firstName: {
      type: String,
    },
    image: {
      type: String,
    },
    middleName: {
      type: String,
    },
    surName: {
      type: String,
    },
    username: {
      type: String,
    },
    _id: {
      type: Object,
    },
  },
});

export const NewsModel = model("news", newsSchema);
