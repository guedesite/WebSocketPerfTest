class webSocketWorker extends Worker{

    async connect() {
        this.ws =  new WebSocket("ws://localhost:8000/ws");
        this.ws.addEventListener('close', async (event) => {
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
        new Promise((resolve) => {
            this.ws.onopen = () => {
                resolve();
                this.isConnected = true;
            };
        });
    }

    async work() {
        const instance = this;
        this.ws.onmessage = function(event) {
            if(performance.now()-instance.startTime >0.1) {
                instance.allPings.push(performance.now() - instance.startTime);
                if (!instance.closed) {
                    instance.startTime = performance.now();
                    instance.ws.send(String(instance.startTime));
                } else {
                    instance.ws.close();
                    instance.doneClosed = true;
                }
            }
        }
        this.startTime = performance.now();
        this.ws.send(String(this.startTime));
    }


}