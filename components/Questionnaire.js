"use client";

// components/Questionnaire.js
import { useState } from 'react';

const Questionnaire = () => {
  const [currentQuestion, setCurrentQuestion] = useState(1); // Keeps track of the current question
  const [responses, setResponses] = useState({}); // Stores user responses
  const [showFollowUp, setShowFollowUp] = useState(false);
  const [fadeClass, setFadeClass] = useState('');

  const handleNextQuestion = (questionNum, response) => {
    setResponses({ ...responses, [questionNum]: response });
    setShowFollowUp(true);
    setFadeClass('animate-bounce');

    // Automatically hide the follow-up message after a few seconds
    setTimeout(() => {
      setShowFollowUp(false);
      setFadeClass('');
      setCurrentQuestion(currentQuestion + 1);
    }, 200000); // Adjust duration as needed
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">

        <div className="bg-white p-12 rounded-lg shadow-lg max-w-5xl w-full">
            <div className="mb-8">
                <p className="text-center text-lg">Question {currentQuestion} of 12</p>
                <div className="h-2 bg-gray-300 rounded-full">
                    <div 
                        className="h-full bg-blue-500 rounded-full" 
                        style={{ width: `${(currentQuestion / 12) * 100}%` }} 
                    />
                </div>
            </div>
            {currentQuestion === 1 && (
                <div>
                <p className="text-4xl font-bold mb-10 text-center leading-relaxed">
                    Hi! I&apos;m here to help you evaluate your readiness for Malaysia&apos;s new e-invoicing system. Let&apos;s start with a few quick questions. Ready?
                </p>
                <div className="flex justify-center">
                    <button
                        className="bg-blue-500 text-white px-20 py-3 m-2 rounded text-3xl"
                        onClick={() => handleNextQuestion('Q1', 'Yes')}
                    >
                        Yes
                    </button>
                    <button
                        className="bg-gray-500 text-white px-20 py-3 m-2 rounded text-3xl"
                        onClick={() => handleNextQuestion('Q1', 'No')}
                    >
                        No
                    </button>
                </div>
                </div>
            )}
            {currentQuestion === 0 && (
                <div>
                    <p className="text-4xl font-bold mb-10 text-center leading-relaxed">
                    No problem! Come back whenever you&apos;re ready.
                    </p>
                </div>
            )}
            {currentQuestion === 2 && (
                <div>
                    <p className="text-4xl font-bold mb-10 text-center leading-relaxed">What is your company&apos;s annual turnover?</p>
                    <div className="flex flex-col items-start">
                        <button
                            className="bg-blue-500 text-white px-20 py-3 m-2 rounded text-3xl"
                            onClick={() => {
                                setResponses({ ...responses, Q2: 'Above RM100 million' });
                                setCurrentQuestion(3);
                            }}
                        >
                            Above RM100 million
                        </button>
                        <button
                            className="bg-blue-500 text-white px-20 py-3 m-2 rounded text-3xl"
                            onClick={() => {
                                setResponses({ ...responses, Q2: 'RM25 million to RM100 million' });
                                setCurrentQuestion(3);
                            }}
                        >
                            RM25 million to RM100 million
                        </button>
                        <button
                            className="bg-blue-500 text-white px-20 py-3 m-2 rounded text-3xl"
                            onClick={() => {
                                setResponses({ ...responses, Q2: 'Below RM25 million' });
                                setCurrentQuestion(3);
                            }}
                        >
                            Below RM25 million
                        </button>
                    </div>
                </div>
            )}
            {currentQuestion === 3 && (
                <div>
                    <p className="text-4xl font-bold mb-10 text-center leading-relaxed">
                    Do you currently send digital invoices (via software or electronic means) to your customers?
                    </p>
                    <div className="flex justify-center">
                    <button
                    className="bg-blue-500 text-white px-20 py-3 m-2 rounded text-3xl"
                    onClick={() => {
                        setResponses({ ...responses, Q3: 'Yes' });
                        setCurrentQuestion(4);
                    }}
                    >
                    Yes
                    </button>
                    <button
                    className="bg-gray-500 text-white px-20 py-3 m-2 rounded text-3xl"
                    onClick={() => {
                        setResponses({ ...responses, Q3: 'No' });
                        setCurrentQuestion(6);
                    }}
                    >
                    No
                    </button>
                    </div>
                </div>
            )}
            {currentQuestion === 4 && (
                <div>
                    <p className="text-4xl font-bold mb-10 text-center leading-relaxed">
                    What invoicing software do you use? (e.g., QuickBooks, Xero, MYOB, or custom software)
                    </p>
                    <input
                    type="text"
                    className="border border-gray-300 p-2 w-full rounded text-3xl mb-4"
                    placeholder="Enter your software name"
                    onChange={(e) => setResponses({ ...responses, Q4: e.target.value })}
                    />
                    <div className="flex flex-col items-start">
                    <button
                        className="bg-blue-500 text-white px-20 py-3 m-2 rounded text-3xl"
                        onClick={() => setCurrentQuestion(5)}
                    >
                        Next
                    </button>
                    <button
                        className="bg-blue-500 text-white px-20 py-3 m-2 rounded text-3xl"
                        onClick={() => {
                            setResponses({ ...responses, Q4: 'No' });
                            setCurrentQuestion(5);
                        }}
                    >
                        No
                    </button>
                    <button
                        className="bg-blue-500 text-white px-20 py-3 m-2 rounded text-3xl"
                        onClick={() => {
                            setResponses({ ...responses, Q4: 'Not sure' });
                        }}
                    >
                        Not sure
                    </button>
                    </div>
                    {/* Conditional Follow-up Message */}
                    {responses.Q4 === 'Not sure' && (
                        <div className="mt-4 text-3xl text-center">
                        <p>No worries! Let&apos;s keep going. If you&apos;re unsure, I can help with recommendations later.</p>
                        <button
                            className="bg-blue-500 text-white px-20 py-3 mt-4 rounded text-3xl"
                            onClick={() => setCurrentQuestion(5)}
                        >
                            Continue
                        </button>
                        </div>
                    )}
                </div>
            )}
            {currentQuestion === 5 && (
                <div>
                    <p className="text-4xl font-bold mb-10 text-center leading-relaxed">
                    Does your invoicing software support e-invoicing, or is it capable of integrating with an e-invoicing system?
                    </p>
                    <div className="flex flex-col items-start">
                        <button
                            className="bg-blue-500 text-white px-20 py-3 m-2 rounded text-3xl"
                            onClick={() => {
                                setResponses({ ...responses, Q5: 'Yes' });
                                setCurrentQuestion(7);
                            }}
                        >
                            Yes
                        </button>
                        <button
                            className="bg-gray-500 text-white px-20 py-3 m-2 rounded text-3xl"
                            onClick={() => {
                                setResponses({ ...responses, Q5: 'No' });
                                setCurrentQuestion(7);
                            }}
                        >
                            No
                        </button>
                        <button
                            className="bg-blue-500 text-white px-20 py-3 m-2 rounded text-3xl"
                            onClick={() => {
                                setResponses({ ...responses, Q5: 'Not sure' });
                                setCurrentQuestion(7);
                            }}
                        >
                            Not sure
                        </button>
                    </div>
                </div>
            )}
            {currentQuestion === 6 && (
                <div>
                    <p className="text-4xl font-bold mb-10 text-center leading-relaxed">
                    Do you currently issue invoices manually (e.g., paper-based or PDF via email)?
                    </p>
                    <div className="flex justify-center">
                    <button
                    className="bg-blue-500 text-white px-20 py-3 m-2 rounded text-3xl"
                    onClick={() => {
                        setResponses({ ...responses, Q6: 'Yes' });
                        setCurrentQuestion(7);
                    }}
                    >
                    Yes
                    </button>
                    <button
                    className="bg-gray-500 text-white px-20 py-3 m-2 rounded text-3xl"
                    onClick={() => {
                        setResponses({ ...responses, Q6: 'No' });
                        setCurrentQuestion(7);
                    }}
                    >
                    No
                    </button>
                    </div>
                </div>
            )}
            {currentQuestion === 7 && (
                <div>
                    <p className="text-4xl font-bold mb-10 text-center leading-relaxed">
                    Are you familiar with Malaysia&apos;s new e-invoicing mandate and when it applies to your business?
                    </p>
                    <div className="flex justify-center">
                    <button
                    className="bg-blue-500 text-white px-20 py-3 m-2 rounded text-3xl"
                    onClick={() => {
                        setResponses({ ...responses, Q7: 'Yes' });
                        setCurrentQuestion(8);
                    }}
                    >
                    Yes, I&apos;m aware
                    </button>
                    <button
                    className="bg-gray-500 text-white px-20 py-3 m-2 rounded text-3xl"
                    onClick={() => {
                        setResponses({ ...responses, Q7: 'No' });
                        setCurrentQuestion(8);
                    }}
                    >
                    No, I&apos;m not aware
                    </button>
                    </div>
                </div>
            )}
            {currentQuestion === 8 && (
                <div>
                    <p className="text-4xl font-bold mb-10 text-center leading-relaxed">
                    When does your business need to start complying with the e-invoicing mandate?
                    </p>
                    <div className="flex flex-col items-start">
                    <button
                    className="bg-blue-500 text-white px-20 py-3 m-2 rounded text-3xl"
                    onClick={() => {
                        setResponses({ ...responses, Q8: 'Large Enterprise (immediate compliance)' });
                        setCurrentQuestion(9);
                    }}
                    >
                    Large Enterprise (immediate compliance)
                    </button>
                    <button
                    className="bg-blue-500 text-white px-20 py-3 m-2 rounded text-3xl"
                    onClick={() => {
                        setResponses({ ...responses, Q8: 'Mid-sized Business (Jan 2025)' });
                        setCurrentQuestion(9);
                    }}
                    >
                    Mid-sized Business (Jan 2025)
                    </button>
                    <button
                    className="bg-blue-500 text-white px-20 py-3 m-2 rounded text-3xl"
                    onClick={() => {
                        setResponses({ ...responses, Q8: 'SME (July 2025)' });
                        setCurrentQuestion(9);
                    }}
                    >
                    SME (July 2025)
                    </button>
                    <button
                    className="bg-blue-500 text-white px-20 py-3 m-2 rounded text-3xl"
                    onClick={() => {
                        setResponses({ ...responses, Q8: 'Not sure' });
                        setCurrentQuestion(9);
                    }}
                    >
                    Not sure
                    </button>
                    </div>
                </div>
            )}
            {currentQuestion === 9 && (
                <div>
                    <p className="text-4xl font-bold mb-10 text-center leading-relaxed">
                    Do you have an IT person or a service provider who can help you set up the software to work with the e-invoicing system (such as connecting it to the government&apos;s system)?
                    </p>
                    <div className="flex justify-center">
                    <button
                    className="bg-blue-500 text-white px-20 py-3 m-2 rounded text-3xl"
                    onClick={() => {
                        setResponses({ ...responses, Q9: 'Yes' });
                        setCurrentQuestion(10);
                    }}
                    >
                    Yes
                    </button>
                    <button
                    className="bg-gray-500 text-white px-20 py-3 m-2 rounded text-3xl"
                    onClick={() => {
                        setResponses({ ...responses, Q9: 'No' });
                        setCurrentQuestion(10);
                    }}
                    >
                    No
                    </button>
                    </div>
                </div>
            )}
            {currentQuestion === 10 && (
                <div>
                    <p className="text-4xl font-bold mb-10 text-center leading-relaxed">
                    Are you currently connected to LHDN (IRB) systems for tax reporting or invoicing?
                    </p>
                    <div className="flex flex-col items-start">
                    <button
                    className="bg-blue-500 text-white px-20 py-3 m-2 rounded text-3xl"
                    onClick={() => {
                        setResponses({ ...responses, Q10: 'Yes' });
                        setCurrentQuestion(11);
                    }}
                    >
                    Yes
                    </button>
                    <button
                    className="bg-gray-500 text-white px-20 py-3 m-2 rounded text-3xl"
                    onClick={() => {
                        setResponses({ ...responses, Q10: 'No' });
                        setCurrentQuestion(11);
                    }}
                    >
                    No
                    </button>
                    <button
                    className="bg-blue-500 text-white px-20 py-3 m-2 rounded text-3xl"
                    onClick={() => {
                        setResponses({ ...responses, Q10: 'Not sure' });
                        setCurrentQuestion(11);
                    }}
                    >
                    Not sure
                    </button>
                    </div>
                </div>
            )}
            {currentQuestion === 11 && (
                <div>
                    <p className="text-4xl font-bold mb-10 text-center leading-relaxed">
                    Do you want personalized software recommendations or resources to help you comply with the e-invoicing mandate?
                    </p>
                    <div className="flex justify-center">
                        <button
                            className="bg-blue-500 text-white px-20 py-3 m-2 rounded text-3xl"
                            onClick={() => {
                                setResponses({ ...responses, Q11: 'Yes' });
                                setCurrentQuestion(12);
                            }}
                        >
                            Yes
                        </button>
                        <button
                            className="bg-gray-500 text-white px-20 py-3 m-2 rounded text-3xl"
                            onClick={() => {
                                setResponses({ ...responses, Q11: 'No' });
                                setCurrentQuestion(12);
                            }}
                        >
                            No
                        </button>
                    </div>
                </div>
            )}
            {currentQuestion === 12 && (
                <div>
                    <p className="text-4xl font-bold mb-10 text-center leading-relaxed">
                    Thank you for completing the assessment!
                    </p>
                    <p className="text-2xl mb-4 text-center">Your responses:</p>
                    <pre className="bg-gray-100 p-4 rounded-lg overflow-auto text-lg">{JSON.stringify(responses, null, 2)}</pre>
                    {/* You can replace this with a more user-friendly summary */}
                </div>
            )}
            {showFollowUp && (
                <div className={`mt-4 text-3xl text-center ${fadeClass}`}>
                    <p>
                        {responses.Q1 === 'No' 
                            ? "No problem! Come back whenever you’re ready." 
                            : "Thanks for your response! Let's proceed."}
                    </p>
                </div>
            )}

        </div>
    </div>
  );
};

export default Questionnaire;
