const Poll = require("../models/poll");
const Vote = require("../models/vote");

const getAllPolls = async (req, res, next) => {
  await Poll.find()
    .then((polls) => res.json(polls))
    .catch(next);
};

const getUserPolls = async (req, res, next) => {
  await Poll.find({ createdBy: req.user })
    .then((polls) => res.json(polls))
    .catch(next);
};

const createPoll = async (req, res, next) => {
  const { options, question } = req.body;
  const createdBy = req.user._id;
  await Poll.create({ options, question, createdBy })
    .then((poll) => res.status(201).json(poll))
    .catch((err) => next(err));
};

const getPollById = (req, res, next) => {
  Poll.findById(req.params.poll_id)
    .then((poll) => {
      if (!poll) {
        res.status(404).json({ error: "poll not found" });
      }
      res.json(poll);
    })
    .catch(next);
};

const updatePollById = async (req, res, next) => {
  const poll_id = req.params.poll_id;
  const option_id = req.body.option_id;
  const user = req.user;

  const voteExists = await Vote.find({
    $and: [{ user: user }, { poll: poll_id }],
  });

  if (voteExists.length > 0) {
    const vote_id = voteExists[0]._id;
    const old_option = voteExists[0].option;
    await Vote.findOneAndUpdate({ _id: vote_id }, { option: option_id }, { new: true })
      .then(async (result0) => {
        await Poll.updateOne(
          { _id: poll_id, "options._id": old_option },
          {
            $inc: {
              "options.$.votes": -1,
            },
          },
          { new: true }
        );
        await Poll.findOneAndUpdate(
          { _id: poll_id, "options._id": option_id },
          {
            $inc: {
              "options.$.votes": 1,
            },
          },
          { new: true }
        )
          .then(async (result) => {
            await Poll.findOne({ _id: poll_id }).then((polls) => res.json(polls));
          })
          .catch(next);
      })
      .catch(next);
  } else {
    await Vote.create({
      user: user,
      poll: poll_id,
      option: option_id,
    })
      .then(async (result) => {
        if (result) {
          await Poll.findOneAndUpdate(
            { _id: poll_id, "options._id": option_id },
            {
              $inc: {
                "options.$.votes": 1,
              },
            },
            { new: true }
          )
            .then(async (result) => {
              await Poll.findOne({ _id: poll_id }).then((polls) => res.json(polls));
            })
            .catch(next);
        }
      })
      .catch(next);
  }
};

const deletePollById = (req, res, next) => {
  Poll.findByIdAndDelete(req.params.poll_id)
    .then((reply) => res.status(204).json("success"))
    .catch(next);
};

module.exports = {
  getAllPolls,
  getUserPolls,
  createPoll,
  getPollById,
  updatePollById,
  deletePollById,
};
