const mongoose = require(`mongoose`);

const Schema = mongoose.Schema;

const GeneralSchema = new Schema({
  comments: [
    {
      body: { type: String, trim: true, required: true },
      name: { type: String, trim: true, required: true },
      date: { type: Date, required: true },
    },
  ],
});

module.exports = mongoose.model(`GeneralChat`, GeneralSchema);
