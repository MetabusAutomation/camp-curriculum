document.addEventListener('DOMContentLoaded', function () {
    // Elements
    const activityForm = document.getElementById('activity-form');
    const generateBtn = document.getElementById('generate-btn');
    const addThemeBtn = document.getElementById('add-theme-btn');
    const newThemeInput = document.getElementById('new-theme');
    const themesContainer = document.getElementById('themes-container');
    const generatedActivityContainer = document.getElementById('generated-activity-container');
    const modificationInput = document.getElementById('modification-input');
    const regenerateBtn = document.getElementById('regenerate-btn');
    const saveActivityBtn = document.getElementById('save-activity-btn');
    const savedIdeasSelect = document.getElementById('saved-ideas');
    const loadIdeaBtn = document.getElementById('load-idea-btn');

    // Mock database of saved ideas - simplified to just include title and description
    const savedIdeasDb = {
        'scavenger-hunt': {
            title: 'Nature Scavenger Hunt',
            description: 'An outdoor activity where campers search for specific natural items, learning about local ecology and plant identification.'
        },
        'rocket-building': {
            title: 'Build a Model Rocket',
            description: 'Students design, build, and launch simple model rockets using household materials, learning about physics and aerodynamics.'
        },
        'team-challenge': {
            title: 'Marshmallow Tower Challenge',
            description: 'Teams compete to build the tallest free-standing structure using only marshmallows and uncooked spaghetti.'
        },
        'eco-system': {
            title: 'Ecosystem in a Bottle',
            description: 'Create self-contained ecosystems in recycled plastic bottles, observing the water cycle and plant growth over time.'
        }
    };

    // Add theme functionality
    addThemeBtn.addEventListener('click', function () {
        const themeValue = newThemeInput.value.trim();
        if (!themeValue) return;

        // Create theme option with radio button
        const themeId = 'theme-' + themeValue.toLowerCase().replace(/\s+/g, '-');

        const themeElement = document.createElement('div');
        themeElement.className = 'theme-option';
        themeElement.innerHTML = `
            <input type="radio" id="${themeId}" name="theme" value="${themeValue}" class="theme-radio">
            <label for="${themeId}">${themeValue}</label>
            <button type="button" class="remove-theme">×</button>
        `;

        themesContainer.appendChild(themeElement);
        newThemeInput.value = '';
        newThemeInput.focus();

        // Select this theme by default
        document.getElementById(themeId).checked = true;
    });

    // Remove theme functionality (event delegation)
    themesContainer.addEventListener('click', function (e) {
        if (e.target.classList.contains('remove-theme')) {
            e.target.closest('.theme-option').remove();
        }
    });

    // Handle form submission
    activityForm.addEventListener('submit', function (e) {
        e.preventDefault();

        // Get form values
        const title = document.getElementById('activity-title').value;
        const description = document.getElementById('activity-description').value;
        const occurrences = document.getElementById('activity-occurrences').value;
        const ageGroups = document.getElementById('age-groups').value;
        const campersCount = document.getElementById('campers-count').value;

        // Get selected theme
        let selectedTheme = '';
        const themeRadios = document.querySelectorAll('.theme-radio:checked');
        if (themeRadios.length > 0) {
            selectedTheme = themeRadios[0].value;
        }

        // Mock generating an activity (in a real app this would call an API)
        mockGenerateActivity(title, description, occurrences, ageGroups, selectedTheme, campersCount);
    });

    // Mock generate activity function
    function mockGenerateActivity(title, description, occurrences, ageGroups, theme, campersCount) {
        // Display the result container
        generatedActivityContainer.style.display = 'block';

        // Scroll to the generated activity
        generatedActivityContainer.scrollIntoView({ behavior: 'smooth' });

        // Set basic activity details
        document.getElementById('result-title').textContent = title;
        document.getElementById('result-description').textContent = description;
        document.getElementById('result-age-range').textContent = `Ages: ${ageGroups}`;
        document.getElementById('result-occurrences').textContent = `Occurrences: ${occurrences} weeks`;
        document.getElementById('result-themes').textContent = `Themes: ${theme || 'None'}`;

        // Add campers count to the activity meta section
        const metaSection = document.querySelector('.activity-meta');

        // Check if campers span already exists, if not create it
        let campersSpan = document.getElementById('result-campers');
        if (!campersSpan) {
            campersSpan = document.createElement('span');
            campersSpan.id = 'result-campers';
            metaSection.appendChild(campersSpan);
        }

        campersSpan.textContent = `Campers: ${campersCount}`;

        // Mock materials
        const materialsList = document.getElementById('result-materials');
        materialsList.innerHTML = `
            <li>Clipboard with activity sheets (1 per team)</li>
            <li>Pencils (1 per participant)</li>
            <li>Sample collection bags (1 per team)</li>
            <li>Field guides or identification charts</li>
            <li>First aid kit</li>
        `;

        // Mock instructions
        const instructionsList = document.getElementById('result-instructions');
        instructionsList.innerHTML = `
            <li>Divide campers into small groups of 3-4 participants.</li>
            <li>Distribute materials to each team and explain the activity objective.</li>
            <li>Review safety guidelines and boundaries for the activity area.</li>
            <li>Give teams their scavenger hunt lists and explain any special items.</li>
            <li>Set a time limit (30-40 minutes recommended for searching).</li>
            <li>Gather everyone back at the meeting point to share and discuss findings.</li>
            <li>Award points to teams based on their discoveries and teamwork.</li>
        `;

        // Mock tips
        const tipsList = document.getElementById('result-tips');
        tipsList.innerHTML = `
            <li>Pre-walk the area to ensure items on the list can be found.</li>
            <li>Consider weather conditions and have a backup indoor activity ready.</li>
            <li>For younger campers, pair them with older campers or counselors.</li>
            <li>Emphasize respect for nature - look, document, but leave natural items in place.</li>
            <li>Use this activity as an opportunity to teach about local ecology.</li>
        `;
    }

    // Regenerate with modifications
    regenerateBtn.addEventListener('click', function () {
        const modifications = modificationInput.value.trim();
        if (!modifications) return;

        // In a real app, this would send the modifications to the API
        alert(`Activity would be regenerated with these modifications: "${modifications}"`);

        // Clear the modifications input
        modificationInput.value = '';
    });

    // Save activity
    saveActivityBtn.addEventListener('click', function () {
        alert("Activity saved successfully!");

        // Clear the form
        activityForm.reset();
        themesContainer.innerHTML = '';

        // Hide the results
        generatedActivityContainer.style.display = 'none';
    });

    // Load idea when button is clicked - simplified to only populate title and description
    loadIdeaBtn.addEventListener('click', function () {
        const selectedIdeaId = savedIdeasSelect.value;
        if (!selectedIdeaId) return;

        const idea = savedIdeasDb[selectedIdeaId];

        // Populate only title and description
        document.getElementById('activity-title').value = idea.title;
        document.getElementById('activity-description').value = idea.description;

        // Reset the select to default after loading
        savedIdeasSelect.value = '';
    });
}); 