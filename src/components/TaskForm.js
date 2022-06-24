import React from 'react';
import PropTypes from 'prop-types';
import './TaskForm.css';
import { useState } from 'react';

const defaultTask = {title: '', description: ''};

const TaskForm = ({handleSubmission}) => {
    const [taskData, setTaskData] = useState(defaultTask);
    
    const handleFormInput = (event) => {
        const inputElement = event.target;
        const name = inputElement.name;
        const value = inputElement.value;

        const newTaskData={...taskData};
        newTaskData[name]=value;
        setTaskData(newTaskData);
    };

    const handleFormSubmission = (event) => {
        event.preventDefault();
        handleSubmission(taskData);
    };

    return(
        <form onSubmit={handleFormSubmission}>
            <label htmlFor="title">Title</label>
            <input
                name = "title"
                type = "text"
                value = {taskData.title}
                onChange = {handleFormInput}
                id = "title"
            ></input>
            <label htmlFor="description">Description</label>
            <input
                name = "description"
                type = "text"
                value = {taskData.description}
                onChange = {handleFormInput}
                id = "description"
            ></input>
            <input type="submit" />
        </form>
    );
};


TaskForm.propTypes = {
    handleSubmission: PropTypes.func.isRequired
};

export default TaskForm;