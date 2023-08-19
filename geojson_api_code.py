from flask import Flask, jsonify
import json

app = Flask(__name__)

#Load the geojson file

with open('GeoObs.json') as geojson_file:
    geojson_data = json.load(geojson_file)

@app.route('/api/geojson',
methods=['GET'])

def get_geojson():
    return jsonify(geojson_data)

if __name__ == '__main__':
    app.run(debug=True)
