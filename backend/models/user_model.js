const bcrypt = require('bcrypt')
const validator = require('validator')
const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const userSchema = new Schema({
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true,
    }
})

// static signup method
userSchema.statics.signup = async function (email, password) {
    try {
        // validation
        if(!email || !password) {
            throw new Error('All fields must be filled')
        }
        // validate email
        if (!validator.isEmail(email)) {
            throw new Error('Email is invalid')
        }
        // validate password
        if (password.length < 6) {
            throw new Error('Password must be at least 6 characters')
        }
        // hash password
        const hashedPassword = await bcrypt.hash(password, 10)


        // check if user exists
        const user = await this.findOne({ email })
        if (user) {
            throw new Error('User already exists')
        }

        // create new user
        const newUser = await this.create({ email, password: hashedPassword })
        return newUser
    } catch (err) {
        throw err
    }
}

// static login method
userSchema.statics.login = async function (email, password) {
    try {
        // validation
        if(!email || !password) {
            throw new Error('All fields must be filled')
        }
        // check if user exists
        const user = await this.findOne({
            email
        })
        if (!user) {
            throw new Error('User does not exist')
        }
        // check if password is correct
        const isMatch = await bcrypt.compare(password, user.password)
        if (!isMatch) {
            throw new Error('Password is incorrect')
        }
        return user
    } catch (err) {
        throw err
    }
}

module.exports = mongoose.model('User', userSchema);