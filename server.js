const app = require('./app')

const mongoose = require('mongoose');

require('dotenv').config();

mongoose.Promise = global.Promise;

// console.log(process.env.DB_HOST);

//const UriDb = process.env.DB_HOST;
const DB_HOST =
  "mongodb+srv://darthunter:Kielbasa_21@cluster0.nlj5opc.mongodb.net/?retryWrites=true&w=majority";

mongoose.set("strictQuery", false);

const connection = mongoose.connect(DB_HOST, {
  useUnifiedTopology: true,
  // useFindAndModify: true,
});

connection
  .then(() => {
    app.listen(3000, () => {
      console.log("Database connection successful");
    });
  })
  .catch((err) => {
    console.log(`Server error: ${err.message}`);
    process.exit();
  });