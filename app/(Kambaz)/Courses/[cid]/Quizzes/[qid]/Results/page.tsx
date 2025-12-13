"use client"

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { Button, Card, Alert } from "react-bootstrap";
import * as client from "../../client";

export default function QuizResults() {
  const { cid, qid } = useParams();
  const router = useRouter();
  const [quiz, setQuiz] = useState<any>(null);
  const [questions, setQuestions] = useState<any[]>([]);
  const [latestAttempt, setLatestAttempt] = useState<any>(null);
  const [allAttempts, setAllAttempts] = useState<any[]>([]);
  const [noAttempt, setNoAttempt] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchResultsData();
  }, []);

  const fetchResultsData = async () => {
    try {
      const quizData = await client.findQuizById(qid as string);
      const questionsData = await client.findQuestionsForQuiz(qid as string);
      
      setQuiz(quizData);
      setQuestions(questionsData);
      
      try {
        const attemptData = await client.findLatestAttempt(qid as string);
        const allAttemptsData = await client.findAttemptsForQuiz(qid as string);
        setLatestAttempt(attemptData);
        setAllAttempts(allAttemptsData);
        setNoAttempt(false);
      } catch (error) {
        // No attempt - student never took the quiz
        setNoAttempt(true);
      }
      
      setLoading(false);
    } catch (error) {
      console.error("Error fetching results:", error);
      setLoading(false);
    }
  };

  const renderQuestionText = (questionText: string) => {
    return questionText.replace(/\[blank(\d+)\]/gi, (match, number) => `<strong>[Blank ${number}]</strong>`);
  };

  if (loading) return <div className="p-3">Loading...</div>;
  if (!quiz) return <div className="p-3">Quiz not found</div>;

  const totalPoints = questions.reduce((sum, q) => sum + q.points, 0);
  const highestScore = allAttempts.length > 0 
    ? Math.max(...allAttempts.map((a: any) => a.score))
    : 0;

  // Handle case where student never attempted the quiz
  if (noAttempt) {
    return (
      <div id="wd-quiz-results" className="p-3">
        <div className="d-flex justify-content-between align-items-center mb-3">
          <h2>{quiz.title} - Results</h2>
          <Button variant="secondary" onClick={() => router.push(`/Courses/${cid}/Quizzes`)}>
            Back to Quizzes
          </Button>
        </div>

        <Alert variant="danger">
          <h4>Your Score: 0 / {totalPoints}</h4>
          <p>Percentage: 0%</p>
          <p>Status: Not Attempted</p>
          <p>You did not attempt this quiz before the due date.</p>
        </Alert>

        <h4 className="mb-3">Question Results</h4>
        {questions.map((question, index) => (
          <Card key={question._id} className="mb-3 border-danger">
            <Card.Body>
              <div className="d-flex justify-content-between">
                <h5>Question {index + 1}</h5>
                <span>{question.points} pts</span>
              </div>
              <div dangerouslySetInnerHTML={{ __html: renderQuestionText(question.question) }} />

              <p className="mt-3"><strong>Your Answer:</strong> <span className="text-muted">Not Answered</span></p>

              {question.type === "multiple-choice" && (
                <p className="text-success">
                  <strong>Correct Answer(s):</strong> {question.choices.filter((c: any) => c.isCorrect).map((c: any) => c.text).join(", ")}
                </p>
              )}

              {question.type === "true-false" && (
                <p className="text-success">
                  <strong>Correct Answer:</strong> {question.correctAnswer}
                </p>
              )}

              {question.type === "fill-in-blank" && (
                <>
                  {question.blanks && question.blanks.length > 0 ? (
                    question.blanks.map((blank: any) => (
                      <p key={blank.blankNumber} className="text-success">
                        <strong>Blank {blank.blankNumber} - Possible Correct Answers:</strong> {blank.correctAnswers.join(", ")}
                      </p>
                    ))
                  ) : (
                    <p className="text-success">
                      <strong>Possible Correct Answers:</strong> {question.correctAnswers?.join(", ") || question.correctAnswer}
                    </p>
                  )}
                </>
              )}

              <div className="mt-2 fw-bold text-danger">
                ✗ Incorrect (0/{question.points} pts)
              </div>
            </Card.Body>
          </Card>
        ))}
      </div>
    );
  }

  // Normal case - student attempted the quiz
  if (!latestAttempt) return <div className="p-3">Loading attempt data...</div>;

  const percentage = ((latestAttempt.score / totalPoints) * 100).toFixed(2);

  const getQuestionById = (questionId: string) => {
    return questions.find((q) => q._id === questionId);
  };

  const isPastDueDate = () => {
    const now = new Date();
    now.setHours(0, 0, 0, 0);
    const dueDate = new Date(quiz.dueDate);
    dueDate.setHours(0, 0, 0, 0);
    dueDate.setDate(dueDate.getDate() + 1);
    return now >= dueDate;
  };

  return (
    <div id="wd-quiz-results" className="p-3">
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h2>{quiz.title} - Results</h2>
        <Button variant="secondary" onClick={() => router.push(`/Courses/${cid}/Quizzes`)}>
          Back to Quizzes
        </Button>
      </div>

      <Alert variant="info">
        <h4>Latest Attempt Score: {latestAttempt.score.toFixed(2)} / {totalPoints}</h4>
        <p>Percentage: {percentage}%</p>
        <p>Attempt: {latestAttempt.attempt} of {quiz.howManyAttempts}</p>
        {allAttempts.length > 1 && (
          <p><strong>Highest Score:</strong> {highestScore.toFixed(2)} / {totalPoints}</p>
        )}
        <p>Submitted: {new Date(latestAttempt.submittedAt).toLocaleString()}</p>
      </Alert>

      {quiz.showCorrectAnswers === "Immediately" && (
        <>
          <h4 className="mb-3">Question Results</h4>
          {latestAttempt.answers.map((answer: any, index: number) => {
            const question = getQuestionById(answer.questionId);
            if (!question) return null;

            const questionHasMultipleCorrect = question.type === "multiple-choice" && 
              question.choices.filter((c: any) => c.isCorrect).length > 1;

            return (
              <Card key={answer.questionId} className={`mb-3 ${answer.isCorrect ? 'border-success' : 'border-danger'}`}>
                <Card.Body>
                  <div className="d-flex justify-content-between">
                    <h5>Question {index + 1}</h5>
                    <span>{question.points} pts</span>
                  </div>
                  <div dangerouslySetInnerHTML={{ __html: renderQuestionText(question.question) }} />

                  {question.type === "multiple-choice" && (
                    <>
                      <p className="mt-3">
                        <strong>Your Answer:</strong>{" "}
                        {questionHasMultipleCorrect ? (
                          Array.isArray(answer.answer) && answer.answer.length > 0 
                            ? answer.answer.join(", ")
                            : <span className="text-muted">Not Answered</span>
                        ) : (
                          answer.answer || <span className="text-muted">Not Answered</span>
                        )}
                      </p>
                      {!answer.isCorrect && (
                        <p className="text-success">
                          <strong>Correct Answer(s):</strong> {question.choices.filter((c: any) => c.isCorrect).map((c: any) => c.text).join(", ")}
                        </p>
                      )}
                    </>
                  )}

                  {question.type === "true-false" && (
                    <>
                      <p className="mt-3"><strong>Your Answer:</strong> {answer.answer || <span className="text-muted">Not Answered</span>}</p>
                      {!answer.isCorrect && (
                        <p className="text-success">
                          <strong>Correct Answer:</strong> {question.correctAnswer}
                        </p>
                      )}
                    </>
                  )}

                  {question.type === "fill-in-blank" && (
                    <>
                      {question.blanks && question.blanks.length > 0 ? (
                        // Multi-blank format
                        <>
                          {question.blanks.map((blank: any) => (
                            <p key={blank.blankNumber} className="mt-3">
                              <strong>Blank {blank.blankNumber} - Your Answer:</strong>{" "}
                              {typeof answer.answer === 'object' && answer.answer?.[blank.blankNumber]
                                ? answer.answer[blank.blankNumber]
                                : <span className="text-muted">Not Answered</span>}
                            </p>
                          ))}
                          {!answer.isCorrect && question.blanks.map((blank: any) => (
                            <p key={`correct-${blank.blankNumber}`} className="text-success">
                              <strong>Blank {blank.blankNumber} - Possible Correct Answers:</strong> {blank.correctAnswers.join(", ")}
                            </p>
                          ))}
                        </>
                      ) : (
                        // Single blank format
                        <>
                          <p className="mt-3">
                            <strong>Your Answer:</strong>{" "}
                            {typeof answer.answer === 'string' 
                              ? answer.answer 
                              : <span className="text-muted">Not Answered</span>}
                          </p>
                          {!answer.isCorrect && (
                            <p className="text-success">
                              <strong>Possible Correct Answers:</strong> {question.correctAnswers?.join(", ") || question.correctAnswer}
                            </p>
                          )}
                        </>
                      )}
                    </>
                  )}

                  <div className={`mt-2 fw-bold ${answer.isCorrect ? 'text-success' : 'text-danger'}`}>
                    {answer.isCorrect 
                      ? `✓ Correct (${answer.earnedPoints || question.points}/${question.points} pts)` 
                      : `✗ Incorrect (${answer.earnedPoints || 0}/${question.points} pts)`}
                  </div>
                </Card.Body>
              </Card>
            );
          })}
        </>
      )}

      {!isPastDueDate() && quiz.multipleAttempts && latestAttempt.attempt < quiz.howManyAttempts && (
        <Button variant="primary" onClick={() => router.push(`/Courses/${cid}/Quizzes/${qid}/take`)}>
          Take Quiz Again
        </Button>
      )}
    </div>
  );
}