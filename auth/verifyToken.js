var jwt = require("jsonwebtoken");
var config = require("../config");

var verifyFn = {
  verifyToken: function (req, res, next) {
    var token = req.headers["authorization"];

    res.type("json");
    if (!token || !token.includes("Bearer ")) {
      res.status(403);
      res.send(`{"Message":"Not Authorized"}`);
    } else {
      //token = token.split('Bearer ')[1]; //obtain the token’s value
      token = token.substring(7);
      jwt.verify(token, config.secret, function (err, decoded) {
        if (err) {
          //key invalid
          res.status(403);
          res.send(`{"Message":"Not Authorized"}`);
        } else {
          //You can also use the req object to
          //  define a custom property, .user to store the user’s information

          //todo: changed to req.jwt.username= decoded
          req.username = decoded.username;
          req.role = decoded.role;
          next();
        }
      });
    }
  },
};

module.exports = verifyFn;
