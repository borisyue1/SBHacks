//store application variables
//either development environment or production environment, which will have different variables
var port = 1337;

module.exports = {
    port: port,
    db: 'mongodb://localhost/sbhacks',
 //    facebook: {
 //        clientID: '1731441580515907',
 //        clientSecret: 'bb3cf5c6bb5981441586de7b4d4f8ff1',//id and secret generated from facebook developer website
 //        callbackURL: 'http://localhost:'+ port +'/oauth/facebook/callback'
 //    },
 //    twitter: {
	//     clientID: 'zbtLyhJzwe1ZH7fIySRNo0qjm',
	//     clientSecret: 'QTICZw3hZFdtd4LbeMWmjILbDa2DhBn1YTPZeOJLJuGDEtkc6P',
	//     callbackURL: 'http://localhost:1337/oauth/twitter/callback'
	// }
};