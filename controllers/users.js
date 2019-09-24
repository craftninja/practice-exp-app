const User = require('../models/user');

const userSerializer = require('../serializers/user');

exports.create = async (req, res) => {
  const user = await User.create(req.body);
  if (user.errors) {
    res.json({ user });
  } else {
    const serializedUser = await userSerializer(user);
    // const token = jwt.sign({ user: serializedUser }, process.env.JWT_SECRET);
    // res.json({ jwt: token, user: serializedUser });
    // AND SOME KINDA SESSION
    res.json({ user: serializedUser });
  }
};
