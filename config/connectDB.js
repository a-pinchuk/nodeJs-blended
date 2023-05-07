const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    const DB = await mongoose.connect(process.env.MONGODB_URL);
    console.log(
      `Mongo db is connected. Name: ${DB.connection.name}. Port: ${DB.connection.port}. Host: ${DB.connection.host}`
        .green.bold.italic
    );
  } catch (error) {
    console.log(error.message.bold.red);
    process.exit(1);
  }
};

module.exports = connectDB;

// const Cat = mongoose.model('Cat', { name: String });

// const kitty = new Cat({ name: 'Zildjian' });
// kitty.save().then(() => console.log('meow'));
