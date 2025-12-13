"use client"

import Editor from 'react-simple-wysiwyg';
import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { Button, ListGroup, ListGroupItem, Form, Nav, NavItem, NavLink } from "react-bootstrap";
import { FaPlus, FaTrash, FaEdit } from "react-icons/fa";
import * as client from "../../client";

export default function QuestionsEditor() {
  const { cid, qid } = useParams();
  const router = useRouter();
  const [questions, setQuestions] = useState<any[]>([]);
  const [editingQuestion, setEditingQuestion] = useState<any>(null);
  const [activeTab, setActiveTab] = useState("questions");

  useEffect(() => {
    fetchQuestions();
  }, []);

  const fetchQuestions = async () => {
    const questionsData = await client.findQuestionsForQuiz(qid as string);
    setQuestions(questionsData);
  };

  const handleAddQuestion = () => {
    const newQuestion = {
      type: "multiple-choice",
      title: "New Question",
      points: 0,
      question: "",
      choices: [
        { text: "", isCorrect: false },
        { text: "", isCorrect: false },
      ],
      blanks: [
        {
          blankNumber: 1,
          correctAnswers: [""],
        }
      ],
      caseSensitive: false,
    };
    setEditingQuestion(newQuestion);
  };

  const handleCancelEdit = () => {
    setEditingQuestion(null);
    fetchQuestions();
  };

  const handleSaveQuestion = async () => {
    if (!editingQuestion.title || editingQuestion.title.trim() === "") {
      alert("Please enter a question title");
      return;
    }
    
    if (!editingQuestion.question || editingQuestion.question.trim() === "") {
      alert("Please enter the question text");
      return;
    }
    
    if (editingQuestion.points === 0 || editingQuestion.points === null) {
      alert("Please enter points for this question");
      return;
    }

    if (editingQuestion.type === "multiple-choice") {
      const hasEmptyChoices = editingQuestion.choices.some((c: any) => !c.text || c.text.trim() === "");
      if (hasEmptyChoices) {
        alert("Please fill in all choice options");
        return;
      }
      
      const hasCorrectAnswer = editingQuestion.choices.some((c: any) => c.isCorrect);
      if (!hasCorrectAnswer) {
        alert("Please select at least one correct answer");
        return;
      }
    }

    if (editingQuestion.type === "true-false") {
      if (!editingQuestion.correctAnswer) {
        alert("Please select True or False as the correct answer");
        return;
      }
    }

    if (editingQuestion.type === "fill-in-blank") {
      for (const blank of editingQuestion.blanks) {
        const hasValidAnswer = blank.correctAnswers.some((a: string) => a && a.trim() !== "");
        if (!hasValidAnswer) {
          alert(`Please enter at least one correct answer for Blank ${blank.blankNumber}`);
          return;
        }
        blank.correctAnswers = blank.correctAnswers.filter((a: string) => a && a.trim() !== "");
      }
    }

    try {
      if (editingQuestion._id) {
        await client.updateQuestion(editingQuestion._id, editingQuestion);
        setQuestions(questions.map((q) => (q._id === editingQuestion._id ? editingQuestion : q)));
      } else {
        const saved = await client.createQuestion(qid as string, editingQuestion);
        setQuestions([...questions, saved]);
      }
      setEditingQuestion(null);
      fetchQuestions();
    } catch (error) {
      console.error("Error saving question:", error);
      alert("Failed to save question. Please make sure all fields are filled correctly.");
    }
  };

  const handleSaveAndPublish = async () => {
    try {
      const quizData = await client.findQuizById(qid as string);
      await client.updateQuiz({ ...quizData, published: true });
      router.push(`/Courses/${cid}/Quizzes`);
    } catch (error) {
      console.error("Error publishing quiz:", error);
      alert("Failed to publish quiz.");
    }
  };

  const handleDeleteQuestion = async (questionId: string) => {
    await client.deleteQuestion(questionId);
      setQuestions(questions.filter((q) => q._id !== questionId));
  };

  const handleAddChoice = () => {
    setEditingQuestion({
      ...editingQuestion,
      choices: [...editingQuestion.choices, { text: "", isCorrect: false }],
    });
  };

  const handleRemoveChoice = (index: number) => {
    const newChoices = editingQuestion.choices.filter((_: any, i: number) => i !== index);
    setEditingQuestion({ ...editingQuestion, choices: newChoices });
  };

  const handleChoiceChange = (index: number, text: string) => {
    const newChoices = editingQuestion.choices.map((choice: any, i: number) =>
      i === index ? { ...choice, text } : choice
    );
    setEditingQuestion({ ...editingQuestion, choices: newChoices });
  };

  const handleCorrectChoiceChange = (index: number) => {
    const newChoices = editingQuestion.choices.map((choice: any, i: number) =>
      i === index ? { ...choice, isCorrect: !choice.isCorrect } : choice
    );
    setEditingQuestion({ ...editingQuestion, choices: newChoices });
  };

  // Fill-in-blank handlers
  const handleAddBlank = () => {
    const newBlanks = [...editingQuestion.blanks];
    const newBlankNumber = newBlanks.length + 1;
    newBlanks.push({
      blankNumber: newBlankNumber,
      correctAnswers: [""],
    });
    setEditingQuestion({ ...editingQuestion, blanks: newBlanks });
  };

  const handleRemoveBlank = (blankIndex: number) => {
    const newBlanks = editingQuestion.blanks.filter((_: any, i: number) => i !== blankIndex);
    newBlanks.forEach((blank: any, index: number) => {
      blank.blankNumber = index + 1;
    });
    setEditingQuestion({ ...editingQuestion, blanks: newBlanks });
  };

  const handleAddAnswerToBlank = (blankIndex: number) => {
    const newBlanks = [...editingQuestion.blanks];
    newBlanks[blankIndex].correctAnswers.push("");
    setEditingQuestion({ ...editingQuestion, blanks: newBlanks });
  };

  const handleRemoveAnswerFromBlank = (blankIndex: number, answerIndex: number) => {
    const newBlanks = [...editingQuestion.blanks];
    newBlanks[blankIndex].correctAnswers = newBlanks[blankIndex].correctAnswers.filter(
      (_: string, i: number) => i !== answerIndex
    );
    setEditingQuestion({ ...editingQuestion, blanks: newBlanks });
  };

  const handleAnswerChangeInBlank = (blankIndex: number, answerIndex: number, value: string) => {
    const newBlanks = [...editingQuestion.blanks];
    newBlanks[blankIndex].correctAnswers[answerIndex] = value;
    setEditingQuestion({ ...editingQuestion, blanks: newBlanks });
  };

  useEffect(() => {
    if (activeTab === "details") {
      router.push(`/Courses/${cid}/Quizzes/${qid}/edit`);
    }
  }, [activeTab]);

  const totalPoints = questions.reduce((sum, q) => sum + (q.points || 0), 0);

  const renderEditor = () => {
    if (editingQuestion.type === "fill-in-blank" && !editingQuestion.blanks) {
      if (editingQuestion.correctAnswers) {
        editingQuestion.blanks = [{
          blankNumber: 1,
          correctAnswers: editingQuestion.correctAnswers,
        }];
      } else if (editingQuestion.correctAnswer) {
        editingQuestion.blanks = [{
          blankNumber: 1,
          correctAnswers: editingQuestion.correctAnswer.split(",").map((a: string) => a.trim()),
        }];
      } else {
        editingQuestion.blanks = [{
          blankNumber: 1,
          correctAnswers: [""],
        }];
      }
      if (editingQuestion.caseSensitive === undefined) {
        editingQuestion.caseSensitive = false;
      }
    }

    return (
      <div className="border rounded p-4 mb-3" style={{ backgroundColor: "#f8f9fa" }}>
        <h5 className="mb-3">{editingQuestion._id ? "Edit Question" : "New Question"}</h5>
        <Form>
            <Form.Group className="mb-3">
                <Form.Label>Question Type</Form.Label>
                <Form.Select
                value={editingQuestion.type}
                onChange={(e) => setEditingQuestion({ ...editingQuestion, type: e.target.value })}
                >
                <option value="multiple-choice">Multiple Choice</option>
                <option value="true-false">True/False</option>
                <option value="fill-in-blank">Fill in the Blank</option>
                </Form.Select>
            </Form.Group>

            <Form.Group className="mb-3">
                <Form.Label>Title</Form.Label>
                <Form.Control
                type="input text"
                value={editingQuestion.title}
                onChange={(e) => setEditingQuestion({ ...editingQuestion, title: e.target.value })}
                />
            </Form.Group>

            <Form.Group className="mb-3">
                <Form.Label>Points</Form.Label>
                <Form.Control
                type="input number"
                value={editingQuestion.points || 0}
                onChange={(e) => setEditingQuestion({ ...editingQuestion, points: parseInt(e.target.value) || 0 })}
                />
            </Form.Group>

            <Form.Group className="mb-3">
                <Form.Label>Question</Form.Label>
                {editingQuestion.type === "fill-in-blank" && (
                    <Form.Text className="d-block mb-2 text-info">
                    Use [blank1], [blank2], etc. in your question text to indicate where blanks should appear.
                    Example: "The capital of France is [blank1] and the capital of Italy is [blank2]."
                    </Form.Text>
                )}
                <Editor
                    value={editingQuestion.question || ""}
                    onChange={(e: any) => setEditingQuestion({ ...editingQuestion, question: e.target.value })}
                    containerProps={{ style: { minHeight: '150px', border: '1px solid #ced4da', borderRadius: '0.375rem' } }}
                />
            </Form.Group>

            {editingQuestion.type === "multiple-choice" && (
            <>
              <Form.Label>Choices (Check all correct answers)</Form.Label>
              {editingQuestion.choices.map((choice: any, index: number) => (
                <div key={index} className="d-flex align-items-center mb-2">
                  <Form.Check
                    type="checkbox"
                    checked={choice.isCorrect}
                    onChange={() => handleCorrectChoiceChange(index)}
                    className="me-2"
                  />
                  <Form.Control
                    type="textarea"
                    value={choice.text}
                    onChange={(e) => handleChoiceChange(index, e.target.value)}
                    className="me-2"
                    placeholder={`Choice ${index + 1}`}
                  />
                  <Button variant="danger" size="sm" onClick={() => handleRemoveChoice(index)}>
                    <FaTrash />
                  </Button>
                </div>
              ))}
              <Button variant="secondary" size="sm" onClick={handleAddChoice} className="mb-3">
                Add Choice
              </Button>
              {editingQuestion.choices.filter((c: any) => c.isCorrect).length > 1 && (
                <div className="alert alert-info">
                  <small>Multiple correct answers selected. Points will be split equally among correct answers.</small>
                </div>
              )}
            </>
          )}

          {editingQuestion.type === "true-false" && (
            <Form.Group className="mb-3">
              <Form.Label>Correct Answer</Form.Label>
              <Form.Check
                type="radio"
                label="True"
                name="truefalse"
                checked={editingQuestion.correctAnswer === "True"}
                onChange={() => setEditingQuestion({ ...editingQuestion, correctAnswer: "True" })}
              />
              <Form.Check
                type="radio"
                label="False"
                name="truefalse"
                checked={editingQuestion.correctAnswer === "False"}
                onChange={() => setEditingQuestion({ ...editingQuestion, correctAnswer: "False" })}
              />
            </Form.Group>
          )}

          {editingQuestion.type === "fill-in-blank" && (
            <>
              <div className="mb-3">
                <div className="d-flex justify-content-between align-items-center mb-2">
                  <Form.Label className="mb-0">Blanks</Form.Label>
                  <Button variant="secondary" size="sm" onClick={handleAddBlank}>
                    <FaPlus className="me-1" />
                    Add Blank
                  </Button>
                </div>

                {editingQuestion.blanks.map((blank: any, blankIndex: number) => (
                  <div key={blankIndex} className="border rounded p-3 mb-3" style={{ backgroundColor: "#ffffff" }}>
                    <div className="d-flex justify-content-between align-items-center mb-2">
                      <strong>Blank {blank.blankNumber}</strong>
                      {editingQuestion.blanks.length > 1 && (
                        <Button 
                          variant="outline-danger" 
                          size="sm" 
                          onClick={() => handleRemoveBlank(blankIndex)}
                        >
                          Remove Blank
                        </Button>
                      )}
                    </div>

                    <Form.Label className="small">Possible Correct Answers for Blank {blank.blankNumber}</Form.Label>
                    {blank.correctAnswers.map((answer: string, answerIndex: number) => (
                      <div key={answerIndex} className="d-flex align-items-center mb-2">
                        <Form.Control
                          type="text"
                          value={answer}
                          onChange={(e) => handleAnswerChangeInBlank(blankIndex, answerIndex, e.target.value)}
                          className="me-2"
                          placeholder={`Answer ${answerIndex + 1} for blank ${blank.blankNumber}`}
                        />
                        <Button 
                          variant="danger" 
                          size="sm" 
                          onClick={() => handleRemoveAnswerFromBlank(blankIndex, answerIndex)}
                        >
                          <FaTrash />
                        </Button>
                      </div>
                    ))}
                    <Button 
                      variant="outline-secondary" 
                      size="sm" 
                      onClick={() => handleAddAnswerToBlank(blankIndex)}
                    >
                      Add Answer to Blank {blank.blankNumber}
                    </Button>
                  </div>
                ))}
              </div>
              
              <Form.Group className="mb-3">
                <Form.Check
                  type="checkbox"
                  label="Case Sensitive"
                  checked={editingQuestion.caseSensitive || false}
                  onChange={(e) => setEditingQuestion({ ...editingQuestion, caseSensitive: e.target.checked })}
                />
                <Form.Text className="text-muted">
                  When unchecked, answers will be matched regardless of case (e.g., "Paris" = "paris")
                </Form.Text>
              </Form.Group>

              {editingQuestion.blanks.length > 1 && (
                <div className="alert alert-info">
                  <small>Points will be split equally among all blanks. Each blank must be filled correctly to earn points for that blank.</small>
                </div>
              )}
            </>
          )}

          <div className="d-flex gap-2">
            <Button variant="secondary" onClick={handleCancelEdit}>
              Cancel
            </Button>
            <Button variant="danger" onClick={handleSaveQuestion}>
              Save Question
            </Button>
            <Button variant="success" onClick={handleSaveAndPublish}>
              Save & Publish
            </Button>
          </div>
        </Form>
      </div>
    );
  };

  return (
    <div id="wd-questions-editor" className="p-3">
      <Nav variant="tabs" className="mb-3">
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

      <div className="d-flex justify-content-between align-items-center mb-3">
        <h4>Total Points: {totalPoints}</h4>
        <Button variant="danger" onClick={handleAddQuestion}>
          <FaPlus className="me-2" />
          New Question
        </Button>
      </div>

      <ListGroup className="mb-3">
        {questions.map((question, index) => (
          <div key={question._id}>
            <ListGroupItem className="d-flex justify-content-between align-items-center">
              <div>
                <strong>{question.title}</strong> - {question.points} pts
                <div className="small text-muted">{question.type}</div>
              </div>
              <div>
                <Button variant="warning" size="sm" className="me-2" onClick={() => setEditingQuestion(question)}>
                  <FaEdit />
                </Button>
                <Button variant="danger" size="sm" onClick={() => handleDeleteQuestion(question._id)}>
                  <FaTrash />
                </Button>
              </div>
            </ListGroupItem>
            
            {editingQuestion && editingQuestion._id === question._id && (
              <div className="p-3">
                {renderEditor()}
              </div>
            )}
          </div>
        ))}
      </ListGroup>
    
      {editingQuestion && !editingQuestion._id && renderEditor()}
    </div>
  );
}