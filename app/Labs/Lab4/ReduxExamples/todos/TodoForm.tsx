import { ListGroupItem, FormControl, Button } from "react-bootstrap";
import { useSelector, useDispatch } from "react-redux";
import { addTodo, updateTodo, setTodo } from "./todosReducer";
export default function TodoForm() {
    const { todo } = useSelector((state: any) => state.todosReducer);
    const dispatch = useDispatch();
    return (
        <ListGroupItem className="d-flex align-items-center justify-content-between">
            <FormControl className="me-3" value={todo.title} onChange={(e) => dispatch(setTodo({...todo, title: e.target.value}))} />
            <Button onClick={() => dispatch(addTodo(todo))} id="wd-add-todo-click" className="me-2 btn btn-success">
                Add
            </Button>
            <Button onClick={() => dispatch(updateTodo(todo))} id="wd-update-todo-click" className="me-2 btn btn-warning">
                Update
            </Button>
        </ListGroupItem>
    );
}