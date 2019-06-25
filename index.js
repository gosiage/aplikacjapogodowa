const request = require('request');
const argv = require('yargs').argv;
const nodemailer = require('nodemailer');


let apiKey = 'apikey';
let city = argv.c || 'Warszawa';
let url = `http://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`



request(url, function (err, response, body) {
  if(err){
    console.log('error:', error);
  } else {
    let pogoda = JSON.parse(body)
    let wiadomosc = `Jest ${pogoda.main.temp} stopni w ${pogoda.name}`;
    let mail = nodemailer.createTransport({
        service: 'gmail',
        auth: {
               user: 'jakismail1@gmail.com',
               pass: 'annypass'
           }
       });
    
    const mailOptions = {
        from: 'ebebe@test.com', // nadawca
        to: 'someone@test.com', // lista odbiorcow
        subject: 'Its working', // Temat
        html: wiadomosc// tekst
      };
      
    
    mail.sendMail(mailOptions, function (err, info){
        if(err){
            console.log(err)
        }else{
            console.log(info)
        };
    })
  }
});

