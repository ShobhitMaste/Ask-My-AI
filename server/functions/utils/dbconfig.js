import mongoose from "mongoose"

async function dbConnect(connectAddy){
    try{
        const connection = mongoose.connect(connectAddy);
        if(connection)
            console.log("Connected to Database successfully.");
    } catch(err) {
        console.log(err);
    }
}

export {dbConnect};