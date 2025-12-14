"use client"

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { Button, Form, Card, Alert, ButtonGroup } from "react-bootstrap";
import { useSelector } from "react-redux";
import * as quizzesClient from "../../client";

interface AccountState {
  currentUser: any;
}

export default function TakeQuiz() {
  const { cid, qid } = useParams();
  const router = useRouter();
  const { currentUser } = useSelector((state: { accountReducer: AccountState }) => state.accountReducer);
  const [quiz, setQuiz] = useState<any>(null);
  const [questions, setQuestions] = useState<any[]>([]);
  const [answers, setAnswers] = useState<any>({});
  const [attempts, setAttempts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    await fetchQuizData();
    await fetchAttempts();
    setLoading(false);
  };

  const fetchQuizData = async () => {
    const quizData = await quizzesClient.findQuizById(qid as string);
    const questionsData = await quizzesClient.findQuestionsForQuiz(qid as string);
    setQuiz(quizData);
    setQuestions(quizData.shuffleAnswers ? shuffleArray(questionsData) : questionsData);
    return quizData;
  };

  const fetchAttempts = async () => {
    try {
      const attemptsData = await quizzesClient.findAttemptsForQuiz(qid as string);
      setAttempts(attemptsData);
      
      const quizData = quiz || await quizzesClient.findQuizById(qid as string);
      
      const now = new Date();
      now.setHours(0, 0, 0, 0);
      const dueDate = new Date(quizData.dueDate);
      dueDate.setHours(0, 0, 0, 0);
      dueDate.setDate(dueDate.getDate() + 1);
      
      if (now >= dueDate && attemptsData.length === 0) {
        const zeroAttempt = {
          attempt: 1,
          score: 0,
          answers: [],
          submittedAt: new Date().toISOString(),
        };
        await quizzesClient.submitQuizAttempt(qid as string, zeroAttempt);
        router.push(`/Courses/${cid}/Quizzes/${qid}/Results`);
        return;
      } else if (now >= dueDate && attemptsData.length > 0) {
        router.push(`/Courses/${cid}/Quizzes/${qid}/Results`);
        return;
      }
      
      if (!quizData.multipleAttempts && attemptsData.length >= 1) {
        router.push(`/Courses/${cid}/Quizzes/${qid}/Results`);
        return;
      } else if (quizData.multipleAttempts && attemptsData.length >= quizData.howManyAttempts) {
        router.push(`/Courses/${cid}/Quizzes/${qid}/Results`);
        return;
      }
    } catch (error) {
      const quizData = quiz || await quizzesClient.findQuizById(qid as string);
      const now = new Date();
      now.setHours(0, 0, 0, 0);
      const dueDate = new Date(quizData.dueDate);
      dueDate.setHours(0, 0, 0, 0);
      dueDate.setDate(dueDate.getDate() + 1);
      
      if (now >= dueDate) {
        const zeroAttempt = {
          attempt: 1,
          score: 0,
          answers: [],
          submittedAt: new Date().toISOString(),
        };
        await quizzesClient.submitQuizAttempt(qid as string, zeroAttempt);
        router.push(`/Courses/${cid}/Quizzes/${qid}/Results`);
      }
    }
  };

  const shuffleArray = (array: any[]) => {
    return [...array].sort(() => Math.random() - 0.5);
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

  const handleSubmit = async () => {
    if (!currentUser) {
      alert("Please sign in to submit quiz");
      return;
    }

    const now = new Date();
    now.setHours(0, 0, 0, 0);
    const dueDate = new Date(quiz.dueDate);
    dueDate.setHours(0, 0, 0, 0);
    dueDate.setDate(dueDate.getDate() + 1);
    
    if (now >= dueDate) {
      alert("This quiz is past the due date and can no longer be submitted.");
      router.push(`/Courses/${cid}/Quizzes`);
      return;
    }

    let calculatedScore = 0;
    const answersArray = questions.map((question) => {
      const userAnswer = answers[question._id];
      let isCorrect = false;
      let earnedPoints = 0;

      if (question.type === "multiple-choice") {
        const correctChoices = question.choices.filter((c: any) => c.isCorrect);
        
        if (correctChoices.length === 1) {

          isCorrect = userAnswer === correctChoices[0]?.text;
          earnedPoints = isCorrect ? question.points : 0;
        } else {
          const userAnswers = Array.isArray(userAnswer) ? userAnswer : (userAnswer ? [userAnswer] : []);
          const correctTexts = correctChoices.map((c: any) => c.text);
          
          const correctSelected = userAnswers.filter((ans: string) => correctTexts.includes(ans)).length;
          const incorrectSelected = userAnswers.filter((ans: string) => !correctTexts.includes(ans)).length;
          
          if (correctSelected > 0 && incorrectSelected === 0) {
            earnedPoints = (correctSelected / correctChoices.length) * question.points;
            isCorrect = correctSelected === correctChoices.length;
          }
        }
      } else if (question.type === "true-false") {
        isCorrect = userAnswer === question.correctAnswer;
        earnedPoints = isCorrect ? question.points : 0;
      } else if (question.type === "fill-in-blank") {
        if (question.blanks && question.blanks.length > 0) {
          const pointsPerBlank = question.points / question.blanks.length;
          
          question.blanks.forEach((blank: any) => {
            const userBlankAnswer = userAnswer?.[blank.blankNumber];
            if (userBlankAnswer) {
              const correctAnswers = blank.correctAnswers;
              const isCaseSensitive = question.caseSensitive || false;
              
              const blankIsCorrect = isCaseSensitive
                ? correctAnswers.includes(userBlankAnswer)
                : correctAnswers.some((ans: string) => ans.toLowerCase() === userBlankAnswer.toLowerCase());
              
              if (blankIsCorrect) {
                earnedPoints += pointsPerBlank;
              }
            }
          });
          
          isCorrect = question.blanks.every((blank: any) => {
            const userBlankAnswer = userAnswer?.[blank.blankNumber];
            if (!userBlankAnswer) return false;
            const isCaseSensitive = question.caseSensitive || false;
            return isCaseSensitive
              ? blank.correctAnswers.includes(userBlankAnswer)
              : blank.correctAnswers.some((ans: string) => ans.toLowerCase() === userBlankAnswer.toLowerCase());
          });
        } else {
          const correctAnswers = question.correctAnswers || 
            (question.correctAnswer ? question.correctAnswer.split(",").map((a: string) => a.trim()) : []);
          const isCaseSensitive = question.caseSensitive || false;
          
          isCorrect = isCaseSensitive
            ? correctAnswers.includes(userAnswer)
            : correctAnswers.some((ans: string) => ans.toLowerCase() === userAnswer?.toLowerCase());
          
          earnedPoints = isCorrect ? question.points : 0;
        }
      }

      calculatedScore += earnedPoints;

      return {
        questionId: question._id,
        answer: userAnswer,
        isCorrect,
        earnedPoints,
      };
    });

    const attempt = {
      attempt: attempts.length + 1,
      score: calculatedScore,
      answers: answersArray,
      submittedAt: new Date().toISOString(),
    };

    await quizzesClient.submitQuizAttempt(qid as string, attempt);
    router.push(`/Courses/${cid}/Quizzes/${qid}/Results`);
  };

  const renderQuestionText = (questionText: string) => {
    return questionText.replace(/\[blank(\d+)\]/gi, (match, number) => `<strong>[Blank ${number}]</strong>`);
  };

  if (loading || !quiz) return <div className="p-3">Loading...</div>;

  const currentQuestion = questions[currentQuestionIndex];
  const hasMultipleCorrect = currentQuestion?.type === "multiple-choice" && 
    currentQuestion.choices.filter((c: any) => c.isCorrect).length > 1;

  return (
    <div id="wd-take-quiz" className="p-3">
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h2>{quiz.title}</h2>
        <div>
          <span className="me-3">Attempt {attempts.length + 1} of {quiz.howManyAttempts}</span>
          <span>Time Limit: {quiz.timeLimit} minutes</span>
        </div>
      </div>

      {quiz.accessCode && (
        <Alert variant="info">
          Access Code Required: Please enter the access code to continue.
        </Alert>
      )}
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

      {currentQuestion && (
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
                  <div className="alert alert-info mb-3 mt-3">
                    <small>Select all that apply</small>
                  </div>
                )}
                <Form className="mt-3">
                  {currentQuestion.choices.map((choice: any, idx: number) => (
                    <div key={`${currentQuestion._id}-${idx}`} className="mb-2">
                      <Form.Check
                        type={hasMultipleCorrect ? "checkbox" : "radio"}
                        id={`q-${currentQuestion._id}-c-${idx}`}
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
              <Form className="mt-3">
                <div className="mb-2">
                  <Form.Check
                    type="radio"
                    id={`q-${currentQuestion._id}-true`}
                    label="True"
                    name={`question-${currentQuestion._id}`}
                    checked={answers[currentQuestion._id] === "True"}
                    onChange={() => handleAnswerChange(currentQuestion._id, "True")}
                  />
                </div>
                <div className="mb-2">
                  <Form.Check
                    type="radio"
                    id={`q-${currentQuestion._id}-false`}
                    label="False"
                    name={`question-${currentQuestion._id}`}
                    checked={answers[currentQuestion._id] === "False"}
                    onChange={() => handleAnswerChange(currentQuestion._id, "False")}
                  />
                </div>
              </Form>
            )}

            {currentQuestion.type === "fill-in-blank" && (
              <div className="mt-3">
                {currentQuestion.blanks && currentQuestion.blanks.length > 0 ? (
                  // New multi-blank format
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
                  // Old single-blank format
                  <Form.Control
                    type="text"
                    value={answers[currentQuestion._id] || ""}
                    onChange={(e) => handleAnswerChange(currentQuestion._id, e.target.value)}
                    placeholder="Enter your answer"
                  />
                )}
              </div>
            )}
          </Card.Body>
        </Card>
      )}

      <div className="d-flex gap-2">
        <Button variant="secondary" onClick={() => router.push(`/Courses/${cid}/Quizzes`)}>
          Cancel
        </Button>
        {currentQuestionIndex === questions.length - 1 && (
          <Button variant="primary" onClick={handleSubmit}>
            Submit Quiz
          </Button>
        )}
      </div>
    </div>
  );
}