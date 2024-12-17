import React from 'react'

export default function Task({task, onDelete, onEdit}) {
  
  
  return (
    // <div>
    //     <h4>{task.title}</h4>
    // </div>
    <>
            <div className="col-md-4">
                <div className="card mt-4" style={{width: "100%"}}>        
                    <div className="card-body">
                        <h5 className="card-title">{task.title}</h5>
                        <p className="card-text">{task.description}</p>
                        <p className="card-text">
                            <span className={`badge ${task.is_completed ? 'bg-success' : 'bg-warning'}`}>
                                {task.is_completed ? "Completed" : "Incomplete"}
                            </span>
                        </p>
                        <button className="btn btn-primary ml-2" onClick={() => onEdit(task)}>
                            Edit
                        </button>
                        &nbsp;&nbsp;
                        <button className="btn btn-danger"
                              onClick={()=>onDelete(task)}>
                              Delete
                        </button>                        
                    </div>
                </div>
            </div>
    </>
  )
}
