var mongoose = require('mongoose'),
	passportLocalMongoose = require('passport-local-mongoose');

var UserSchema = new mongoose.Schema({
    name: String,
    email: String,
    username: {
    	type: String,
    	unique: true //unique username
    },
    password: String,
    links: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Link"
    }],
    provider: String,
    providerId: String,
    providerData: {}
});

//to learn authentication from scratch, read stack setup page
UserSchema.plugin(passportLocalMongoose);


//checks if username unique, else it finds a unique one and then calls callback
UserSchema.statics.findUniqueUsername = function(username, suffix, callback) {
    var _this = this;
    var possibleUsername = username + (suffix || '');
    _this.findOne(
        {username: possibleUsername},
        function(err, user) {
            if (!err) {
                if (!user) {
                    callback(possibleUsername);
                }
                else {
                    return _this.findUniqueUsername(username, (suffix || 0) + 1, callback);
                }
            }
            else {
                callback(null);
            }
        }
    );
};


mongoose.model('User', UserSchema);//creates the user schema