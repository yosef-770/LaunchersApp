import User from '../models/user.model.js'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'

const JWT_SECRET = process.env.JWT_SECRET


async function register (user) {
    const exists = await User.findOne({username: user.username})
    if (exists) return {error: 'username exists'}

    const typeExists = await User.findOne({user_type: user.user_type})
    if (typeExists) return {error: 'user type exists'}

    const hash = await bcrypt.hash(user.password, 10)

    const newUser = await User.create({
        username: user.username,
        password: hash,
        email: user.email,
        user_type: user.user_type
    })
    return {
        id: newUser._id,
        username: newUser.username,
        email: newUser.email,
        user_type: newUser.user_type
    }
}


async function login(username, password) {
    const user = await User.findOne({username})
    if (!user) return null
    const validPassword = await bcrypt.compare(password, user.password)
    if (!validPassword) return null

    await User.updateOne({_id: user._id}, {last_login: new Date()})

    const token = jwt.sign({id: user._id.toString(), username: user.username, user_type: user.user_type}, JWT_SECRET, {expiresIn: '5h'})

    return {
        token,
        user: { id: user._id, 
            username: user.username, 
            email: user.email, 
            user_type: user.user_type, 
            last_login: user.last_login 
        }
    }
}


async function getUserByid(id) {
    const user = await User.findById(id).lean()
    return user
    
}

async function deleteUser(id) {
    const user = await User.findByIdAndDelete(id)
    return user
}


async function updateUser(id, objUser) {
    const user = await User.findById(id)
    if (!user) return null
    if(objUser.password){
        objUser.password = await bcrypt.hash(objUser.password, 10)
    }

    const update = await User.findByIdAndUpdate(
        id,
        {$set: objUser },
        {new: true }
    ).lean()

    return update
}


async function getAllUsers() {
    const users = await User.find().lean()
    return users
    
}

export {register, login, getUserByid, deleteUser, updateUser, getAllUsers}