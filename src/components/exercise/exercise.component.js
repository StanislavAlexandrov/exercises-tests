import React, { useEffect, useState } from 'react';
import { dataArray } from '../../data/exercises-react-sentences.js';

const shuffleArray = (array) => {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
};

const Exercise = () => {
    const [currentStep, setCurrentStep] = useState(0);
    const [errorNumber, setErrorNumber] = useState(0);

    //why do we need a self invoke anon function here?
    // everything that should be calculated should be in a function

    const [currentStepData, setCurrentStepData] = useState(() => {
        shuffleArray(dataArray[0].allAnswers);
        return dataArray[0];
    });

    const onAnswerClick = (answer) => {
        if (answer === currentStepData.answer) {
            setCurrentStep((i) => {
                const newStepNumber = ++i;
                const stepsLength = dataArray.length - 1;

                // replaced ? 0 : stepsLength with ? 0 : newStepNumber;
                return newStepNumber > stepsLength ? 0 : newStepNumber;
            });
        } else {
            setCurrentStepData((data) => ({ ...data, error: answer }));
            setErrorNumber((i) => ++i);
        }
    };

    useEffect(() => {
        shuffleArray(dataArray[currentStep].allAnswers);

        setCurrentStepData(dataArray[currentStep]);
    }, [currentStep]);
    // this is a bit deeper than I originally thought. I need to memoize it?
    // you shuffle the array and what happens next? set the state based on the reshuffle

    // useEffect(() => shuffleArray(currentStepData.allAnswers), [currentStep]);

    // you can use the index when mapping for keys

    return (
        <>
            <h2>Current step: {currentStep}</h2>
            <h2>Errors: {errorNumber} </h2>

            <h4>Question:</h4>
            <div>{currentStepData.sentence}</div>

            <h4>Answers:</h4>
            {currentStepData.allAnswers.map((answer) => {
                const styleClass =
                    currentStepData.error === answer
                        ? 'button _error'
                        : 'button';

                return (
                    <>
                        <button
                            className={styleClass}
                            //again, here if you don't use a self inv an f, you get 'too many rerenders'
                            //an example of a closure

                            onClick={() => onAnswerClick(answer)}
                            key={answer.id}
                        >
                            {answer}
                        </button>
                    </>
                );
            })}
        </>
    );
};

export default Exercise;
