const mongoose = require('mongoose')
const {Schema} = mongoose;

// New schema
// Can add and remove properties as we please
const userSchema = new Schema({
  googleId: String
});

// Create a new collection called users
mongoose.model('users', userSchema);

