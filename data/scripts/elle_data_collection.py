import requests
from bs4 import BeautifulSoup

url = 'https://www.elle.com/fashion/trend-reports/'

# Make a GET request to fetch the raw HTML content
response = requests.get(url)
print(f"Status code: {response.status_code}")
print(f"Content length: {len(response.content)}")

# Parse the HTML content using BeautifulSoup
soup = BeautifulSoup(response.content, 'html.parser')
items = soup.find_all('div', class_=lambda x: x and x.startswith('css'))
print(f"Number of items found: {len(items)}")

# Extract trends (example: titles of the trend articles)
trends = []
for item in items:
    title_tag = item.find('h2', class_=lambda x: x and x.startswith('css'))
    if title_tag:
        title = title_tag.get_text(strip=True)
        trends.append(title)

# Print the extracted trends
for trend in trends:
    print(trend)
