import requests
from bs4 import BeautifulSoup
import re

url = 'https://www.fibre2fashion.com/industry-article/9076/36-best-current-fashion-trends'

# Make a GET request to fetch the raw HTML content
response = requests.get(url)

# Parse the HTML content using BeautifulSoup
soup = BeautifulSoup(response.content, 'html.parser')

# Extract all <h3> tags
h3_tags = soup.find_all('h3')

# Extract text content from <h3> tags and clean
trends = []
for h in h3_tags:
    text = h.get_text(strip=True)
    # Remove numbers and '.' using regular expressions
    cleaned_text = re.sub(r'[\d.]+', '', text)
    trends.append(cleaned_text.strip())

# Print the extracted trends
for trend in trends:
    print(trend)
