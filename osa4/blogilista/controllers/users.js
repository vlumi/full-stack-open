const bcrypt = require("bcrypt");
const router = require("express").Router();
const User = require("../models/users");

router.get("/", async (request, response) => {
  const users = await User.find({}).populate("blogs", {
    title: 1,
    author: 1,
    url: 1,
  });
  response.json(users.map((u) => u.toJSON()));
});

router.post("/", async (request, response) => {
  const body = request.body;

  if (
    !request.body.username ||
    request.body.username.length < 3 ||
    !request.body.password ||
    request.body.password.length < 3
  ) {
    response
      .status(400)
      .send({
        error: "Username and password must be at least 3 characters long",
      })
      .end();
    return;
  }

  const saltRounds = 10;
  const password = await bcrypt.hash(body.password, saltRounds);

  const user = new User({
    username: body.username,
    name: body.name,
    password,
  });

  const savedUser = await user.save();

  response.json(savedUser);
});

module.exports = router;
