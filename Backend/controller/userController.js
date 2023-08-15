const asyncHandler = require("express-async-handler");
const User = require("../models/userModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");


//SHOW ALL USERS REGISTERED
const showAllUsers = asyncHandler(async (req, res) => {
    const users = await User.find();
    res.status(200).json(users)
})


// SHOW USER BY ID
const showUserID = asyncHandler(async (req, res) => {
    const user = await User.findById(req.params.id);
    if (!user) {
        res.status(404);
        throw new Error("Contact not found");
    }
    res.status(200).json(user);
})



//REGISTER USER 
const registerUser = asyncHandler(async (req, res) => {
    const { username, email, password } = req.body;
    try {
        const emailAvailable = await User.findOne({ email });
        const usernameAvailable = await User.findOne({ username });
        if (emailAvailable) {
            res.status(400);
            throw new Error("Email already registered!")
        }
        if (usernameAvailable) {
            res.status(400);
            throw new Error("Username  already registered!")
        }
    } catch (error) {
        console.log(error);
    }


    const hashPassword = await bcrypt.hash(password, 10)
    console.log("Hash password is" + hashPassword);

    const newUser = await User.create({
        username,
        email,
        password: hashPassword
    });
    if (!newUser) {
        res.status(400);
        throw new Error("All fields are mandatory")
    }
    if (newUser) {
        res.status(201).json({ _id: newUser.id, Username: newUser.username, Email: newUser.email, Password: newUser.password })
    } else {
        res.status(400);
        throw new Error("User data is not valid!")
    }
    console.log("User created" + newUser);

    res.json({ message: "REGISTER" })
});





//LOGIN USER
const loginUser = asyncHandler(async (req, res) => {
    const { email, password } = req.body;
    if (!email || !password) {
        res.status(400);
        throw new Error("All fields are mandatory")
    }
    try {
        const user = await User.findOne({ email });
        if (user && (await bcrypt.compare(password, user.password))) {
            const accessToken = jwt.sign(
                {
                    user: {
                        username: user.username,
                        email: user.email,
                        id: user.id,
                    },
                },
                process.env.ACCESS_TOKEN_SECRET,
                { expiresIn: "150m" }
            )

            res.status(200).json(accessToken);
            console.log("User LOGGEDIN");
            console.log();
        } else {
            res.status(401)
            throw new Error("email or password is not valid");
        }
    } catch (error) {
        console.log(error);
    }
});



const currentUser = asyncHandler(async (req, res) => {
    res.json(req.user);
});

const deleteUser = asyncHandler(async (req, res) => {
    const user = await User.findById(req.params.id);
    if (!user) {
        res.status(404);
        throw new Error("User ID not Found")
    };
    await User.deleteOne(user);
    res.status(200).send(`User Deleted ${user}`)
    console.log(`User Deleted ${user}`);

});



module.exports = {
    showAllUsers,
    showUserID,
    registerUser,
    loginUser,
    currentUser,
    deleteUser
}