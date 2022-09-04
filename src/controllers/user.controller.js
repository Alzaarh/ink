const { login } = require('../services/user.service');

exports.login = async (req, res) => {
    return res.json({
        data: { ...req.user, accessToken: await login(req.body.email) } 
    });
};