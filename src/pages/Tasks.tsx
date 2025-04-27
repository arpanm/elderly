import React, { useEffect, useState } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import './Tasks.css';

interface Task {
  id: number;
  title: string;
  type: string;
  status: string;
  date?: string;
}

const Tasks: React.FC = () => {
  const [searchParams] = useSearchParams();
  const [tasks, setTasks] = useState<Task[]>([]);
  const [filteredTasks, setFilteredTasks] = useState<Task[]>([]);
  const [showAddForm, setShowAddForm] = useState(false);
  const [newTask, setNewTask] = useState({
    title: '',
    type: 'bill',
    status: 'Pending',
    date: new Date().toISOString().split('T')[0]
  });
  const navigate = useNavigate();

  useEffect(() => {
    // Dummy data
    const dummyTasks: Task[] = [
      {
        id: 1,
        title: 'Electricity Bill',
        type: 'bill',
        status: 'Pending',
        date: '2023-04-30',
      },
      {
        id: 2,
        title: 'Water Bill',
        type: 'bill',
        status: 'Paid',
        date: '2023-04-15',
      },
      {
        id: 3,
        title: 'Doctor Appointment',
        type: 'appointment',
        status: 'Scheduled',
        date: '2023-05-10',
      },
      {
        id: 4,
        title: 'Plumber Visit',
        type: 'service',
        status: 'Completed',
        date: '2023-04-20',
      },
      {
        id: 5,
        title: 'Grocery Delivery',
        type: 'shopping',
        status: 'Pending',
        date: '2023-04-28',
      },
    ];

    setTasks(dummyTasks);
  }, []);

  const speakStatus = (task: Task) => {
    if ('speechSynthesis' in window) {
      const utterance = new SpeechSynthesisUtterance(
        `${task.title} is ${task.status.toLowerCase()}`
      );
      utterance.rate = 0.8;
      utterance.pitch = 1;
      window.speechSynthesis.speak(utterance);
    }
  };

  const handleShowAll = () => {
    setFilteredTasks(tasks);
    // Speak status of all tasks
    tasks.forEach((task) => {
      speakStatus(task);
    });
  };

  const handleAddTask = () => {
    if (newTask.title.trim() === '') return;

    const task: Task = {
      id: Date.now(),
      ...newTask
    };

    setTasks(prevTasks => [...prevTasks, task]);
    setFilteredTasks(prevTasks => [...prevTasks, task]);
    setShowAddForm(false);
    setNewTask({
      title: '',
      type: 'bill',
      status: 'Pending',
      date: new Date().toISOString().split('T')[0]
    });

    // Speak the new task status
    speakStatus(task);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setNewTask(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const toggleTaskStatus = (taskId: number) => {
    setTasks(prevTasks => {
      const updatedTasks = prevTasks.map(task => {
        if (task.id === taskId) {
          const newStatus = task.status === 'Pending' ? 'Done' : 'Pending';
          const updatedTask = { ...task, status: newStatus };
          // Speak the updated status
          speakStatus(updatedTask);
          return updatedTask;
        }
        return task;
      });
      return updatedTasks;
    });

    setFilteredTasks(prevTasks => {
      return prevTasks.map(task => {
        if (task.id === taskId) {
          return { ...task, status: task.status === 'Pending' ? 'Done' : 'Pending' };
        }
        return task;
      });
    });
  };

  useEffect(() => {
    const action = searchParams.get('action');
    if (action) {
      const filtered = tasks.filter((task) => {
        switch (action) {
          case 'bills':
            return task.type === 'bill';
          case 'doctor':
            return task.type === 'appointment';
          case 'plumber':
          case 'electrician':
            return task.type === 'service';
          case 'shopping':
            return task.type === 'shopping';
          default:
            return true;
        }
      });
      setFilteredTasks(filtered);

      // Speak the status of each filtered task
      filtered.forEach((task) => {
        speakStatus(task);
      });
    } else {
      setFilteredTasks(tasks);
    }
  }, [tasks, searchParams]);

  return (
    <div className="tasks-container">
      <button className="back-button" onClick={() => navigate('/')}>
        ← Back to Home
      </button>
      <div className="tasks-content">
        <h1>Tasks</h1>
        <div className="task-controls">
          {searchParams.get('action') && (
            <button className="show-all-button" onClick={handleShowAll}>
              Show All Tasks
            </button>
          )}
          <button className="add-task-button" onClick={() => setShowAddForm(true)}>
            + Add New Task
          </button>
        </div>

        {showAddForm && (
          <div className="add-task-form">
            <h3>Add New Task</h3>
            <div className="form-group">
              <label>Title:</label>
              <input
                type="text"
                name="title"
                value={newTask.title}
                onChange={handleInputChange}
                placeholder="Enter task title"
              />
            </div>
            <div className="form-group">
              <label>Type:</label>
              <select name="type" value={newTask.type} onChange={handleInputChange}>
                <option value="bill">Bill</option>
                <option value="appointment">Appointment</option>
                <option value="service">Service</option>
                <option value="shopping">Shopping</option>
              </select>
            </div>
            <div className="form-group">
              <label>Status:</label>
              <select name="status" value={newTask.status} onChange={handleInputChange}>
                <option value="Pending">Pending</option>
                <option value="Paid">Paid</option>
                <option value="Scheduled">Scheduled</option>
                <option value="Completed">Completed</option>
              </select>
            </div>
            <div className="form-group">
              <label>Date:</label>
              <input
                type="date"
                name="date"
                value={newTask.date}
                onChange={handleInputChange}
              />
            </div>
            <div className="form-actions">
              <button className="cancel-button" onClick={() => setShowAddForm(false)}>
                Cancel
              </button>
              <button className="save-button" onClick={handleAddTask}>
                Save Task
              </button>
            </div>
          </div>
        )}

        <div className="tasks-list">
          {filteredTasks.map((task) => (
            <div key={task.id} className="task-card">
              <div className="task-header">
                <h3>{task.title}</h3>
                <div className="task-actions">
                  <span className={`status-badge ${task.status.toLowerCase()}`}>
                    {task.status}
                  </span>
                  <button 
                    className={`status-toggle ${task.status.toLowerCase()}`}
                    onClick={() => toggleTaskStatus(task.id)}
                  >
                    {task.status === 'Pending' || task.status === 'Scheduled' ? 'Mark as Done' : 'Mark as Pending'}
                  </button>
                </div>
              </div>
              {task.date && (
                <div className="task-date">
                  Date: {new Date(task.date).toLocaleDateString()}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Tasks; 