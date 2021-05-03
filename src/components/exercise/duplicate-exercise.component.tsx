import React, { useEffect, useState } from 'react';
import { dataArray } from '../../data/exercises-react-sentences';

export default function DuplicateExercise() {
    type dataArrayElement = {
        id: number;
        sentence: string;
        answer: string;
        allAnswers: string[];
        error?: string;
    };

    const [currentStep, setCurrentStep] = useState(0);

    const [errorNumber, setErrorNumber] = useState(0);

    const [currentStepData, setCurrentStepData] = useState(dataArray[0]);

    useEffect((): ReturnType<any> => dataArray[currentStep], [currentStep]);

    const onAnswerClick = (answer: string) => {
        if (answer === currentStepData.answer) {
            setCurrentStep((i) => {
                const newStepNumber = ++i;
                const stepsLength = dataArray.length - 1;
                return newStepNumber > stepsLength ? 0 : newStepNumber;
            });
        } else {
            setErrorNumber((i) => ++i);
            setCurrentStepData((data) => ({ ...data, error: answer }));
        }
    };
    useEffect(() => {
        setCurrentStepData(dataArray[currentStep]);
    }, [currentStep]);

    return (
        <>
            <h2>Current step: {currentStep}</h2>
            <h2>Errors: {errorNumber}</h2>
            <h4>Question:</h4>
            <h3>{dataArray[currentStep].sentence}</h3>
            <h4>Answers:</h4>

            {currentStepData.allAnswers.map((answer) => {
                const styleClass =
                    currentStepData.error === answer
                        ? 'button _error'
                        : 'button';
                return (
                    <button
                        onClick={() => onAnswerClick(answer)}
                        key={currentStepData.allAnswers.indexOf(answer)}
                        className={styleClass}
                    >
                        {answer}
                    </button>
                );
            })}
        </>
    );
}
