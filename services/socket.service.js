class SocketService {
    connection(socket) {
        console.log("socket", socket.id);
    }
}

export default new SocketService();
