document.addEventListener('DOMContentLoaded', () => {
    const fetchButton = document.getElementById('fetch-items');
    const apiResults = document.getElementById('api-results');

    if (fetchButton) {
        fetchButton.addEventListener('click', async () => {
            try {
                const response = await fetch('/api/items');
                const data = await response.json();

                let html = '<h4>Items from API:</h4><ul>';
                data.items.forEach(item => {
                    html += `
                        <li>
                            <strong>${item.name}</strong>
                            <p>${item.description || 'No description'}</p>
                        </li>
                    `;
                });
                html += '</ul>';

                apiResults.innerHTML = html;
            } catch (error) {
                apiResults.innerHTML = `<p class="error">Error: ${error.message}</p>`;
            }
        });
    }
}); 