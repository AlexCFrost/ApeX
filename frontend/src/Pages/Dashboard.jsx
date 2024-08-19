/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from 'react';
import { EyeIcon, EyeSlashIcon } from '@heroicons/react/24/solid';

const Dashboard = () => {
  const [passwords, setPasswords] = useState([]);
  const [newPassword, setNewPassword] = useState({ website: '', username: '', password: '' });
  const [editingId, setEditingId] = useState(null);
  const [error, setError] = useState('');
  const [visiblePasswords, setVisiblePasswords] = useState({});

  useEffect(() => {
    fetchPasswords();
  }, []);

  const fetchPasswords = async () => {
    try {
      const mockPasswords = [
        { id: 1, website: 'example.com', username: 'user1', password: 'password1' },
        { id: 2, website: 'test.com', username: 'user2', password: 'password2' },
      ];
      setPasswords(mockPasswords);
    } catch (error) {
      setError('Failed to fetch passwords');
    }
  };

  const handleAddPassword = async (e) => {
    e.preventDefault();
    try {
      if (editingId) {
        // Update existing password
        const updatedPasswords = passwords.map(p => 
          p.id === editingId ? { ...newPassword, id: editingId } : p
        );
        setPasswords(updatedPasswords);
        setEditingId(null);
      } else {
        // Add new password
        const newPasswordWithId = { ...newPassword, id: Date.now() };
        setPasswords([...passwords, newPasswordWithId]);
      }
      setNewPassword({ website: '', username: '', password: '' });
    } catch (error) {
      setError('Failed to add/update password');
    }
  };

  const handleEdit = (password) => {
    setNewPassword(password);
    setEditingId(password.id);
  };

  const handleDelete = (id) => {
    setPasswords(passwords.filter(p => p.id !== id));
  };

  const togglePasswordVisibility = (id) => {
    setVisiblePasswords(prev => ({ ...prev, [id]: !prev[id] }));
  };

  return (
    <div className="w-full max-w-4xl p-8 space-y-8">
    <h1 className="text-4xl font-extrabold text-center text-white">Password Manager</h1>
    {error && <p className="text-red-500 text-center">{error}</p>}
    
    {/* Add Password Card */}
    <div className="bg-gradient-to-r from-blue-800 to-purple-600 rounded-xl shadow-2xl overflow-hidden">
      <div className="p-8 space-y-6">
        <h2 className="text-2xl font-bold text-center text-white">
          {editingId ? 'Update Password' : 'Add New Password'}
        </h2>
        <form onSubmit={handleAddPassword} className="space-y-4">
          <div className="relative">
            <input
              type="text"
              value={newPassword.website}
              onChange={(e) => setNewPassword({...newPassword, website: e.target.value})}
              placeholder="Website"
              className="w-full p-2 bg-transparent border-b-2 border-gray-300 text-white placeholder-gray-400 focus:outline-none focus:border-purple-500"
            />
          </div>
          <div className="relative">
            <input
              type="text"
              value={newPassword.username}
              onChange={(e) => setNewPassword({...newPassword, username: e.target.value})}
              placeholder="Username"
              className="w-full p-2 bg-transparent border-b-2 border-gray-300 text-white placeholder-gray-400 focus:outline-none focus:border-purple-500"
            />
          </div>
          <div className="relative">
            <input
              type={visiblePasswords.new ? "text" : "password"}
              value={newPassword.password}
              onChange={(e) => setNewPassword({...newPassword, password: e.target.value})}
              placeholder="Password"
              className="w-full p-2 bg-transparent border-b-2 border-gray-300 text-white placeholder-gray-400 focus:outline-none focus:border-purple-500 pr-10"
            />
            <button
              type="button"
              onClick={() => togglePasswordVisibility('new')}
              className="absolute inset-y-0 right-0 pr-3 flex items-center"
            >
              {visiblePasswords.new ? (
                <EyeSlashIcon className="h-5 w-5 text-gray-400" />
              ) : (
                <EyeIcon className="h-5 w-5 text-gray-400" />
              )}
            </button>
          </div>
          <button
            type="submit"
            className="w-full py-2 px-4 bg-purple-500 hover:bg-purple-700 rounded-md shadow-lg text-white font-semibold transition duration-200"
          >
            {editingId ? 'Update Password' : 'Add Password'}
          </button>
        </form>
      </div>
    </div>

    {/* Saved Passwords Section */}
    <div className="space-y-4">
        {passwords.map((pass) => (
          <div 
            key={pass.id} 
            className="p-6 bg-gradient-to-r from-blue-800 to-purple-600 rounded-xl shadow-2xl overflow-hidden hover:shadow-3xl transition-transform transform hover:scale-105"
          >
            <div className="relative mb-4">
              <input
                type="text"
                value={pass.website}
                readOnly
                className="w-full p-2 bg-transparent border-b-2 border-gray-300 text-white placeholder-gray-400 focus:outline-none focus:border-purple-500"
              />
              <label className="absolute left-0 -top-3.5 text-gray-400 text-sm transition-all">Website</label>
            </div>
            <div className="relative mb-4">
              <input
                type="text"
                value={pass.username}
                readOnly
                className="w-full p-2 bg-transparent border-b-2 border-gray-300 text-white placeholder-gray-400 focus:outline-none focus:border-purple-500"
              />
              <label className="absolute left-0 -top-3.5 text-gray-400 text-sm transition-all">Username</label>
            </div>
            <div className="relative mb-4">
              <input
                type={visiblePasswords[pass.id] ? "text" : "password"}
                value={pass.password}
                readOnly
                className="w-full p-2 bg-transparent border-b-2 border-gray-300 text-white placeholder-gray-400 focus:outline-none focus:border-purple-500 pr-10"
              />
              <label className="absolute left-0 -top-3.5 text-gray-400 text-sm transition-all">Password</label>
              <button
                type="button"
                onClick={() => togglePasswordVisibility(pass.id)}
                className="absolute inset-y-0 right-0 pr-3 flex items-center"
              >
                {visiblePasswords[pass.id] ? (
                  <EyeSlashIcon className="h-5 w-5 text-gray-400" />
                ) : (
                  <EyeIcon className="h-5 w-5 text-gray-400" />
                )}
              </button>
            </div>
            <div className="flex justify-between space-x-4">
              <button 
                onClick={() => handleEdit(pass)} 
                className="bg-purple-500 text-white py-2 px-4 rounded hover:bg-violet-500"
              >
                Edit
              </button>
              <button 
                onClick={() => handleDelete(pass.id)} 
                className="bg-purple-500 text-white py-2 px-4 rounded hover:bg-violet"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
export default Dashboard;