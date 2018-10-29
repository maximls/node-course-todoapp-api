const bcrypt = require("bcryptjs");

const password = "123";
bcrypt.genSalt(10, (err, salt) => {
  bcrypt.hash(password, salt, (err, hash) => {
    console.log(hash);
  });
});

var hashedPassword =
  "$2a$10$UdXcDzKoqPUQ4Q8xwMbrv.iix1RJ88tjMl6leNQ01.SYm5yDMuQsC";

bcrypt.compare(password, hashedPassword, (err, res) => {
  console.log(res);
});
