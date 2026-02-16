import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchAllSellers, approveSeller, rejectSeller } from '../../features/admin/adminSlice';
import LoadingSpinner from '../../components/common/LoadingSpinner';
import { formatDate } from '../../utils/formatDate';
import { HiCheck, HiXMark } from 'react-icons/hi2';
import toast from 'react-hot-toast';

const AdminSellers = () => {
  const dispatch = useDispatch();
  const { sellers, loading } = useSelector((state) => state.admin);

  useEffect(() => {
    dispatch(fetchAllSellers());
  }, [dispatch]);

  const handleApprove = (id) => {
    dispatch(approveSeller(id))
      .unwrap()
      .then(() => toast.success('Seller approved'))
      .catch((err) => toast.error(err));
  };

  const handleReject = (id) => {
    dispatch(rejectSeller(id))
      .unwrap()
      .then(() => toast.success('Seller rejected'))
      .catch((err) => toast.error(err));
  };

  if (loading) return <LoadingSpinner />;

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold text-gray-900 mb-6">Sellers ({sellers.length})</h1>

      <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="text-left px-4 py-3 font-medium text-gray-600">Name</th>
                <th className="text-left px-4 py-3 font-medium text-gray-600">Store</th>
                <th className="text-left px-4 py-3 font-medium text-gray-600">Email</th>
                <th className="text-left px-4 py-3 font-medium text-gray-600">Status</th>
                <th className="text-left px-4 py-3 font-medium text-gray-600">Joined</th>
                <th className="text-right px-4 py-3 font-medium text-gray-600">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {sellers.map((seller) => (
                <tr key={seller._id} className="hover:bg-gray-50">
                  <td className="px-4 py-3 font-medium text-gray-900">{seller.name}</td>
                  <td className="px-4 py-3 text-gray-600">{seller.storeName || '-'}</td>
                  <td className="px-4 py-3 text-gray-600">{seller.email}</td>
                  <td className="px-4 py-3">
                    <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${
                      seller.isApproved ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'
                    }`}>
                      {seller.isApproved ? 'Approved' : 'Pending'}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-gray-500">{formatDate(seller.createdAt)}</td>
                  <td className="px-4 py-3">
                    <div className="flex items-center justify-end gap-2">
                      {!seller.isApproved && (
                        <button onClick={() => handleApprove(seller._id)}
                          className="p-1.5 text-green-600 hover:bg-green-50 rounded-lg" title="Approve">
                          <HiCheck className="h-4 w-4" />
                        </button>
                      )}
                      {seller.isApproved && (
                        <button onClick={() => handleReject(seller._id)}
                          className="p-1.5 text-red-600 hover:bg-red-50 rounded-lg" title="Reject">
                          <HiXMark className="h-4 w-4" />
                        </button>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default AdminSellers;
