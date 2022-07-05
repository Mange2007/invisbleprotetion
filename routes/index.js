var express = require('express');
var nodemailer = require("nodemailer")
var bodyParser = require("body-parser")
var router = express.Router();
var layout = require('layout');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index.ejs');
});

router.get("/abouts", function(req, res) {
  res.render("abouts", {
    layout:false
  })
})

router.get("/courses", function(req, res){
  res.render("courses", {
    layout:false
  })
})

router.get("/contact", function(req, res){
  res.render("contact", {
    layout:false
  })
})

router.get("/team", function(req, res){
  res.render("team", {
    layout:false
  })
})


router.get("/testimonial", function(req, res){
  res.render("testimonial", {
    layout:false
  })
})


require("dotenv").config()

const sgMail = require("@sendgrid/mail")

router.post("/sendmail", (req, res) => {
  

  sgMail.setApiKey(process.env.SENDGRID_API_KEY)

    const output = `
    <p>You have a new Contact Request</p>
    <h1> COntact Details</h3>
    <ul>
      <li>Name:${req.body.name}</li>
      <li>Email:${req.body.email}</li>
      <li>Subject:${req.body.subject}</li>
      <li>Email:${req.body.message}</li>
    `
  

  const msg = {
    to: 'chukwumakingsley1@gmail.com', // Change to your recipient
    from: 'chukwumakingsley1@gmail.com', // Change to your verified sender
    subject: 'Sending with SendGrid is Fun',
    text: 'and easy to do anywhere, even with Node.js',
    html: output,
  }
  
  sgMail
    .send(msg)
    .then((response) => {
      console.log(response[0].statusCode)
      console.log(response[0].headers)
    })
    .catch((error) => {
      console.error(error)
    })

})













// router.post("/sendmail", (req, res) => {
//   console.log(process.env.SENDGRID_API_KEY,)
//   const {name, email, subject, message} = req.body

//   const from = "chukwumakingsley1@gmail.com"
//   const to = "chukwumakingsley1@gmail.com"

//   const subjects = "New contact request"

//   const output = `
//     <p>You have a new Contact Request</p>
//     <h1> COntact Details</h3>
//     <ul>
//       <li>Name:${name}</li>
//       <li>Email:${email}}</li>
//       <li>Subject:${subject}</li>
//       <li>Email:${message}</li>
//     `

//     sendMail(to, from, subjects, output)
// })

// require("dotenv").config
// const sgMail = require("@sendgrid/mail")
// sgMail.setApiKey(process.env.SENDGRID_API_KEY) 
// console.log(process.env.SENDGRID_API_KEY)

// const sendMail = (to, from, subject, text) => {
//   const msg = {
//     to,
//     from,
//     subject,
//     text
//   }

//   sgMail.send(msg, function (err, result) {
//     if(err) {
//       console.log("Email Not Sent Error Occured")
//     } else {
//       console.log("Eamil was Sent")
//     }
//   })
// }





// router.post("/sendmail", (req, res) => {
//   console.log(req.body)
//   const output = `
//   <p>You have a new contact request</p>
//   <h3>Contact Details</h3>
//   <ul>
//     <li>name: ${req.body.name}
//     <li>email: ${req.body.email}
//     <li>subject: ${req.body.subject}
//   </ul>
//   <h3>Message</h3
//   <p>${req.body.message}</p>
//   `

  
//   // async..await is not allowed in global scope, must use a wrapper
//   async function main() {
//     // Generate test SMTP service account from ethereal.email
//     // Only needed if you don't have a real mail account for testing
//     let testAccount = await nodemailer.createTestAccount();
//   console.log(testAccount)
//     // create reusable transporter object using the default SMTP transport
//     let transporter = nodemailer.createTransport({

//       host: "smtp.ethereal.email",
//       port: 587,
//       secure: false, // true for 465, false for other ports
//       service: 'gmail',

//       auth: {
//         user: "mangemadalane@gmail.com", // generated ethereal user
//         pass: "dlcpsucincgbomdr", // generated ethereal password
//       },
//     });
  
//     // send mail with defined transport object
//     try {
//     let info = await transporter.sendMail({
//       from: 'mangemadalane@gmail.com', // sender address
//       to: "mangemadalane@gmail.com", // list of receivers
//       subject: "Hello ✔", // Subject line
//       text: "Hello world?", // plain text body
//       html: output, // html body
      
//     });
//     console.log("Message sent: %s", info.messageId);

//   }catch(error) {
//     console.log(error)
//   }
  
//     // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>
  
//     // Preview only available when sending through an Ethereal account
//     // console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
//     // Preview URL: https://ethereal.email/message/WaQKMgKddxQDoou...
//   }

  
//   main().catch(console.error);
// })  

module.exports = router;
