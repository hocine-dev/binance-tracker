// Function to fetch ratio data
async function fetchRatio() {
    try {
        const response = await fetch('http://localhost:5000/api/ratio');
        const data = await response.json();
        return data.ratio;
    } catch (error) {
        console.error('Error fetching ratio:', error);
        return null;
    }
}

// Function to update UI with fetched ratio and apply conditional styling
async function updateUI() {
    try {
        const ratio = await fetchRatio();

        if (ratio !== null) {
            const ratioElement = document.getElementById('ratioValue');
            ratioElement.textContent = `Current Ratio: ${ratio.toFixed(2)}`;

            // Apply conditional styling based on ratio value
            if (ratio <= 10.5) {
                ratioElement.style.backgroundColor = 'red';
                ratioElement.style.color = 'white'; // Optional: Change text color for better contrast
            } else if (ratio >= 10.7) {
                ratioElement.style.backgroundColor = 'green';
                ratioElement.style.color = 'white'; // Optional: Change text color for better contrast
            } else {
                ratioElement.style.backgroundColor = ''; // Reset background color if not in specified range
                ratioElement.style.color = ''; // Reset text color
            }
        } else {
            const ratioElement = document.getElementById('ratioValue');
            ratioElement.textContent = 'Failed to fetch ratio. Please try again later.';
            ratioElement.style.backgroundColor = ''; // Reset background color on error
            ratioElement.style.color = ''; // Reset text color on error
        }
    } catch (error) {
        console.error('Error updating UI:', error);
    }
}

// Call updateUI when the page loads
document.addEventListener('DOMContentLoaded', updateUI);
