module.exports = async (req, res, next) => {
  if (!req.session.userId) {
    const err = new Error('Not Found');
    err.status = 404;
    next(err);
  }

  next();
};
