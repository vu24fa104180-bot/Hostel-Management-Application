import React, { useState, useEffect } from 'react';
import { getMyComplaints, submitComplaint } from '../../services/complaintService';
import Table from '../../components/common/Table';
import toast from 'react-hot-toast';
import { PlusCircle } from 'lucide-react';
import { getCurrentUser } from '../../services/authService';

const Complaints = () => {
  const [complaints, setComplaints] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({ title: '', description: '' });
  const user = getCurrentUser();

  useEffect(() => {
    fetchComplaints();
  }, []);

  const fetchComplaints = async () => {
    try {
      const data = await getMyComplaints(user.regNo);
      setComplaints(data);
    } catch (error) {
      // Ignore 404s if none exist
      if (error.response?.status !== 404) {
        toast.error('Failed to load complaints');
      }
      setComplaints([]);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.title || !formData.description) {
      toast.error('Please fill all fields');
      return;
    }

    try {
      await submitComplaint({ ...formData, studentRegNo: user.regNo });
      toast.success('Complaint submitted successfully');
      setFormData({ title: '', description: '' });
      setShowForm(false);
      fetchComplaints();
    } catch (error) {
      toast.error('Failed to submit complaint');
    }
  };

  const columns = [
    { header: 'Date', render: (row) => new Date(row.createdAt).toLocaleDateString() },
    { header: 'Title', accessor: 'title' },
    { header: 'Description', accessor: 'description' },
    { 
      header: 'Status', 
      render: (row) => (
        <span className={`px-2.5 py-1 rounded-full text-xs font-medium capitalize ${
          row.status === 'resolved' ? 'bg-green-100 text-green-700' : 
          row.status === 'in-progress' ? 'bg-blue-100 text-blue-700' :
          'bg-yellow-100 text-yellow-700'
        }`}>
          {row.status || 'Pending'}
        </span>
      )
    }
  ];

  return (
    <div className="max-w-5xl mx-auto">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">My Complaints</h1>
          <p className="text-gray-500 mt-1">Track and submit maintenance or other issues.</p>
        </div>
        <button
          onClick={() => setShowForm(!showForm)}
          className="flex items-center gap-2 px-4 py-2 bg-primary-600 text-white rounded-xl font-medium hover:bg-primary-700 transition-colors shadow-sm"
        >
          <PlusCircle className="w-5 h-5" />
          New Complaint
        </button>
      </div>

      {showForm && (
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 mb-8 animate-in slide-in-from-top-4 duration-300">
          <h3 className="text-lg font-bold text-gray-900 mb-4">Submit a Complaint</h3>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Title</label>
              <input
                type="text"
                className="w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:ring-2 focus:ring-primary-500 focus:border-primary-500 outline-none"
                placeholder="E.g. Broken Fan in Room"
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
              <textarea
                className="w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:ring-2 focus:ring-primary-500 focus:border-primary-500 outline-none min-h-[100px]"
                placeholder="Provide more details about the issue..."
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              />
            </div>
            <div className="flex justify-end gap-3 pt-2">
              <button
                type="button"
                onClick={() => setShowForm(false)}
                className="px-4 py-2 text-gray-600 hover:bg-gray-50 rounded-xl font-medium transition-colors"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-6 py-2 bg-primary-600 text-white rounded-xl font-medium hover:bg-primary-700 transition-colors shadow-sm"
              >
                Submit
              </button>
            </div>
          </form>
        </div>
      )}

      {loading ? (
        <div className="text-center py-12">Loading...</div>
      ) : (
        <Table columns={columns} data={complaints} keyField="_id" />
      )}
    </div>
  );
};

export default Complaints;
