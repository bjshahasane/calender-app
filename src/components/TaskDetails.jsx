import React from 'react';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';



const TaskDetails = ({ showTask, taskDetails, onClose }) => {

    return (

        <Modal show={showTask} onHide={onClose} animation={false}>
            <Modal.Header>
                <Modal.Title>Task Details</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <h5>{taskDetails.title}</h5>
                <p>{taskDetails.description}</p>
                <p><b>Date:</b> {taskDetails.date}</p>
                <p><b>Time:</b> {taskDetails.time}</p>

            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={onClose}>
                    Close
                </Button>
            </Modal.Footer>
        </Modal>

    );
}

export default TaskDetails;
