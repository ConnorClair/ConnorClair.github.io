// server.js
const PORT = process.env.PORT || 3002;
const express = require('express');
const http = require('http');
const socketIo = require('socket.io');
const path = require('path');

const app = express();
const server = http.createServer(app);
const io = socketIo(server);

// Serve static files from the 'public' directory
app.use(express.static(path.join(__dirname, 'public')));

// Socket.io connection handling
io.on('connection', (socket) => {
    console.log('Client connected');

    // Handle receiving camera stream from client
    socket.on('cameraStream', (stream) => {
        // Broadcast the stream to all clients except the sender
        socket.broadcast.emit('cameraStream', stream);
    });

    // Handle disconnection
    socket.on('disconnect', () => {
        console.log('Client disconnected');
    });
});

// Serve index.html as the default page
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Serve display.html for the display page
app.get('/display', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'display.html'));
});

// Start the server
server.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
