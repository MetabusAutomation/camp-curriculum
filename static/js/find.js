document.addEventListener('DOMContentLoaded', function () {
    // Add focus area functionality
    const addFocusBtn = document.getElementById('add-focus');
    const focusContainer = document.getElementById('secondary-foci-container');

    // Add a new focus area
    addFocusBtn.addEventListener('click', function () {
        const focusEntry = document.createElement('div');
        focusEntry.className = 'focus-entry';
        focusEntry.innerHTML = `
            <input type="text" class="focus-input" placeholder="e.g., Outdoor Activities">
            <button type="button" class="btn-remove-focus">✕</button>
        `;
        focusContainer.appendChild(focusEntry);

        // Focus the new input
        focusEntry.querySelector('input').focus();
    });

    // Remove focus area (delegated event)
    focusContainer.addEventListener('click', function (e) {
        if (e.target.classList.contains('btn-remove-focus')) {
            e.target.closest('.focus-entry').remove();
        }
    });

    // Save/Delete activity functionality
    const newResults = document.getElementById('new-results');
    const savedResults = document.getElementById('saved-results');

    // Save activity to saved list
    newResults.addEventListener('click', function (e) {
        if (e.target.classList.contains('btn-save-activity')) {
            const resultItem = e.target.closest('.activity-result-item');
            const resultContent = resultItem.querySelector('.result-content').cloneNode(true);

            const savedItem = document.createElement('li');
            savedItem.className = 'activity-result-item';
            savedItem.appendChild(resultContent);

            const deleteBtn = document.createElement('button');
            deleteBtn.className = 'btn-delete-activity';
            deleteBtn.textContent = 'Delete';
            savedItem.appendChild(deleteBtn);

            savedResults.appendChild(savedItem);
            resultItem.remove();
        }
    });

    // Delete activity from saved list
    savedResults.addEventListener('click', function (e) {
        if (e.target.classList.contains('btn-delete-activity')) {
            e.target.closest('.activity-result-item').remove();
        }
    });

    // Form submission handler
    document.getElementById('camp-settings-form').addEventListener('submit', function (e) {
        e.preventDefault();

        // Gather form data
        const minAge = document.getElementById('min-age').value;
        const maxAge = document.getElementById('max-age').value;
        const majorTheme = document.getElementById('major-theme').value;
        const focusInputs = document.querySelectorAll('.focus-input');
        const secondaryFoci = Array.from(focusInputs).map(input => input.value).filter(val => val.trim() !== '');

        // Here you would normally send this data to the server
        console.log('Saving camp settings:', {
            ageRange: { min: minAge, max: maxAge },
            majorTheme,
            secondaryFoci
        });

        // Show success message
        const successMsg = document.createElement('div');
        successMsg.className = 'alert alert-success';
        successMsg.textContent = 'Camp settings saved successfully!';

        this.parentNode.insertBefore(successMsg, this);

        // Remove message after 3 seconds
        setTimeout(() => {
            successMsg.remove();
        }, 3000);
    });

    // Find New Ideas button functionality
    document.getElementById('find-ideas-btn').addEventListener('click', function () {
        alert('Not Implemented: This feature will be available in a future update.');
    });
}); 