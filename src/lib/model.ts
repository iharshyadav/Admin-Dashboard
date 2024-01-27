const {default: mongoose} = require("mongoose");

const connection={
    // isConnected:false,
 };

const connectToDb = async ()=>{

    try {
        if(connection.isConnected){
            console.log("Using existing connections");
            return;
           }
        const db = await mongoose.connect(process.env.MONGO_URI);
        connection.isConnected= db.connections[0].readyState;
        console.log(`connected to MONGODB : DB HOST ${db.connection.host}`);
    } catch (error) {
        console.log(error);
    }
}

export default connectToDb;