const mongoose = require('mongoose');

let connection_url;
switch (process.env.NODE_ENV.trim()) {
    case 'development':
        connection_url = `mongodb+srv://yakyak:${process.env.PW}@myyakdb.i01ai.mongodb.net/myyaktest?retryWrites=true&w=majority`;
        break;
    case 'prod':
        connection_url = `mongodb+srv://yakyak:${process.env.PW}@myyakdb.i01ai.mongodb.net/myyak?retryWrites=true&w=majority`;
        break;
    case 'uat':
        connection_url = `mongodb+srv://yakyak:${process.env.PW}@myyakdb.i01ai.mongodb.net/myyakuat?retryWrites=true&w=majority`;
        break;
    default:
        connection_url = `mongodb+srv://yakyak:${process.env.PW}@myyakdb.i01ai.mongodb.net/myyaktest?retryWrites=true&w=majority`;
}

mongoose.connect(
  connection_url,
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    socketTimeoutMS: 1000,
    serverSelectionTimeoutMS: 10000,
    useCreateIndex: true,
  }
);

mongoose.connection.on("error", e => console.log(e))
