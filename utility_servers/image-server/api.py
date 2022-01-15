from crypt import methods
import flask
from flask_cors import CORS, cross_origin
from flask import jsonify,request
import json
from cloud_object_storage_api import COS
from endpoints import COS_API_KEY_ID, COS_ENDPOINT, COS_INSTANCE_CRN, BUCKET_NAME, BUCKET_BTL

app = flask.Flask(__name__)
CORS(app)

app.config["DEBUG"] = True

cos = COS(
    COS_ENDPOINT,
    COS_API_KEY_ID,
    COS_INSTANCE_CRN
).get_instance()

@app.route('/image/get/<id>')
def get(id):
    file = cos.get_item(BUCKET_NAME,id)
    response = {"image":"-1"}
    if file:
        response = {
            "image":json.loads(file)            
        }    
    
    response = jsonify(response)
    response.headers.add('Access-Control-Allow-Origin', "*")
    return response


@app.route('/image/get/<id>', methods=["PUT"])
def upsert_image(id):
    re = request.data
    cos.create_text_file(BUCKET_NAME, id, re)
    return "ok"

@app.route('/image/post/put/<id>', methods = ['PUT'])
def upsert_post_image(id):
    re = request.data
    cos.create_text_file(BUCKET_BTL, id, re)
    return "ok"

@app.route('/image/post/get/<id>')
def get_post_image(id):
    file = cos.get_item(BUCKET_BTL,id)
    response = {"image":"-1"}
    if file:
        response = {
            "image":json.loads(file)            
        }    
    
    response = jsonify(response)
    response.headers.add('Access-Control-Allow-Origin', "*")
    return response

app.run(host="192.168.100.215", port = "8090", threaded = True)



