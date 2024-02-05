const express = require("express");
const router = express.Router();
const pollController = require("../controllers/poll-controller");
const { authenticateUser } = require("../middlewares/auth");

router
  .route("/polls")
  .get(authenticateUser, pollController.getAllPolls)
  .post(authenticateUser, pollController.createPoll)
  .put((req, res) => {
    res.status(405).json({ error: "PUT request is not allowed" });
  });

router.route("/checkauth").get(authenticateUser, (req, res) => {
  res.json({ message: "user is authenticated" });
});
router
  .route("/polls/:poll_id")
  .get(pollController.getPollById)
  .post((req, res) => {
    res.status(405).json({ error: "POST request is not allowed" });
  })
  .put(authenticateUser, pollController.updatePollById)
  .delete(pollController.deletePollById);

router.get("/mypolls", authenticateUser, pollController.getUserPolls);

module.exports = router;
