module.exports = function (req, res, next) {
  const { year } = req.body;

  if (!year || isNaN(year)) {
    return res.status(400).json({ error: "Invalid year" });
  }

  next();
};
