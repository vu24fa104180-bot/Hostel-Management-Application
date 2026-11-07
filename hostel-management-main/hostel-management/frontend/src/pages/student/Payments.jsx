import React, { useEffect, useState } from 'react';
import { getMyPayments } from '../../services/paymentService';
import Table from '../../components/common/Table';
import toast from 'react-hot-toast';
import Loader from '../../components/common/Loader';
import { getCurrentUser } from '../../services/authService';

const Payments = () => {
  const [payments, setPayments] = useState([]);
  const [loading, setLoading] = useState(true);
  const user = getCurrentUser();

  useEffect(() => {
    fetchPayments();
  }, []);

  const fetchPayments = async () => {
    try {
      const data = await getMyPayments(user.regNo);
      setPayments(data);
    } catch (error) {
      if (error.response?.status !== 404) {
        toast.error('Failed to load payment history');
      }
      setPayments([]);
    } finally {
      setLoading(false);
    }
  };

  const columns = [
    { 
      header: 'Date', 
      render: (row) => new Date(row.createdAt || row.date).toLocaleDateString() 
    },
    { 
      header: 'Description', 
      render: (row) => row.description || 'Room Booking Fee'
    },
    { 
      header: 'Amount', 
      render: (row) => <span className="font-semibold text-gray-900">${row.amount}</span>
    },
    { 
      header: 'Status', 
      render: (row) => (
        <span className={`px-2.5 py-1 rounded-full text-xs font-medium capitalize ${
          row.status === 'success' || row.status === 'completed' ? 'bg-green-100 text-green-700' : 
          row.status === 'failed' ? 'bg-red-100 text-red-700' :
          'bg-yellow-100 text-yellow-700'
        }`}>
          {row.status || 'Success'}
        </span>
      )
    }
  ];

  if (loading) return <Loader fullScreen />;

  return (
    <div className="max-w-5xl mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Payment History</h1>
        <p className="text-gray-500 mt-1">View all your past transactions and receipts.</p>
      </div>

      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 mb-8">
        <div className="flex justify-between items-center">
          <div>
            <p className="text-sm text-gray-500 mb-1">Total Paid</p>
            <h3 className="text-3xl font-bold text-gray-900">
              ${payments.reduce((acc, curr) => acc + (curr.amount || 0), 0)}
            </h3>
          </div>
          <div className="w-12 h-12 bg-green-50 text-green-600 rounded-full flex items-center justify-center">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
        </div>
      </div>

      <Table columns={columns} data={payments} keyField="_id" />
    </div>
  );
};

export default Payments;
