const { Schema, model } = require("mongoose");

const SectionSystem = new Schema({
  name: {
    type: String,
  },
  about: {
    type: String,
  },
  img: {
    type: String,
  },
});

module.exports = model("SectionSystem", SectionSystem);
