const { login, showSelf, updateSelf } = require("../services/user.service");

exports.login = async (req, res) => {
  return res.json({
    data: { ...req.user, accessToken: await login(req.body.email) },
  });
};

exports.showSelf = (req, res) => {
  return res.json({ data: showSelf(req.user) });
};

exports.updateSelf = async (req, res) => {
  return res.json({ data: await updateSelf(req.user._id, req.body) });
};
