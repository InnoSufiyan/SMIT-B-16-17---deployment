const jwt = require("jsonwebtoken")
const Users = require("../models/UserModel")
const bcrypt = require('bcrypt');
const nodemailer = require('nodemailer');
const sendEmailOTP = require("../utils/importantFunctions");
const uuid = require('uuid')

const { v4: uuidv4 } = uuid




const signupController = async (req, res) => {

    try {

        const { email, userName, password, age } = req.body

        if (!email || !userName || !password || !age) return res.json({
            status: false,
            message: "All Fields are required"
        })

        bcrypt.hash(req.body.password, 12, async function (err, hash) {
            // Store hash in your password DB.
            console.log(hash, "==>> hash")

            req.body.password = hash

            console.log(uuidv4())

            let otpCode = uuidv4().slice(0,4)


            const messageByTheTransporter = await sendEmailOTP(req.body.email, otpCode)


            await Users.create({
                ...req.body,
                otp: otpCode
            })


            res.json({
                status: true,
                message: `User signed up successfully, ${messageByTheTransporter}`
            })
        });



    } catch (error) {
        console.log(error, "==>> error")
        res.json({
            status: false,
            message: error.message
        })
    }
}
const loginController = async (req, res) => {

    try {
        console.log("==>> login controller")



        const { email, password } = req.body

        const myUser = await Users.findOne({
            email: email
        })

        console.log("======>>>> banda mila ya nahin")

        if (!myUser) return res.json({
            status: false,
            message: "No User Found"
        })

        bcrypt.compare(password, myUser.password, function (err, result) {
            // result == true
            if (result) {

                console.log(myUser, "====>>> myUser")

                const token = jwt.sign({
                    email: myUser.email,
                    userName: myUser.userName,
                    id: myUser._id
                }, process.env.JWT_SECRET, { expiresIn: 2 * 60 })

                return res.json({
                    status: true,
                    message: "User logged in successfully",
                    token: token
                })
            }
            return res.json({
                status: false,
                message: "Wrong Password"
            })
        });


    } catch (error) {
        console.log(error.message, "==>> error in login")
    }
}

module.exports = {
    signupController,
    loginController
}