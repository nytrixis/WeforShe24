import requests
from bs4 import BeautifulSoup

# URL of the Vogue trends page
url = 'https://www.vogue.com/fashion/trends'

# Make a GET request to fetch the raw HTML content
response = requests.get(url)

# Parse the HTML content using BeautifulSoup
soup = BeautifulSoup(response.content, 'html.parser')

# Find the carousel list items
carousel_items = soup.find_all('li', class_=lambda x: x and x.startswith('CarouselListItem'))

# Extract trends (example: titles of the trend articles)
trends = []
for item in carousel_items:
    title_tag = item.find('h3', class_='SummaryItemHedBase-hiFYpQ kGcDd summary-item__hed')
    if title_tag:
        title = title_tag.get_text(strip=True)
        trends.append(title)

# Print the extracted trends
for trend in trends:
    print(trend)
