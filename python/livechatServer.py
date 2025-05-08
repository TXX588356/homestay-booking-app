from flask import Flask, render_template
from flask_socketio import SocketIO, emit
from datetime import datetime
import json

app = Flask(__name__)
app.config['SECRET_KEY'] = 'secret'
socketio = SocketIO(app)

@app.route('/chat')
def sessions():
    return render_template('index.html')

@socketio.on('connect', namespace='/chat')
def handle_connect_chat():
    print('A client connected')

@socketio.on('mobile_client_connected', namespace='/chat')
def handle_mobile_connected(json_data):
    print("Mobile client connected:", json_data['connected'])
    return 'noticed'

@socketio.on('web_client_connected', namespace='/chat')
def handle_web_connected(json_data):
    print("Admin client connected:", json_data['connected'])

@socketio.on('message_sent', namespace='/chat')
def handle_message_sent(json_data):
    sender = json_data['sender']
    message = json_data['message']
    data = {
        'timestamp': str(datetime.now()),
        'sender': sender,
        'message': message,
    }
    print(f"Message from {sender}: {message}")
    emit('message_broadcast', json.dumps(data), broadcast=True)

if __name__ == '__main__':
    socketio.run(app, debug=True)
