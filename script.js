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

// Function to update UI with fetched ratio
async function updateUI() {
    try {
        const ratio = await fetchRatio();

        if (ratio !== null) {
            const ratioElement = document.getElementById('ratioValue');
            ratioElement.textContent = `Current Ratio: ${ratio.toFixed(2)}`;
        } else {
            const ratioElement = document.getElementById('ratioValue');
            ratioElement.textContent = 'Failed to fetch ratio. Please try again later.';
        }
    } catch (error) {
        console.error('Error updating UI:', error);
    }
}

// Call updateUI when the page loads
document.addEventListener('DOMContentLoaded', updateUI);
