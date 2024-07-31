import requests
from bs4 import BeautifulSoup
import json

# Step 1: Fetch the webpage content
url = "https://namu.wiki/w/끄투/한국어/긴%20단어"
response = requests.get(url)
response.raise_for_status()  # Ensure the request was successful

# Step 2: Parse the HTML content using BeautifulSoup
soup = BeautifulSoup(response.text, 'html.parser')

# Step 3: Find the data you need
# For example, let's assume the long words are in a specific section of the page
# You'll need to adjust these selectors based on the actual HTML structure of the page
long_words_section = soup.find("div", {"class": "wiki-paragraph"})

# Extract the words
long_words = [word.get_text(strip=True) for word in long_words_section.find_all("li")]

# Step 4: Save the data to a JSON file
data = {
    "long_words": long_words
}

with open('data.json', 'w', encoding='utf-8') as json_file:
    json.dump(data, json_file, ensure_ascii=False, indent=4)

print("Data has been saved to data.json")