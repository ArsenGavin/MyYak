import { API_URL } from "../constants";

function getAllMessages() {
  this.get(API_URL + "/message", (schema, request) => {
    return schema.messages.all();
  });
}

function getMessageById() {
  this.get(API_URL + "/message/:id", (schema, request) => {
    return schema.messages.find(request.params.id);
  });
}

function createMessage() {
  this.post(API_URL + "/message", (schema, request) => {
    return schema.messages.create(JSON.parse(request.requestBody));
  });
}

function updateMessageById() {
  this.patch(API_URL + "/message/:id", (schema, request) => {
    const message = schema.messages.find(request.params.id);
    return message.update(JSON.parse(request.requestBody));
  });
}

function deleteMessageById() {
  this.delete(API_URL + "/message/:id", (schema, request) => {
    return schema.messages.find(request.params.id).destroy();
  });
}

export {
  getAllMessages,
  getMessageById,
  createMessage,
  updateMessageById,
  deleteMessageById,
};
