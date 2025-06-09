import userModel from '../models/userModel.js';
import validator from 'validator';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';

const createToken = (id) => {
    return jwt.sign({id},process.env.JWT_SECRET);
}
// Route for user login
const loginUser = async (req, res) => {
    try {

        const { email, password } = req.body;

        // Check if user exists
        const user = await userModel.findOne({ email });
        if (!user) {
            return res.json({ success: false, message: 'User not found' });
        }

        // Check if password is correct
        const isMatch = await bcrypt.compare(password, user.password);

        if(isMatch){
            const token = createToken(user._id);
            return res.json({ success: true, token});
        }
        else {
            return res.json({ success: false, message: 'Invalid credentials' });
        }
        
        
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message || 'Internal server error' });    
    }

}

// Route for user registration
const registerUser = async (req, res) => {
    try {
        const { name, email, password } = req.body;

        // Check if user already exists
        const exists = await userModel.findOne({ email });
        if (exists) {
            return res.json({ success:false, message: 'User already exists' });
        }

        // validating email format and strong password

        if (!validator.isEmail(email)) {
            return res.json({ success:false, message: 'Please enter valid email' });
        }
        if (password.length < 6) {
            return res.json({ success:false, message: 'Password must be at least 6 characters long' });
        }

        // Hashing the password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);
        // Creating new user
        const newUser = new userModel({
            name,
            email,
            password: hashedPassword,
        });
        
        // Saving the user to the database
        const user = await newUser.save();

        const token = createToken(user._id);
        res.json({ success: true, token});
        
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: 'Internal server error' });
        
        
    }
}

// Route for Admin login

const adminLogin = async (req, res) => {

    try {

        const { email, password } = req.body;

        // Check if user exists
        if(email === process.env.ADMIN_EMAIL && password === process.env.ADMIN_PASSWORD) {
            const token = jwt.sign(email+password, process.env.JWT_SECRET);
            res.json({ success: true, token });
          
        }else{
            res.json({ success: false, message: 'Invalid credentials' });
        }
        
        
    } catch (error) {

        console.log(error);
        res.json({ success: false, message: error.message || 'Internal server error' });
        
    }

}

export { loginUser, registerUser, adminLogin };