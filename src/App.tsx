import { useEffect, useState } from "react"
import "./styles.css"
import { NewTodoForm } from "./components/NewTodoForm"
import { v4 as uuidv4 } from "uuid";
import { TodoList } from "./components/TodoList";
import { Todo } from "./interfaces/Todo";

const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>(() => {
    const localValue = localStorage.getItem("ITEMS")
    if (localValue == null) return []
    return JSON.parse(localValue)
  });

  useEffect(() => {
    localStorage.setItem("ITEMS", JSON.stringify(todos))
  }, [todos])

  function addTodo(title: string){
    const newTodo: Todo = {
      id: uuidv4(),
      title: title,
      completed: false,
    };

    setTodos([...todos, newTodo]);
  }

  function toggleTodo(id: string, completed: boolean){
    setTodos(currentTodos => {
      return currentTodos.map(todo => {
        if (todo.id == id) {
          return {...todo, completed}
        }
        return todo 
      })
    })
  }

  function deleteTodo(id: string){
    setTodos(currentTodos => {
      return currentTodos.filter(todo => todo.id != id)
    })
  }

  return (
    <>
      <NewTodoForm onSubmit={addTodo}/>
      <h1 className="header">Todo List</h1>
      <TodoList todos={todos} toggleTodo={toggleTodo} deleteTodo={deleteTodo}/>
    </>
  );
};

export default App;
