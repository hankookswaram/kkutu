async function performSearch() {
    const query = document.getElementById('search-box').value;

    if (query.trim() === "") {
        alert("Please enter a search query.");
        return;
    }

    try {
        const response = await fetch('/search?query=' + encodeURIComponent(query));
        const results = await response.json();
        
        displayResults(results);
    } catch (error) {
        console.error('Error:', error);
    }
}

function displayResults(results) {
    const resultsContainer = document.getElementById('search-results');
    resultsContainer.innerHTML = '';

    if (results.length === 0) {
        resultsContainer.innerHTML = '<p>No results found.</p>';
        return;
    }

    const list = document.createElement('ul');
    results.forEach(item => {
        const listItem = document.createElement('li');
        listItem.textContent = item.name; // Adjust this to match your data structure
        list.appendChild(listItem);
    });
    resultsContainer.appendChild(list);
}