import { Component } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faTrash,
  faPenToSquare,
  faCheck,
  faRotateRight,
} from "@fortawesome/free-solid-svg-icons";

class TodoRow extends Component {
  state = {
    isEditMode: this.props.isEditMode || false,
    dueDate: this.props.dueDate,
    name: this.props.name,
    description: this.props.description,
  };

  componentDidMount = () => {
    this.setTodoValues();
  };

  getTodoBody = () => {
    return JSON.stringify({
      name: this.state.name,
      description: this.state.description,
      dueDate: this.state.dueDate,
    });
  };

  setTodoValues = () => {
    this.setState({
      dueDate: this.props.dueDate || "",
      name: this.props.name || "",
      description: this.props.description || undefined,
    });
  };

  render() {
    return this.state.isEditMode ? (
      <tr>
        <td className="min">{this.props.id}</td>
        <td className="min">
          <Form.Control
            onChange={(e) => this.setState({ dueDate: e.target.value })}
            value={this.state.dueDate}
            type="Date"
            placeholder="Date"
          />
        </td>
        <td>
          <Form.Control
            onChange={(e) => this.setState({ name: e.target.value })}
            value={this.state.name}
            placeholder="Description"
          />
        </td>
        <td>
          <Form.Control
            onChange={(e) => this.setState({ description: e.target.value })}
            value={this.state.description}
            type="input"
            placeholder="Description"
          />
        </td>
        <td className="min right">
          <Button
            className="btn btn-success"
            onClick={(e) => {
              this.setState({ isEditMode: false });
              this.props.updateTodo(this.props.id, this.getTodoBody());
            }}
          >
            <FontAwesomeIcon icon={faCheck} />
          </Button>
          <Button
            className="btn btn-warning"
            onClick={(e) => this.setState({ isEditMode: false })}
          >
            <FontAwesomeIcon icon={faRotateRight} />
          </Button>
        </td>
      </tr>
    ) : (
      <tr>
        <td className="min">{this.props.id}</td>

        <td className="min">{this.state.dueDate}</td>
        <td>{this.state.name}</td>
        <td>{this.state.description}</td>
        <td className="min right">
          <Button
            className="btn btn-primary"
            onClick={(e) => {
              this.setState({ isEditMode: true });
              this.setTodoValues();
            }}
          >
            <FontAwesomeIcon icon={faPenToSquare} />
          </Button>
          <Button
            className="btn btn-danger"
            onClick={() => this.props.deleteTodo(this.props.id)}
          >
            <FontAwesomeIcon icon={faTrash} />
          </Button>
        </td>
      </tr>
    );
  }
}

export default TodoRow;
