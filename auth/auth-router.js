const router = require("express").Router();
const Users = require("../users/users-model.js");

// /auth/register

router.post("/register", (req, res) => {
  const credentials = req.body;
  // validate the credentials, if they are valid proceed
  // hash the password before saving the user
  // a good starting point in production is 14

  const rounds = process.env.HASH_ROUNDS || 6; // the higher the number, the more secure the password is

  const hash = bcrypt.hashSync(credentials.password, rounds);

  credentials.password = hash;

  Users.add(credentials)
    .then((user) => {
      res.status(201).json({ data: user });
    })
    .catch((err) => res.json({ message: err.message }));
});
module.exports = router;
