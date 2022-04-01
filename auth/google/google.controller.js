const User = require('../../api/users/users.model');
const { signToken } = require('../auth.service');
const googleVerify = require('../../helpers/googleTokenValidator');

const handlerGoogleLogin = async (req, res) => {
  const { idToken } = req.body;

  const { names, fatherName, motherName, email, profile } = await googleVerify(idToken);

  let user = await User.findOne({ email });

  if (!user) {
    user = new User({
      names,
      fatherName,
      motherName,
      email,
      profile,
      google: true,
      password: '(:P)',
    });
    user = await user.save();
  }

  if (!user.state) {
    return res.status(400).json({
      msg: 'Account was blocked or deleted',
    });
  }

  const token = await signToken(user.public);

  return res.status(200).json({
    token,
    user,
  });
};

module.exports = handlerGoogleLogin;