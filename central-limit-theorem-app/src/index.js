// src/index.js
import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';
import Chart from './components/Chart';
import { generateRandomSamples, calculateMeans } from './utils/math';

const App = () => {
    const [samples, setSamples] = useState([]);
    const [means, setMeans] = useState([]);
    const [numSamples, setNumSamples] = useState(1000);
    const [sampleSize, setSampleSize] = useState(30);

    useEffect(() => {
        const newSamples = generateRandomSamples(numSamples, sampleSize);
        setSamples(newSamples);
        setMeans(calculateMeans(newSamples));
    }, [numSamples, sampleSize]);

    return (
        <div>
            <h1>Central Limit Theorem Demonstration</h1>
            <label>
                Number of Samples:
                <input
                    type="number"
                    value={numSamples}
                    onChange={(e) => setNumSamples(e.target.value)}
                />
            </label>
            <label>
                Sample Size:
                <input
                    type="number"
                    value={sampleSize}
                    onChange={(e) => setSampleSize(e.target.value)}
                />
            </label>
            <Chart samples={samples} means={means} />
        </div>
    );
};

ReactDOM.render(<App />, document.getElementById('root'));