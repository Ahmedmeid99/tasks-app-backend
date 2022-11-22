import express from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken"
import User from "../models/userModel.js";
// import auth from "../middleware/auth.js";
const router = new express.Router();

/*
 1- user control (register-login-updatePassword-deleteUser) 
 2- admin
*/
//////////////////////////////////////////
// sign up
router.post('/api/register', async (req, res) => {
    const passwordHashed = await bcrypt.hash(req.body.password, 8)
    const name = req.body.name;
    const email = req.body.email;
    try {
        const user = await User.create({ name: name, email: email, password: passwordHashed })
        res.status(200).json({ status: 'ok' })
    } catch (e) {
        console.log(e)
        res.status(400).json({ status: 'error', message: 'error duplicate email' })
    }

})
//////////////////////////////////////////
//Log in
router.post('/api/login', async (req, res) => {
    const email = req.body.email
    const password = req.body.password
    const user = await User.findOne({ email })
    const ispasswordValid = await bcrypt.compare(password, user.password)
    if (ispasswordValid) {
        const token = jwt.sign({ email, password }, process.env.JWT_SECRET)
        user.token = token;
        user.save()
        return res.status(200).json({ user: user, token, status: 'ok' })
    } else {
        return res.status(400).json({ user: false, status: 'error' })
    }
})

//////////////////////////////////////////
router.post('/api/checklogin', async (req, res) => {
    const token = req.header("Authorization").replace("Bearer ", "");
    if (token) {
        //transform token to user object
        const decoded = jwt.verify(token, process.env.JWD_SECRET)
        const user = await User.findOne({ _id: decoded.id, "tokens.token": token })
        return res.status(200).json({ user: user, token, status: 'ok' })
    }
})
//////////////////////////////////////////
//delete User 
router.delete('/api/user', async (req, res) => {
    const email = req.body.email
    const password = req.body.password
    try {
        const user = await User.findOne({ email })
        res.status(200).json({ status: 'ok', user })
        await user.remove()
        const ispasswordValid = await bcrypt.compare(password, user.password)
        if (user && ispasswordValid) {
            res.status(200).json({ status: 'ok' })
            await user.remove()
        } else {
            return res.status(404).json({ message: 'cant find user', status: 'error' })
        }
    } catch (e) {
        console.log(e)
        res.status(400).json({ status: 'error', message: 'can not delete user' })
    }

})

//////////////////////////////////////////

//////////////////////////////////////////
//Read Users (admin)
router.get('/api/users', async (req, res) => {
    try {
        const users = await User.find({})
        res.status(200).json({ users: users })
    } catch (e) {
        console.log(e)
        res.status(400).json({ status: 'error', message: 'can not find users' })
    }
})

export default router