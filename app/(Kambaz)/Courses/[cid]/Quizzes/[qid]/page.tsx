"use client";
import { useParams, useRouter } from "next/navigation";
import * as client from "../client";
import { useSelector } from "react-redux";
import { Alert, Button } from "react-bootstrap";
import { useEffect, useState } from "react";

export default function Quiz() {
  const {cid, qid} = useParams();
  const router = useRouter();
  const { currentUser } = useSelector((state: any) => state.accountReducer);
  const [quiz, setQuiz] = useState<any>();
  const [questions, setQuestions] = useState<any[]>([]);
  const [latestAttempt, setLatestAttempt] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const isFaculty = currentUser?.role === "FACULTY";

  useEffect(() => {
    fetchQuizData();
  }, []);

  const fetchQuizData = async () => {
    const quiz = await client.findQuizById(qid as string);
    setQuiz(quiz);
    const questions = await client.findQuestionsForQuiz(qid as string);
    setQuestions(questions);
    if (!isFaculty) {
      try {
        const attemptData = await client.findLatestAttempt(qid as string);
        setLatestAttempt(attemptData);
      } catch (error) {
        // do nothing.
      }
    }
    setLoading(false);
  }

  if (loading || !quiz) return <div>...</div>;

  const handlePublishToggle = async () => {
    try {
      await client.publishQuiz(qid as string);
      setQuiz({ ...quiz, published: !quiz.published });
    } catch (error) {
      console.error("Error toggling publish status:", error);
    }
  };

  const isPastDueDate = () => {
    if (!quiz) return false;
    const now = new Date();
    now.setHours(0, 0, 0, 0);
    const dueDate = new Date(quiz.dueDate);
    dueDate.setHours(0, 0, 0, 0);
    dueDate.setDate(dueDate.getDate() + 1);
    return now > dueDate;
  };

  const totalPoints = questions.reduce((sum, q) => sum + q.points, 0);

  

  return (
    <div id="wd-quiz-details">
      {isFaculty && (
        <div className="d-flex justify-content-end gap-2 mb-4">
          <Button 
            variant={quiz.published ? "danger" : "success"}
            onClick={handlePublishToggle}
          >
            {quiz.published ? "Unpublish" : "Publish"}
          </Button>
          <Button 
            variant="outline-secondary" 
            onClick={() => router.push(`/Courses/${cid}/Quizzes/${qid}/Preview`)}
          >
            Preview
          </Button>
          <Button 
            variant="outline-secondary" 
            onClick={() => router.push(`/Courses/${cid}/Quizzes/${qid}/Edit`)}
          >
            Edit
          </Button>
        </div>
      )}
      <div className="border rounded p-4 mb-4" style={{ backgroundColor: "#f8f9fa" }}>
        <h3 className="mb-4">{quiz.title}</h3>
        <table className="w-100" style={{ borderCollapse: "separate", borderSpacing: "0 10px" }}>
          <tbody>
            <tr>
              <td className="text-end pe-4" style={{ width: "30%", fontWeight: 600 }}>Quiz Type</td>
              <td>{quiz.quizType}</td>
            </tr>
            <tr>
              <td className="text-end pe-4" style={{ fontWeight: 600 }}>Points</td>
              <td>{totalPoints}</td>
            </tr>
            <tr>
              <td className="text-end pe-4" style={{ fontWeight: 600 }}>Assignment Group</td>
              <td>{quiz.assignmentGroup}</td>
            </tr>
            <tr>
              <td className="text-end pe-4" style={{ fontWeight: 600 }}>Shuffle Answers</td>
              <td>{quiz.shuffleAnswers ? "Yes" : "No"}</td>
            </tr>
            <tr>
              <td className="text-end pe-4" style={{ fontWeight: 600 }}>Time Limit</td>
              <td>{quiz.timeLimit} Minutes</td>
            </tr>
            <tr>
              <td className="text-end pe-4" style={{ fontWeight: 600 }}>Multiple Attempts</td>
              <td>{quiz.multipleAttempts ? "Yes" : "No"}</td>
            </tr>
            {quiz.multipleAttempts && (
              <tr>
                <td className="text-end pe-4" style={{ fontWeight: 600 }}>How Many Attempts</td>
                <td>{quiz.howManyAttempts}</td>
              </tr>
            )}
            <tr>
              <td className="text-end pe-4" style={{ fontWeight: 600 }}>Show Correct Answers</td>
              <td>{quiz.showCorrectAnswers}</td>
            </tr>
            <tr>
              <td className="text-end pe-4" style={{ fontWeight: 600 }}>Access Code</td>
              <td>{quiz.accessCode || "None"}</td>
            </tr>
            <tr>
              <td className="text-end pe-4" style={{ fontWeight: 600 }}>One Question at a Time</td>
              <td>{quiz.oneQuestionAtTime ? "Yes" : "No"}</td>
            </tr>
            <tr>
              <td className="text-end pe-4" style={{ fontWeight: 600 }}>Webcam Required</td>
              <td>{quiz.webcamRequired ? "Yes" : "No"}</td>
            </tr>
            <tr>
              <td className="text-end pe-4" style={{ fontWeight: 600 }}>Lock Questions After Answering</td>
              <td>{quiz.lockQuestionsAfterAnswering ? "Yes" : "No"}</td>
            </tr>
          </tbody>
        </table>
        <table className="w-100 mt-4 border-top pt-3">
          <thead>
            <tr style={{ fontWeight: 600 }}>
              <th className="pb-2">Due</th>
              <th className="pb-2">For</th>
              <th className="pb-2">Available from</th>
              <th className="pb-2">Until</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>{quiz.dueDate}</td>
              <td>Everyone</td>
              <td>{quiz.availableDate}</td>
              <td>{quiz.untilDate}</td>
            </tr>
          </tbody>
        </table>
        {!isFaculty && latestAttempt && (
          <Alert variant="info" className="mt-4 mb-0">
            <strong>Your Latest Attempt:</strong> Score {latestAttempt.score}/{totalPoints} (Attempt {latestAttempt.attempt})
          </Alert>
        )}
      </div>
      {!isFaculty && (
        <div className="d-flex gap-2">
          {latestAttempt ? (
            <>
              <Button 
                variant="danger" 
                onClick={() => router.push(`/Courses/${cid}/Quizzes/${qid}/Results`)}
              >
                View Results
              </Button>
              
              {!isPastDueDate() && quiz.multipleAttempts && latestAttempt.attempt < quiz.howManyAttempts && (
                <Button 
                  variant="secondary" 
                  onClick={() => router.push(`/Courses/${cid}/Quizzes/${qid}/Take`)}
                >
                  Retake Quiz ({latestAttempt.attempt}/{quiz.howManyAttempts} attempts)
                </Button>
              )}
            </>
          ) : isPastDueDate() ? (
            <Alert variant="danger" className="mb-0">
              Quiz not attempted - Due date has passed
            </Alert>
          ) : (
            <Button 
              variant="danger" 
              onClick={() => router.push(`/Courses/${cid}/Quizzes/${qid}/Take`)}
            >
              Take Quiz
            </Button>
          )}
        </div>
      )}
    </div>
  );
}