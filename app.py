from flask import Flask, jsonify, render_template
import csv
import json

app = Flask(__name__)

# Load JSON data from 'company_data.json' file
with open('company_data.json', 'r') as json_file:
    json_data = json.load(json_file)

# Load GeoJSON data from 'GeoObs.json' file
with open('company_data.geojson', 'r') as geojson_file:
    geojson_data = json.load(geojson_file)

@app.route('/api/json', methods=['GET'])
def get_json():
    return jsonify(json_data)

@app.route('/api/geojson', methods=['GET'])
def get_geojson():
    return jsonify(geojson_data)

@app.route('/', methods=['GET'])
def index():
    return render_template('index.html', json_data=json_data, geojson_data=geojson_data)

if __name__ == '__main__':

    # Print the URLs to the terminal
    print("JSON URL: http://127.0.0.1:5000/api/json")
    print("GeoJSON URL: http://127.0.0.1:5000/api/geojson")
    
    app.run(debug=True)
