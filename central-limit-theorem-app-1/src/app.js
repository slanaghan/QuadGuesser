// JavaScript code to demonstrate the Central Limit Theorem

// Function to generate random samples and calculate their means
function generateSamples(sampleSize, numSamples) {
    const means = [];
    for (let i = 0; i < numSamples; i++) {
        let sum = 0;
        for (let j = 0; j < sampleSize; j++) {
            sum += Math.random(); // Generate random number between 0 and 1
        }
        means.push(sum / sampleSize); // Calculate mean of the sample
    }
    return means;
}

// Function to visualize the results using a simple histogram
function visualizeResults(means) {
    const canvas = document.getElementById('histogram');
    const ctx = canvas.getContext('2d');
    const histogramData = new Array(10).fill(0);
    
    // Count the frequency of means in each bin
    means.forEach(mean => {
        const bin = Math.floor(mean * 10);
        histogramData[bin < 10 ? bin : 9]++; // Ensure bin index is within bounds
    });

    // Draw the histogram
    const maxCount = Math.max(...histogramData);
    histogramData.forEach((count, index) => {
        const barHeight = (count / maxCount) * canvas.height;
        ctx.fillStyle = 'blue';
        ctx.fillRect(index * (canvas.width / histogramData.length), canvas.height - barHeight, (canvas.width / histogramData.length) - 2, barHeight);
    });
}

// Main function to run the demonstration
function runDemo() {
    const sampleSize = parseInt(document.getElementById('sampleSize').value);
    const numSamples = parseInt(document.getElementById('numSamples').value);
    const means = generateSamples(sampleSize, numSamples);
    visualizeResults(means);
}

// Event listener for the run button
document.getElementById('runButton').addEventListener('click', runDemo);