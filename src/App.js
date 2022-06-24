import React from 'react';
import TaskList from './components/TaskList.js';
import TaskForm from './components/TaskForm.js';
import './App.css';
import { useEffect,useState } from 'react';
import axios from 'axios';

const App = () => {
  const [tasks, setTask]=useState([]);

  useEffect(() => {
    getTaskFromAPI();
  }, []);

  const getTaskFromAPI = () => {
    axios
    .get('https://task-list-api-c17.herokuapp.com/tasks')
    .then((response) => {
      setTask(response.data)
    })
    .catch((error) => {
      console.log(error)
    })
  }
  
  const updateTasks = (taskId) => {
    let targetTask;
    const newTasks = [...tasks];
    for (const task of newTasks) {
      if (task.id === taskId) {
        task.isComplete = !task.isComplete;
        targetTask=task;
      }
    }

    if (targetTask.isComplete) {
      axios
      .patch(`https://task-list-api-c17.herokuapp.com/tasks/${taskId}/mark_complete`)
      .then((response) => {
        // targetTask.isComplete = targetTask.isComplete;
        setTask(newTasks);
        console.log(response);
      })
      .catch((error) => {
        console.log(error);
      });
    } else {
      axios
      .patch(`https://task-list-api-c17.herokuapp.com/tasks/${taskId}/mark_incomplete`)
      .then((response) => {
        // targetTask.isComplete = !targetTask.isComplete;
        setTask(newTasks);
        console.log(response);
      })
      .catch((error) => {
        console.log(error);
      });
    }
  };

  const deleteTasks = (taskId) => {
    axios
    .delete(`https://task-list-api-c17.herokuapp.com/tasks/${taskId}`)
    .then((response) => {
      const newTasks = tasks.filter((task)=>task.id!==taskId);
      setTask(newTasks);
      console.log(response);
    })
    .catch((error)=>{
      console.log(error);
    });
  };

  const handleSubmission = (taskData) => {
    axios
    .post('https://task-list-api-c17.herokuapp.com/tasks', taskData)
    .then((response) => {
      console.log(response);
      getTaskFromAPI();
    })
    .catch((error) => {
      console.log(error);
    });
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>Ada&apos;s Task List</h1>
      </header>
      <main>
        <div>
          <TaskForm handleSubmission={handleSubmission}></TaskForm>
          <TaskList 
          tasks={tasks} 
          updateTasks={updateTasks}
          deleteTasks={deleteTasks}></TaskList>
        </div>
      </main>
    </div>
  );
};

export default App;