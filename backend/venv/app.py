from flask import Flask, request, jsonify
from flask_pymongo import PyMongo
from werkzeug.security import generate_password_hash, check_password_hash
from flask_cors import CORS
import os
import pandas as pd
from datetime import datetime , timezone

app = Flask(__name__)
CORS(app)

# Update MongoDB URI with correct format and SSL options
app.config["MONGO_URI"] = "mongodb+srv://yeletinandureddy:Uh80tuahoHPHgnFb@cluster0.mavwpuw.mongodb.net/sustaintransport?retryWrites=true&w=majority"
mongo = PyMongo(app, tls=True, tlsAllowInvalidCertificates=True)

# Ensure the uploads directory exists
app.config['UPLOAD_FOLDER'] = './uploads'
os.makedirs(app.config['UPLOAD_FOLDER'], exist_ok=True)

@app.route('/')
def home():
    return "Hello from Flask"

@app.route('/register', methods=['POST'])
def register():
    data = request.get_json()
    if not data:
        return jsonify({'message': 'No input data provided'}), 400

    hashed_password = generate_password_hash(data['password'], method='sha256')
    if mongo.db.users.find_one({"username": data['username']}):
        return jsonify({"error": "Username already exists"}), 400

    mongo.db.users.insert_one({
        'name': data['name'],
        'email': data['email'],
        'password': hashed_password,
        'username': data['username'],
        'country': data['country'],
        'phone': data['phone'],
        'location': data['location']
    })
    return jsonify({'message': 'User registered successfully'})

@app.route('/login', methods=['POST'])
def login():
    data = request.get_json()
    user = mongo.db.users.find_one({'username': data['username']})
    if user and check_password_hash(user['password'], data['password']):
        return jsonify({'message': 'Login successful'})
    else:
        return jsonify({'message': 'Invalid credentials'})

@app.route('/shipments', methods=['GET'])
def get_shipments():
    date_str = request.args.get('date')
    if date_str:
        shipments = mongo.db.shipments.find({'date': date_str})
    else:
        shipments = mongo.db.shipments.find() 
    result = [{'from': s['from'], 'to': s['to'], 'weight': s['weight'], 'date': s['date']} for s in shipments]
    return jsonify(result)

@app.route('/upload', methods=['POST'])
def upload_file():
    if 'file' not in request.files:
        return jsonify({'message': 'No file part'}), 400
    file = request.files['file']
    if file.filename == '':
        return jsonify({'message': 'No selected file'}), 400
    if file:
        filename = os.path.join(app.config['UPLOAD_FOLDER'], file.filename)
        file.save(filename)
        try:
            df = pd.read_excel(filename, engine='openpyxl')  
            shipments = df.to_dict(orient='records')
            for shipment in shipments:
                shipment['date'] = shipment['date'].strftime('%Y-%m-%d')  # Convert date to string format
                mongo.db.shipments.insert_one(shipment)
        except Exception as e:
            return jsonify({'message': f'Error processing file: {e}'}), 500        
        return jsonify({'message': 'File uploaded successfully'})

if __name__ == '__main__':
    app.run(debug=True, host='0.0.0.0', port=5000)
