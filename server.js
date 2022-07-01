require('dotenv').config({ path: './config.env' });
const mongoose = require("mongoose");
const app = require('./app');
const port = 6565;

console.log(process.env.NODE_ENV);

const DB = process.env.DATABASE.replace(
  '<password>',
  process.env.DATABASE_PASSWORD
);

mongoose
  .connect(DB, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
    useUnifiedTopology: true,
  })
  .then((con) => {
    console.log('Success');
  });



app.listen(port, () => {
  console.log(`start listining on port ${port}...`);
});
