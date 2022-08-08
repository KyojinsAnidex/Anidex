const bcrypt = require("bcryptjs");

let f;

f = "password";

let h;

const t = async (f, h) => {
  try {
    bcrypt.hash(f, 12, (err, hash) => {
      h = hash;
      console.log(hash);
      if (err) {
        console.error(err);
      }
    });
  } catch (err) {
    console.error(err);
  }
  // return h;
};

t(f, h);
console.log(h);
// console.log(t(f,h));
// console.log(bcrypt.hashSync(f, 12));
