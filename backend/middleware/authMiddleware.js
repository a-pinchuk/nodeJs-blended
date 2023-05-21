const jwt = require('jsonwebtoken');
const UsersModel = require('../models/UsersModel');

module.exports = async (req, res, next) => {
  try {
    //1 - читаем токен із заголовка
    //2 - перевіряєм що це є токен авторизації
    //3 - перевіряєм чи токен валідний
    //4 - передаєм інформацію про користувача далі

    const [bearer, token] = req.headers.authorization.split(' ');

    if (bearer === 'Bearer' && token) {
      const data = jwt.verify(token, 'pizza');
      req.user = data.id;
      next();
    }
  } catch (error) {
    res.status(401).json({ code: 401, message: 'Unauthorized' });
  }
};
