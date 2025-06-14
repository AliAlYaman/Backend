const mongoose = require("mongoose");
const dotenv = require("dotenv");
const User = require("../models/user.model.js");

dotenv.config();

mongoose.connect(process.env.MONGO_URI).then(async () => {
  await User.deleteMany({});
  await User.create([
    { username: "white_king", email: "white@example.com", password: "hashedpass" },
    { username: "black_queen", email: "black@example.com", password: "hashedpass" },
  ]);
  console.log("Seeded users");
  mongoose.disconnect();
});
