//store application variables
//either development environment or production environment, which will have different variables
var port = 1337;

module.exports = {
    port: port,
    db: 'mongodb://localhost/sbhacks',
    facebook: {
        clientID: '270131086738454',
        clientSecret: 'e3fb58da7052c530e407d4f0c0f345f8',//id and secret generated from facebook developer website
        callbackURL: 'http://localhost:'+ port +'/oauth/facebook/callback'
    },
    twitter: {
	    clientID: '1iWdQ80rrkMegueawkLvpQ6Ji',
	    clientSecret: 'Vncm4wDvEKUARywrKAY8MfgIaYENnOMaUWXZa1Mldnbe1O1jcq',
	    callbackURL: 'http://localhost:1337/oauth/twitter/callback'
	}
};