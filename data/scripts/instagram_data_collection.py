import json
import os

# Existing data in JSON format
fashion_trends = [
    ("Y2K Revival Fashion", ["Crop tops", "Low-rise jeans", "Mini skirts", "Butterfly clips"]),
    ("Oversized Suiting", ["Boxy blazers", "Wide-leg trousers", "Oversized shirts"]),
    ("Colorful Dopamine Dressing", ["Neon accessories", "Color-block dresses", "Vibrant suits"]),
    ("Sustainable and Ethical Fashion", ["Organic cotton tees", "Recycled polyester jackets", "Thrifted vintage pieces"]),
    ("Cutout Details in Clothing", ["Cutout dresses", "Tops with side cutouts", "High-waist cutout swimsuits"]),
    ("Elevated Loungewear", ["Silk pajama sets", "Cashmere sweatpants", "Luxe hoodies"]),
    ("Statement Collar Shirts", ["Peter Pan collars", "Exaggerated pointed collars", "Ruffled collars"]),
    ("Puff Sleeve Tops and Dresses", ["Balloon sleeve blouses", "Puff shoulder dresses", "Voluminous sleeve sweaters"]),
    ("Pastel Color Palettes", ["Lavender blazers", "Mint green dresses", "Pale yellow accessories"]),
    ("Monochromatic Outfits", ["All-white ensembles", "Tonal beige looks", "Head-to-toe black"]),
    ("Leather Accents", ["Leather trousers", "Faux leather shirts", "Leather-trimmed coats"]),
    ("Sheer and Transparent Fabrics", ["Mesh tops", "Organza dresses", "See-through accessories"]),
    ("Chunky Platform Shoes", ["Platform sneakers", "Chunky loafers", "Elevated sandals"]),
    ("Micro Bags and Purses", ["Mini crossbody bags", "Tiny top-handle purses", "Belt bags"]),
    ("Tie-Dye Patterns", ["Tie-dye t-shirts", "Dip-dyed dresses", "Psychedelic print accessories"]),
    ("Neon Accessories", ["Fluorescent belts", "Bright neon bags", "Highlighter-hued jewelry"]),
    ("Retro Prints", ["Geometric patterns", "70s-inspired florals", "Vintage-style graphics"]),
    ("Corset Tops", ["Structured bodices", "Lace-up details", "Boned tops"]),
    ("Wide-Leg Trousers", ["Palazzo pants", "Flared jeans", "Culotte-style shorts"]),
    ("Biker Shorts", ["Cycling shorts", "Spandex shorts", "Athleisure bottoms"])
]

# Function to append new trends to an existing JSON file, avoiding duplicates
def append_to_json(new_trends):
    output_file = 'trends.json'

    # Check if JSON file already exists
    if os.path.exists(output_file):
        # Read existing JSON data
        with open(output_file, 'r') as f:
            existing_data = json.load(f)
    else:
        existing_data = []

    # Convert existing_data to a set for faster lookup
    existing_trends = set(existing_data)

    # Combine existing data with new data, avoiding duplicates
    combined_data = list(existing_trends.union(new_trends))

    # Write combined data back to the file
    with open(output_file, 'w') as f:
        json.dump(combined_data, f, indent=4)

# Prepare new trends set from fashion_trends list
new_trends = set()
for trend, items in fashion_trends:
    for item in items:
        cleaned_text = item.strip()
        new_trends.add(cleaned_text)

# Append new trends to JSON file
append_to_json(new_trends)
