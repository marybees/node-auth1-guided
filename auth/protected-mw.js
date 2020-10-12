module.exports = (req, res, next) => {
  if (req.username) {
    next();
  } else {
    res.status(401).json({ you: "cannot pass!" });
  }
};
