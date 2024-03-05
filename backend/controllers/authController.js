const userModel = require("../model/userModel");
const bcrypt = require("bcrypt");

const hashPassword = async (password) => {
    try {
        const saltRounds = 10;
        const hashedPassword = await bcrypt.hash(password, saltRounds);
        return hashedPassword;
    } catch (error) {
        console.log(error);
        throw error
    }
};

const comparePassword = async (password, hashedPassword) => {
    return bcrypt.compare(password, hashedPassword);
};

const registerController = async (req, res) => {
    try {
        const { firstName, lastName, email, password, confirmPassword, image } = req.body;
        // validations
        if (!firstName) {
            return res.send({ message: "First name is required" });
        }
        if (!lastName) {
            return res.send({ message: "Last name is required" });
        }
        if (!email) {
            return res.send({ message: "Email is required" });
        }
        if (!password) {
            return res.send({ message: "Password is required" });
        }
        if (!confirmPassword) {
            return res.send({ message: "Confirm Password is required" });
        }

        // check user
        const existingUser = await userModel.findOne({ email });

        // existing user
        if (existingUser) {
            return res.status(200).send({
                success: false,
                message: "Already Registered please login"
            });
        }

        // register user
        const hashedPassword = await hashPassword(password);
        // save
        const user = await new userModel({
            firstName,
            lastName,
            email,
            password: hashedPassword,
            confirmPassword: hashedPassword,
            image
        }).save();

        res.status(200).send({
            success: true,
            message: "User Registered Successfully",
            user,
        });

    } catch (error) {
        // console.log(error);
        res.status(500).send({
            success: false,
            message: "Error while Signing up",
            error
        });
    }
};


const loginController = async (req, res) => {
    // console.log(req.body);
    try {
        const { email, password } = req.body;

        // validation
        if (!email || !password) {
            return res.status(404).send({
                success: false,
                message: "Invalid email or password",
            });
        }

        // check user
        const user = await userModel.findOne({ email });
        if (!user) {
            return res.status(404).send({
                success: false,
                message: "Email is not registered",
                alert: false
            });
        }

        const match = await comparePassword(password, user.password);
        if (!match) {
            return res.status(200).send({
                success: false,
                message: "Invalid Password"
            });
        }

        res.status(200).send({
            success: true,
            message: "Login Successfully",
            user: {
                _id: user._id,
                firstName: user.firstName,
                lastName: user.lastName,
                email: user.email,
                image: user.image
            },
            alert: true
        });

    }
    catch (error) {
        // console.log(error);
        res.status(500).send({
            success: false,
            message: "Error in Login",
            error
        });
    }
};

module.exports = {
    registerController,
    loginController
}; 
