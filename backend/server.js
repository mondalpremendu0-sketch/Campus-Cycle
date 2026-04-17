require('dotenv').config();
const app = require('./src/app');
const connectToDb = require("./src/db/db")



app.listen(3000,async () => {
    await connectToDb()
    console.log("Server is running on port 3000");
    
})