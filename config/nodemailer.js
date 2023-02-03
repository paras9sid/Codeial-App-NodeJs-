const nodemailer = require('nodemailer');
const ejs = require('ejs');
const path = require('path');
const { join } = require('path');

let transporter = nodemailer.createTransport({  // transporter -path which sends email
    service:'gmail',
    host:'smtp.gmail.com',   // gmail smtp settings in google search - simple mail transfer protocol
    port: 587,
    secure: false,
    auth: {
        user:'@gmail.com', //gmail id to use
        password:'$' //password of gmail account we are using
    }
});


let renderTemplate = (data , relativePath) => {  // using arrow functions -- renderTemplate - files going fto send in mailers/views folder file
    let mailHTML;
    ejs.renderFile(
        path.join(__dirname, '../views/mailers', relativePath),
        data, // data = context to be passed to ejs
        function(err,template){
            if(err){
                console.log('error in rendering template',err);
                return;
            }

            mailHTML = template;
        }
    )

    return mailHTML; 
}

module.exports = {
    transporter, //using shorthand instead of- 
    renderTemplate  //using shorthand instead of- renderTemplate : renderTemplate
}