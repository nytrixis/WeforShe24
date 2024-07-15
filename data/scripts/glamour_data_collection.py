import requests
from bs4 import BeautifulSoup
import re
import json
import os

# URL of the webpage containing various <h2> tags
url = 'https://www.glamour.com/story/2024-fashion-trends'

response = requests.get(url)

# Parse the HTML content using BeautifulSoup
soup = BeautifulSoup(response.content, 'html.parser')

# Extract all <h2> tags
h2_tags = soup.find_all('h2')

# Extract text content from <h2> tags
new_trends = set()
for h2 in h2_tags:
    title = h2.get_text(strip=True)
    cleaned_text = re.sub(r'[\d.]+', '', title)
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
