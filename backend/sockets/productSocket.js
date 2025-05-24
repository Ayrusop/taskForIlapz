let ioInstance = null;

const handleProductSocket = (io) => {
    ioInstance = io;

    io.on('connection', (socket) => {
        console.log('Client connected:', socket.id);

        socket.on('disconnect', () => {
            console.log('Client disconnected:', socket.id);
        });
    });
};


const emitProductCreated = (product) => {
    if (ioInstance) {
        ioInstance.emit('productCreated', product);
    }
};

const emitProductUpdated = (product) => {
    if (ioInstance) {
        ioInstance.emit('productUpdated', product);
    }
};
module.exports = {
    handleProductSocket,
    emitProductCreated,
    emitProductUpdated
};
