const Message = require("../models/message.model");

module.exports.create = async (message) => {
  try {
    const createdMessage = await Message.create(message);
    return createdMessage;
  } catch (error) {
    throw Error(error)
  }
};
