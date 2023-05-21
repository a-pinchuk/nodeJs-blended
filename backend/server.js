const path = require('path');
const configPath = path.join(__dirname, '..', 'config', '.env');
require('dotenv').config({ path: configPath });
const express = require('express');
require('colors');
const connectDB = require('../config/connectDB');
const asyncHandler = require('express-async-handler');
const UserModel = require('./models/UsersModel');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const authMiddleware = require('./middleware/authMiddleware');
const RolesModel = require('./models/RolesModel');

const app = express();

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.use('/api/v1', require('./routes/moviesRoutes'));
app.use('/api/v1', require('./routes/usersRoutes'));

// Реєстрація - збереження користувача в базі данних
// Аутентифікація - перевірка данних, які надав нам користувач, с тими данними які зберігаються в базі данних
// Авторизація - перевірка прав доступу користувача
// Логаут - вихід із системи (завершення сеансу)

// Реєстрація
app.post(
  '/register',
  (req, res, next) => {
    console.log('Спрацював JOI validation');
    next();
  },
  asyncHandler(async (req, res) => {
    //1 - отримуем і валідуем данні користувача
    //2 - шукаємо користувача в базі по емейлу
    //3 - якщо знайшли, повідомляємо що є такий користувач
    //4 - хешуємо пароль
    //5 - зберігаємо користувача в базі данних

    const { email, password } = req.body;
    if (!email || !password) {
      res.status(400);
      throw new Error('Please provide all required details');
    }
    const candidate = await UserModel.findOne({ email });
    if (candidate) {
      res.status(400);
      throw new Error('User already exists');
    }

    const hashPassword = bcrypt.hashSync(password, 10);
    const userRole = await RolesModel.findOne({ value: 'ADMIN' });

    const user = await UserModel.create({
      ...req.body,
      password: hashPassword,
      roles: [userRole.value],
    });
    if (!user) {
      res.status(400);
      throw new Error('Cant adding in DB');
    }

    res.status(201).json({
      code: 201,
      data: {
        name: user.name,
        email: user.email,
      },
    });
  })
);

app.post(
  '/login',
  asyncHandler(async (req, res) => {
    //1 - отримуем і валідуем данні користувача
    //2 - шукаєм користувача в базі данних
    //3 - розшифровуємо пароль
    //4 - якщо не знайшли і не розшифрували пароль (невірний логін або пароль)
    //5 - даємо токен і зберігаємо в базі

    const { email, password } = req.body;

    if (!email || !password) {
      res.status(400);
      throw new Error('Please provide all required details');
    }
    const user = await UserModel.findOne({ email });
    const isValidPassword = bcrypt.compareSync(password, user.password);

    if (!user || !isValidPassword) {
      res.status(400);
      throw new Error('Email or password invalid');
    }
    const friends = ['katia', 'taras', 'kirill'];
    const token = generateToken({
      friends,
      id: user._id,
      roles: user.roles,
    });
    user.token = token;
    const userWithToken = await user.save();
    if (!userWithToken) {
      res.status(400);
      throw new Error('DB cant save');
    }

    res.status(200).json({
      code: 200,
      data: {
        name: user.name,
        email: user.email,
        token: user.token,
      },
    });
  })
);

app.get(
  '/logout',
  authMiddleware,
  asyncHandler(async (req, res) => {
    const userWithoutToken = await UserModel.findByIdAndUpdate(req.user, { token: null });
    if (!userWithoutToken) {
      res.status(400);
      throw new Error('Cant update Token');
    }
    res.status(200).json({
      code: 200,
      data: {
        name: userWithoutToken.name,
        email: userWithoutToken.email,
        message: 'Logout success',
      },
    });
  })
);

function generateToken(data) {
  const payload = {
    ...data,
  };
  return jwt.sign(payload, 'pizza', { expiresIn: '2h' });
}

app.use('*', (req, res, next) => {
  res.status(404).json({ code: 404, message: 'Unable to request' });
  next();
});

app.use((err, req, res, next) => {
  // res.send(res.statusCode);
  // console.log(res.statusCode);
  const statusCode = res.statusCode || 500;
  res.status(statusCode);
  res.json({ code: statusCode, stack: err.stack });
});

connectDB();
app.listen(process.env.PORT, () => {
  console.log(`Server is running on port ${process.env.PORT}`.green.italic.bold);
});
