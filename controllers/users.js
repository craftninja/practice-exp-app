const User = require('../models/user');

const userSerializer = require('../serializers/user');

exports.create = async (req, res) => {
  const user = await User.create(req.body);
  if (user.errors) {
    res.json({ user });
  } else {
    const serializedUser = await userSerializer(user);
    req.session.userId = user.id
    res.json({ user: serializedUser });
  }
};
