const express = require('express');
const app = express();

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.post("/sign_in", (req, res) => {
  res.cookie("authenticated", "1");
  res.send("Signed in successfully!");
});

app.delete("/sign_out", (req, res) => {
  res.clearCookie("authenticated");
  res.send("Signed out successfully!");
});

app.use(
  (req, res, next) => {
    const cookie = req.headers.cookie || "";
    if (cookie.indexOf("authenticated=1") > -1) {
      console.log(`Denying access for headers: ${JSON.stringify(cookie)}`)
      next();
    } else {
      res.status(401).send("Unauthorized");
    }
  },
  express.static(__dirname + "/public")
);

app.listen(process.env.PORT, () => console.log(`Example app listening on port ${process.env.PORT}!`));
