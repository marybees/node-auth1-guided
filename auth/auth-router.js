const router = require("express").Router();
const Users = require("../users/users-model.js");
const bcryptjs = require("bcryptjs");
const { json } = require("express");

// /auth/register

router.post("/register", (req, res) => {
  const credentials = req.body;
  // validate the credentials, if they are valid proceed
  // hash the password before saving the user
  // a good starting point in production is 14

  const rounds = process.env.HASH_ROUNDS || 6; // the higher the number, the more secure the password is

  const hash = bcryptjs.hashSync(credentials.password, Number(rounds));

  credentials.password = hash;

  Users.add(credentials)
    .then((user) => {
      res.status(201).json({ data: user });
    })
    .catch((err) => res.json({ message: err.message }));
});

router.post("/login", (req, res) => {
  const credentials = req.body;

  // validate the credentials, if they are valid proceed

  Users.findBy({ username: credentials.username })
    .then((users) => {
      const user = users[0];

      if (user && bcryptjs.compareSync(credentials.password, user.password)) {
        // username and password are good
        res.status(200).json({ message: "welcome" });
      } else {
        res.status(401).json({ message: "invalid credentials" });
      }
    })
    .catch((err) => res.json({ message: err.message }));
});

module.exports = router;
