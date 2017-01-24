var mongoose = require('mongoose'),
	passportLocalMongoose = require('passport-local-mongoose');

var LinkSchema = new mongoose.Schema({
    name: String,
    link: {
        type: String,
        unique: true //unique username
    },
    owner: {
        id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User"
        }
    }
});

//to learn authentication from scratch, read stack setup page
LinkSchema.plugin(passportLocalMongoose);



mongoose.model('Link', LinkSchema);//creates the link schema
module.exports = LinkSchema;