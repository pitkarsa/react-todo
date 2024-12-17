import logo from './logo.svg';
import './App.css';
import {useState, useEffect} from 'react';
import Task from './Task';
import Button from './Button';
import AddTask from './AddTask';
import EditTask from './EditTask';

function App() {
  const [todolist, setTodolist] = useState([]);
  const [showForm, setShowForm]= useState(false);
  const [editingTask, setEditingTask] = useState(null); 

  useEffect(()=>{
    fetch('http://localhost:8000/apis/todolist/')
                .then(resp => resp.json())
                .then(data => setTodolist(data))
                .catch(err => console.log(err));
    },
    []
  );

  const changeShowForm = ()=>{
    setShowForm(!showForm);
  }

  const addTask = (newTask) => {
    console.log("added new task:");
    // console.log(newTask);
    setTodolist((prevTodos) => [...prevTodos, newTask]); 
  };

  const deleteTask = async (task) =>{
        
        if (confirm("Do you want to delete the task - "+ task.title +" ? "))
        {
          try {
                const response = await fetch(
                    `http://127.0.0.1:8000/apis/todolist/${task.id}/`,
                    { method: "DELETE" }
                )
                if (response.ok) {
                    setTodolist((prevList) => prevList.filter((todo) => todo.id !== task.id));
                    alert("task deleted succeessfully");
                } else {
                    console.error("Failed to delete task.");
                }
            } catch(error){
                console.error("Failed to delete task.");
            }
        }
  }

  const afterUpdate = (updatedTask) => {
    alert("task updated !!!!!!!!!");
    setTodolist((prevTodos) => 
        prevTodos.map((todo) => 
            todo.id === updatedTask.id ? updatedTask : todo
        )
    );
  };

  const handleEditClick = (task) => {
      setEditingTask(task); 
  };

  return (
    <div className="App">      
        <h2>Hello todo</h2>
        <Button text={showForm?"Close Form":"Add New Task"} onChange={changeShowForm} />
        {
          showForm && <AddTask addTask={addTask} />
        }



        <div className="row">
        {
            todolist.map(task => {
              return <Task key={task.id} task={task} onDelete={deleteTask} onEdit={handleEditClick} />
            })
        }

        </div>
        {editingTask && (
                <EditTask task={editingTask} afterUpdate={afterUpdate}    />
            )}
    </div>
  );
}

export default App;

