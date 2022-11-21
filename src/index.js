import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import userRouter from "./routes/user.js";
import taskRouter from "./routes/task.js";

const app = express()

app.use(express.json())
app.use(userRouter);
app.use(taskRouter);
app.use(cors())
// Production URL
// const CONNECTION_URL = "mongodb+srv://ahmed:eid199963@cluster0.h575og5.mongodb.net/?retryWrites=true&w=majority"

// const CONNECTION_URL = "mongodb://127.0.0.1:27017/todo-app-backend"
const CONNECTION_URL = process.env.MONGODB_URL

const PORT = process.env.PORT || 3000

mongoose.connect(CONNECTION_URL)
    .then(() => app.listen(PORT, () => console.log(`server is running on port: ${PORT}`)))
    .catch((e) => console.log(e.message))
/*
 * C:/Users/Ezz/mongodb/bin/mongod.exe --dbpath C:/Users/Ezz/mongodb-data
*/
//////////////////////////////////////////
//routes

