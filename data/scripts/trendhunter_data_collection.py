import requests
from bs4 import BeautifulSoup
import re

# URL of the Vogue trends page
url = 'https://www.trendhunter.com/slideshow/july-2024-fashion'

# Make a GET request to fetch the raw HTML content
response = requests.get(url)

# Parse the HTML content using BeautifulSoup
soup = BeautifulSoup(response.content, 'html.parser')

tags = soup.find_all('div', class_='thar__title1')

# Extract text content from <h3> tags and clean
trends = []
for t in tags:
    text = t.get_text(strip=True)
    # Remove numbers and '.' using regular expressions
    cleaned_text = re.sub(r'[\d.]+', '', text)
    trends.append(cleaned_text.strip())

# Print the extracted trends
for trend in trends:
    print(trend)
