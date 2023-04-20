import socketio
from fastapi import FastAPI
from fastapi import Request
from fastapi import WebSocket

sio = socketio.AsyncServer(async_mode='asgi', cors_allowed_origins="*")
app = FastAPI()
app.mount("/", socketio.ASGIApp(sio))

@sio.event
async def message(sid, data):
    await sio.emit("message", data)

