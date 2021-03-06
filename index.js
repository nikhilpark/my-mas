const express = require("express");
const next = require("next");

const dev = process.env.NODE_ENV !== "production";
const app = next({ dev });
const mongoose = require("mongoose");
const userRoutes = require("./routes/users")
const handle = app.getRequestHandler();
const secrets = require("./secretsConfig/secrets")
app 
  .prepare()
  .then(() => {
    mongoose
      .connect(secrets.MONGO_URI, {
        useNewUrlParser: true,
        useUnifiedTopology: false, 
      })
      .then((res) => console.log("Database Connected"))
      .catch((err) => console.log(err));

    const server = express();

    server.use('/users',userRoutes )
    server.get("*", (req, res) => {
      return handle(req, res);
    });

    server.listen(3000, (err) => {
      if (err) throw err;
      console.log("Server is up on http://localhost:3000");
    }); 2
  })
  .catch((ex) => {
    console.error(ex.stack);
    process.exit(1);
  });

