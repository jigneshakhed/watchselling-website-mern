const mongoose = require('mongoose');
const User = require('./models/User');
const bcrypt = require('bcryptjs');
const dotenv = require('dotenv');

dotenv.config();

const createAdmin = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        const password = bcrypt.hashSync("admin123", 10);
        const newAdmin = new User({
            username: "debug_admin",
            email: "debug_admin@example.com",
            password: password,
            isAdmin: true
        });
        await newAdmin.save();
        console.log("Admin user created: debug_admin / admin123");
        process.exit(0);
    } catch (err) {
        if (err.code === 11000) {
            console.log("Admin user already exists.");
            process.exit(0);
        }
        console.error(err);
        process.exit(1);
    }
};

createAdmin();
