import React, { useState } from 'react';
import { asrsQuestions, options, getScoreCategory } from '../../data/assessment';
import '../../styles/comic-style.scss';

const SelfAssessment = () => {
    const [answers, setAnswers] = useState({});
    const [isSubmitted, setIsSubmitted] = useState(false);

    const handleOptionChange = (questionId, value) => {
        setAnswers(prev => ({
            ...prev,
            [questionId]: value
        }));
    };

    const calculateScores = () => {
        let scoreA = 0;
        let scoreB = 0;

        asrsQuestions.forEach(q => {
            const val = answers[q.id] || 0;
            if (q.part === 'A') scoreA += val;
            else scoreB += val;
        });

        return { scoreA, scoreB, total: scoreA + scoreB };
    };

    const handleSubmit = () => {
        // Validation: ensure all questions answered?
        if (Object.keys(answers).length < asrsQuestions.length) {
            alert("Please answer all questions before submitting.");
            return;
        }
        setIsSubmitted(true);
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    const resetForm = () => {
        setAnswers({});
        setIsSubmitted(false);
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    if (isSubmitted) {
        const { scoreA, scoreB, total } = calculateScores();
        const catA = getScoreCategory(scoreA, 'A');
        const catB = getScoreCategory(scoreB, 'B');

        return (
            <div className="container mt-5 pt-5 mb-5 pb-5">
                <div className="comic-panel tilt-left">
                    <h1 className="display-4 text-center mb-4">Assessment Results</h1>

                    <div className="row justify-content-center">
                        <div className="col-md-8">
                            <div className="alert alert-warning border-3 border-dark" role="alert">
                                <strong>Disclaimer:</strong> This is a screening tool, not a diagnosis.
                                Please consult a healthcare professional for a proper evaluation.
                            </div>

                            <div className="card border-3 border-dark mb-4 shadow">
                                <div className="card-body">
                                    <h3 className="card-title">Part A (Screener)</h3>
                                    <p className="lead">Score: <strong>{scoreA} / 24</strong></p>
                                    <p>Indication: <span className={`badge ${scoreA >= 14 ? 'bg-danger' : 'bg-success'}`}>{catA}</span></p>
                                    <small className="text-muted">Part A contains the 6 most predictive questions.</small>
                                </div>
                            </div>

                            <div className="card border-3 border-dark mb-4 shadow">
                                <div className="card-body">
                                    <h3 className="card-title">Part B (Additional Symptoms)</h3>
                                    <p className="lead">Score: <strong>{scoreB} / 48</strong></p>
                                    <p>Indication: <span className={`badge ${scoreB >= 27 ? 'bg-warning text-dark' : 'bg-success'}`}>{catB}</span></p>
                                </div>
                            </div>

                            <div className="text-center mt-4">
                                <button className="btn comic-btn-primary btn-lg" onClick={resetForm}>Take Again</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="container mt-5 pt-5 mb-5 pb-5">
            <div className="comic-panel">
                <h1 className="display-4 text-center mb-4">Adult ADHD Self-Report Scale (ASRS-v1.1)</h1>
                <p className="lead text-center mb-5">
                    Please answer the questions below based on how you have felt and conducted yourself over the past 6 months.
                </p>

                <div className="row justify-content-center">
                    <div className="col-lg-10">
                        {asrsQuestions.map((q, index) => (
                            <div key={q.id} className="mb-5 p-4 border-bottom border-dark">
                                <div className="d-flex align-items-start mb-3">
                                    <span className="badge bg-dark text-white me-3 rounded-circle p-2" style={{ width: '40px', height: '40px', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                                        {index + 1}
                                    </span>
                                    <h4 style={{ fontFamily: 'var(--font-body)' }}>{q.question}</h4>
                                </div>

                                <div className="d-flex flex-wrap justify-content-between gap-2">
                                    {options.map((opt) => (
                                        <label
                                            key={opt.value}
                                            className={`btn flex-grow-1 text-start ${answers[q.id] === opt.value ? 'comic-btn-primary' : 'btn-outline-dark'}`}
                                            style={{
                                                borderWidth: '2px',
                                                transform: answers[q.id] === opt.value ? 'translate(-2px, -2px)' : 'none',
                                                boxShadow: answers[q.id] === opt.value ? '4px 4px 0px black' : 'none',
                                                fontWeight: answers[q.id] === opt.value ? 'bold' : 'normal'
                                            }}
                                        >
                                            <input
                                                type="radio"
                                                name={`question-${q.id}`}
                                                value={opt.value}
                                                checked={answers[q.id] === opt.value}
                                                onChange={() => handleOptionChange(q.id, opt.value)}
                                                className="d-none"
                                            />
                                            {opt.label}
                                        </label>
                                    ))}
                                </div>
                            </div>
                        ))}

                        <div className="text-center mt-5">
                            <button
                                className="btn comic-btn-secondary btn-lg w-50"
                                onClick={handleSubmit}
                                disabled={Object.keys(answers).length < asrsQuestions.length}
                            >
                                See Results
                            </button>
                            {Object.keys(answers).length < asrsQuestions.length && (
                                <p className="text-danger mt-2">Please answer all questions to proceed.</p>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SelfAssessment;
