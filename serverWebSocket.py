import json
import asyncio
from fastapi import FastAPI
from fastapi import Request
from fastapi import WebSocket


app = FastAPI()
print("start");

@app.websocket("/ws")
async def websocket_endpoint(websocket: WebSocket):
    print("accept")
    await websocket.accept()
    while True:
        payload = await websocket.receive_text();
        await websocket.send_text(payload)

