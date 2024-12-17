import React, { useState, useEffect } from 'react';

const EditTask = ({ task, afterUpdate }) => {
    const [editedTask, setEditedTask] = useState({ ...task });

    useEffect(() => {
        setEditedTask({ ...task });
    }, [task]);

    const handleInputChange = (event) => {        
        setEditedTask((prevTask) => ({
            ...prevTask,
            [event.target.name]: (event.target.type==="checkbox") ? event.target.checked : event.target.value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch(`http://127.0.0.1:8000/apis/todolist/${editedTask.id}/`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(editedTask),
            });
            if (response.ok) {
                const updatedTodo = await response.json();
                afterUpdate(updatedTodo); 
                window.location.reload();
                alert("task Updated Successfully");
            } else {
                console.error("Failed to update task:", response.statusText);
            }
        } catch (error) {
            console.error("Error:", error);
        }
    };

    return (
        <form className="mt-4" onSubmit={handleSubmit}>
            <div className="mb-3">
                <label htmlFor="title" className="form-label">Title</label>
                <input
                    type="text"
                    className="form-control"
                    id="title"
                    name="title"
                    value={editedTask.title}
                    onChange={handleInputChange}
                    required
                />
            </div>
            <div className="mb-3">
                <label htmlFor="description" className="form-label">Description</label>
                <textarea
                    className="form-control"
                    id="description"
                    name="description"
                    value={editedTask.description}
                    onChange={handleInputChange}
                    required
                ></textarea>
            </div>
            <div className="form-check">
                    <input type="checkbox" className="form-check-input" id="exampleCheck1"
                     name="is_completed" checked={editedTask.is_completed}
                     onChange={handleInputChange} />
                    <label className="form-check-label" htmlFor="exampleCheck1">Completed ?</label>
                </div>
            <button type="submit" className="btn btn-success">Update Task</button>
        </form>
    );
};

export default EditTask;

// const handleInput = (event)=>{
    //     setNewTask({
    //         ...newTask,
    //         [event.target.name]: (event.target.type==="checkbox") ? event.target.checked : event.target.value
    //     });
    // }
