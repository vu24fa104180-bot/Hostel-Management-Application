import React, { useEffect, useState } from 'react';
import { getAllComplaints, updateComplaintStatus } from '../../services/complaintService';
import Table from '../../components/common/Table';
import Loader from '../../components/common/Loader';
import toast from 'react-hot-toast';

const AdminComplaints = () => {
  const [complaints, setComplaints] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchComplaints();
  }, []);

  const fetchComplaints = async () => {
    try {
      const data = await getAllComplaints();
      setComplaints(data);
    } catch (error) {
      toast.error('Failed to load complaints');
    } finally {
      setLoading(false);
    }
  };

  const handleStatusChange = async (id, newStatus) => {
    try {
      await updateComplaintStatus(id, newStatus);
      toast.success('Complaint status updated');
      fetchComplaints();
    } catch (error) {
      toast.error('Failed to update status');
    }
  };

  const columns = [
    { 
      header: 'Date', 
      render: (row) => new Date(row.createdAt).toLocaleDateString() 
    },
    { 
      header: 'Student Info', 
      render: (row) => (
        <div>
          <p className="font-semibold text-gray-900">{row.user?.name || 'N/A'}</p>
          <p className="text-xs text-gray-500">{row.user?.email || ''}</p>
        </div>
      )
    },
    { 
      header: 'Issue Detail', 
      render: (row) => (
        <div className="max-w-xs">
          <p className="font-semibold text-gray-900 truncate">{row.title}</p>
          <p className="text-xs text-gray-500 truncate">{row.description}</p>
        </div>
      )
    },
    { 
      header: 'Status', 
      render: (row) => (
        <select
          value={row.status || 'pending'}
          onChange={(e) => handleStatusChange(row._id || row.id, e.target.value)}
          className={`text-xs font-medium rounded-full px-3 py-1 outline-none border cursor-pointer ${
            row.status === 'resolved' ? 'bg-green-50 text-green-700 border-green-200' : 
            row.status === 'in-progress' ? 'bg-blue-50 text-blue-700 border-blue-200' :
            'bg-yellow-50 text-yellow-700 border-yellow-200'
          }`}
        >
          <option value="pending">Pending</option>
          <option value="in-progress">In Progress</option>
          <option value="resolved">Resolved</option>
        </select>
      )
    }
  ];

  if (loading) return <Loader fullScreen />;

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Manage Complaints</h1>
        <p className="text-gray-500 mt-1">Review and resolve student issues.</p>
      </div>

      <Table columns={columns} data={complaints} keyField="_id" />
    </div>
  );
};

export default AdminComplaints;
