from selenium import webdriver
from selenium.webdriver.chrome.service import Service
from selenium.webdriver.chrome.options import Options
from webdriver_manager.chrome import ChromeDriverManager
from bs4 import BeautifulSoup
import time

options = Options()
options.headless = True
driver = webdriver.Chrome(service=Service(ChromeDriverManager().install()), options=options)

url = 'https://www.instagram.com/explore/tags/fashiontrends/'
driver.get(url)

time.sleep(5)

for i in range(5):
    print(f"Scrolling {i+1}...")
    driver.execute_script("window.scrollTo(0, document.body.scrollHeight);")
    time.sleep(3)

soup = BeautifulSoup(driver.page_source, 'html.parser')
driver.quit()

posts = soup.find_all('div', class_='_aagw')
print(f"Number of posts found: {len(posts)}")

for index, post in enumerate(posts, 1):
    print(f"\nPost {index}:")
    img = post.find('img')
    if img:
        print(f"Caption: {img.get('alt', 'No caption')}")
        print(f"Image URL: {img.get('src', 'No image URL')}")
    
    video = post.find('video')
    if video:
        print("This is a video post")
        print(f"Video URL: {video.get('src', 'No video URL')}")

print("\nScraping completed.")
