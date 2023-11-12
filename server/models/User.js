const mongoose = require("mongoose");

// Создание схемы пользователя
const UserSchema = new mongoose.Schema({
  email: {
    type: String,
    unique: true,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
});

// Создание модели User на основе схемы userSchema
const User = mongoose.model("User", UserSchema);
// export default User;

module.exports = User;
