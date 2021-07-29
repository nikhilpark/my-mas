const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  username: String,
  firstName: String,
  lastName: String,
  password: String,
  email: String,
  joined: {
      type:Date,
      default:Date.now
  },
  userRole: {
    type: Number,
    default: 0,
  },
  ppic: {
      type:String,
      default:""
  },
  banner: {
      type:String,
      default:""
  },
  bday: String,
});

module.exports = mongoose.model("User", userSchema);
