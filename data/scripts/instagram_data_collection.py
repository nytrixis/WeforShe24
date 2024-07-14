import instaloader

# Create an instance of Instaloader
loader = instaloader.Instaloader()

# Fetch posts with a specific hashtag
def fetch_instagram_posts(hashtag):
    posts = []
    for post in loader.get_hashtag_posts(hashtag):
        posts.append({
            'username': post.owner_username,
            'caption': post.caption,
            'likes': post.likes,
            'comments': post.comments,
            'timestamp': post.date_utc,
            'media_url': post.url
        })
    return posts

# Example usage
if __name__ == '__main__':
    hashtag = 'fashiontrends'
    posts = fetch_instagram_posts(hashtag)
    for post in posts:
        print(post)
