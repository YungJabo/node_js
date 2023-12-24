import { MessageModel } from "./schemas/index.js";

class MessageRepository {
  async create(dto) {
    const messageModel = new MessageModel(dto);
    const message = await messageModel.save();

    return message;
  }
  async getMessagesByUser({ userId, recipientId }) {
    const messages = await MessageModel.find({
      $or: [
        { senderId: userId, recipientId },
        { senderId: recipientId, recipientId: userId },
      ],
    });
    return messages;
  }
}

export const messageRepository = new MessageRepository();
