const bcrypt = require("bcryptjs");

const password = "wlwdsdf1";
bcrypt.genSalt(10, (err, salt) => {
  bcrypt.hash(password, salt, (err, hash) => {
    console.log(hash);
  });
});

//var password = "wlwdsdf";
var hashedPassword =
  "$2a$10$Y74Paa81Jc/37fQC6D.JWemyd1hPzhYKq4Mhyp0QGND.tMfbCWDsy";

bcrypt.compare(password, hashedPassword, (err, res) => {
  console.log(res);
});
