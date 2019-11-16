const authenticateUser = role => (req, res, next) => {
  if (req.user.role === role) {
    next();
  } else {
    res.status(403).json({ msg: 'No access' });
  }
};

module.exports = {
  authenticateUser,
};
