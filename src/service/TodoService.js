import { Buffer } from "buffer";

function TodoService() {
  const headers = {
    Authorization:
      "Basic " + Buffer.from("andre:labasvakaras").toString("base64"),
    "Content-Type": "application/json",
  };

  const findAll = async () => {
    const response = await fetch(
      "https://itacademy-todo-api-test.herokuapp.com/api/todos",
      {
        headers: headers,
      }
    );
    return await response.json();
  };

  const deleteById = async (id) => {
    const response = await fetch(
      `https://itacademy-todo-api-test.herokuapp.com/api/todos/${id}`,
      {
        headers: headers,
        method: "DELETE",
      }
    );
    return await response;
  };

  const updateById = async (id, body) => {
    const response = await fetch(
      `https://itacademy-todo-api-test.herokuapp.com/api/todos/${id}`,
      {
        headers: headers,
        method: "PUT",
        body: body,
      }
    );
    return await response.json();
  };

  const create = async (body) => {
    const response = await fetch(
      `https://itacademy-todo-api-test.herokuapp.com/api/todos`,
      {
        headers: headers,
        method: "POST",
        body: body,
      }
    );
    return await response.json();
  };

  return {
    findAll: findAll,
    deleteById: deleteById,
    updateById: updateById,
    create: create,
  };
}

export default TodoService;
