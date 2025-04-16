import './App.css';
import EmployeeDashboard from './Components/EmployeeDashboard';
import Login from './Components/Login';
import Register from './Components/Register';
import { BrowserRouter , Route, Routes } from 'react-router-dom';
import AdminPage from './pages/AdminPage';
import TaskForm from './Components/TaskForm';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<EmployeeDashboard />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/employee" element={<EmployeeDashboard/>} />
        <Route path="/admin" element={<AdminPage/>} />
        <Route path="/admin/create-task" element={<TaskForm />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
