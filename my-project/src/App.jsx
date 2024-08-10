import { useState, useEffect } from "react";
import Navbar from "./components/Navbar";
import { v4 as uuidv4 } from "uuid";
import { FaEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";


function App() {
  const [todo, setTodo] = useState("");
  const [todos, setTodos] = useState([]);
  const [showFinished, setshowFinished] = useState(true)
  
  useEffect(() => {
    let todoString = localStorage.getItem("todos")
    if(todoString){

      let todos = JSON.parse(localStorage.getItem("todos"))
      setTodos(todos)
    }
  }, [])
  

  const saveToLS = (params) => {
    localStorage.setItem("todos", JSON.stringify(todos))
  }
  
  const toggleFinished = (e) => {
    setshowFinished(!showFinished)
  }
  

  const handleEdit = (e, id) => {
    let t =todos.filter(i=>i.id === id)
    setTodo(t[0].todo)
    let newTodos = todos.filter((item) => {
      return item.id != id;
    });

    setTodos(newTodos);
    saveToLS()
    
  };

  const handleDelete = (e, id) => {
    let newTodos = todos.filter((item) => {
      return item.id != id;
    });

    setTodos(newTodos);
    saveToLS()
  };

  const handleAdd = () => {
    setTodos([...todos, { id: uuidv4(), todo, isCompleted: false }]);
    setTodo("");
    saveToLS()
  };

  const handleChange = (e) => {
    setTodo(e.target.value);
  };

  const handleCheckbox = (e) => {
    let id = e.target.name;

    let index = todos.findIndex((item) => {
      return item.id === id;
    });
    let newTodos = [...todos];
    newTodos[index].isCompleted = !newTodos[index].isCompleted;
    setTodos(newTodos);
    saveToLS()
  };

  return (
    <div className="bg-cream">
      <Navbar />
      <div className="container mx-3 md:mx-auto my-5 rounded-xl p-5 bg-rosewater min-h-[80vh] md:w-1/2 overflow-auto">
      <h1 className="text-3xl font-bold text-center text-cream mb-5">Manage your tasks at one place</h1>
        <div className="addTodo my-5 flex flex-col gap-4 ">
          <h1 className="text-lg font-bold">Add a todo</h1>
          <input
            onChange={handleChange}
            value={todo}
            type="text"
            className="w-full h-12 px-4 rounded-md"
          />
          <button
            onClick={handleAdd}
            disabled={todo.length<=3}
            className="bg-spearmint text-sm hover:bg-green-300 p-3 py-1 rounded-lg"
          >
            Save
          </button>
        </div>
        <input onChange={toggleFinished} type="checkbox" checked={showFinished} /> Show finished 
        <h1 className="text-2xl m-3">Your Todo :</h1>
        <div className="todos m-3">
          {todos.length === 0 && <div className="m-5" >No Todos to display</div> }
          {todos.map((item) => {
            return( (showFinished || !item.isCompleted) &&
              <div
                key={item.id}
                className="todo flex w-full my-3 justify-between"
              >
                <div className="flex gap-5" >

                <input
                  name={item.id}
                  onChange={handleCheckbox}
                  type="checkbox"
                  checked={item.isCompleted}
                />
                <div className={item.isCompleted ? "line-through" : ""}>
                  {item.todo}
                </div>
                </div>
                <div className="buttons flex h-full">
                  <button
                    onClick={(e)=>handleEdit(e, item.id)}
                    className="bg-spearmint flex flex-row text-sm hover:bg-green-300 p-1 py-1 mx-1 rounded-lg"
                  >
                   <h1 className="mx-2" >edit</h1><FaEdit className="m-1" />

                  </button>
                  <button
                    onClick={(e) => {
                      handleDelete(e, item.id);
                    }}
                    className="bg-spearmint flex flex-row text-sm hover:bg-green-300  p-1 py-1 mx-1 rounded-lg"
                  >
                    <h1 className="mx-2">delete</h1><MdDelete className="m-1" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default App;
