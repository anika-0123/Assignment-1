// import React, { useEffect, useState } from 'react'; import axios from 'axios';
// function App() {
// const [users, setUsers] = useState([]);
// useEffect(() => { axios.get('http://localhost:3001/users')
// .then(res => setUsers(res.data))
// .catch(err => console.error(err)); }, []);
// return ( <div>
// <h1>Users  my name is aneeqa</h1> <ul>
// {users.map(user => (

// <li key={user._id}>{user.name} - {user.email}</li> ))}
// </ul> </div>
// ); }
// export default App; 


// ye rst likha he ye remove bhi kr skti



// import React, { useState } from 'react';
// import axios from 'axios';

// function App() {
//   const [taskName, setTaskName] = useState('');
//   const [tasks, setTasks] = useState([]);

//   const handleAddTask = () => {
//     if (taskName) {
//       axios.post('http://localhost:3001/addTask', { taskName })
//         .then(response => {
//           setTasks([...tasks, response.data]);
//           setTaskName('');
//         })
//         .catch(error => console.error('There was an error!', error));
//     }
//   };

//   const handleDeleteTask = (id) => {
//     axios.delete(`http://localhost:3001/task/${id}`)
//       .then(() => {
//         setTasks(tasks.filter(task => task.id !== id));
//       })
//       .catch(error => console.error('Error deleting task', error));
//   };

//   return (
//     <div>
//       <h1>To-Do List</h1>
//       <input 
//         type="text" 
//         value={taskName} 
//         onChange={(e) => setTaskName(e.target.value)} 
//         placeholder="Enter task"
//       />
//       <button onClick={handleAddTask}>Add Task</button>
      
//       <ul>
//         {tasks.map(task => (
//           <li key={task.id}>
//             {task.taskName} 
//             <button onClick={() => handleDeleteTask(task.id)}>Delete</button>
//           </li>
//         ))}
//       </ul>
//     </div>
//   );
// }

// export default App;

// ye replace kr ke likhna tha lrkin second wala remove nhi kr rhi


// import React, { useState, useEffect } from 'react';
// import axios from 'axios';

// function App() {
//   const [taskName, setTaskName] = useState('');
//   const [tasks, setTasks] = useState([]);

//   // Fetching tasks from the backend when the component mounts
//   useEffect(() => {
//     axios.get('http://localhost:3001/tasks')
//       .then(response => setTasks(response.data))
//       .catch(error => console.error('There was an error fetching the tasks!', error));
//   }, []);

//   const handleAddTask = () => {
//     if (taskName) {
//       axios.post('http://localhost:3001/addTask', { taskName })
//         .then(response => {
//           setTasks([...tasks, response.data]);
//           setTaskName('');
//         })
//         .catch(error => console.error('There was an error adding the task!', error));
//     }
//   };

//   const handleDeleteTask = (id) => {
//     axios.delete(`http://localhost:3001/task/${id}`)
//       .then(() => {
//         setTasks(tasks.filter(task => task.id !== id));
//       })
//       .catch(error => console.error('Error deleting task', error));
//   };

//   return (
//     <div className="container">
//       <h1>To-Do List</h1>
//       <form className="form-container" onSubmit={(e) => {
//         e.preventDefault();
//         handleAddTask();
//       }}>
//         <input 
//           type="text" 
//           value={taskName} 
//           onChange={(e) => setTaskName(e.target.value)} 
//           placeholder="Enter task" 
//         />
//         <button type="submit">Add Task</button>
//       </form>
      
//       <ul>
//         {tasks.map(task => (
//           <li key={task.id}>
//             {task.taskName} 
//             <button onClick={() => handleDeleteTask(task.id)}>Delete</button>
//           </li>
//         ))}
//       </ul>
//     </div>
//   );
// }

// export default App;


// ok ye third try he ye sahi heee


import React, { useState, useEffect } from 'react';
import axios from 'axios';

function App() {
  const [taskName, setTaskName] = useState('');
  const [tasks, setTasks] = useState([]);
  const [editId, setEditId] = useState(null);
  const [editTaskName, setEditTaskName] = useState('');

  // Fetch tasks from backend on load
  useEffect(() => {
    axios.get('http://localhost:3001/tasks')
      .then(response => setTasks(response.data))
      .catch(error => console.error('Error fetching tasks', error));
  }, []);

  // Add Task
  const handleAddTask = () => {
    if (taskName) {
      axios.post('http://localhost:3001/addTask', { taskName })
        .then(response => {
          setTasks([...tasks, response.data]);
          setTaskName('');
        })
        .catch(error => console.error('Error adding task', error));
    }
  };

  // Delete Task
  const handleDeleteTask = (id) => {
    axios.delete(`http://localhost:3001/task/${id}`)
      .then(() => {
        setTasks(tasks.filter(task => task.id !== id));
      })
      .catch(error => console.error('Error deleting task', error));
  };

  // Start Edit Mode
  const startEditTask = (task) => {
    setEditId(task.id);
    setEditTaskName(task.taskName);
  };

  // Update Task
  const handleUpdateTask = (id) => {
    axios.put(`http://localhost:3001/task/${id}`, { taskName: editTaskName })
      .then(() => {
        setTasks(tasks.map(task =>
          task.id === id ? { ...task, taskName: editTaskName } : task
        ));
        setEditId(null);
        setEditTaskName('');
      })
      .catch(error => console.error('Error updating task', error));
  };

  return (
    <div style={{ maxWidth: '500px', margin: 'auto', paddingTop: '40px', textAlign: 'center' }}>
      <h1>To-Do List</h1>
      <input
        type="text"
        value={taskName}
        onChange={(e) => setTaskName(e.target.value)}
        placeholder="Enter task"
      />
      <button onClick={handleAddTask}>Add Task</button>

      <ul style={{ listStyle: 'none', padding: 0 }}>
        {tasks.map(task => (
          <li key={task.id} style={{ margin: '10px 0' }}>
            {editId === task.id ? (
              <>
                <input
                  type="text"
                  value={editTaskName}
                  onChange={(e) => setEditTaskName(e.target.value)}
                />
                <button onClick={() => handleUpdateTask(task.id)}>Update</button>
                <button onClick={() => setEditId(null)}>Cancel</button>
              </>
            ) : (
              <>
                {task.taskName}
                <button onClick={() => handleDeleteTask(task.id)} style={{ marginLeft: '10px' }}>Delete</button>
                <button onClick={() => startEditTask(task)} style={{ marginLeft: '5px' }}>Edit</button>
              </>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
