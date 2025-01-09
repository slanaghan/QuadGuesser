import React, { useEffect, useState } from 'react';
import { generateRandomSamples, calculateMean } from '../utils/math';
import { Bar } from 'react-chartjs-2';

const Chart = () => {
    const [data, setData] = useState([]);
    const [means, setMeans] = useState([]);
    const [sampleSize, setSampleSize] = useState(30);
    const [numSamples, setNumSamples] = useState(1000);

    useEffect(() => {
        const newData = [];
        const newMeans = [];

        for (let i = 0; i < numSamples; i++) {
            const samples = generateRandomSamples(sampleSize);
            const mean = calculateMean(samples);
            newData.push(samples);
            newMeans.push(mean);
        }

        setData(newData);
        setMeans(newMeans);
    }, [sampleSize, numSamples]);

    const chartData = {
        labels: means.map((_, index) => index + 1),
        datasets: [
            {
                label: 'Sample Means',
                data: means,
                backgroundColor: 'rgba(75, 192, 192, 0.6)',
                borderColor: 'rgba(75, 192, 192, 1)',
                borderWidth: 1,
            },
        ],
    };

    return (
        <div>
            <h2>Central Limit Theorem Demonstration</h2>
            <Bar data={chartData} />
            <div>
                <label>
                    Sample Size:
                    <input
                        type="number"
                        value={sampleSize}
                        onChange={(e) => setSampleSize(Number(e.target.value))}
                    />
                </label>
                <label>
                    Number of Samples:
                    <input
                        type="number"
                        value={numSamples}
                        onChange={(e) => setNumSamples(Number(e.target.value))}
                    />
                </label>
            </div>
        </div>
    );
};

export default Chart;