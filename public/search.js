const data = [
    { name: "example1" },
    { name: "example2" },
    { name: "example3" }
];

function performSearch() {
    var query = document.getElementById('search-box').value.toLowerCase();
    const searchResults = data.filter(item => {
        return (
            item.name.toLowerCase().includes(query)
        );
    });

    displayResults(searchResults);
}

function displayResults(results) {
    const resultsContainer = document.getElementById('search-results');
    resultsContainer.innerHTML = ""; // Clear previous results

    results.forEach(item => {
        const div = document.createElement('div');
        div.classList.add('result-item'); // Add result item class

        const textNode = document.createTextNode(item.name);
        div.appendChild(textNode);

        resultsContainer.appendChild(div);
    });
}

document.getElementById('search-box').addEventListener('input', performSearch);