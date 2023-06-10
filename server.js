const app = require('./app')

const mongoose = require('mongoose');



mongoose.Promise = global.Promise;

// console.log(process.env.DB_HOST);
require("dotenv").config();
// const UriDb = process.env.DB_HOST;
const UriDb =
 "mongodb+srv://darthunter:Kielbasa_21@cluster0.nlj5opc.mongodb.net/db-contacts";

mongoose.set("strictQuery", false);

const connection = mongoose.connect(UriDb, {
  useUnifiedTopology: true,
  useFindAndModify: false,
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
  //