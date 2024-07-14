from playwright.sync_api import sync_playwright
import json


def scrape_tweet(url: str) -> dict:
    """
    Scrape a single tweet page for Tweet thread e.g.:
    https://twitter.com/Scrapfly_dev/status/1667013143904567296
    Return parent tweet, reply tweets and recommended tweets
    """
    _xhr_calls = []

    def intercept_response(response):
        """capture all background requests and save them"""
        # we can extract details from background requests
        if response.request.resource_type == "xhr":
            _xhr_calls.append(response)
        return response

    with sync_playwright() as pw:
        browser = pw.chromium.launch(headless=False)
        context = browser.new_context(viewport={"width": 1920, "height": 1080})
        page = context.new_page()

        # enable background request intercepting:
        page.on("response", intercept_response)
        # go to url and wait for the page to load
        page.goto(url)
        page.wait_for_selector("[data-testid='tweet']")

        # find all tweet background requests:
        tweet_calls = [f for f in _xhr_calls if "TweetResultByRestId" in f.url]
        for xhr in tweet_calls:
            data = xhr.json()
            print(json.dumps(data, indent=2))  # Print the whole JSON response for debugging

            # Check if 'result' key exists
            if 'data' in data and 'tweetResult' in data['data']:
                tweet_result = data['data']['tweetResult']
                if 'result' in tweet_result:
                    return tweet_result['result']
                else:
                    print("Key 'result' not found in 'tweetResult'")
            else:
                print("Keys 'data' or 'tweetResult' not found in JSON response")

    return {}
from playwright.sync_api import sync_playwright
import json
import re

def scrape_tweets_with_hashtag(hashtag):
    _xhr_calls = []

    def intercept_response(response):
        if response.request.resource_type == "xhr":
            _xhr_calls.append(response)
        return response

    with sync_playwright() as pw:
        browser = pw.chromium.launch(headless=False)
        context = browser.new_context(viewport={"width": 1920, "height": 1080})
        page = context.new_page()

        page.on("response", intercept_response)
        # Construct the URL to search for tweets with the hashtag
        hashtag_url = f"https://twitter.com/hashtag/{hashtag}?src=hashtag_click"

        page.goto(hashtag_url)
        page.wait_for_selector("[data-testid='tweet']")

        # Find all tweet background requests
        tweet_calls = [f for f in _xhr_calls if "TweetResultByRestId" in f.url]
        results = []

        for xhr in tweet_calls:
            data = xhr.json()

            # Check if 'data' contains tweet results
            if 'data' in data and 'tweetResult' in data['data']:
                tweet_result = data['data']['tweetResult']

                if 'result' in tweet_result:
                    for tweet in tweet_result['result']['timeline']['instructions']:
                        if 'entries' in tweet:
                            for entry in tweet['entries']:
                                if 'content' in entry and 'tweet' in entry['content']:
                                    tweet_data = entry['content']['tweet']
                                    tweet_text = tweet_data['legacy']['full_text']
                                    tweet_user = tweet_data['legacy']['user']['screen_name']
                                    tweet_time = tweet_data['legacy']['created_at']

                                    # Extract hashtags from tweet text
                                    hashtags = re.findall(r'#\w+', tweet_text)

                                    if any(hashtag.lower() == hashtag.lower() for hashtag in hashtags):
                                        results.append({
                                            'text': tweet_text,
                                            'user': tweet_user,
                                            'created_at': tweet_time,
                                            'hashtags': hashtags
                                        })

        browser.close()
        return results

if __name__ == "__main__":
    hashtag = 'fashiontrends'  # Replace with your desired hashtag
    tweets = scrape_tweets_with_hashtag(hashtag)
    
    for tweet in tweets:
        print(tweet)


if __name__ == "__main__":
    print(scrape_tweet("https://twitter.com/Scrapfly_dev/status/1664267318053179398"))
