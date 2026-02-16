import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchCategories, createCategory, updateCategory, deleteCategory } from '../../features/categories/categorySlice';
import LoadingSpinner from '../../components/common/LoadingSpinner';
import { HiPencil, HiTrash, HiPlus, HiXMark } from 'react-icons/hi2';
import toast from 'react-hot-toast';

const AdminCategories = () => {
  const dispatch = useDispatch();
  const { categories, loading } = useSelector((state) => state.categories);
  const [showForm, setShowForm] = useState(false);
  const [editId, setEditId] = useState(null);
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');

  useEffect(() => {
    dispatch(fetchCategories());
  }, [dispatch]);

  const resetForm = () => {
    setShowForm(false);
    setEditId(null);
    setName('');
    setDescription('');
  };

  const handleEdit = (cat) => {
    setEditId(cat._id);
    setName(cat.name);
    setDescription(cat.description || '');
    setShowForm(true);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const action = editId
      ? updateCategory({ id: editId, name, description })
      : createCategory({ name, description });

    dispatch(action)
      .unwrap()
      .then(() => {
        toast.success(editId ? 'Category updated' : 'Category created');
        resetForm();
      })
      .catch((err) => toast.error(err));
  };

  const handleDelete = (id, catName) => {
    if (!window.confirm(`Delete category "${catName}"?`)) return;
    dispatch(deleteCategory(id))
      .unwrap()
      .then(() => toast.success('Category deleted'))
      .catch((err) => toast.error(err));
  };

  if (loading) return <LoadingSpinner />;

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Categories ({categories.length})</h1>
        <button onClick={() => { resetForm(); setShowForm(true); }}
          className="flex items-center gap-2 bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700">
          <HiPlus className="h-5 w-5" /> Add Category
        </button>
      </div>

      {/* Form */}
      {showForm && (
        <div className="bg-white rounded-xl border border-gray-200 p-5 mb-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="font-semibold">{editId ? 'Edit Category' : 'New Category'}</h2>
            <button onClick={resetForm} className="text-gray-400 hover:text-gray-600">
              <HiXMark className="h-5 w-5" />
            </button>
          </div>
          <form onSubmit={handleSubmit} className="space-y-4">
            <input value={name} onChange={(e) => setName(e.target.value)} required placeholder="Category name"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none" />
            <input value={description} onChange={(e) => setDescription(e.target.value)} placeholder="Description (optional)"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none" />
            <button type="submit" className="bg-indigo-600 text-white px-6 py-2 rounded-lg hover:bg-indigo-700">
              {editId ? 'Update' : 'Create'}
            </button>
          </form>
        </div>
      )}

      {/* List */}
      <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
        <div className="divide-y divide-gray-100">
          {categories.map((cat) => (
            <div key={cat._id} className="flex items-center justify-between px-5 py-3 hover:bg-gray-50">
              <div>
                <span className="font-medium text-gray-900">{cat.name}</span>
                {cat.description && <p className="text-sm text-gray-500">{cat.description}</p>}
              </div>
              <div className="flex items-center gap-2">
                <button onClick={() => handleEdit(cat)} className="p-1.5 text-gray-500 hover:text-indigo-600">
                  <HiPencil className="h-4 w-4" />
                </button>
                <button onClick={() => handleDelete(cat._id, cat.name)} className="p-1.5 text-gray-500 hover:text-red-600">
                  <HiTrash className="h-4 w-4" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AdminCategories;
