export function generateRandomSamples(size, min, max) {
    const samples = [];
    for (let i = 0; i < size; i++) {
        samples.push(Math.random() * (max - min) + min);
    }
    return samples;
}

export function calculateMean(samples) {
    const sum = samples.reduce((acc, value) => acc + value, 0);
    return sum / samples.length;
}

export function simulateCentralLimitTheorem(sampleSize, numberOfSamples, min, max) {
    const means = [];
    for (let i = 0; i < numberOfSamples; i++) {
        const samples = generateRandomSamples(sampleSize, min, max);
        means.push(calculateMean(samples));
    }
    return means;
}