import { Component } from "react";
import Table from "react-bootstrap/Table";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import TodoService from "../service/TodoService";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCheck,
  faPlus,
  faRotateRight,
} from "@fortawesome/free-solid-svg-icons";
import TodoRow from "./TodoRow";
import Loader from "./Loader";

class TodoList extends Component {
  state = {
    isLoading: true,
    isNewItemFormVisible: false,
    todos: [],
    dueDate: "",
    name: "",
    description: "",
  };

  componentDidMount = () => {
    this.findAllTodos();
  };

  findAllTodos = () => {
    this.setState({ isLoading: true });
    TodoService()
      .findAll()
      .then((todoList) => {
        console.log(todoList);
        this.setState({ todos: todoList, isLoading: false });
      });
  };

  createTodo = () => {
    const body = JSON.stringify({
      name: this.state.name,
      description: this.state.description,
      dueDate: this.state.dueDate,
    });
    TodoService()
      .create(body)
      .then((todo) => {
        const todoList = this.state.todos;
        todoList.push(todo);
        this.setState({ todos: todoList, isNewItemFormVisible: false });
      });
  };

  updateTodo = (id, newBody) => {
    TodoService()
      .updateById(id, newBody)
      .then((updatedTodo) => {
        const todoList = this.state.todos;
        const updateIndex = todoList.findIndex((todo) => todo.id === id);
        todoList[updateIndex] = updatedTodo;
        this.setState({
          todos: todoList,
        });
      });
  };

  deleteTodo = (id) => {
    TodoService()
      .deleteById(id)
      .then(() => {
        const todoList = this.state.todos.filter((todo) => todo.id !== id);
        this.setState({
          todos: todoList,
        });
      });
  };

  render() {
    return (
      <Table bordered hover responsive>
        <thead>
          <tr>
            <th className="center id">#</th>
            <th className="date">Due date</th>
            <th className="name">Name</th>
            <th className="description">Descripton</th>
            <th className="actions">Actions</th>
          </tr>
        </thead>
        <tbody>
          {this.state.isLoading ? (
            <tr>
              <td colSpan="5" className="center">
                <Loader />
              </td>
            </tr>
          ) : (
            this.state.todos.map((todo) => (
              <TodoRow
                key={todo.id}
                id={todo.id}
                name={todo.name}
                description={todo.description}
                dueDate={todo.dueDate}
                updateTodo={this.updateTodo}
                deleteTodo={this.deleteTodo}
              />
            ))
          )}
          {this.state.isNewItemFormVisible ? (
            <tr>
              <td></td>
              <td>
                <Form.Control
                  value={this.state.dueDate}
                  type="Date"
                  placeholder="Date"
                  onChange={(e) => this.setState({ dueDate: e.target.value })}
                />
              </td>
              <td>
                <Form.Control
                  value={this.state.name}
                  type="Name"
                  placeholder="Name"
                  onChange={(e) => this.setState({ name: e.target.value })}
                />
              </td>
              <td>
                <Form.Control
                  value={this.state.description}
                  type="Description"
                  placeholder="Description"
                  onChange={(e) =>
                    this.setState({ description: e.target.value })
                  }
                />
              </td>
              <td className="actions">
                <Button className="btn btn-success" onClick={this.createTodo}>
                  <FontAwesomeIcon icon={faCheck} />
                </Button>
                <Button
                  className="btn btn-warning"
                  onClick={() => this.setState({ isNewItemFormVisible: false })}
                >
                  <FontAwesomeIcon icon={faRotateRight} />
                </Button>
              </td>
            </tr>
          ) : (
            <tr>
              <td colSpan="5" className="right">
                <Button
                  className="btn btn-success"
                  onClick={() => this.setState({ isNewItemFormVisible: true })}
                >
                  <FontAwesomeIcon icon={faPlus} />
                </Button>
              </td>
            </tr>
          )}
        </tbody>
      </Table>
    );
  }
}
export default TodoList;
