const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');

const path = require('path');
const multer = require('multer');

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Multer Storage Configuration
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/');
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + '-' + file.originalname);
    }
});
const upload = multer({ storage: storage });

// Middleware
app.use(cors());
app.use(express.json());
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Upload Route
app.post('/api/upload', upload.single('file'), (req, res) => {
    res.status(200).json(req.file.filename);
});

// Database Connection
mongoose.connect(process.env.MONGO_URI)
    .then(() => console.log('MongoDB Connected'))
    .catch(err => console.log(err));

// Routes
app.use('/api/auth', require('./routes/auth'));
app.use('/api/products', require('./routes/products'));
app.use('/api/orders', require('./routes/orders'));
app.use('/api/users', require('./routes/users'));
app.use('/api/contacts', require('./routes/contacts'));
app.use('/api/reviews', require('./routes/reviews'));
app.use('/api/categories', require('./routes/categories'));
app.use('/api/payment', require('./routes/payment'));
app.use('/api/payments', require('./routes/payments'));

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
