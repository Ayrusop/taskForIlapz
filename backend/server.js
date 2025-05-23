const express = require('express');
const http = require('http');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');
const productRoutes = require('./routes/productRoutes');
dotenv.config();

const app = express();
const server = http.createServer(app); // needed for socket.io
const io = require('socket.io')(server, {
    cors: {
        origin: "*",
        methods: ["GET", "POST"]
    }
});

// Middlewares
app.use(cors());
app.use(express.json());

// Inject io into requests
app.use((req, res, next) => {
    req.io = io;
    next();
});

app.use('/api/products', productRoutes);

// DB + Start server
mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
}).then(() => {
    server.listen(5000, () => {
        console.log("Server running on http://localhost:5000");
    });
});

// Socket.IO basic connection logging
io.on('connection', (socket) => {
    console.log('Client connected:', socket.id);
    socket.on('disconnect', () => {
        console.log('Client disconnected:', socket.id);
    });
});
