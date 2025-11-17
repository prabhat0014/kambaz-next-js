import { useDispatch } from "react-redux";
import { deleteTodo, setTodo } from "./todosReducer";
import { ListGroupItem, Button } from "react-bootstrap";
export default function TodoItem({todo} : {
    todo: {id: string, title: string};
}) {
    const dispatch = useDispatch();
    return (
        <ListGroupItem key={todo.id} className="d-flex align-items-center flex-row-reverse justify-content-between">
            <Button onClick={() => dispatch(deleteTodo(todo.id))} id="wd-delete-todo-click" className="me-2 btn btn-primary">
                Delete
            </Button>
            <Button onClick={() => dispatch(setTodo(todo))} id="wd-set-todo-click" className="me-2 btn btn-danger">
                Edit
            </Button>
            <span className="w-75">{todo.title}</span>
        </ListGroupItem>
    );
}