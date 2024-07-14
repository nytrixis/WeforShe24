import requests
from bs4 import BeautifulSoup
import re

# URL of the webpage containing various <h2> tags
url = 'https://www.glamour.com/story/2024-fashion-trends'

response = requests.get(url)

# Parse the HTML content using BeautifulSoup
soup = BeautifulSoup(response.content, 'html.parser')

# Extract all <h2> tags
h2_tags = soup.find_all('h2')

# Extract text content from <h2> tags
trends = []
for h2 in h2_tags:
    title = h2.get_text(strip=True)
    trends.append(title)
    cleaned_text = re.sub(r'[\d.]+', '', title)
    trends.append(cleaned_text.strip())

# Print the extracted trends
for trend in trends:
    print(trend)
