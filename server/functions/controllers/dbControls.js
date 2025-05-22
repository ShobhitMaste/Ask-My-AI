import {userData} from '../models/users.js'
import bcrypt from "bcrypt"

//because of above line we have to say default in its export.
// User.find({ age: { $gte: 18 } })
//   .sort({ age: -1 })   // descending age
//   .limit(10)           // max 10 results
//   .skip(5)             // skip first 5
//   .then(users => console.log(users));

async function createUser(username, password) {

    if(!username || !password){
        return "Provide Full Details!!";
    }
    const hashedPass = await bcrypt.hash(password, 10);
    try{
        const user = await userData.create({username, password: hashedPass});
        console.log(user);
        return "Registered Successfully!";
    } catch (err) {
        // return err;
        return err.errorResponse.errmsg;
        // console.log(err.errorResponse.errmsg);
    }
}


async function loginUser(username, password){

    if(!username || !password){
        return "Provide Full Details!!";
    }
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

async function saveData(username, query){
    console.log("saving");
    try{
        console.log(username, query)
        const user = await userData.findOneAndUpdate(
            {username},
            {
                $inc : {totalPrompts : 1},
                $push : {prompts : {prompt : query} }
            }
        );

        console.log("Data saved successfully");
    } catch (err) {
        console.log(err);
    }
}

export {createUser, loginUser, saveData};