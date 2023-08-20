import csv
import json
import os

# Define paths
BASE_DIR = os.path.dirname(os.path.abspath(__file__))
INPUT_PATH = os.path.join(BASE_DIR, "Resources", "company_data.csv")
OUTPUT_PATH = os.path.join(BASE_DIR, "company_data.geojson")

def csv_to_geojson(input_file, output_file):
    try:
        # Read the CSV and convert to GeoJSON format
        features = []
        with open(input_file, 'r') as csvfile:
            reader = csv.DictReader(csvfile)

            # Check if required columns exist
            if 'lat' not in reader.fieldnames or 'long' not in reader.fieldnames:
                raise ValueError("CSV does not contain required 'lat' or 'long' columns")

            for row in reader:
                try:
                    latitude, longitude = float(row['lat']), float(row['long'])
                except ValueError:
                    print(f"Warning: Skipping row due to invalid lat or long values: {row}")
                    continue
                
                feature = {
                    "type": "Feature",
                    "geometry": {
                        "type": "Point",
                        "coordinates": [longitude, latitude]
                    },
                    "properties": {k: v for k, v in row.items()}
                }
                del feature["properties"]["lat"]
                del feature["properties"]["long"]

                features.append(feature)

        geojson = {
            "type": "FeatureCollection",
            "features": features
        }

        # Write the GeoJSON to an output file
        with open(output_file, 'w') as outfile:
            json.dump(geojson, outfile)
        
        print(f"GeoJSON saved to {output_file}")

    except Exception as e:
        print(f"Error: {e}")

# Usage
csv_to_geojson(INPUT_PATH, OUTPUT_PATH)
