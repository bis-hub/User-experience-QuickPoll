const mongoose = require("mongoose");

const voteSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  poll: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Poll",
    required: true,
  },
  option: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Poll.options",
    required: true,
  },
});

voteSchema.set("toJSON", {
  transform: (document, returnedDocument) => {
    returnedDocument.id = document._id.toString();
    delete returnedDocument._id;
    delete returnedDocument.__v;
  },
});

const Vote = mongoose.model("Vote", voteSchema);

module.exports = Vote;
