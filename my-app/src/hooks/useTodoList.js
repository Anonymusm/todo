import { useRef, useEffect, useReducer, useCallback, useState } from "react";
import { nanoid } from "nanoid";
import tasksAPI from "./tasksAPI";

const tasksReducer = (state, action) => {
  switch (action.type) {
    case "GET":
      return { ...state, todos: action.todos };

    case "ADD_QUERY":
      return { ...state, newTaskQuery: action.addQuery };

    case "SEARCH_QUERY":
      return { ...state, searchQuery: action.searchQuery };

    case "COMPLETE":
      return {
        ...state,
        todos: state.todos.map((todo) =>
          todo.id === action.id
            ? { ...todo, completed: action.todo.completed }
            : todo,
        ),
      };

    case "ADD":
      return {
        ...state,
        todos: [...state.todos, action.todo],
        newTaskQuery: "",
      };

    case "DELETE":
      return {
        ...state,
        todos: state.todos.filter((todo) => todo.id !== action.deleteById),
      };

    case "DELETE_ALL":
      return { ...state, todos: [] };

    case "EDIT":
      return {
        ...state,
        todos: state.todos.map((todo) =>
          todo.id === action.id
            ? {
                ...todo,
                title: action.todo.title,
                isEditing: false,
                editQuery: "",
              }
            : todo,
        ),
      };

    case "TOGGLE_EDIT":
      return {
        ...state,
        todos: state.todos.map((todo) =>
          todo.id === action.id
            ? { ...todo, editQuery: todo.title, isEditing: !todo.isEditing }
            : todo,
        ),
      };

    case "EDIT_QUERY":
      return {
        ...state,
        todos: state.todos.map((todo) =>
          todo.id === action.id
            ? { ...todo, editQuery: action.editQuery }
            : todo,
        ),
      };

    case "ERROR":
      return {
        ...state,
        error: new Error("Error by loading todos."),
      };

    case "LOADING":
      return {
        ...state,
        isLoading: false,
      };

    default:
      return state;
  }
};

export default function useTodoList() {
  const initialState = {
    newTaskQuery: "",
    todos: [],
    searchQuery: "",
    isLoading: true,
    error: null,
  };

  const [state, dispatch] = useReducer(tasksReducer, initialState);

  const [disAppearingTaskId, setDisAppearingTaskId] = useState(null);
  const [appearingTaskId, setAppearingTaskId] = useState(null);
  const firstIncompleteRef = useRef(null);
  const find = state.todos.find((todo) => !todo.completed)?.id;

  useEffect(() => {
    tasksAPI
      .get()
      .then((fetchedTodos) => dispatch({ type: "GET", todos: fetchedTodos }))
      .catch(() => dispatch({ type: "ERROR" }))
      .finally(() => dispatch({ type: "LOADING" }));
  }, []);

  const handleNewTaskChange = (e) => {
    dispatch({ type: "ADD_QUERY", addQuery: e.target.value });
  };

  const handleSearchChange = (e) => {
    dispatch({ type: "SEARCH_QUERY", searchQuery: e.target.value });
  };

  const handleEditChange = useCallback((id, value) => {
    dispatch({ type: "EDIT_QUERY", id, editQuery: value });
  }, []);

  const handleCompleteChange = useCallback((id, e) => {
    const completed = e.target.checked;

    tasksAPI.complete(id, completed).then((updatedTodo) => {
      dispatch({ type: "COMPLETE", todo: updatedTodo, id: id });
    });
  }, []);

  const toggleEdit = (id) => {
    const todo = state.todos.find((t) => t.id === id);
    const data = { title: todo.editQuery || todo.title };

    if (todo.isEditing) {
      tasksAPI
        .edit(id, data)
        .then((todo) => dispatch({ type: "EDIT", todo: todo, id }));
    } else {
      dispatch({ type: "TOGGLE_EDIT", id });
    }
  };

  const addTask = () => {
    const trimmed = state.newTaskQuery.trim();

    // Якщо порожньо або тільки пробіли — нічого не додаємо
    if (trimmed.length === 0) return;

    const newTask = {
      id: nanoid(),
      title: state.newTaskQuery,
      completed: false,
      isEditing: false,
      editQuery: "",
    };

    tasksAPI.add(newTask).then((addedTask) => {
      setAppearingTaskId(addedTask.id);
      dispatch({ type: "ADD", todo: addedTask });
      setTimeout(() => {
        setAppearingTaskId(null);
      }, 400);
    });
  };

const deleteTask = useCallback((id) => {
  setDisAppearingTaskId(id);
  tasksAPI.delete(id)
    .then(() => {
      setTimeout(() => {
        dispatch({ type: "DELETE", deleteById: id });
      }, 400);
    })
    .catch(() => {
      setDisAppearingTaskId(null); 
    });
}, [dispatch]);


  const deleteAllTasks = () => {
    const isConfirmed = confirm("Are you sure you want to delete all tasks?");

    if (isConfirmed) {
      tasksAPI
        .deleteAll(state.todos)
        .then(() => dispatch({ type: "DELETE_ALL" }));
    }
  };

  const isOnlySpaces =
    state.newTaskQuery.length > 0 && state.newTaskQuery.trim().length === 0;

  const normalizedFilter = state.searchQuery.toLowerCase();
  const filtered = state.todos.filter((todo) =>
    todo.title.toLowerCase().includes(normalizedFilter),
  );

  const completed = state.todos.filter((todo) => todo.completed);

  const { todos, newTaskQuery, searchQuery, isLoading, error } = state;

  return {
    todos,
    newTaskQuery,
    searchQuery,
    firstIncompleteRef,
    find,
    filtered,
    completed,
    isOnlySpaces,
    isLoading,
    error,
    appearingTaskId,
    disAppearingTaskId,
    handleEditChange,
    toggleEdit,
    handleNewTaskChange,
    handleSearchChange,
    handleCompleteChange,
    addTask,
    deleteTask,
    deleteAllTasks,
  };
}
