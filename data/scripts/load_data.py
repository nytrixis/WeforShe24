import json

# Path to your JSON file containing scraped data
json_file = 'trends.json'

def load_data(json_file):
    with open(json_file, 'r', encoding='utf-8') as f:
        data = json.load(f)
    return data

# Load the scraped data
scraped_data = load_data(json_file)

# Display a sample of the loaded data
print(f"Number of scraped data entries: {len(scraped_data)}")
print("Sample of scraped data:")
for idx, entry in enumerate(scraped_data[:5]):  # Print first 5 entries for example
    print(f"{idx + 1}. {entry}")
