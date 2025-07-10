import React, { useState } from 'react';
import { promoteToAdmin, removeAdmin } from '../api/superadmin';
import { ROLES } from '../constants/roles';
import { useAuth } from '../context/AuthContext';
import { toggleUser } from '../api/admin';

const UserList = ({ users,setUsers }) => {
  const [modalUser, setModalUser] = useState(null);
  const [modalType, setModalType] = useState('');
  const [modalUserAdmin, setModalUserAdmin] = useState(null);
  const [modalTypeAdmin, setModalTypeAdmin] = useState('');
    const [toggleLoading, setToggleLoading] = useState(null);
  
  const {role}=useAuth();
  const handleActionClick = (user, type) => {
    setModalUser(user);
    setModalType(type);
  };

  const handleConfirm = () => {
    if (modalUser) handleToggle(modalUser.id);
    setModalUser(null);
    setModalType('');
  };

  const handleCancel = () => {
    setModalUser(null);
    setModalType('');
  };




  const handlePromote = (user) => {
    setModalUserAdmin(user);
    setModalTypeAdmin('promote');
  };

  const handleRemove = (user) => {
    setModalUserAdmin(user);
    setModalTypeAdmin('remove');
  };

  const handleModalConfirm = async () => {
    if (modalTypeAdmin === 'promote' && modalUserAdmin) {
      await promoteToAdmin({ user_id: modalUserAdmin.id });
      setUsers(users => users.map(u => u.id === modalUserAdmin.id ? { ...u, role: ROLES.ADMIN } : u));
    } else if (modalTypeAdmin === 'remove' && modalUserAdmin) {
      await removeAdmin(modalUserAdmin.id);
      setUsers(users => users.map(u => u.id === modalUserAdmin.id ? { ...u, role: ROLES.USER } : u));
    }
    setModalUserAdmin(null);
    setModalTypeAdmin('');
  };

  const handleModalCancel = () => {
    setModalUserAdmin(null);
    setModalTypeAdmin('');
  };

   const handleToggle = async (id) => {
      setToggleLoading(id);
      await toggleUser(id);
      setUsers(users => users.map(u => u.id === id ? { ...u, active: !u.active } : u));
      setToggleLoading(null);
    };

  return (
    <>
      {users.length === 0 && (
        <tr><td colSpan="4" className="text-center py-4">No users found.</td></tr>
      )}
      {users.map(user => (
        <tr key={user.id} className="border-b">
          <td className="py-2 px-4 font-medium flex items-center gap-2">
            {user.name}
           
          </td>
          <td className="py-2 px-4">{user.email}</td>
            <td className="py-2 px-4">
            <span className={`px-3 py-1 rounded-full text-xs font-semibold bg-gray-100 text-gray-900`}> 
              {user.role}
            </span>
          </td>
          <td className="py-2 px-4">
            <span className={`px-2 py-1 rounded-full text-xs font-semibold ${user.active ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}> 
              {user.active ? 'Active' : 'Inactive'}
            </span>
          </td>
          <td className="py-2 px-4">
            <button
              className={`px-3 py-1 rounded text-white text-sm font-semibold transition ${user.active ? 'bg-red-500 hover:bg-red-600' : 'bg-green-500 hover:bg-green-600'}`}
              onClick={() => handleActionClick(user, user.active ? 'deactivate' : 'activate')}
              disabled={toggleLoading === user.id}
            >
              {toggleLoading === user.id ? '...' : user.active ? 'Deactivate' : 'Activate'}
            </button>
          </td>
          
          <td className="py-2 px-4 flex gap-2">
            {(role === ROLES.SUPER_ADMIN) && (user.role !== ROLES.ADMIN) && (
              <button
                className="px-3 py-1 rounded text-white bg-green-500 hover:bg-green-600 text-sm font-semibold transition"
                onClick={() => handlePromote(user)}
              >
                Promote to Admin
              </button>
            )}
            {(role === ROLES.SUPER_ADMIN) && (user.role === ROLES.ADMIN)  && (
              <button
                className="px-3 py-1 rounded text-white bg-red-500 hover:bg-red-600 text-sm font-semibold transition"
                onClick={() => handleRemove(user)}
              >
                Remove Admin
              </button>
            )}
          </td>
        </tr>
      ))}

      {/* Modal */}
      {modalUser && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40">
          <div className="bg-white rounded-lg shadow-lg p-8 w-full max-w-sm">
            <h3 className="text-lg font-bold mb-4 text-center">
              {modalType === 'deactivate' ? 'Deactivate User' : 'Activate User'}
            </h3>
            <p className="mb-6 text-center">
              Are you sure you want to {modalType} <span className="font-semibold">{modalUser.name}</span>?
            </p>
            <div className="flex justify-center gap-4">
              <button
                className="px-4 py-2 rounded bg-gray-200 text-gray-700 font-semibold hover:bg-gray-300"
                onClick={handleCancel}
              >
                Cancel
              </button>
              <button
                className={`px-4 py-2 rounded font-semibold text-white ${modalType === 'deactivate' ? 'bg-red-500 hover:bg-red-600' : 'bg-green-500 hover:bg-green-600'}`}
                onClick={handleConfirm}
              >
                Confirm
              </button>
            </div>
          </div>
        </div>
      )}

      {modalUserAdmin && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40">
          <div className="bg-white rounded-lg shadow-lg p-8 w-full max-w-sm">
            <h3 className="text-lg font-bold mb-4 text-center">
              {modalType === 'promote' ? 'Promote to Admin' : 'Remove Admin'}
            </h3>
            <p className="mb-6 text-center">
              Are you sure you want to {modalType} <span className="font-semibold">{modalUserAdmin.name}</span>?
            </p>
            <div className="flex justify-center gap-4">
              <button
                className="px-4 py-2 rounded bg-gray-200 text-gray-700 font-semibold hover:bg-gray-300"
                onClick={handleModalCancel}
              >
                Cancel
              </button>
              <button
                className={`px-4 py-2 rounded font-semibold text-white ${modalType === 'remove' ? 'bg-red-500 hover:bg-red-600' : 'bg-green-500 hover:bg-green-600'}`}
                onClick={handleModalConfirm}
              >
                Confirm
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default UserList;
