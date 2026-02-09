const URL = "http://localhost:3001/tasks";

const headers = {
  "Content-Type": "application/json", // text(text), bloob(audio)
};

const tasksAPI = {
  get: async () => {
    
    const res = await fetch(URL);
    return await res.json();
  },

  delete: (id) => {
    return fetch(`${URL}/${id}`, {
      method: "DELETE",
    });
  },

  deleteAll: (todos) => {
    return Promise.all(todos.map(({ id }) => tasksAPI.delete(id)));
  },

  complete: async (id, completed) => {
    const res = await fetch(`${URL}/${id}`, {
      method: "PATCH",
      headers,
      body: JSON.stringify({ completed }),
    });
    return await res.json();
  },

  add: async (newTask) => {
    const response = await fetch(URL, {
      method: "POST",
      headers,
      body: JSON.stringify(newTask),
    });
    return await response.json();
  },

  edit: async (id, data) => {
    const res = await fetch(`${URL}/${id}`, {
      method: "PATCH",
      headers,
      body: JSON.stringify(data),
    });
    const editedUser = await res.json();
    return editedUser;
  },

  getById: async (id) => {
    const response = await fetch(`${URL}/${id}`)
    return await response.json()
  },
};

export default tasksAPI;
