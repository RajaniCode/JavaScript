// https://github.com/andris9/xoauth2

var xoauth2 = require("xoauth2"), xoauth2gen;

xoauth2gen = xoauth2.createXOAuth2Generator({
    user: "rajaninodejs@gmail.com",
    clientId: "1021516826947-ibdvc2rg1tfdnmtoc0cn6o8841qpu93k.apps.googleusercontent.com",
    clientSecret: "6aCHWwQFRBx83vBKjUkxi1cp",
    refreshToken: "1/PQtQ3Ehla8tJ3kpdNHP6vSo-dMwsfvTUW0MHPQWlcmI",
    accessToken: "ya29.Ci-KA0v446ykvTV98_VHrRnPkx0onqQz2V4wq_q8FyZ8ie4fDXZZbNutI7xCrJoSDw",
    // /*
    customHeaders: {
      "HeaderName": "HeaderValue"
    },
    customPayload: {
      "payloadParamName": "payloadValue"
    }
    // */
});

// ... or for a Google service account
/*
xoauth2gen = xoauth2.createXOAuth2Generator({
    user: "user@gmail.com",
    service: '{Service Email Address}',
    scope: 'https://mail.google.com/',
    privateKey: '{Private Key in PEM format}'
});
*/


// SMTP/IMAP
xoauth2gen.getToken(function(err, token){
    if(err){
        return console.log(err);
    }
    console.log("AUTH XOAUTH2 " + token);
});

// HTTP
xoauth2gen.getToken(function(err, token, accessToken){
    if(err){
        return console.log(err);
    }
    console.log("Authorization: Bearer " + accessToken);
});