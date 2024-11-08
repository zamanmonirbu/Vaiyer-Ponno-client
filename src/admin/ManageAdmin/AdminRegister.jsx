
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { registerAdmin } from '../../actions/adminActions';
import { Link, useNavigate } from 'react-router-dom';
import AllNavSections from '../../components/Nav/AllNavSections';


const AdminRegister = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const dispatch = useDispatch();
  const navigate = useNavigate(); // Added navigate hook
  const { loading, error, success } = useSelector((state) => state.adminReducer);

  const handleRegister = () => {
    dispatch(registerAdmin({ name, email, password }));
  };

  if (success) {
    navigate('/admin/login'); // Navigate to login on success
  }

  return (
   <>
   <AllNavSections/>
   <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="max-w-md w-full p-6 border border-gray-300 rounded-lg shadow-lg bg-white">
        <h2 className="text-2xl font-bold mb-4 text-center">Admin Registration</h2>
        {loading && <p className="text-blue-500 text-center">Registering...</p>}
        {error && <p className="text-red-500 text-center">{error}</p>}
        <div className="mb-4">
          <input 
            type="text" 
            value={name} 
            onChange={(e) => setName(e.target.value)} 
            placeholder="Name" 
            className="w-full p-2 border border-gray-300 rounded"
          />
        </div>
        <div className="mb-4">
          <input 
            type="email" 
            value={email} 
            onChange={(e) => setEmail(e.target.value)} 
            placeholder="Email" 
            className="w-full p-2 border border-gray-300 rounded"
          />
        </div>
        <div className="mb-4">
          <input 
            type="password" 
            value={password} 
            onChange={(e) => setPassword(e.target.value)} 
            placeholder="Password" 
            className="w-full p-2 border border-gray-300 rounded"
          />
        </div>
        <button 
          onClick={handleRegister} 
          className="w-full py-2 bg-blue-500 text-white rounded border border-blue-500 hover:bg-blue-600"
        >
          Register
        </button>
        <div className="flex justify-between mt-4">
          <Link to="/admin/login" className="text-blue-500 hover:underline">Already have an account? Login</Link>
        </div>
      </div>
    </div>
   </>
  );
};

export default AdminRegister;
