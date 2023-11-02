const express = require("express");
const { ctrlAuth } = require('../../controllers');
const { authenticate } = require("../../middlewares");
const passport = require("passport");
require("../../middlewares/passport")(passport);

const router = express.Router();

router.post("/register", ctrlAuth.registerUser);

router.post("/login", authenticate, ctrlAuth.loginUser);

router.post("/logout", authenticate, ctrlAuth.logoutUser);

router.get("/current", authenticate, ctrlAuth.getCurrentUser);

router.get("/google", passport.authenticate("google", { scope: ["email", "profile"] }));

router.get(
  "/google/callback",
  passport.authenticate("google", { session: false }),
  ctrlAuth.googleAuth
);


module.exports = router;