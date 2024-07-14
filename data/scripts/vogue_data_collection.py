import requests
from bs4 import BeautifulSoup

# URL of the Vogue trends page
url = 'https://www.vogue.com/fashion/trends'

# Make a GET request to fetch the raw HTML content
response = requests.get(url)

# Parse the HTML content using BeautifulSoup
soup = BeautifulSoup(response.content, 'html.parser')

# Extract trends (example: titles of the trend articles)
trends = []
for item in soup.find_all('div', class_='feed__item--container'):
    title = item.find('h2', class_='feed__title').get_text(strip=True)
    trends.append(title)

# Print the extracted trends
for trend in trends:
    print(trend)
