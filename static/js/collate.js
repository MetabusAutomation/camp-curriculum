document.addEventListener('DOMContentLoaded', function () {
    // Get all checkboxes and selectable items
    const checkboxes = document.querySelectorAll('.activity-checkbox');
    const selectableItems = document.querySelectorAll('.selectable-item');

    // Make entire item row clickable (except for input fields)
    selectableItems.forEach(item => {
        item.addEventListener('click', function (e) {
            // Don't toggle if clicking on input fields
            if (e.target.tagName === 'INPUT') {
                return;
            }

            const checkbox = this.querySelector('.activity-checkbox');
            checkbox.checked = !checkbox.checked;

            // Update selected state
            updateSelectedState(this);
        });
    });

    // Update selected state when checkbox is clicked directly
    checkboxes.forEach(checkbox => {
        checkbox.addEventListener('change', function () {
            const item = this.closest('.selectable-item');
            updateSelectedState(item);
        });
    });

    // Handle select all button
    const selectAllBtn = document.getElementById('select-all');
    if (selectAllBtn) {
        selectAllBtn.addEventListener('click', function () {
            checkboxes.forEach(checkbox => {
                checkbox.checked = true;
                updateSelectedState(checkbox.closest('.selectable-item'));
            });
        });
    }

    // Handle deselect all button
    const deselectAllBtn = document.getElementById('deselect-all');
    if (deselectAllBtn) {
        deselectAllBtn.addEventListener('click', function () {
            checkboxes.forEach(checkbox => {
                checkbox.checked = false;
                updateSelectedState(checkbox.closest('.selectable-item'));
            });
        });
    }

    // Make number inputs increment/decrement on arrow keys
    const numberInputs = document.querySelectorAll('input[type="number"]');
    numberInputs.forEach(input => {
        input.addEventListener('keydown', function (e) {
            const value = parseInt(this.value) || 0;
            const min = parseInt(this.min) || 0;
            const max = parseInt(this.max) || Infinity;

            if (e.key === 'ArrowUp') {
                this.value = Math.min(value + 1, max);
                e.preventDefault();
            } else if (e.key === 'ArrowDown') {
                this.value = Math.max(value - 1, min);
                e.preventDefault();
            }
        });

        // Stop click propagation on number inputs to prevent toggling checkbox
        input.addEventListener('click', function (e) {
            e.stopPropagation();
        });
    });

    // Handle collate button
    const generateDocBtn = document.getElementById('generate-document');
    if (generateDocBtn) {
        generateDocBtn.addEventListener('click', function () {
            const selectedActivities = getSelectedActivities();
            if (selectedActivities.length === 0) {
                showAlert('Please select at least one activity to collate.', 'warning');
                return;
            }

            // Future functionality will be implemented here
            showAlert('Collate functionality is not implemented yet. Selected activities: ' + selectedActivities.length, 'warning');
            console.log('Selected activities:', selectedActivities);
        });
    }

    // Handle export materials button
    const exportMaterialsBtn = document.getElementById('export-materials');
    if (exportMaterialsBtn) {
        exportMaterialsBtn.addEventListener('click', function () {
            showAlert('Export functionality is not implemented yet.', 'warning');
        });
    }

    /**
     * Update the selected state of an item based on its checkbox
     * @param {Element} item - The selectable item element
     */
    function updateSelectedState(item) {
        const checkbox = item.querySelector('.activity-checkbox');
        if (checkbox.checked) {
            item.classList.add('selected');
        } else {
            item.classList.remove('selected');
        }
    }

    /**
     * Get all selected activities with their planning data
     * @returns {Array} Array of selected activity objects with planning data
     */
    function getSelectedActivities() {
        const selectedItems = document.querySelectorAll('.selectable-item .activity-checkbox:checked');
        const activities = [];

        selectedItems.forEach(checkbox => {
            const item = checkbox.closest('.selectable-item');
            const activityName = item.querySelector('.activity-name').textContent;
            const activityMeta = item.querySelector('.activity-meta').textContent;
            const occurrences = parseInt(item.querySelector('.occurrences-input').value) || 1;
            const campers = parseInt(item.querySelector('.campers-input').value) || 20;

            activities.push({
                name: activityName,
                meta: activityMeta,
                occurrences: occurrences,
                campers: campers
            });
        });

        return activities;
    }

    /**
     * Display an alert message
     * @param {string} message - Message to display
     * @param {string} type - Alert type (info, success, warning, error)
     */
    function showAlert(message, type = 'info') {
        // Check if there's already an alert
        const existingAlert = document.querySelector('.alert');
        if (existingAlert) {
            existingAlert.remove();
        }

        // Create alert element
        const alert = document.createElement('div');
        alert.className = `alert alert-${type}`;
        alert.textContent = message;

        // Insert at the top of the container
        const container = document.querySelector('.container');
        container.insertBefore(alert, container.firstChild);

        // Auto-remove after 5 seconds
        setTimeout(() => {
            alert.remove();
        }, 5000);
    }
});