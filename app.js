const express = require('express');
const morgan = require('morgan');
const nodemailer = require('nodemailer');

const app = new express();
app.use(express.json());
require('dotenv').config();

app.use(morgan('dev'));

app.post('/email',(req,res) => {
    const item = req.body;
    var userName = process.env.USERNAME;
    var password = process.env.PASSWORD;
    console.log(userName,password);
    var transporter = nodemailer.createTransport({
        service : 'gmail',
        auth : {
            user : userName,
            pass : password
        }
    });
    var mailOptions = {
        from: userName,
        to: item.to,
        subject: item.subject,
        text: item.content
      };
    
      transporter.sendMail(mailOptions,function(error,info){
        if(error){
            console.log(error);
            res.status(500).json(error);
        }else{
            res.status(200).json('successfully send');
        }
      });
   
   
})


const PORT = process.env.PORT;
app.listen(PORT, () => {
    console.log(`successfully running in port ${PORT}`);
})


