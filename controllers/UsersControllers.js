import Users from '../models/UserModel.js'
import jwt from 'jsonwebtoken'

const getUsersController = async (req, res) => {

    if (false) {
        throw "Naseem"
    } else {
        throw "Database timeout"
    }

    try {
        console.log(req.query, "===>>> query params")

        let myQueryData = { ...req.query }

        delete myQueryData.limit
        delete myQueryData.currentPage
        delete myQueryData.sort

        let limit = req.query.limit || 10
        let page = req.query.currentPage - 1 // 1 2 3
        let sort = req.query.sort || ''

        console.log(limit, "==>> limit")

        let users = []

        if (myQueryData.search) {
            // Users mongoose find
            try {
                users = await Users.find({
                    userName: myQueryData.search
                }).limit(req.query.limit).skip(page * limit).sort(sort)
            } catch (error) {
                res.status(500).json({
                    status: false,
                    message: "Database ro raha hai"
                })
            }

        } else {
            // Users mongoose find
            users = await Users.find().limit(req.query.limit).skip(page * limit).sort(sort)
        }


        // const users = await Users.find({
        //     userName: "Khalid"
        // })

        res.json({
            status: true,
            message: "All Users Fetched Successfully",
            data: users
        })
    } catch (error) {
        throw "Error is arriving"
    }
}

const updateUsersController = async (req, res) => {

    try {
        const updateDetails = req.body

        const token = req.headers.authorization.split(' ')[1]

        console.log(token, "==>> token")

        const decoded = jwt.verify(token, process.env.JWT_SECRET)

        console.log(decoded, "===>> decoded")

        await Users.findByIdAndUpdate(decoded.id, updateDetails)

        res.json({
            status: true,
            message: "User updated Successfully"
        })
    } catch (error) {
        console.log(error.message, "==>> error in update user")
    }

}


export { getUsersController, updateUsersController }