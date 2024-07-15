import requests
from bs4 import BeautifulSoup
import json
import os
url = 'https://www.elle.com/fashion/trend-reports/'

# Make a GET request to fetch the raw HTML content
response = requests.get(url)

# Parse the HTML content using BeautifulSoup
soup = BeautifulSoup(response.content, 'html.parser')
items = soup.find_all('div', class_=lambda x: x and x.startswith('css'))

# Extract trends (example: titles of the trend articles)
new_trends = set()
for item in items:
    title_tag = item.find('h2', class_=lambda x: x and x.startswith('css'))
    if title_tag:
        title = title_tag.get_text(strip=True)
        new_trends.add(title)  # Add cleaned text to set

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
