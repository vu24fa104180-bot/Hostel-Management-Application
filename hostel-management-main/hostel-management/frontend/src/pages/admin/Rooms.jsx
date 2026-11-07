import React, { useEffect, useState } from 'react';
import { getRooms, addRoom, updateRoom, deleteRoom } from '../../services/roomService';
import Table from '../../components/common/Table';
import Modal from '../../components/common/Modal';
import Loader from '../../components/common/Loader';
import { Plus, Edit2, Trash2 } from 'lucide-react';
import toast from 'react-hot-toast';

const ManageRooms = () => {
  const [rooms, setRooms] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingRoom, setEditingRoom] = useState(null);
  
  const [formData, setFormData] = useState({
    roomNumber: '',
    floor: '',
    sharing: '',
    price: ''
  });

  useEffect(() => {
    fetchRooms();
  }, []);

  const fetchRooms = async () => {
    try {
      const data = await getRooms();
      setRooms(data);
    } catch (error) {
      toast.error('Failed to load rooms');
    } finally {
      setLoading(false);
    }
  };

  const handleOpenModal = (room = null) => {
    if (room) {
      setEditingRoom(room);
      setFormData({
        roomNumber: room.roomNumber,
        floor: room.floor,
        sharing: room.sharing,
        price: room.price || ''
      });
    } else {
      setEditingRoom(null);
      setFormData({ roomNumber: '', floor: '', sharing: '', price: '' });
    }
    setIsModalOpen(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editingRoom) {
        await updateRoom(editingRoom._id || editingRoom.id, formData);
        toast.success('Room updated successfully');
      } else {
        // availableBeds initially equals sharing capacity
        await addRoom({ ...formData, availableBeds: formData.sharing });
        toast.success('Room added successfully');
      }
      setIsModalOpen(false);
      fetchRooms();
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to save room');
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this room?')) {
      try {
        await deleteRoom(id);
        toast.success('Room deleted successfully');
        fetchRooms();
      } catch (error) {
        toast.error('Failed to delete room');
      }
    }
  };

  const columns = [
    { header: 'Room No.', accessor: 'roomNumber' },
    { header: 'Floor', accessor: 'floor' },
    { header: 'Sharing Type', render: (row) => `${row.sharing} Person` },
    { header: 'Available Beds', render: (row) => (
      <span className={`font-bold ${row.availableBeds > 0 ? 'text-green-600' : 'text-red-600'}`}>
        {row.availableBeds} / {row.sharing}
      </span>
    )},
    { header: 'Price/Month', render: (row) => `$${row.price || 500}` },
    { 
      header: 'Actions', 
      render: (row) => (
        <div className="flex items-center gap-3">
          <button 
            onClick={() => handleOpenModal(row)}
            className="text-blue-600 hover:text-blue-800 transition-colors p-1"
          >
            <Edit2 className="w-4 h-4" />
          </button>
          <button 
            onClick={() => handleDelete(row._id || row.id)}
            className="text-red-600 hover:text-red-800 transition-colors p-1"
          >
            <Trash2 className="w-4 h-4" />
          </button>
        </div>
      )
    }
  ];

  if (loading) return <Loader fullScreen />;

  return (
    <div>
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Manage Rooms</h1>
          <p className="text-gray-500 mt-1">Add, edit, or remove hostel rooms.</p>
        </div>
        <button
          onClick={() => handleOpenModal()}
          className="flex items-center gap-2 px-4 py-2 bg-primary-600 text-white rounded-xl font-medium hover:bg-primary-700 transition-colors shadow-sm"
        >
          <Plus className="w-5 h-5" />
          Add Room
        </button>
      </div>

      <Table columns={columns} data={rooms} keyField="_id" />

      <Modal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
        title={editingRoom ? "Edit Room" : "Add New Room"}
      >
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Room Number</label>
            <input
              type="text"
              required
              className="w-full px-4 py-2 border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary-500 outline-none"
              value={formData.roomNumber}
              onChange={(e) => setFormData({ ...formData, roomNumber: e.target.value })}
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Floor</label>
            <input
              type="number"
              required
              className="w-full px-4 py-2 border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary-500 outline-none"
              value={formData.floor}
              onChange={(e) => setFormData({ ...formData, floor: e.target.value })}
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Sharing Capacity</label>
            <select
              required
              className="w-full px-4 py-2 border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary-500 outline-none bg-white"
              value={formData.sharing}
              onChange={(e) => setFormData({ ...formData, sharing: e.target.value })}
            >
              <option value="">Select</option>
              <option value="1">1 Person (Single)</option>
              <option value="2">2 Persons (Double)</option>
              <option value="3">3 Persons (Triple)</option>
              <option value="4">4 Persons (Quad)</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Price per Month ($)</label>
            <input
              type="number"
              required
              className="w-full px-4 py-2 border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary-500 outline-none"
              value={formData.price}
              onChange={(e) => setFormData({ ...formData, price: e.target.value })}
            />
          </div>
          <div className="pt-4 flex gap-3">
            <button
              type="submit"
              className="flex-1 py-2 bg-primary-600 text-white rounded-xl font-medium hover:bg-primary-700 transition-colors"
            >
              {editingRoom ? 'Update Room' : 'Add Room'}
            </button>
          </div>
        </form>
      </Modal>
    </div>
  );
};

export default ManageRooms;
