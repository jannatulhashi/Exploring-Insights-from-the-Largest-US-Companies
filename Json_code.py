import csv
import json

# Open the CSV file for reading
csv_file_path = 'Resources/company_data.csv' 


# Replace with the path to your CSV file
json_file_path = 'company_data.json'

# Replace with the desired output JSON file path
data = []

# Read the CSV file and convert it to a list of dictionaries  

with open(csv_file_path, 'r') as csv_file:
    csv_reader = csv.DictReader(csv_file)


#convert each row into a dictionary
#and add the converted data to the data variable

    for row in csv_reader:
        data.append(row)

# Write the JSON data to a file

with open(json_file_path, 'w') as json_file:
     
    # Use indent for pretty formatting 
    json.dump(data, json_file, indent=4) 

