const UsersModel = require('../models/UsersModel');
const asyncHandler = require('express-async-handler');

class UsersController {
  updateRoles = asyncHandler(async (req, res) => {
    const { id } = req.params;
    const { roles } = req.body;
    const user = await UsersModel.findById(id);
    if (!user) {
      res.status(400);
      throw new Error('Cant find user');
    }

    user.roles.push(roles);
    await user.save();
    res.status(200).json({ code: 200, data: user.roles });
  });
}

module.exports = new UsersController();
