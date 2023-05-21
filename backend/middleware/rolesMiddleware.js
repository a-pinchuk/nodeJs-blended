const jwt = require('jsonwebtoken');

module.exports = rolesArray => {
  return (req, res, next) => {
    try {
      //1 - читаем токен із заголовка
      //2 - перевіряєм що це є токен авторизації
      //3 - перевіряєм чи токен валідний
      //4 - передаєм інформацію про користувача далі

      const [bearer, token] = req.headers.authorization.split(' ');

      if (bearer === 'Bearer' && token) {
        const { roles } = jwt.verify(token, 'pizza');
        let hasRole = false;

        rolesArray.forEach(role => {
          if (roles.includes(role)) {
            hasRole = true;
          }
        });
        if (!hasRole) {
          return res.status(403).json({ message: 'Forbidden' });
        }
        next();
      }
    } catch (error) {
      res.status(401).json({ code: 401, message: 'Unauthorized' });
    }
  };
};
