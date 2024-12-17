import React, { useState } from 'react'

export default function AddTask({addTask}) {
    const [newTask, setNewTask] = useState({
        title:'',
        description:'',
        is_completed:false
    });

    const handleInput = (event)=>{
        const {name, value} = event.target;
        setNewTask((prevTask)=>({
            ...prevTask,
            [name]: value
        }));
    }
   
    const handleSubmit = async (event)=>{
        event.preventDefault();
        try {
            const task = await fetch('http://localhost:8000/apis/todolist/',{
                                    method:'POST',
                                    headers:{
                                        "Content-Type":"application/json"
                                    },
                                    body:JSON.stringify(newTask)
                                })
                                .then(resp => resp.json())
                                .then(data => { 
                                    return data; // return this to task obj
                                })
                                .catch(err => console.log("failed to create task !!!"));
            addTask(task);
            setNewTask({ title: "", description: "", is_completed: false });
        }      
        catch(err)  {
            console.error("Error: ",err);            
        }
    }
    
  return (
    <div>        
        <form className='col-md-6 mx-auto' onSubmit={handleSubmit}>
                <div className="form-group">
                    <label htmlFor="title">Title:</label>
                    <input type="text" className="form-control" id="title" 
                     placeholder="Enter task title" name="title" value={newTask.title} 
                     required
                     onChange={handleInput}/>
                    {/* <small id="emailHelp" className="form-text text-muted">We'll never share your email with anyone else.</small> */}
                </div>
                <div className="form-group">
                    <label htmlFor="description">Description:</label>
                    <textarea  className="form-control" id="description" 
                    placeholder="task description" name="description" value={newTask.description}
                    onChange={handleInput} />
                </div>
                {/* <div className="form-check">
                    <input type="checkbox" className="form-check-input" id="exampleCheck1"
                     name="is_completed" value={newTask.is_completed}
                     onChange={handleInput} />
                    <label className="form-check-label" htmlFor="exampleCheck1">Check me out</label>
                </div> */}
                <button type="submit" className="btn btn-success">Add Task</button>
        </form>
    </div>
  )
}
