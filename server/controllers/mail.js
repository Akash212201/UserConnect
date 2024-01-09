const nodemailer=require('nodemailer');
const Mailgen= require('mailgen')

const nodeConfig= {
    host:"",
    port: 587,
    secure: false,
    auth: {
        user:"",
        pass: "",
    }

}
let transportor=nodemailer.createTransport(nodeConfig)
let mailGenerator=new Mailgen({
    theme: "default",
    product: {
        name: "Mailgen",
        link: "https://mailgen.js"
    }
})

exports.registerMail =async(req,res)=>{
    const {username, userEmail, text, subject }= req.body;
    let email={
        body: {
            name: username,
            intro: text || "Welcome to User Connect",
            outro: "Need help"
        }
    }
    let emailBody=mailGenerator.generate(email);
    let message= {
        from: "",
        to: userEmail,
        subject: subject || "Signup Succeessful",
        html: emailBody,
    }
    transportor.sendMail(message)
    .then(()=>{
        return res.status(200).send({msg: "Receive Email?"})
    })
    .catch(error => res.status(500).send({error}))
}