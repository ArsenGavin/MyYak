import { API_URL } from "../constants";

function getAllDiscussions() {
  this.get(API_URL + "/discussion/:zoneId/zone", (schema, request) => {
    return schema.discussions.all();
  });
}

function getDiscussionById() {
  this.get(API_URL + "/discussion/:id", (schema, request) => {
    return schema.discussions.find(request.params.id);
  });
}

function createDiscussion() {
  this.post(API_URL + "/discussion", (schema, request) => {
    return schema.discussions.create(JSON.parse(request.requestBody));
  });
}

function updateDiscussionById() {
  this.patch(API_URL + "/discussion/:id", (schema, request) => {
    const discussion = schema.discussions.find(request.params.id);
    return discussion.update(JSON.parse(request.requestBody));
  });
}

function deleteDiscussionById() {
  this.delete(API_URL + "/discussion/:id", (schema, request) => {
    return schema.discussions.find(request.params.id).destroy();
  });
}

export {
  getAllDiscussions,
  getDiscussionById,
  createDiscussion,
  updateDiscussionById,
  deleteDiscussionById,
};
