const express = require("express");
const app = express();
const userRouter = require("../routes/userRoutes");
const noteRouter = require("../routes/noteRoutes");
const dotenv = require("dotenv");
dotenv.config();

const cors = require("cors");
const mongoose = require("mongoose");


dotenv.config();
app.use(express.json());
app.use(cors());
app.use("/users", userRouter);
app.use("/note", noteRouter);

app.get("/", (req, res) => {
    res.send("Note API By Eshrak");
})


const PORT = process.env.PORT || 5000

mongoose.connect(process.env.MONGO_URL)
    .then(() => {

        app.listen(PORT, () => {
            console.log("Server Started On Port no. " + PORT);
        });
    })
    .catch((error) => {
        console.log(error);
    })
