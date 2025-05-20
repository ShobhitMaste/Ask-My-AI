import {userData} from '../models/users.js'
import bcrypt from "bcrypt"

//because of above line we have to say default in its export.
// User.find({ age: { $gte: 18 } })
//   .sort({ age: -1 })   // descending age
//   .limit(10)           // max 10 results
//   .skip(5)             // skip first 5
//   .then(users => console.log(users));

async function createUser(req, res, next) {
    if(!req.body){
        return next(new Error("Provide name and password."));
    }

    const username = req.body.username;
    const password = req.body.password;

    if(!username || !password){
        return next(new Error("Provide Full Details!!"));
    }

    try{
        const user = await userData.create({username, password});
        res.status(201).json({
            success: true,
            user
        })
    } catch (err) {
        console.log(err);
    }
}

async function validateUser(req, res, next) {
    if(!req.body){
        return next(new Error("Provide name and password."));
    }
    const username = req.body.username;
    const password = req.body.password;

    if(!username || !password){
        return next(new Error("Provide Full Details!!"));
    }

    try{
        const user = await userData.find({username, password});
        if(!user)
            return next(new Error("User not found"));
        res.status(201).json({
            success: true,
            user
        })
    } catch (err) {
        console.log(err);
    }
}


async function loginUser(username, password){
    try{
        const user = await userData.findOne({username});
        if(!user)
           return false;
        const hashedPass = user.password;
        const isMatch = await bcrypt.compare(password, hashedPass);
        console.log("match - ", isMatch);
        return isMatch;
    } catch (err) {
        console.log(err);
    }
}
export {createUser, validateUser, loginUser};