import { useEffect, useState } from "react";

function useRouter() {
  const [path, setPath] = useState(window.location.pathname);

  useEffect(() => {
    function onPathChange() {
      setPath(window.location.pathname);
    }

    window.addEventListener("popstate", onPathChange);

    return () => {
      window.removeEventListener("popstate", onPathChange);
    };
  }, []);

  return path;
}

export default function Router({ routes }) {
  const path = useRouter();

  if (path.startsWith("/tasks/")) {
    const id = path.replace("/tasks/", "");
    const TodoPage = routes["/tasks/:id"];
    return <TodoPage params={{ id }}/>;
  }

  const Page = routes[path] ?? routes["*"];
  return <Page />;
}
