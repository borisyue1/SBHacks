//store application variables
//either development environment or production environment, which will have different variables
var port = process.env.PORT || 1337;

module.exports = {
    port: port,
    db: 'mongodb://boris:snappit@ds127949.mlab.com:27949/snappit',
    facebook: {
        clientID: '270131086738454',
        clientSecret: 'e3fb58da7052c530e407d4f0c0f345f8',//id and secret generated from facebook developer website
        callbackURL: 'https://snappit-borisyue.herokuapp.com/oauth/facebook/callback'
    },
    twitter: {
	    clientID: '1iWdQ80rrkMegueawkLvpQ6Ji',
	    clientSecret: 'Vncm4wDvEKUARywrKAY8MfgIaYENnOMaUWXZa1Mldnbe1O1jcq',
	    callbackURL: 'https://snappit-borisyue.herokuapp.com/oauth/twitter/callback'
    }
};