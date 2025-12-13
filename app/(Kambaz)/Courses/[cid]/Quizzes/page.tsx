"use client";
import { useSelector } from "react-redux";
import { Button, Dropdown } from "react-bootstrap";
import { FaEllipsisV, FaCheckCircle } from "react-icons/fa";
import * as client from "./client";
import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";

export default function Quizzes() {
    const { cid } = useParams();
    const router = useRouter();
    const { currentUser } = useSelector((state: any) => state.accountReducer);
    const [quizzes, setQuizzes] = useState<any[]>([]);
    const isFaculty = currentUser?.role === "FACULTY";

    const fetchQuizzes = async () => {
        const quizzes = await client.findQuizzesForCourse(cid as string);

        const displayQuizzes = isFaculty ? quizzes : quizzes.filter((q: any) => q.published);

        const sortedQuizzes = displayQuizzes.sort((a: any, b: any) => {
            const dueDateA = new Date(a.dueDate).getTime();
            const dueDateB = new Date(b.dueDate).getTime();
            return dueDateA - dueDateB;
        });
        setQuizzes(sortedQuizzes);
    }

    useEffect(() => {
        fetchQuizzes();
    }, []);

    const [quiz, setQuiz] = useState<any>({
            title: "New Quiz",
            course: cid,
            quizType: "Graded Quiz",
            points: 0,
            assignmentGroup: "Quizzes",
            shuffleAnswers: true,
            timeLimit: 20,
            multipleAttempts: false,
            howManyAttempts: 1,
            showCorrectAnswers: "Immediately",
            accessCode: "",
            oneQuestionAtTime: true,
            webcamRequired: false,
            lockQuestionsAfterAnswering: false,
            dueDate: new Date().toISOString().split('T')[0],
            availableDate: new Date().toISOString().split('T')[0],
            untilDate: new Date().toISOString().split('T')[0],
            published: false,
        });

    const onAddQuiz = async (quiz: any) => {
        const newQuiz = await client.createQuizForCourse(cid as string, quiz);
        fetchQuizzes();
        router.push(`/Courses/${cid}/Quizzes/${newQuiz._id}/edit`);
    };

    const onDeleteQuiz = async (quizId: string) => {
        await client.deleteQuiz(quizId);
        fetchQuizzes();
    };

    const onPublishQuiz = async (quizId: string) => {
        await client.publishQuiz(quizId);
        fetchQuizzes();
    }

    console.log("quizzes: ", quizzes);

    return (
        <div id="wd-quizzes">
            <div className="d-flex justify-content-between align-items-center mb-4">
                <h2>Quizzes</h2>
                {isFaculty && (
                    <Button variant="danger" onClick={onAddQuiz}>
                        + Quiz
                    </Button>
                )}
            </div>
            {quizzes.length === 0 && (
                <div className="text-center p-5 border rounded bg-light">
                    <p className="text-muted mb-0">
                        No quizzes yet. {isFaculty && " Click + Quiz to create one!"}
                    </p>
                </div>
            )}
            <div className="border rounded">
                <div className="d-flex justify-content-between align-items-center p-3 border-bottom" style={{cursor: "pointer", borderLeft: "4px solid #28a745"}}>
                    <div className="flex-grow-1">
                        <div className="d-flex align-items-center mb-2">
                            <FaCheckCircle className="text-success me-3 fs-5" />
                            <h5 className="mb-0">
                                Quiz Title
                            </h5>
                        </div>
                        <div className="text-muted small" style={{ marginLeft: "2.5rem" }}>
                            <span className="fw-semibold">Available</span>
                            <span className="mx-2">|</span>
                            <span><strong>Due</strong> 2025-12-14</span>
                            <span className="mx-2">|</span>
                            <span>100 pts</span>
                            <span className="mx-2">|</span>
                            <span>10 Questions</span>
                            {/* <>
                                <span className="mx-2">|</span>
                                <span className="text-muted fw-semibold">Not Attempted</span>
                            </> */}
                        </div>
                    </div>
                    <Dropdown>
                        <Dropdown.Toggle variant="link" className="text-dark p-0">
                            <FaEllipsisV />
                        </Dropdown.Toggle>
                        <Dropdown.Menu align="end">
                            <Dropdown.Item>
                                Edit
                            </Dropdown.Item>
                            <Dropdown.Item>
                                Delete
                            </Dropdown.Item>
                            <Dropdown.Item>
                                Published
                            </Dropdown.Item>
                        </Dropdown.Menu>
                    </Dropdown>
                </div>
            </div>
        </div>
    );
}