const express = require("express");
const router = require("./router.js");
//import environment variables, use 'dotenv' to load in values

const app = express();

const PORT = process.env.PORT || 3000;

app.use(router);

app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});
