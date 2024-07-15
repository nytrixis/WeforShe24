import requests
from bs4 import BeautifulSoup
import re
import json
import os

# URL of the Vogue trends page
url = 'https://www.trendhunter.com/slideshow/july-2024-fashion'

# Make a GET request to fetch the raw HTML content
response = requests.get(url)

# Parse the HTML content using BeautifulSoup
soup = BeautifulSoup(response.content, 'html.parser')

tags = soup.find_all('div', class_='thar__title1')

# Extract text content from <h3> tags and clean
new_trends = set()
for t in tags:
    text = t.get_text(strip=True)
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
