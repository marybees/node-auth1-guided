const router = require("express").Router();
const Users = require("../users/users-model.js");
// /auth/register
router.post("/register", (req, res) => {
    const credentials = req.body;
    // validate the credentials, if they are valid proceed
    // hash the password before saving the user
    Users.add(credentials)
        .then(user => {
            res.status(201).json({ data: user });
        })
        .catch(err => res.json({ message: err.message }));
});
module.exports = router;