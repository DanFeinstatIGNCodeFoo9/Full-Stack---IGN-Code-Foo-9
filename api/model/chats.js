const mongoose = require(`mongoose`);

//This model is for the originally planned version of this app
//This model is currently not in use.

const Schema = mongoose.Schema;

const ChatSchema = new Schema({
  authorOne: { type: String, trim: true, required: true },
  authorTwo: { type: String, trim: true, required: true },
  room: { type: String, trim: true, required: true },
  comments: [
    {
      body: { type: String, trim: true, required: true },
      name: { type: String, trim: true, required: true },
      date: { type: Date, required: true },
    },
  ],
});

module.exports = mongoose.model(`Chat`, ChatSchema);
