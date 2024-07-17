let data = []; // Global variable to store data

async function fetchData() {
    try {
        const response = await fetch('data.json');
        data = await response.json();
        performSearch(); // Initial search when data is loaded
    } catch (error) {
        console.error('Error fetching data:', error);
    }
}

function performSearch() {
    var query = document.getElementById('search-box').value.toLowerCase();

    const searchResults = data.filter(item => {
        // Check if any value matches the query
        for (let key in item) {
            if (item[key].toLowerCase().includes(query)) {
                return true;
            }
        }
        return false;
    });

    displayResults(searchResults);
}

function displayResults(results) {
    const resultsContainer = document.getElementById('search-results');
    resultsContainer.innerHTML = ""; // Clear previous results

    results.forEach(item => {
        for (let key in item) {
            const div = document.createElement('div');
            div.classList.add('result-item'); // Add result item class

            const textNode = document.createTextNode(item[key]);
            div.appendChild(textNode);

            resultsContainer.appendChild(div);
        }
    });
}

document.getElementById('search-box').addEventListener('input', performSearch);

fetchData(); // Initialize data fetching when the page is loaded