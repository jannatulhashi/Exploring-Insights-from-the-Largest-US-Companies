from flask import Flask, jsonify
import csv
import json

app = Flask(__name__)

@app.route('/', methods=['GET'])
def home():
    csv_file_path = 'Resources/company_data.csv'
    json_data = []

    with open(csv_file_path, 'r') as csv_file:
        csv_reader = csv.DictReader(csv_file)
        for row in csv_reader:
            json_data.append(row)

    # Save JSON data to a file named 'company_data.json'
    with open('company_data.json', 'w') as json_file:
        json.dump(json_data, json_file, indent=4)

    return jsonify(json_data)

if __name__ == '__main__':
    app.run(debug=True)
