import multiprocessing
import uvicorn
import serverFullWebSocket

def run_socket_io_server():
    uvicorn.run("serverSocketIO:app", host="0.0.0.0", port=8001, log_level="info", reload=True)

def run_websocket_server():
    uvicorn.run("serverWebSocket:app", host="0.0.0.0", port=8000, log_level="info", reload=True)

if __name__ == "__main__":
    socket_io_process = multiprocessing.Process(target=run_socket_io_server)
    websocket_process = multiprocessing.Process(target=run_websocket_server)
    full_websocket_process = multiprocessing.Process(target=serverFullWebSocket.run_server)

    socket_io_process.start()
    websocket_process.start()
    full_websocket_process.start()

    socket_io_process.join()
    websocket_process.join()
    full_websocket_process.join()