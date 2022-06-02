// https://nodemailer.com/
// https://github.com/nodemailer/nodemailer#e-mail-message-fields

var nodemailer = require('nodemailer');
var xoauth2 = require('xoauth2');

// listen for token updates (if refreshToken is set)
// you probably want to store these to a db
/*
generator.on('token', function(token){
  console.log('New token for %s: %s', token.user, token.accessToken);
});
*/

// login
var transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        xoauth2: xoauth2.createXOAuth2Generator({
            user: '#####',
            clientId: '1021516826947-ibdvc2rg1tfdnmtoc0cn6o8841qpu93k.apps.googleusercontent.com',
            clientSecret: '6aCHWwQFRBx83vBKjUkxi1cp',
            refreshToken: '1/PQtQ3Ehla8tJ3kpdNHP6vSo-dMwsfvTUW0MHPQWlcmI',
            accessToken: 'ya29.Ci-KA0v446ykvTV98_VHrRnPkx0onqQz2V4wq_q8FyZ8ie4fDXZZbNutI7xCrJoSDw'
        })
    }
});


// verify connection configuration
transporter.verify(function(error, success) {
   if (error) {
        console.log(error);
   } else {
        console.log('Server is ready to take our messages');
   }
});

var data = {
    from: '"Node JS" <#####@gmail.com>', // sender address
    to: '"Node" <#####@outlook.com>, "NPM" <#*#*#@gmail.com>', // list of receivers
    subject: 'Email using Node.js Google OAuth 2.0', // Subject line
    text: 'Email using Node.js Google OAuth 2.0 Hello World!', // plaintext body
    // html: '<b>Email using Node.js Google OAuth 2.0 Hello World!</b>' // html body
};

transporter.sendMail(data, function(err, info) {
    if(err){
        console.log('Error');
    }else{
        console.log('Email sent');
    }
});