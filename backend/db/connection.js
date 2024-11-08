import mongoose from "mongoose";


const MONGO_URI = process.env.MONGO_URI;
const ATLAS_URI = process.env.ATLAS_URI;

const dBConnect = async () => {
    try
    {
        await mongoose.connect(MONGO_URI);
        console.log(`Connected to ${MONGO_URI}`);
    }
    catch(err)
    {
        console.error(`Failed to connect: ${MONGO_URI}.. Error: ${err.message}`);
        console.log(`Try conneting to ${ATLAS_URI}`);
        try
        {
            await mongoose.connect(ATLAS_URI);
            console.log(`Connected to ${ATLAS_URI}`);
        }
        catch(err)
        {
            console.error(`Failed to connect to MongoDB. Error: `, err);
            process.exit(1);
        }
    }
}

export default dBConnect;