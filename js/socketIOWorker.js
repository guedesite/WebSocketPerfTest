
class socketIOWorker extends Worker{

    async connect() {
        this.ws = io("http://localhost:8001");
        this.ws.on('disconnect', (reason) => {
            this.isConnected = false;
            if (!this.closed) {
                this.errors++;
                this.connect();
                let int = setInterval(() => {
                    if(!this.isConnected) {
                        return;
                    }
                    this.work();
                    clearInterval(int);
                },100);
            }
        });
        return new Promise((resolve) => {
            this.ws.on("connect", () => {
                this.isConnected = true;
                resolve();
            });
        });
    }

    async work() {
        const instance = this;
        this.ws.on("message", (event) => {
            if(performance.now()-instance.startTime >0.1) {
                instance.allPings.push(performance.now() - instance.startTime);
                if (!instance.closed) {
                    instance.startTime = performance.now();
                    instance.ws.emit("message", String(instance.startTime));
                } else {
                    instance.ws.disconnect();
                    instance.doneClosed = true;
                }
            }
        });

        this.startTime = performance.now();
        this.ws.emit("message", String(this.startTime));
    }
}