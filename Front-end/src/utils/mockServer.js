import { createServer, Model } from "miragejs";

import { registerMock, loginMock } from "./mock/authMock";
import {
  createZone,
  deleteZoneById,
  getAllZones,
  getZoneById,
  updateZoneById,
} from "./mock/zoneMock";
import {
  createMessage,
  deleteMessageById,
  getAllMessages,
  getMessageById,
  updateMessageById,
} from "./mock/messageMock";
import {
  createDiscussion,
  deleteDiscussionById,
  getAllDiscussions,
  getDiscussionById,
  updateDiscussionById,
} from "./mock/discussionMock";
import { updateUserMock } from "./mock/userMock";

if (window.server) {
  // eslint-disable-next-line no-undef
  server.shutdown();
}
/* 2021-10-21 WIP */
window.server = createServer({
  models: {
    user: Model,
    zone: Model,
    discussion: Model,
    message: Model,
    // zone: Model.extend({
    //   discussions: hasMany(),
    // }),
    // discussion: Model.extend({
    //   authorId: belongsTo(),
    //   messages: hasMany(),
    // }),
    // message: Model.extend({
    //   authorId: belongsTo(),
    //   parentMessageId: belongsTo(),
    // }),
  },
  routes() {
    // this.namespace = API_URL;
    // this.get('/zone', (schema, request) => {
    //   return schema.zone.all();
    // });
    /* */
    registerMock.call(this);
    /* */
    loginMock.call(this);
    /* */
    updateUserMock.call(this);
    /* */
    getAllZones.call(this);
    getZoneById.call(this);
    createZone.call(this);
    updateZoneById.call(this);
    deleteZoneById.call(this);
    /* */
    getAllDiscussions.call(this);
    getDiscussionById.call(this);
    createDiscussion.call(this);
    updateDiscussionById.call(this);
    deleteDiscussionById.call(this);
    /* */
    getAllMessages.call(this);
    getMessageById.call(this);
    createMessage.call(this);
    updateMessageById.call(this);
    deleteMessageById.call(this);
  },
  seeds(server) {
    server.create("user", {
      _id: "123f191e610c19729de860ea",
      username: "Sugar",
      email: "email@email.fr",
      password: "bonjour",
      telephone: "0123456789",
      createdAt: "2021-06-22T18:09:38.573+00:00",
      updatedAt: "2021-06-22T18:09:38.573+00:00",
    });
    server.create("message", {
      _id: "754f191e610c19729de440ea",
      authorId: {
        _id: "123f191e610c19729de860ea",
        username: "Sugar",
        email: "email@email.fr",
        password: "bonjour",
        telephone: "0123456789",
        createdAt: "2021-06-22T18:09:38.573+00:00",
        updatedAt: "2021-06-22T18:09:38.573+00:00",
      },
      content: "Je préfère laisser la parole à quelqu'un d'autre :)",
      parentMessageId: null,
      ups: 5,
      downs: 6,
      createdAt: "2021-06-22T18:09:38.573+00:00",
      updatedAt: "2021-06-22T18:09:38.573+00:00",
    });
    server.create("discussion", {
      _id: "507f191e610c19729de860ea",
      title: "Que pensez-vous d'Epitech ?",
      authorId: {
        _id: "123f191e610c19729de860ea",
        username: "Sugar",
        email: "email@email.fr",
        password: "bonjour",
        telephone: "0123456789",
        createdAt: "2021-06-22T18:09:38.573+00:00",
        updatedAt: "2021-06-22T18:09:38.573+00:00",
      },
      messages: [
        {
          _id: "754f191e610c19729de440ea",
          authorId: {
            _id: "123f191e610c19729de860ea",
            username: "Sugar",
            email: "email@email.fr",
            password: "bonjour",
            telephone: "0123456789",
            createdAt: "2021-06-22T18:09:38.573+00:00",
            updatedAt: "2021-06-22T18:09:38.573+00:00",
          },
          content: "Je préfère laisser la parole à quelqu'un d'autre :)",
          parentMessageId: null,
          ups: 6,
          downs: 2,
          createdAt: "2021-06-22T18:09:38.573+00:00",
          updatedAt: "2021-06-22T18:09:38.573+00:00",
        },
      ],
      ups: 5,
      downs: 6,
      createdAt: "2021-06-22T18:09:38.573+00:00",
      updatedAt: "2021-06-22T18:09:38.573+00:00",
    });
    server.create("discussion", {
      _id: "333f191e610c19729de860ea",
      title: "Existe-t-il un grand architecte de l'univers ?",
      authorId: {
        _id: "444f191e610c19729de860ea",
        username: "MauvaisGarçon",
        email: "emailemail@email.fr",
        password: "bonjour",
        telephone: "0123456788",
        createdAt: "2021-06-22T18:09:38.573+00:00",
        updatedAt: "2021-06-22T18:09:38.573+00:00",
      },
      messages: [
        {
          _id: "710f191e610c19729de440ea",
          authorId: {
            _id: "123f191e610c19729de860ea",
            username: "Sugar",
            email: "email@email.fr",
            password: "bonjour",
            telephone: "0123456789",
            createdAt: "2021-06-22T18:09:38.573+00:00",
            updatedAt: "2021-06-22T18:09:38.573+00:00",
          },
          content: "Oui par contre je ne crois pas qu'il soit diplômé d'Epitech",
          parentMessageId: null,
          ups: 10,
          downs: 5,
          createdAt: "2021-06-22T18:09:38.573+00:00",
          updatedAt: "2021-06-22T18:09:38.573+00:00",
        },
        {
          _id: "710f191e610c19729de440ea",
          authorId: {
            _id: "444f191e610c19729de860ea",
            username: "MauvaisGarçon",
            email: "emailemail@email.fr",
            password: "bonjour",
            telephone: "0123456788",
            createdAt: "2021-06-22T18:09:38.573+00:00",
            updatedAt: "2021-06-22T18:09:38.573+00:00",
          },
          content: "Elle est pas mal celle-là ^^",
          parentMessageId: null,
          ups: 10,
          downs: 3,
          createdAt: "2021-06-22T18:09:38.573+00:00",
          updatedAt: "2021-06-22T18:09:38.573+00:00",
        },
      ],
      ups: 50,
      downs: 28,
      createdAt: "2021-06-22T18:09:38.573+00:00",
      updatedAt: "2021-06-22T18:09:38.573+00:00",
    });
    server.create("discussion", {
      _id: "333f191e610c19729de860ad",
      title: "Comment se déplace les escargots ?",
      authorId: {
        _id: "444f191e610c19729de860ea",
        username: "MauvaisGarçon",
        email: "emailemail@email.fr",
        password: "bonjour",
        telephone: "0123456788",
        createdAt: "2021-06-22T18:09:38.573+00:00",
        updatedAt: "2021-06-22T18:09:38.573+00:00",
      },
      messages: [
        {
          _id: "710f191e610c19729de440ea",
          authorId: {
            _id: "123f191e610c19729de860ea",
            username: "Sugar",
            email: "email@email.fr",
            password: "bonjour",
            telephone: "0123456789",
            createdAt: "2021-06-22T18:09:38.573+00:00",
            updatedAt: "2021-06-22T18:09:38.573+00:00",
          },
          content: "???",
          parentMessageId: null,
          ups: 10,
          downs: 3,
          createdAt: "2021-06-22T18:09:38.573+00:00",
          updatedAt: "2021-06-22T18:09:38.573+00:00",
        },
        {
          _id: "710f191e610c19729de440ea",
          authorId: {
            _id: "444f191e610c19729de860ea",
            username: "MauvaisGarçon",
            email: "emailemail@email.fr",
            password: "bonjour",
            telephone: "0123456788",
            createdAt: "2021-06-22T18:09:38.573+00:00",
            updatedAt: "2021-06-22T18:09:38.573+00:00",
          },
          content: "Elle est pas mal celle-là ^^",
          parentMessageId: null,
          ups: 8,
          downs: 3,
          createdAt: "2021-06-22T18:09:38.573+00:00",
          updatedAt: "2021-06-22T18:09:38.573+00:00",
        },
      ],
      ups: 18,
      downs: 5,
      createdAt: "2021-06-22T18:09:38.573+00:00",
      updatedAt: "2021-06-22T18:09:38.573+00:00",
    });
    server.create("zone", {
      _id: "666f191e610c19669de860ea",
      name: "Bienvenue à Paname",
      topX: {
        latitude: 40.8020477 + 0.013,
        longitude: 2.3830825 - 0.020,
      },
      topY: {
        latitude: 50.8020477 + 0.013,
        longitude: 2.3430825 + 0.020,
      },
      bottomX: {
        latitude: 38.8280477 - 0.013,
        longitude: 2.3830825 - 0.020,
      },
      bottomY: {
        latitude: 58.8280477 - 0.013,
        longitude: 2.3430825 + 0.020,
      },
      discussions: [
        {
          _id: "507f191e610c19729de860ea",
          title: "Que pensez-vous d'Epitech ?",
          authorId: {
            _id: "123f191e610c19729de860ea",
            username: "Sugar",
            email: "email@email.fr",
            password: "bonjour",
            telephone: "0123456789",
            createdAt: "2021-06-22T18:09:38.573+00:00",
            updatedAt: "2021-06-22T18:09:38.573+00:00",
          },
          messages: [
            {
              _id: "754f191e610c19729de440ea",
              authorId: {
                _id: "123f191e610c19729de860ea",
                username: "Sugar",
                email: "email@email.fr",
                password: "bonjour",
                telephone: "0123456789",
                createdAt: "2021-06-22T18:09:38.573+00:00",
                updatedAt: "2021-06-22T18:09:38.573+00:00",
              },
              content: "Je préfère laisser la parole à quelqu'un d'autre :)",
              parentMessageId: null,
              ups: 9,
              downs: 3,
              createdAt: "2021-06-22T18:09:38.573+00:00",
              updatedAt: "2021-06-22T18:09:38.573+00:00",
            },
          ],
          ups: 5,
          downs: 20,
          createdAt: "2021-06-22T18:09:38.573+00:00",
          updatedAt: "2021-06-22T18:09:38.573+00:00",
        },
      ],
      createdAt: "2021-06-22T18:09:38.573+00:00",
      updatedAt: "2021-06-22T18:09:38.573+00:00",
    });
  },
});
