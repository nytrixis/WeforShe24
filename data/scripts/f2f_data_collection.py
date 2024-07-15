import requests
from bs4 import BeautifulSoup
import re
import json
import os
url = 'https://www.fibre2fashion.com/industry-article/9076/36-best-current-fashion-trends'

# Make a GET request to fetch the raw HTML content
response = requests.get(url)

# Parse the HTML content using BeautifulSoup
soup = BeautifulSoup(response.content, 'html.parser')

# Extract all <h3> tags
h3_tags = soup.find_all('h3')

# Extract text content from <h3> tags and clean
new_trends = set()
for h in h3_tags:
    text = h.get_text(strip=True)
    # Remove numbers and '.' using regular expressions
    cleaned_text = re.sub(r'[\d.]+', '', text)
    new_trends.add(cleaned_text)  # Add cleaned text to set

# Output JSON file
output_file = 'trends.json'

# Check if JSON file already exists
if os.path.exists(output_file):
    # Read existing JSON data
    with open(output_file, 'r') as f:
        existing_data = json.load(f)
else:
    existing_data = []

# Convert existing_data to a set for faster lookup
existing_trends = set(existing_data)

# Combine existing data with new data, avoiding duplicates
combined_data = list(existing_trends.union(new_trends))

# Write combined data back to the file
with open(output_file, 'w') as f:
    json.dump(combined_data, f, indent=4)
