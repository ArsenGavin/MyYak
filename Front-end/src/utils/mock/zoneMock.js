import { API_URL } from "../constants";

function getAllZones() {
  this.get(API_URL + "/zone", (schema, request) => {
    return schema.zones.all();
  });
}

function getZoneById() {
  this.get(API_URL + "/zone/:id",(schema, request) => {
    return schema.zones.find(request.params.id);
  });
}

function createZone() {
  this.post(API_URL + "/zone", (schema, request) => {
    return schema.zones.create(JSON.parse(request.requestBody));
  });
}

function updateZoneById() {
  this.patch(API_URL + "/zone/:id", (schema, request) => {
    const zone = schema.zones.find(request.params.id);
    return zone.update(JSON.parse(request.requestBody));
  });
}

function deleteZoneById() {
  this.delete(API_URL + "/zone/:id", (schema, request) => {
    return schema.zones.find(request.params.id).destroy();
  });
}

export {
  getAllZones,
  getZoneById,
  createZone,
  updateZoneById,
  deleteZoneById,
};
