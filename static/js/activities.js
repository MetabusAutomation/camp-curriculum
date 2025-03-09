document.addEventListener('DOMContentLoaded', function () {
    // Mock data for activities
    const activityData = {
        "1": {
            title: "Nature Scavenger Hunt",
            type: "Outdoor",
            age: "Ages 8-12",
            duration: "45 mins",
            description: "An engaging outdoor activity where campers search for natural items in the environment. This activity promotes observation skills, nature appreciation, and teamwork as campers explore and discover elements of the natural world around them.",
            objectives: [
                "Develop observation and identification skills",
                "Foster appreciation for nature and the environment",
                "Encourage teamwork and communication",
                "Promote physical activity in an outdoor setting"
            ],
            materials: [
                "Printed scavenger hunt lists (1 per team)",
                "Pencils or pens",
                "Collection bags or containers",
                "Clipboards",
                "Digital cameras or smartphones (optional)"
            ],
            instructions: [
                "Divide campers into small teams of 3-4 participants",
                "Give each team a scavenger hunt list, clipboard, and collection bag",
                "Review safety guidelines and boundaries for the hunt",
                "Allow teams 30 minutes to find as many items on their list as possible",
                "Have teams return to the meeting point to share and discuss their findings",
                "Award points for each item found and bonus points for unique discoveries"
            ],
            tips: "Prepare different lists based on age groups. For younger campers, include more common items with pictures. For older campers, add challenging items that require more searching. Emphasize respecting nature by not damaging plants or disturbing wildlife."
        },
        "2": {
            title: "Team Building Challenges",
            type: "Group",
            age: "Ages 10-14",
            duration: "60 mins",
            description: "A series of collaborative problem-solving activities designed to strengthen group dynamics and leadership skills. Campers must work together to overcome obstacles and complete challenges, building trust and improving communication.",
            objectives: [
                "Develop effective communication strategies",
                "Build trust among team members",
                "Enhance problem-solving skills",
                "Identify and utilize individual strengths within a group"
            ],
            materials: [
                "Rope (50 feet)",
                "Blindfolds (10)",
                "Plastic hoops (5)",
                "Traffic cones (10)",
                "Wooden planks (4)"
            ],
            instructions: [
                "Set up 4-5 challenge stations around the activity area",
                "Divide campers into teams of 5-6 participants",
                "Explain each challenge and safety guidelines",
                "Rotate teams through each station, allowing 10-12 minutes per challenge",
                "After all rotations, gather the group for a reflection discussion",
                "Have each team share their strategies and what they learned"
            ],
            tips: "Focus on the process rather than competition. Observe group dynamics and intervene with guiding questions if a team gets stuck. Have additional challenges ready for groups that finish early."
        },
        "3": {
            title: "Crafting with Natural Materials",
            type: "Arts & Crafts",
            age: "Ages 6-10",
            duration: "30 mins",
            description: "A creative activity where campers collect and use natural materials to create art projects. This hands-on experience encourages creativity while fostering an appreciation for natural resources and environmental responsibility.",
            objectives: [
                "Stimulate creativity and artistic expression",
                "Develop fine motor skills",
                "Learn about natural materials and their properties",
                "Create a keepsake from the camp experience"
            ],
            materials: [
                "Collected natural items (leaves, pinecones, sticks, pebbles)",
                "Cardboard or heavy paper bases",
                "Child-safe glue and scissors",
                "String or yarn",
                "Markers or paints",
                "Collection bags for gathering materials"
            ],
            instructions: [
                "Take campers on a brief nature walk to collect materials (15 minutes)",
                "Return to the craft area and discuss the materials found",
                "Demonstrate a few example projects but encourage originality",
                "Allow campers 30 minutes to create their craft projects",
                "Have each camper share their creation with the group",
                "Display finished crafts or prepare them to take home"
            ],
            tips: "Before the activity, scout for areas with abundant natural materials. Remind campers to only collect items from the ground, not picking living plants. Have pre-collected materials available for campers who struggle to find their own items."
        },
        "4": {
            title: "Campfire Stories & Songs",
            type: "Evening",
            age: "All Ages",
            duration: "45 mins",
            description: "A traditional evening activity that brings campers together around a campfire for storytelling, singing, and community building. This creates memorable shared experiences and helps calm campers before bedtime.",
            objectives: [
                "Build camp community and shared traditions",
                "Develop public speaking and performance skills",
                "Create memorable camp experiences",
                "Transition campers toward evening wind-down"
            ],
            materials: [
                "Seating arranged around a safe campfire area",
                "Song sheets or projector (optional)",
                "Simple musical instruments (guitars, ukuleles, etc.)",
                "Flashlights",
                "Story prompts or books",
                "Marshmallows and roasting sticks (optional)"
            ],
            instructions: [
                "Begin with energetic camp songs to engage the group",
                "Transition to a group storytelling activity where each person adds to the story",
                "Share a prepared story appropriate for the age group",
                "Teach a new camp song with simple motions",
                "Allow time for campers to volunteer stories or songs",
                "End with a calm, reflective song to transition to the next activity"
            ],
            tips: "Have a rain contingency plan using an indoor space with battery-operated candles. Prepare stories appropriate for the youngest campers present. Balance between staff-led activities and camper participation. Consider themed nights for variety throughout the camp session."
        },
        "5": {
            title: "Water Balloon Olympics",
            type: "Water",
            age: "Ages 8-14",
            duration: "60 mins",
            description: "A series of fun, competitive games using water balloons. This activity combines physical activity with cooling water play, perfect for hot summer days at camp. Competitions are designed to be inclusive and focus on participation rather than winning.",
            objectives: [
                "Provide relief from heat through water play",
                "Develop hand-eye coordination and teamwork",
                "Encourage friendly competition and good sportsmanship",
                "Promote physical activity in a playful setting"
            ],
            materials: [
                "Water balloons (at least 15 per camper)",
                "Buckets for balloon storage",
                "Water source for filling balloons",
                "Measuring tape",
                "Whistle",
                "Hula hoops (5)",
                "Plastic spoons (one per camper)"
            ],
            instructions: [
                "Prepare water balloons in advance and store in large buckets",
                "Set up 5-6 different competition stations",
                "Divide campers into teams of equal size and assign team colors",
                "Explain each event and safety rules (no throwing at faces)",
                "Rotate through events including relay races, water balloon toss, target throwing",
                "Conclude with a clean-up competition to ensure all balloon pieces are collected"
            ],
            tips: "Fill balloons just before the activity to prevent leaks. Have extra staff help with balloon preparation. Consider making biodegradable balloon alternatives by using sponges as a more environmentally friendly option. Always have a few dry towels available."
        }
    };

    // Track changes to be saved
    const changes = {
        favorite: null, // ID of favorited activity
        deleted: [], // IDs of deleted activities 
        hasChanges: false // Whether there are any unsaved changes
    };

    // Last deleted activity for undo
    let lastDeletedActivity = null;

    // Handle clicking on activity items to view details
    const activityItems = document.querySelectorAll('.activity-item');
    activityItems.forEach(item => {
        item.addEventListener('click', function (e) {
            // Prevent triggering when clicking the favorite or delete button
            if (!e.target.closest('.btn-favorite') && !e.target.closest('.btn-delete')) {
                const activityId = this.getAttribute('data-activity-id');
                viewActivityDetails(activityId);
            }
        });
    });

    // Handle favoriting activities
    const favoriteButtons = document.querySelectorAll('.btn-favorite');
    favoriteButtons.forEach(button => {
        button.addEventListener('click', function (e) {
            e.stopPropagation(); // Prevent activity click
            const activityId = this.getAttribute('data-activity-id');
            toggleFavorite(activityId);
        });
    });

    // Handle delete activity buttons
    const deleteButtons = document.querySelectorAll('.btn-delete');
    deleteButtons.forEach(button => {
        button.addEventListener('click', function (e) {
            e.stopPropagation(); // Prevent activity click
            const activityId = this.getAttribute('data-activity-id');
            deleteActivity(activityId);
        });
    });

    // Handle minimize button
    const minimizeButton = document.getElementById('minimize-details');
    if (minimizeButton) {
        minimizeButton.addEventListener('click', function () {
            const detailsCard = document.getElementById('activity-details');
            detailsCard.classList.add('hidden');
        });
    }

    // Handle upload button
    const uploadButton = document.getElementById('upload-activity');
    if (uploadButton) {
        uploadButton.addEventListener('click', function () {
            showAlert('Upload functionality is not implemented yet.', 'warning');
        });
    }

    // Handle save changes button
    const saveButton = document.getElementById('save-changes');
    if (saveButton) {
        saveButton.addEventListener('click', function () {
            saveChanges();
        });
    }

    // Handle undo button
    const undoButton = document.getElementById('undo-button');
    if (undoButton) {
        undoButton.addEventListener('click', function () {
            undoLastDelete();
        });
    }

    /**
     * Toggle favorite status for an activity
     * @param {string} activityId - ID of the activity to toggle
     */
    function toggleFavorite(activityId) {
        // Remove favorite status from all buttons
        document.querySelectorAll('.btn-favorite').forEach(btn => {
            btn.classList.remove('favorite-active');
            btn.setAttribute('title', 'Mark as favorite');

            // Update SVG fill
            const svg = btn.querySelector('svg');
            if (svg) {
                svg.setAttribute('fill', 'none');
            }
        });

        // Add favorite to the clicked one
        const clickedButton = document.querySelector(`.btn-favorite[data-activity-id="${activityId}"]`);
        if (clickedButton) {
            clickedButton.classList.add('favorite-active');
            clickedButton.setAttribute('title', 'Marked as favorite');

            // Update SVG fill
            const svg = clickedButton.querySelector('svg');
            if (svg) {
                svg.setAttribute('fill', 'currentColor');
            }

            // Track the change
            changes.favorite = activityId;
            updateChangesStatus();

            // Show confirmation message
            showAlert('Activity marked as favorite. Remember to save your changes.', 'success');
        }
    }

    /**
     * View details of an activity
     * @param {string} activityId - ID of the activity to view
     */
    function viewActivityDetails(activityId) {
        // Get activity data
        const activity = activityData[activityId];
        if (!activity) {
            showAlert('Activity details not found', 'warning');
            return;
        }

        // Update details in the details card
        document.getElementById('detail-title').textContent = activity.title;
        document.getElementById('detail-type').textContent = activity.type;
        document.getElementById('detail-age').textContent = activity.age;
        document.getElementById('detail-duration').textContent = activity.duration;
        document.getElementById('detail-description').textContent = activity.description;

        // Update objectives list
        const objectivesList = document.getElementById('detail-objectives');
        objectivesList.innerHTML = '';
        activity.objectives.forEach(objective => {
            const li = document.createElement('li');
            li.textContent = objective;
            objectivesList.appendChild(li);
        });

        // Update materials list
        const materialsList = document.getElementById('detail-materials');
        materialsList.innerHTML = '';
        activity.materials.forEach(material => {
            const li = document.createElement('li');
            li.textContent = material;
            materialsList.appendChild(li);
        });

        // Update instructions list
        const instructionsList = document.getElementById('detail-instructions');
        instructionsList.innerHTML = '';
        activity.instructions.forEach((instruction, index) => {
            const li = document.createElement('li');
            li.textContent = instruction;
            instructionsList.appendChild(li);
        });

        // Update tips
        document.getElementById('detail-tips').textContent = activity.tips;

        // Show the details card
        const detailsCard = document.getElementById('activity-details');
        detailsCard.classList.remove('hidden');

        // Scroll to top to see details
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    }

    /**
     * Delete an activity (mark for deletion)
     * @param {string} activityId - ID of the activity to delete
     */
    function deleteActivity(activityId) {
        // Get the activity element
        const activityElement = document.querySelector(`.activity-item[data-activity-id="${activityId}"]`);
        if (!activityElement) return;

        // Get the activity title for the confirmation message
        const activityTitle = activityElement.querySelector('h4').textContent;

        // Confirm deletion with the user
        if (confirm(`Are you sure you want to delete "${activityTitle}"?`)) {
            // Mark as deleted (visually)
            activityElement.classList.add('deleted');

            // Track the deletion
            changes.deleted.push(activityId);
            updateChangesStatus();

            // Store for potential undo
            lastDeletedActivity = {
                id: activityId,
                element: activityElement,
                title: activityTitle
            };

            // Show undo notification
            showUndoNotification(activityTitle);

            // If the deleted activity is currently shown in details, hide the details
            const detailsTitle = document.getElementById('detail-title');
            if (detailsTitle && detailsTitle.textContent === activityTitle) {
                document.getElementById('activity-details').classList.add('hidden');
            }
        }
    }

    /**
     * Show the undo notification
     * @param {string} activityTitle - Title of the deleted activity
     */
    function showUndoNotification(activityTitle) {
        const undoNotification = document.getElementById('undo-notification');
        const undoMessage = document.getElementById('undo-message');

        undoMessage.textContent = `"${activityTitle}" has been marked for deletion. Changes will apply when saved.`;
        undoNotification.classList.remove('hidden');

        // Auto-hide after 10 seconds
        setTimeout(() => {
            undoNotification.classList.add('hidden');
        }, 10000);
    }

    /**
     * Undo the last deleted activity
     */
    function undoLastDelete() {
        if (!lastDeletedActivity) return;

        // Remove from deleted list
        const index = changes.deleted.indexOf(lastDeletedActivity.id);
        if (index > -1) {
            changes.deleted.splice(index, 1);
        }

        // Restore visual appearance
        lastDeletedActivity.element.classList.remove('deleted');

        // Hide the undo notification
        document.getElementById('undo-notification').classList.add('hidden');

        // Show confirmation message
        showAlert(`Deletion of "${lastDeletedActivity.title}" has been undone.`, 'success');

        // Update changes status
        updateChangesStatus();

        // Clear the last deleted activity
        lastDeletedActivity = null;
    }

    /**
     * Update the changes status UI
     */
    function updateChangesStatus() {
        const saveButton = document.getElementById('save-changes');
        changes.hasChanges = changes.favorite !== null || changes.deleted.length > 0;

        if (changes.hasChanges) {
            saveButton.classList.remove('hidden');
            saveButton.classList.add('has-changes');
        } else {
            saveButton.classList.add('hidden');
            saveButton.classList.remove('has-changes');
        }
    }

    /**
     * Save all changes
     */
    function saveChanges() {
        if (!changes.hasChanges) return;

        // Show loading state briefly for visual feedback
        const saveButton = document.getElementById('save-changes');
        saveButton.disabled = true;

        // Show not implemented alert instead of attempting to save
        showAlert('Save functionality is not implemented yet.', 'warning');

        // Re-enable the button after a short delay for visual feedback
        setTimeout(() => {
            saveButton.disabled = false;
        }, 300);

        // Note: In a real implementation, this would send data to the server
        // and only update the UI after a successful response
    }

    /**
     * Display an alert message
     * @param {string} message - Message to display
     * @param {string} type - Alert type (info, success, warning)
     */
    function showAlert(message, type = 'info') {
        // Remove any existing alerts
        const existingAlerts = document.querySelectorAll('.alert');
        existingAlerts.forEach(alert => alert.remove());

        // Create new alert
        const alertDiv = document.createElement('div');
        alertDiv.className = `alert alert-${type}`;
        alertDiv.textContent = message;

        // Add to page
        const container = document.querySelector('.container');
        container.insertBefore(alertDiv, container.firstChild);

        // Remove after a delay
        setTimeout(() => {
            alertDiv.remove();
        }, 5000);
    }
}); 