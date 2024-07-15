import json
import os
import sys
import random
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.metrics.pairwise import cosine_similarity
import google.generativeai as genai

# Get the directory of the current script
script_dir = os.path.dirname(os.path.abspath(__file__))

# Construct the full path to trends.json
trends_file = os.path.join(script_dir, 'trends.json')

with open(trends_file, 'r') as file:
    trends_data = json.load(file)

def preprocess_trends(trends):
    return [trend.lower() for trend in trends]

preprocessed_trends = preprocess_trends(trends_data)

vectorizer = TfidfVectorizer()
X = vectorizer.fit_transform(preprocessed_trends)

genai.configure(api_key='AIzaSyAG5jUo-0hy_0QTrWkkUjdTUPiH59CzikQ')
model = genai.GenerativeModel('gemini-pro')

def get_gemini_response(prompt):
    response = model.generate_content(prompt)
    return response.text

def get_response(user_input):
    user_vector = vectorizer.transform([user_input.lower()])
    similarities = cosine_similarity(user_vector, X).flatten()
    top_indices = similarities.argsort()[-5:][::-1]  # Get top 5 similar trends
    selected_trends = [trends_data[i] for i in top_indices]
    num_trends = random.randint(1, 3)
    selected_trends = random.sample(selected_trends, num_trends)
    
    trends_text = "\n".join(selected_trends)

    # Get detailed response from Gemini
    gemini_prompt = f"Provide best complying dresses, apparels and accessories about this fashion trend, do not exceed more than 200 words:\n{trends_text}"
    detailed_response = get_gemini_response(gemini_prompt)
    cleaned_response = detailed_response.replace('*', '')
    
    return f"Trend: {trends_text}\n\nSure! You could look through these:\n{cleaned_response}"

if __name__ == "__main__":
    if len(sys.argv) > 1:
        user_input = sys.argv[1]
        response = get_response(user_input)
        print(response)
    else:
        print("No input provided")
        sys.exit(1)
