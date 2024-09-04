import express from "express"
import nodeMailer from "nodemailer"
import crypto from "crypto"

const app = express()

app.get("/",(req,res)=> {
    res.send("Hello world")
})

app.get("/send", (req,res)=> {
    const OTP = Math.floor(1 + Math.random() * 9000);

    // const randomNumber = crypto.randomInt(0,10000)
    // const OTP = String(randomNumber).padStart(4, '5');
    // console.log(OTP)

    const emailProvider = nodeMailer.createTransport({
        service: "gmail",
        secure: true,
        port: 465,
        auth: {
            user: 'nileshchauhan5911@gmail.com',
            pass: "pcnmimcutzlkhrmc"
        },
        tls: {rejectUnauthorized: false}
    })

    const receiver = {
        from: "nileshchauhan5911@gmail.com",
        to: "nileshchauhan3998@gmail.com",
        subject: "OTP Verification",
        text: `Your One Time Password(OTP) is ${OTP}`,
    }

    emailProvider.sendMail(receiver, (error, emailResponse) => {
        if(error){
            res.status(422).json({message: error})
        } else {
            res.status(200).json({message: "OTP send successfully on your gmail account"})
        }
    })
    
})

app.listen(3000)