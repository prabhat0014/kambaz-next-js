"use client";

import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import * as client from "../../client";
import { Button, Form, Nav, NavItem, NavLink } from "react-bootstrap";
import { HiDotsVertical } from "react-icons/hi";

export default function QuizEditor() {
    const { cid, qid } = useParams();
    const router = useRouter();
    const [activeTab, setActiveTab] = useState("details");
    const [quiz, setQuiz] = useState<any>({
        title: "",
        description: "",
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
        dueDate: "",
        availableDate: "",
        untilDate: "",
        published: false,
    });
    const [questions, setQuestions] = useState<any[]>([]);

    const fetchQuiz = async () => {
        const quizData = await client.findQuizById(qid as string);
        setQuiz(quizData);
    };

    const fetchQuestions = async () => {
        const questionsData = await client.findQuestionsForQuiz(qid as string);
        setQuestions(questionsData);
    };

    useEffect(() => {
        if (qid !== "new") {
        fetchQuiz();
        fetchQuestions();
        }
    }, []);

    const totalPoints = questions.reduce((sum, q) => sum + (q.points || 0), 0);

    const validateDates = () => {
        const availableDate = new Date(quiz.availableDate);
        const dueDate = new Date(quiz.dueDate);
        const untilDate = new Date(quiz.untilDate);

        if (dueDate < availableDate) {
            alert("Due date cannot be before the Available date");
            return false;
        }

        if (untilDate < availableDate) {
            alert("Until date cannot be before the Available date");
            return false;
        }

        if (untilDate < dueDate) {
            alert("Until date should be on or after the Due date");
            return false;
        }

        return true;
    };

    const handleSave = async () => {
        if (!validateDates()) return;
        
        if (qid === "new") {
            await client.createQuizForCourse(cid as string, quiz);
        } else {
            await client.updateQuiz(quiz);
        }
        router.push(`/Courses/${cid}/Quizzes/${qid}`);
    };

    const handleSaveAndPublish = async () => {
        if (!validateDates()) return;
        
        const updatedQuiz = { ...quiz, published: true };
        if (qid === "new") {
            await client.createQuizForCourse(cid as string, updatedQuiz);
        } else {
            await client.updateQuiz(updatedQuiz);
        }
        router.push(`/Courses/${cid}/Quizzes`);
    };

    const handleCancel = () => {
        router.push(`/Courses/${cid}/Quizzes/${qid}`);
    };

    useEffect(() => {
        if (activeTab === "questions") {
            router.push(`/Courses/${cid}/Quizzes/${qid}/questions`);
        }
    }, [activeTab]);

    return (
        <div id="wd-quiz-editor">
            <div className="d-flex justify-content-end align-items-center mb-3 gap-3">
                <span><strong>Points</strong> {totalPoints}</span>
                <span className="text-muted">{quiz.published ? "Published" : "Not Published"}</span>
                <Button variant="link" className="text-dark p-0">
                    <HiDotsVertical />
                </Button>
            </div>
            <Nav variant="tabs" className="mb-4">
                <NavItem>
                    <NavLink active={activeTab === "details"} onClick={() => setActiveTab("details")} style={{ cursor: "pointer" }}>
                        Details
                    </NavLink>
                </NavItem>
                <NavItem>
                    <NavLink active={activeTab === "questions"} onClick={() => setActiveTab("questions")} style={{ cursor: "pointer" }}>
                        Questions
                    </NavLink>
                </NavItem>
            </Nav>
            <Form>
                <Form.Group className="mb-3">
                    <Form.Control
                        type="text"
                        value={quiz.title}
                        onChange={(e) => setQuiz({ ...quiz, title: e.target.value })}
                        style={{ fontSize: "1rem", fontWeight: 500 }}
                    />
                    <Form.Group className="mb-4">
                        <Form.Label>Quiz Instructions:</Form.Label>
                        <div className="border rounded p-2" style={{ minHeight: "100px", backgroundColor: "#fff" }}>
                            <Form.Control
                                as="textarea"
                                rows={4}
                                value={quiz.description}
                                onChange={(e) => setQuiz({ ...quiz, description: e.target.value })}
                                style={{ border: "none", resize: "none" }}
                            />
                        </div>
                    </Form.Group>
                </Form.Group>
                <Form.Group className="row mb-3">
                    <Form.Label className="col-sm-3 col-form-label text-end">Points</Form.Label>
                    <div className="col-sm-9">
                        <Form.Control
                            type="input number"
                            value={quiz.points || 0}
                            onChange={(e) => setQuiz({ ...quiz, points: parseInt(e.target.value) || 0 })}
                        />
                    </div>
                </Form.Group>
                <Form.Group className="row mb-3">
                    <Form.Label className="col-sm-3 col-form-label text-end">Quiz Type</Form.Label>
                    <div className="col-sm-9">
                        <Form.Select
                        value={quiz.quizType}
                        onChange={(e) => setQuiz({ ...quiz, quizType: e.target.value })}
                        >
                        <option>Graded Quiz</option>
                        <option>Practice Quiz</option>
                        <option>Graded Survey</option>
                        <option>Ungraded Survey</option>
                        </Form.Select>
                    </div>
                </Form.Group>
                <Form.Group className="row mb-3">
                    <Form.Label className="col-sm-3 col-form-label text-end">Assignment Group</Form.Label>
                    <div className="col-sm-9">
                        <Form.Select
                        value={quiz.assignmentGroup}
                        onChange={(e) => setQuiz({ ...quiz, assignmentGroup: e.target.value })}
                        >
                        <option>Quizzes</option>
                        <option>Exams</option>
                        <option>Assignments</option>
                        <option>Project</option>
                        </Form.Select>
                    </div>
                </Form.Group>
                <div className="row mb-4">
                    <div className="col-sm-3"></div>
                    <div className="col-sm-9">
                        <h6 className="mb-3">Options</h6>
                        <Form.Group className="mb-3">
                            <Form.Check
                                type="checkbox"
                                label="Shuffle Answers"
                                checked={quiz.shuffleAnswers}
                                onChange={(e) => setQuiz({ ...quiz, shuffleAnswers: e.target.checked })}
                            />
                        </Form.Group>
                        <Form.Group className="row mb-3 align-items-center">
                            <div className="col-auto">
                                <Form.Check
                                type="checkbox"
                                label="Time Limit"
                                checked={quiz.timeLimit > 0}
                                onChange={(e) => setQuiz({ ...quiz, timeLimit: e.target.checked ? 20 : 0 })}
                                />
                            </div>
                            <div className="col-auto">
                                <Form.Control
                                type="input number"
                                value={quiz.timeLimit}
                                onChange={(e) => setQuiz({ ...quiz, timeLimit: parseInt(e.target.value) || 0 })}
                                style={{ width: "80px" }}
                                disabled={quiz.timeLimit === 0}
                                />
                            </div>
                            <div className="col-auto">
                                <span>Minutes</span>
                            </div>
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Check
                                type="checkbox"
                                label="Allow Multiple Attempts"
                                checked={quiz.multipleAttempts}
                                onChange={(e) => setQuiz({ ...quiz, multipleAttempts: e.target.checked })}
                            />
                        </Form.Group>
                        {quiz.multipleAttempts && (
                            <Form.Group className="row mb-3 ms-4">
                                <Form.Label className="col-sm-4 col-form-label">How Many Attempts</Form.Label>
                                <div className="col-sm-8">
                                    <Form.Control
                                        type="number"
                                        value={quiz.howManyAttempts}
                                        onChange={(e) => setQuiz({ ...quiz, howManyAttempts: parseInt(e.target.value) || 1 })}
                                        style={{ width: "100px" }}
                                    />
                                </div>
                            </Form.Group>
                        )}
                    </div>
                </div>
                <Form.Group className="row mb-3">
                    <Form.Label className="col-sm-3 col-form-label text-end">Show Correct Answers</Form.Label>
                    <div className="col-sm-9">
                        <Form.Select
                            value={quiz.showCorrectAnswers}
                            onChange={(e) => setQuiz({ ...quiz, showCorrectAnswers: e.target.value })}
                        >
                        <option>Immediately</option>
                        <option>After Due Date</option>
                        <option>Never</option>
                        </Form.Select>
                    </div>
                </Form.Group>
                <Form.Group className="row mb-3">
                    <Form.Label className="col-sm-3 col-form-label text-end">Access Code</Form.Label>
                    <div className="col-sm-9">
                        <Form.Control
                            type="text"
                            value={quiz.accessCode}
                            onChange={(e) => setQuiz({ ...quiz, accessCode: e.target.value })}
                            placeholder="Optional access code"
                        />
                    </div>
                </Form.Group>
                <Form.Group className="row mb-3">
                    <div className="col-sm-3"></div>
                    <div className="col-sm-9">
                        <Form.Check
                            type="checkbox"
                            label="One Question at a Time"
                            checked={quiz.oneQuestionAtTime}
                            onChange={(e) => setQuiz({ ...quiz, oneQuestionAtTime: e.target.checked })}
                        />
                    </div>
                </Form.Group>
                <Form.Group className="row mb-3">
                    <div className="col-sm-3"></div>
                    <div className="col-sm-9">
                        <Form.Check
                            type="checkbox"
                            label="Webcam Required"
                            checked={quiz.webcamRequired}
                            onChange={(e) => setQuiz({ ...quiz, webcamRequired: e.target.checked })}
                        />
                    </div>
                </Form.Group>
                <Form.Group className="row mb-3">
                    <div className="col-sm-3"></div>
                    <div className="col-sm-9">
                        <Form.Check
                            type="checkbox"
                            label="Lock Questions After Answering"
                            checked={quiz.lockQuestionsAfterAnswering}
                            onChange={(e) => setQuiz({ ...quiz, lockQuestionsAfterAnswering: e.target.checked })}
                        />
                    </div>
                </Form.Group>
                <div className="border rounded p-3 mb-4" style={{ backgroundColor: "#f8f9fa" }}>
                    <h6 className="mb-3">Assign</h6>
                    <Form.Group className="row mb-3">
                        <Form.Label className="col-sm-3 col-form-label text-end">Assign to</Form.Label>
                        <div className="col-sm-9">
                        <div className="border rounded p-2" style={{ backgroundColor: "#fff" }}>
                            <span className="badge bg-secondary">Everyone ✕</span>
                        </div>
                        </div>
                    </Form.Group>
                    <Form.Group className="row mb-3">
                        <Form.Label className="col-sm-3 col-form-label text-end">Due</Form.Label>
                        <div className="col-sm-9">
                        <Form.Control
                            type="input date"
                            value={quiz.dueDate}
                            onChange={(e) => setQuiz({ ...quiz, dueDate: e.target.value })}
                        />
                        </div>
                    </Form.Group>
                    <Form.Group className="row mb-3">
                        <Form.Label className="col-sm-3 col-form-label text-end">Available from</Form.Label>
                        <div className="col-sm-4">
                            <Form.Control
                                type="input date"
                                value={quiz.availableDate}
                                onChange={(e) => setQuiz({ ...quiz, availableDate: e.target.value })}
                            />
                        </div>
                        <Form.Label className="col-sm-1 col-form-label text-end">Until</Form.Label>
                        <div className="col-sm-4">
                            <Form.Control
                                type="input date"
                                value={quiz.untilDate}
                                onChange={(e) => setQuiz({ ...quiz, untilDate: e.target.value })}
                            />
                        </div>
                    </Form.Group>
                    <div className="row">
                        <div className="col-sm-3"></div>
                        <div className="col-sm-9">
                            <Button variant="link" className="text-decoration-none p-0">
                                + Add
                            </Button>
                        </div>
                    </div>
                    <div className="d-flex justify-content-end gap-2 border-top pt-3">
                        <Button variant="outline-secondary" onClick={handleCancel}>
                            Cancel
                        </Button>
                        <Button variant="danger" onClick={handleSave}>
                            Save
                        </Button>
                        <Button variant="danger" onClick={handleSaveAndPublish}>
                            Save & Publish
                        </Button>
                    </div>
                </div>
            </Form>
        </div>
    );

}