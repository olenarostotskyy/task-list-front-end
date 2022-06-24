import React from 'react';
import TaskList from './components/TaskList.js';
import './App.css';
import { useState } from 'react';

// const TASKS = [
//   {
//     id: 1,
//     title: 'Mow the lawn',
//     isComplete: false,
//   },
//   {
//     id: 2,
//     title: 'Cook Pasta',
//     isComplete: true,
//   },
// ];

const App = () => {
  const TASKS = [
    {
      id: 1,
      title: 'Mow the lawn',
      isComplete: false,
    },
    {
      id: 2,
      title: 'Cook Pasta',
      isComplete: true,
    },
  ];

  const [tasks, setTask] = useState(TASKS);

  const updateTasks = (taskId) => {
    const newTasks = [...tasks];
    for (const task of newTasks) {
      console.log(task);
      if (task.id === taskId) {
        task.isComplete = !task.isComplete;
      }
    }
    setTask(newTasks);
  };

  const deleteTasks = (taskId) => {
    const newTasks = [];
    for (const task of tasks) {
      if (task.id !== taskId) {
        newTasks.push(task);
      }
    }
    setTask(newTasks);
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>Ada&apos;s Task List</h1>
      </header>
      <main>
        <div>
          <TaskList
            tasks={tasks}
            updateTasks={updateTasks}
            deleteTasks={deleteTasks}
          ></TaskList>
        </div>
      </main>
    </div>
  );
};

export default App;
