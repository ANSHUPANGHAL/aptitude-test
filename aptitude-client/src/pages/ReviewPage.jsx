
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/ReviewPage.css';

function ReviewPage() {
  const navigate = useNavigate();
  const [questions, setQuestions] = useState([]);
  const [answers, setAnswers] = useState({});
  const [flagged, setFlagged] = useState([]);

  useEffect(() => {
    const q = JSON.parse(localStorage.getItem('questions')) || [];
    const a = JSON.parse(localStorage.getItem('answers')) || {};
    const f = JSON.parse(localStorage.getItem('flagged')) || [];

    if (!q.length) return navigate('/');

    setQuestions(q);
    setAnswers(a);
    setFlagged(f);
  }, [navigate]);

  const getStatus = (index, id) => {
    const isAnswered = Boolean(answers[id]);
    const isFlagged = flagged.includes(index);
    if (isFlagged && !isAnswered) return 'Flagged';
    if (isFlagged && isAnswered) return 'Answered-Flagged';
    if (isAnswered) return 'Answered';
    return 'Skipped';
  };

  const answeredCount = questions.length ? questions.filter(q => answers[q._id]).length : 0;
  const flaggedOnlyCount = flagged.length && questions.length ? flagged.filter(i => !answers[questions[i]?._id]).length : 0;
  const skippedCount = questions.length ? questions.length - answeredCount : 0;

  const handleFinalSubmit = async () => {
  if (answeredCount !== questions.length) {
    alert("Please answer all questions before submitting.");
    return;
  }

  const name = localStorage.getItem("name");
  const email = localStorage.getItem("email");
  const company = localStorage.getItem("company");
  const timeTaken = localStorage.getItem("timeTaken") || null;
  const token = localStorage.getItem("token");

  try {
    // ✅ Fetch full questions with correctAnswer
    const resQuestions = await fetch("http://localhost:5050/api/questions/full", {
      headers: {
        "Authorization": `Bearer ${token}`
      }
    });

    const fullQuestions = await resQuestions.json();

    // ✅ Calculate score using correctAnswer
    const scoreData = {
      English: 0,
      MathsReasoning: 0,
      Aptitude: 0,
      total: 0
    };

    fullQuestions.forEach(q => {
      const userAnswer = answers[q._id];
      if (userAnswer) {
        const isCorrect = userAnswer === q.correctAnswer;
        const score = isCorrect ? 2 : -1;
        scoreData[q.section] += score;
        scoreData.total += score;
      }
    });

    localStorage.setItem("score", JSON.stringify(scoreData));

    // ✅ Submit result to backend
    const res = await fetch("http://localhost:5050/api/submit-test", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`
      },
      body: JSON.stringify({
        name,
        email,
        company,
        score: scoreData,
        timeTaken
      })
    });

    const data = await res.json();

    if (!res.ok) {
      throw new Error(data.message || "Failed to submit test");
    }

    console.log("✅ Test submitted:", data);
    navigate('/result');
  } catch (error) {
    console.error("❌ Error submitting test:", error);
    alert("Failed to submit test. Please try again.");
  }
};


  const jumpToQuestion = (index) => {
    localStorage.setItem("jumpTo", index);
    localStorage.setItem("returnToReview", "true");
    navigate("/quiz");
  };

  if (!questions.length) return <div>Loading review page...</div>;

  return (
    <div className="review-container">
      <h2>Review Your Responses</h2>
      <div className="review-grid">
        {questions.map((q, index) => (
          <div
            key={index}
            className={`review-item ${getStatus(index, q._id).toLowerCase()}`}
            onClick={() => jumpToQuestion(index)}
            style={{ cursor: 'pointer' }}
          >
            Q{index + 1}: {getStatus(index, q._id).replace('-', ' ')}
          </div>
        ))}
      </div>

      <div className="review-summary">
        <p>✅ Answered: {answeredCount}</p>
        <p>🚩 Flagged: {flaggedOnlyCount}</p>
        <p>⚠️ Skipped: {skippedCount}</p>
      </div>

      <button
        className="final-submit-btn"
        onClick={handleFinalSubmit}
      >
        Submit Final Test
      </button>
    </div>
  );
}

export default ReviewPage;

