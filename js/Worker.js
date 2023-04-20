class Worker {
    errors = 0;
    startTime = 0; // temps du debut d'un ping
    allPings = []; // List de tous les pings
    closed = false; // Doit etre fermé
    doneClosed = false // A finis d'etre fermé
    isConnected = false; // Est connecté au server
    id; // Id du worker
    ws; // Instance du socket

    constructor(id) {
        this.id=id;
        this.connect();
    }

    async connect() {}
    async work(){}
}