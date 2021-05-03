import React, { useState } from 'react';
import { dataArray } from '../data/exercises-react-sentences';

const shuffleArray = (array) => {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
};

const ExercisesReactExerciseComponent = () => {
    const [sentenceNumber, updateSentenceNumber] = useState(1);
    const [errorNumber, updateErrorNumber] = useState(0);
    const extractArray = Object.values(dataArray)[sentenceNumber - 1]
        .allAnswers;
    shuffleArray(extractArray);

    function handleSubmitAlternative(e) {
        e.preventDefault();

        if (sentenceNumber < dataArray.length) {
            if (e.target.innerHTML === dataArray[sentenceNumber - 1].answer) {
                updateSentenceNumber((i) => ++i);
                shuffleArray(extractArray);
            } else {
                e.target.style.backgroundColor = 'red';
                setTimeout(() => {
                    e.target.style.removeProperty('background');
                }, 200);
                updateErrorNumber((i) => ++i);
            }
        } else {
            updateSentenceNumber(1);
        }
    }

    return (
        <>
            <h2>Errors: {errorNumber} </h2>
            <h2>{dataArray[sentenceNumber - 1].sentence}</h2>

            {extractArray.map((object, i) => (
                <>
                    <button
                        className="button"
                        onClick={handleSubmitAlternative}
                        key={i}
                    >
                        {object}
                    </button>
                </>
            ))}
        </>
    );
};

export default ExercisesReactExerciseComponent;
