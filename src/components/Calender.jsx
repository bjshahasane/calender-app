import React, { useEffect, useState } from 'react';
// import 'bootstrap/dist/css/bootstrap.min.css';
import Table from 'react-bootstrap/Table';
import TaskForm from './TaskForm';
import { useSelector } from 'react-redux';
import TaskDetails from './TaskDetails';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';



const Calendar = () => {

  const store = useSelector((state) => state.taskReducer);
  const [currentDate, setCurrentDate] = useState(new Date());
  const [show, setShow] = useState(false);
  const [showTask, setShowTask] = useState(false);
  const [taskDetails, setTaskDetails] = useState({});
  const [taskList, setTaskList] = useState([]);
  const [notifiedTasks] = useState([]);

  useEffect(() => {
    if (store) {
      setTaskList(store);
    }
  }, [store])


  useEffect(() => {

    checkTasksForNotifications(store);

    const interval = setInterval(() => {
      checkTasksForNotifications(store);
    }, 60000);

    return () => clearInterval(interval);

    // eslint-disable-next-line
  }, [store]);



  const checkTasksForNotifications = (storeTask) => {

    const now = new Date();
    const tasksToNotify = storeTask.filter((task) => {
      const taskStartTime = new Date(task.date + 'T' + task.time);
      const timeDifference = taskStartTime - now;
      return (
        timeDifference > 0 &&
        timeDifference <= 300000 &&
        !notifiedTasks.includes(task.id)
      )
    })

    if (tasksToNotify.length > 0) {

      tasksToNotify.forEach((task) => {
        toast(`Your ${task.title} will be starting at ${task.time}`, {
          autoClose: false,
          onClick: () => showTaskPopUp(task, task.id),
        });
        notifiedTasks.push(task.id)
      })
    }
  }


  const showTaskPopUp = (task, taskId) => {
    setShowTask(!showTask);
    setTaskDetails(task);
    if (taskId) {
      toast.dismiss(taskId);

    }
  }


  const getCurrentWeekYearMonth = (date) => {
    const options = { year: 'numeric', month: 'long' };
    const firstDayOfWeek = new Date(date);
    firstDayOfWeek.setDate(date.getDate() - date.getDay()); // Set to the first day (Sunday) of the current week
    return firstDayOfWeek.toLocaleDateString(undefined, options);
  };


  const getWeekDates = (date) => {
    const startOfWeek = new Date(date);

    startOfWeek.setDate(date.getDate() - date.getDay()); // Set to the first day (Sunday) of the current week
    const weekDates = [];
    for (let i = 0; i < 7; i++) {
      const day = new Date(startOfWeek);
      day.setDate(startOfWeek.getDate() + i);
      weekDates.push(day.toISOString().slice(0, 10)); // Format as YYYY-MM-DD

    }
    return weekDates;
  };

  const weekDates = getWeekDates(currentDate);

  const navigatePreviousWeek = () => {
    const previousWeek = new Date(currentDate);
    previousWeek.setDate(currentDate.getDate() - 7);
    setCurrentDate(previousWeek);
  };

  const navigateNextWeek = () => {
    const nextWeek = new Date(currentDate);
    nextWeek.setDate(currentDate.getDate() + 7);
    setCurrentDate(nextWeek);
  };


  const handleShow = () => setShow(true);
  const handleClose = () => setShow(false);

  const hideTaskPopUp = (task) => {
    setTaskDetails({});
    setShowTask(false);
  }

  const renderTasksForDate = (date) => {
    const tasksForDate = taskList.filter((task) => task.date === date);

    return (
      <ul>
        {tasksForDate.map((task) => (
          <li key={task.id} onClick={() => showTaskPopUp(task)}>{task.title}</li>
        ))}
      </ul>
    );
  };


  // const clearLocalStorage = () => {
  //   localStorage.clear();
  //   window.location.reload();
  // }


  return (
    <div className="container mt-5">
      <h2 className="text-center mb-4">Calendar</h2>
      <div className="d-flex justify-content-between mb-3">
        <button className="btn btn-secondary" onClick={navigatePreviousWeek}>
          Previous Week
        </button>
        <button className="btn btn-secondary" onClick={navigateNextWeek}>
          Next Week
        </button>

      </div>
      <div className="d-flex justify-content-between mb-3">
        <h3>
          {getCurrentWeekYearMonth(currentDate)}
        </h3>

        <button className="btn btn-primary btn-sm mt-2" onClick={handleShow}>
          Create Task
        </button>

      </div>


      <Table striped bordered>
        <thead>
          <tr>
            <th>Sunday</th>
            <th>Monday</th>
            <th>Tuesday</th>
            <th>Wednesday</th>
            <th>Thursday</th>
            <th>Friday</th>
            <th>Saturday</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            {weekDates.map((date, index) => (
              <td key={index}>
                <div className='d-flex justify-content-between flex-column mb-3'>
                  <span>{date.slice(8, 10)}</span>
                  {renderTasksForDate(date)}
                </div>
              </td>
            ))}
          </tr>
        </tbody>
      </Table>

      {/* <button className="btn btn-secondary" onClick={clearLocalStorage}>
        Clear storage
      </button> */}


      <ToastContainer toastStyle={{ backgroundColor: "crimson", color: "white" }} position="top-right" />


      <TaskForm
        onClose={handleClose}
        showHide={show}
      />

      {taskDetails && (
        <TaskDetails
          showTask={showTask}
          taskDetails={taskDetails}
          onClose={() => hideTaskPopUp()}
        />
      )}

    </div>
  );
};

export default Calendar;
