import { createContext } from "react";
import useTodoList from "../useTodoList";

export const TodoContext = createContext(null);

export default function Context({ children }) {
  // Added the curly braces to correctly destructure the hook return
  const {
    todos,
    newTaskQuery,
    searchQuery,
    isEditing,
    firstIncompleteRef,
    find,
    filtered,
    completed,
    isOnlySpaces,
    editQuery,
    handleEditClick,
    isLoading,
    error,
    appearingTaskId,
    disAppearingTaskId,
    toggleEdit,
    handleEditChange,
    handleNewTaskChange,
    handleSearchChange,
    handleCompleteChange,
    addTask,
    deleteTask,
    deleteAllTasks,
  } = useTodoList();

  return (
    <TodoContext.Provider
      value={{
        todos,
        newTaskQuery,
        searchQuery,
        firstIncompleteRef,
        find,
        filtered,
        completed,
        isOnlySpaces,
        editQuery,
        isEditing,
        handleEditClick,
        isLoading,
        error,
        appearingTaskId,
        disAppearingTaskId,
        toggleEdit,
        handleEditChange,
        handleNewTaskChange,
        handleSearchChange,
        handleCompleteChange,
        addTask,
        deleteTask,
        deleteAllTasks,
      }}
    >
      {children}
    </TodoContext.Provider>
  );
}
