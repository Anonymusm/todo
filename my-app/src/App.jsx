import "./App.css";
import Router from "./Router";
import TodosPage from "./TodosPage";
import TodoPage from "./pages/TodoPage";

function App() {

  // async function test() {
  //   const results = await Promise.allSettled(tasks);
  //      try {
  //         results.forEach((result, index) => {
  //   if (result.status === 'fulfilled') {
  //     console.log(`Задача ${index} ок:`, result.value);
  //   } else {
  //     console.error(`Задача ${index} зламалась:`, result.reason);
  //   }
  // } catch (err) {})
  // сa
  // }

  const routes = {
    "/": TodosPage,
    "/tasks/:id": TodoPage,
    "*": () => <p style={{ fontSize: "60px" }}>404 NO PAGE FOUND!</p>,
  };

  return (
    <>
      <Router routes={routes} />
    </>
  );
}

export default App;
