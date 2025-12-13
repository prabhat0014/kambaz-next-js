"use client"

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { Button, Form, Card, ButtonGroup } from "react-bootstrap";
import * as client from "../../client";

export default function QuizPreview() {
  const { cid, qid } = useParams();
  const router = useRouter();
  const [quiz, setQuiz] = useState<any>(null);
  const [questions, setQuestions] = useState<any[]>([]);
  const [answers, setAnswers] = useState<any>({});
  const [showResults, setShowResults] = useState(false);
  const [score, setScore] = useState(0);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);

  

  useEffect(() => {
    fetchQuizData();
  }, []);

  const fetchQuizData = async () => {
    const quizData = await client.findQuizById(qid as string);
    const questionsData = await client.findQuestionsForQuiz(qid as string);
    setQuiz(quizData);
    setQuestions(questionsData);
  };

  const handleMultipleChoiceChange = (questionId: string, choiceText: string, hasMultipleCorrect: boolean) => {
    if (hasMultipleCorrect) {
      setAnswers((prev: any) => {
        const currentAnswers = prev[questionId] || [];
        const isSelected = currentAnswers.includes(choiceText);
        
        if (isSelected) {
          return {
            ...prev,
            [questionId]: currentAnswers.filter((ans: string) => ans !== choiceText)
          };
        } else {
          return {
            ...prev,
            [questionId]: [...currentAnswers, choiceText]
          };
        }
      });
    } else {
      setAnswers((prev: any) => ({
        ...prev,
        [questionId]: choiceText
      }));
    }
  };

  const handleAnswerChange = (questionId: string, answer: string, blankNumber?: number) => {
    if (blankNumber !== undefined) {
      setAnswers((prev: any) => ({
        ...prev,
        [questionId]: {
          ...(prev[questionId] || {}),
          [blankNumber]: answer
        }
      }));
    } else {
      setAnswers((prev: any) => ({
        ...prev,
        [questionId]: answer
      }));
    }
  };

  const handleSubmit = () => {
    let calculatedScore = 0;
    questions.forEach((question) => {
      const userAnswer = answers[question._id];
      
      if (question.type === "multiple-choice") {
        const correctChoices = question.choices.filter((c: any) => c.isCorrect);
        
        if (correctChoices.length === 1) {
          if (userAnswer === correctChoices[0]?.text) {
            calculatedScore += question.points;
          }
        } else {
          const userAnswers = Array.isArray(userAnswer) ? userAnswer : (userAnswer ? [userAnswer] : []);
          const correctTexts = correctChoices.map((c: any) => c.text);
          
          const correctSelected = userAnswers.filter((ans: string) => correctTexts.includes(ans)).length;
          const incorrectSelected = userAnswers.filter((ans: string) => !correctTexts.includes(ans)).length;
          
          if (correctSelected > 0 && incorrectSelected === 0) {
            calculatedScore += (correctSelected / correctChoices.length) * question.points;
          }
        }
      } else if (question.type === "true-false") {
        if (userAnswer === question.correctAnswer) {
          calculatedScore += question.points;
        }
      } else if (question.type === "fill-in-blank") {
        if (question.blanks && question.blanks.length > 0) {
          const pointsPerBlank = question.points / question.blanks.length;
          
          question.blanks.forEach((blank: any) => {
            const userBlankAnswer = userAnswer?.[blank.blankNumber];
            if (userBlankAnswer) {
              const correctAnswers = blank.correctAnswers;
              const isCaseSensitive = question.caseSensitive || false;
              
              const isCorrect = isCaseSensitive
                ? correctAnswers.includes(userBlankAnswer)
                : correctAnswers.some((ans: string) => ans.toLowerCase() === userBlankAnswer.toLowerCase());
              
              if (isCorrect) {
                calculatedScore += pointsPerBlank;
              }
            }
          });
        } else {
          const correctAnswers = question.correctAnswers || 
            (question.correctAnswer ? question.correctAnswer.split(",").map((a: string) => a.trim()) : []);
          const isCaseSensitive = question.caseSensitive || false;
          
          const isCorrect = isCaseSensitive
            ? correctAnswers.includes(userAnswer)
            : correctAnswers.some((ans: string) => ans.toLowerCase() === userAnswer?.toLowerCase());
          
          if (isCorrect) {
            calculatedScore += question.points;
          }
        }
      }
    });
    setScore(calculatedScore);
    setShowResults(true);
  };

  const isCorrect = (question: any) => {
    const userAnswer = answers[question._id];
    
    if (question.type === "multiple-choice") {
      const correctChoices = question.choices.filter((c: any) => c.isCorrect);
      if (correctChoices.length === 1) {
        return userAnswer === correctChoices[0]?.text;
      } else {
        const userAnswers = Array.isArray(userAnswer) ? userAnswer : (userAnswer ? [userAnswer] : []);
        const correctTexts = correctChoices.map((c: any) => c.text);
        const correctSelected = userAnswers.filter((ans: string) => correctTexts.includes(ans)).length;
        const incorrectSelected = userAnswers.filter((ans: string) => !correctTexts.includes(ans)).length;
        return correctSelected === correctTexts.length && incorrectSelected === 0;
      }
    } else if (question.type === "true-false") {
      return userAnswer === question.correctAnswer;
    } else if (question.type === "fill-in-blank") {
      // Handle new multi-blank format
      if (question.blanks && question.blanks.length > 0) {
        return question.blanks.every((blank: any) => {
          const userBlankAnswer = userAnswer?.[blank.blankNumber];
          if (!userBlankAnswer) return false;
          
          const correctAnswers = blank.correctAnswers;
          const isCaseSensitive = question.caseSensitive || false;
          
          return isCaseSensitive
            ? correctAnswers.includes(userBlankAnswer)
            : correctAnswers.some((ans: string) => ans.toLowerCase() === userBlankAnswer.toLowerCase());
        });
      } else {
        const correctAnswers = question.correctAnswers || 
          (question.correctAnswer ? question.correctAnswer.split(",").map((a: string) => a.trim()) : []);
        const isCaseSensitive = question.caseSensitive || false;
        
        return isCaseSensitive
          ? correctAnswers.includes(userAnswer)
          : correctAnswers.some((ans: string) => ans.toLowerCase() === userAnswer?.toLowerCase());
      }
    }
    return false;
  };

  const renderQuestionText = (questionText: string) => {
    return questionText.replace(/\[blank(\d+)\]/g, (match, number) => `[Blank ${number}]`);
  };

  const totalPoints = questions.reduce((sum, q) => sum + q.points, 0);

  if (!quiz) return <div className="p-3">Loading...</div>;

  const currentQuestion = questions[currentQuestionIndex];
  const hasMultipleCorrect = currentQuestion?.type === "multiple-choice" && 
    currentQuestion.choices.filter((c: any) => c.isCorrect).length > 1;

  return (
    <div id="wd-quiz-preview" className="p-3">
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h2>{quiz.title} - Preview</h2>
        <Button variant="secondary" onClick={() => router.push(`/Courses/${cid}/Quizzes/${qid}`)}>
          Back to Quiz Details
        </Button>
      </div>

      {showResults && (
        <Card className="mb-3 bg-light">
          <Card.Body>
            <h4>Preview Results</h4>
            <p>Score: {score.toFixed(2)} / {totalPoints}</p>
            <p>Percentage: {((score / totalPoints) * 100).toFixed(2)}%</p>
          </Card.Body>
        </Card>
      )}

      {!showResults && currentQuestion && (
        <>
          <div className="d-flex justify-content-between align-items-center mb-3">
            <h5>Question {currentQuestionIndex + 1} of {questions.length}</h5>
            <ButtonGroup>
              <Button 
                variant="outline-secondary" 
                disabled={currentQuestionIndex === 0}
                onClick={() => setCurrentQuestionIndex(currentQuestionIndex - 1)}
              >
                Previous
              </Button>
              <Button 
                variant="outline-secondary" 
                disabled={currentQuestionIndex === questions.length - 1}
                onClick={() => setCurrentQuestionIndex(currentQuestionIndex + 1)}
              >
                Next
              </Button>
            </ButtonGroup>
          </div>
          <Card className="mb-3">
            <Card.Body>
              <div className="d-flex justify-content-between mb-3">
                <h5>Question {currentQuestionIndex + 1}</h5>
                <span>{currentQuestion.points} pts</span>
              </div>
              <div dangerouslySetInnerHTML={{ __html: renderQuestionText(currentQuestion.question) }} />

              {currentQuestion.type === "multiple-choice" && (
                <>
                  {hasMultipleCorrect && (
                    <div className="alert alert-info mb-3">
                      <small>Select all that apply</small>
                    </div>
                  )}
                  <Form>
                    {currentQuestion.choices.map((choice: any, idx: number) => (
                      <div key={`${currentQuestion._id}-${idx}`} className="mb-2">
                        <Form.Check
                          type={hasMultipleCorrect ? "checkbox" : "radio"}
                          id={`preview-q-${currentQuestion._id}-c-${idx}`}
                          label={choice.text}
                          name={hasMultipleCorrect ? undefined : `question-${currentQuestion._id}`}
                          checked={
                            hasMultipleCorrect
                              ? (answers[currentQuestion._id] || []).includes(choice.text)
                              : answers[currentQuestion._id] === choice.text
                          }
                          onChange={() => handleMultipleChoiceChange(currentQuestion._id, choice.text, hasMultipleCorrect)}
                        />
                      </div>
                    ))}
                  </Form>
                </>
              )}

              {currentQuestion.type === "true-false" && (
                <Form>
                  <div className="mb-2">
                    <Form.Check
                      type="radio"
                      id={`preview-q-${currentQuestion._id}-true`}
                      label="True"
                      name={`question-${currentQuestion._id}`}
                      checked={answers[currentQuestion._id] === "True"}
                      onChange={() => handleAnswerChange(currentQuestion._id, "True")}
                    />
                  </div>
                  <div className="mb-2">
                    <Form.Check
                      type="radio"
                      id={`preview-q-${currentQuestion._id}-false`}
                      label="False"
                      name={`question-${currentQuestion._id}`}
                      checked={answers[currentQuestion._id] === "False"}
                      onChange={() => handleAnswerChange(currentQuestion._id, "False")}
                    />
                  </div>
                </Form>
              )}

              {currentQuestion.type === "fill-in-blank" && (
                <>
                  {currentQuestion.blanks && currentQuestion.blanks.length > 0 ? (
                    currentQuestion.blanks.map((blank: any, blankIdx: number) => (
                      <Form.Group key={blankIdx} className="mb-3">
                        <Form.Label>Blank {blank.blankNumber}</Form.Label>
                        <Form.Control
                          type="text"
                          value={answers[currentQuestion._id]?.[blank.blankNumber] || ""}
                          onChange={(e) => handleAnswerChange(currentQuestion._id, e.target.value, blank.blankNumber)}
                          placeholder={`Enter answer for blank ${blank.blankNumber}`}
                        />
                      </Form.Group>
                    ))
                  ) : (
                    <Form.Control
                      type="text"
                      value={answers[currentQuestion._id] || ""}
                      onChange={(e) => handleAnswerChange(currentQuestion._id, e.target.value)}
                      placeholder="Enter your answer"
                    />
                  )}
                </>
              )}
            </Card.Body>
          </Card>
          {currentQuestionIndex === questions.length - 1 && (
            <Button variant="primary" onClick={handleSubmit}>
              Submit Preview
            </Button>
          )}
        </>
      )}

      {showResults && (
        <>
          {questions.map((question, index) => {
            const questionHasMultipleCorrect = question.type === "multiple-choice" && 
              question.choices.filter((c: any) => c.isCorrect).length > 1;
            
            return (
              <Card key={question._id} className={`mb-3 ${isCorrect(question) ? 'border-success' : 'border-danger'}`}>
                <Card.Body>
                  <div className="d-flex justify-content-between">
                    <h5>Question {index + 1}</h5>
                    <span>{question.points} pts</span>
                  </div>
                  <div dangerouslySetInnerHTML={{ __html: renderQuestionText(question.question) }} />

                  {question.type === "multiple-choice" && (
                    <div className="mb-2">
                      <strong>Your answer:</strong>{" "}
                      {questionHasMultipleCorrect ? (
                        Array.isArray(answers[question._id]) && answers[question._id].length > 0 
                          ? answers[question._id].join(", ")
                          : <span className="text-muted">Not answered</span>
                      ) : (
                        answers[question._id] || <span className="text-muted">Not answered</span>
                      )}
                    </div>
                  )}

                  {question.type === "true-false" && (
                    <div className="mb-2">
                      <strong>Your answer:</strong> {answers[question._id] || <span className="text-muted">Not answered</span>}
                    </div>
                  )}

                  {question.type === "fill-in-blank" && (
                    <>
                      {question.blanks && question.blanks.length > 0 ? (
                        question.blanks.map((blank: any) => (
                          <div key={blank.blankNumber} className="mb-2">
                            <strong>Blank {blank.blankNumber}:</strong> {answers[question._id]?.[blank.blankNumber] || <span className="text-muted">Not answered</span>}
                          </div>
                        ))
                      ) : (
                        <div className="mb-2">
                          <strong>Your answer:</strong> {answers[question._id] || <span className="text-muted">Not answered</span>}
                        </div>
                      )}
                    </>
                  )}

                  <div className={`mt-2 ${isCorrect(question) ? 'text-success' : 'text-danger'}`}>
                    {isCorrect(question) ? "✓ Correct" : "✗ Incorrect"}
                  </div>
                </Card.Body>
              </Card>
            );
          })}

          <Button variant="secondary" onClick={() => router.push(`/Courses/${cid}/Quizzes/${qid}/Edit`)}>
            Edit Quiz
          </Button>
        </>
      )}
    </div>
  );
}