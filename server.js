const app = require("./app");

const mongoose = require("mongoose");

mongoose.Promise = global.Promise;

require("dotenv").config();
// console.log(process.env.DB_HOST);
const UriDb = process.env.DB_HOST;

mongoose.set("strictQuery", false);

const connection = mongoose.connect(UriDb, {
  useUnifiedTopology: true,
});

connection
  .then(() => {
    app.listen(3000, () => {
      console.log("Database connection successful");
    });
  })
  .catch((err) => {
    console.log(`Server error: ${err.message}`, UriDb);
    process.exit();
  });
//
