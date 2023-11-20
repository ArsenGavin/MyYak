import { API_URL } from "../constants";

export function registerMock() {
  this.post(API_URL + "/register", () => {
    return  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYxNzYyOWEyZGM5ODY3NTMxMGQxYjBkNiIsInVzZXJuYW1lIjoiRG9ubmllIiwiZW1haWwiOiJib25qb3VyQHRlc3QuZnIiLCJpYXQiOjE2MzIzODc4MDQsImV4cCI6MTYzMjM5MTQwNH0.a-x2cqqrqUYCGx7J2QuWL62NAMfccZP55f-SF0XQmPU";
  });
}

export function loginMock() {
  this.post(API_URL + "/login", () => {
    return "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYxNzYyOWEyZGM5ODY3NTMxMGQxYjBkNiIsInVzZXJuYW1lIjoiRG9ubmllIiwiZW1haWwiOiJib25qb3VyQHRlc3QuZnIiLCJpYXQiOjE2MzIzODc4MDQsImV4cCI6MTYzMjM5MTQwNH0.a-x2cqqrqUYCGx7J2QuWL62NAMfccZP55f-SF0XQmPU";
  });
}
