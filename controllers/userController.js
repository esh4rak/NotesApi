const userModel = require("../models/user");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const signup = async (req, res) => {


    const { username, password, email } = req.body;

    if (!username || !password || !email) {
        return res.status(400).json({ message: "Username, password, and email are required." });
    }

    try {

        //Existing User Check
        const existingUser = await userModel.findOne({ email: email })
        if (existingUser) {
            return res.status(400).json({ message: "User Already Exists" });
        }

        //Hashed Password
        const hashedPassword = await bcrypt.hash(password, 10);

        //User Create
        const result = await userModel.create({
            username: username,
            password: hashedPassword,
            email: email
        });


        //Token generate
        const token = jwt.sign({ email: result.email, id: result._id }, process.env.SECRET_KEY);
        console.log('Generated Token:', token);


        //Response Send
        res.status(201).json({ user: result, token: token });


    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Something went wrong" });
    }


}

const signin = async (req, res) => {

    const { email, password } = req.body;
    if (!email || !password) {
        return res.status(400).json({ message: "Email and password are required." });
    }

    try {

        const existingUser = await userModel.findOne({ email: email });
        if (!existingUser) {
            return res.status(404).json({ message: "User Not Found" })
        }


        const matchPassword = await bcrypt.compare(password, existingUser.password);
        if (!matchPassword) {
            return res.status(400).json({ message: "Invalid Credentials" });
        }


        const token = jwt.sign({ email: existingUser.email, id: existingUser._id }, process.env.SECRET_KEY);
        console.log('Generated Token:', token);


        res.status(200).json({ user: existingUser, token: token });


    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Something went wrong" });
    }
}

module.exports = { signin, signup };