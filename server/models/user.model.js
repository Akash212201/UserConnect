const mongoose=require('mongoose')
const userSchema =new mongoose.Schema({
    username: {
        type: String,
        required: [true,"Please provide unique username"],
        unique: [true,"Username exist"]
    },
    password: {
        type: String,
        required: [true,"Please provide password"],
        unique: false
    },
    email: {
        type: String,
        required: [true,"Please provide unique email"],
        unique: true
    },
    firstName: {type: String},
    lastName: {type: String},
    mobile: {type: Number},
    address: {type: String},
    profile: {type: String}
})
module.exports = mongoose.model('Users',userSchema);

