import requests
from bs4 import BeautifulSoup
import json

# URL of the page to scrape
url = "https://namu.wiki/w/끄투/한국어/긴%20단어"

# Fetch the page content
response = requests.get(url)
response.encoding = 'utf-8'  # Ensure correct encoding
page_content = response.text

# Parse the HTML content
soup = BeautifulSoup(page_content, 'html.parser')

# Find the section containing the long words
sections = soup.find_all('div', class_='wiki-heading-content')

# Dictionary to store the words by their initial characters
words_dict = {}

for section in sections:
    # Each section is a list of lines, we need to filter out the relevant ones
    lines = section.get_text().splitlines()
    
    # Clean up the lines and add them to the dictionary
    current_initial = None
    for line in lines:
        # Ignore empty lines or irrelevant data
        if not line.strip():
            continue
        
        # Determine if the line is a header (e.g., [가], [각])
        if line.startswith('[') and line.endswith(']'):
            current_initial = line[1:-1]
            words_dict[current_initial] = []
        elif current_initial:
            # Add the word to the current initial's list
            words_dict[current_initial].append(line)

# Save the dictionary to a JSON file
with open('data.json', 'w', encoding='utf-8') as f:
    json.dump(words_dict, f, ensure_ascii=False, indent=4)

print("Data has been scraped and saved to data.json")