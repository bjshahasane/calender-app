import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { addTask } from '../redux/slices/taskSlice';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

const payload = {
  title: '',
  description: '',
  date: '',
  time: '',
}

const TaskForm = ({onClose , showHide}) => {
  const dispatch = useDispatch();
  const [taskPayload, setTaskPayload] = useState(payload);

  const handleAddTask = () => {
    dispatch(
      addTask({
        id: Date.now(), 
        ...taskPayload
      })
    );
    setTaskPayload(payload);
    onClose();
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    const temp = { ...taskPayload };
    temp[name] = value;
    setTaskPayload(temp);
  }

  return (
    <Modal show={showHide} onHide={onClose} animation={false}>
      <Modal.Header closeButton>
        <Modal.Title>Modal heading</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div className="container-fluid">
            <input
              className='form-control m-3 col-md-4'
              type="text"
              placeholder="Title"
              name="title"
              value={taskPayload.title}
              onChange={(e) => handleChange(e)}
            />
            <textarea
              className='form-control m-3'
              type="text"
              placeholder="Description"
              name="description"
              value={taskPayload.description}
              onChange={(e) => handleChange(e)}
            />
            <input
              className='form-control m-3'
              type="date"
              name='date'
              value={taskPayload.date}
              onChange={(e) => handleChange(e)}
            />
            <input
              className='form-control m-3'
              type="time"
              name='time'
              value={taskPayload.time}
              onChange={(e) => handleChange(e)}
            />
        </div>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onClose}>
          Close
        </Button>
        <Button variant="primary" onClick={handleAddTask}>
          Add Task
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

export default TaskForm;
