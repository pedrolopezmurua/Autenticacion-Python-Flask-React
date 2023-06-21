"""
This module takes care of starting the API Server, Loading the DB and Adding the endpoints
"""
from flask import Flask, request, jsonify, url_for, Blueprint
from api.models import db, User
from api.utils import generate_sitemap, APIException
import datetime # necesito saber el tiempo que dura el token
from flask_jwt_extended import JWTManager, create_access_token, jwt_required, get_jwt_identity

api = Blueprint('api', __name__)


@api.route('/hello', methods=['POST', 'GET'])
def handle_hello():

    response_body = {
        "message": "Hello! I'm a message that came from the backend, check the network tab on the google inspector and you will see the GET request"
    }

    return jsonify(response_body), 200

@api.route("/geeks", methods=['GET'])
def geeks():
    return "Hello Geeks!"

@api.route('/signup', methods=['POST'])
def signup():
    email = request.json.get('email')
    password = request.json.get('password')
    if not email or not password:
        return jsonify({"message": "Email and password are required"}), 400
    
    #To check if user already exists in db
    user = User.query.filter_by(email=email).first()
    if user:
        return jsonify({"message": "User already exists"}), 409
    
    #To create new user
    new_user = User(email=email, password=password, is_active=True)
    db.session.add(new_user)
    db.session.commit()

    #To generate a new access token for the new user
    access_token = create_access_token(identity=email)
    return jsonify(access_token=access_token), 200

@api.route("/login", methods=["POST"])
def create_token():
    email = request.json.get("email", None)
    password = request.json.get("password", None)
    if email != "test" or password != "test":
        return jsonify({"msg": "Bad username or password"}), 401
    access_token = create_access_token(identity=email)  
    return jsonify(access_token=access_token)

@api.route('/private', methods=['GET'])
@jwt_required()
def private_message():
    email = get_jwt_identity()      
    private = {
        "message": email+ ", you have to power to see this secret message!! 👀"
    }
    return jsonify(private)
