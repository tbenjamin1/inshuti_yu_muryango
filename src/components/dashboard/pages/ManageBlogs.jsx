import React, { useState, useEffect, useCallback } from "react";
import {
  Plus,
  Edit,
  Trash2,
  Eye,
  EyeOff,
  Search,
  Upload,
  X,
  AlertCircle,
  Loader2,
  Power,
  PowerOff,
} from "lucide-react";
import DashboardHome from "../DashboardLayout";
import { getUser } from "../../../redux/transactions/TransactionSlice";
import { useDispatch, useSelector } from "react-redux";

const ManageBlogs = () => {
  const dispatch = useDispatch();
  const user = useSelector(getUser);
  const token = user?.token;

  // State management
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(false);
  const [submitLoading, setSubmitLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [showViewModal, setShowViewModal] = useState(false);
  const [editingBlog, setEditingBlog] = useState(null);
  const [viewingBlog, setViewingBlog] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortBy, setSortBy] = useState("recent");
  const [activeOnly, setActiveOnly] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  // Form state
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    is_active: true,
    thumbnail: null,
    gallery: [],
  });

  const [formErrors, setFormErrors] = useState({});

  const API_BASE = "https://ecommerce-backend-0v7j.onrender.com/api/blogs";

  // Show messages
  const showMessage = (message, type = "success") => {
    if (type === "success") {
      setSuccess(message);
      setError("");
    } else {
      setError(message);
      setSuccess("");
    }
    setTimeout(() => {
      setSuccess("");
      setError("");
    }, 5000);
  };

  // Validate form
  const validateForm = () => {
    const errors = {};
    
    if (!formData.title.trim()) {
      errors.title = "Title is required";
    }
    
    if (!formData.description.trim()) {
      errors.description = "Description is required";
    }
    
    if (!editingBlog && formData.gallery.length === 0) {
      errors.gallery = "At least one gallery image is required";
    }

    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  // Fetch blogs with better error handling
  const fetchBlogs = useCallback(async () => {
    if (!token) {
      showMessage("Authentication required", "error");
      return;
    }

    setLoading(true);
    setError("");
    
    try {
      const params = new URLSearchParams({
        page: currentPage.toString(),
        limit: "10",
        active_only: activeOnly.toString(),
        sort: sortBy,
      });

      const response = await fetch(`${API_BASE}?${params}`, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      
      if (data.success === false) {
        throw new Error(data.message || "Failed to fetch blogs");
      }

      setBlogs(data.blogs || data.data || []);
      setTotalPages(data.totalPages || Math.ceil((data.total || 0) / 10));
      
    } catch (error) {
      console.error("Error fetching blogs:", error);
      showMessage(error.message || "Failed to fetch blogs", "error");
      setBlogs([]);
    } finally {
      setLoading(false);
    }
  }, [currentPage, activeOnly, sortBy, token]);

  useEffect(() => {
    fetchBlogs();
  }, [fetchBlogs]);

  // Handle form submission with better error handling
  const handleSubmit = async (e) => {
    e?.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    if (!token) {
      showMessage("Authentication required", "error");
      return;
    }

    setSubmitLoading(true);
    setError("");

    try {
      const formDataToSend = new FormData();
      formDataToSend.append("title", formData.title.trim());
      formDataToSend.append("description", formData.description.trim());
      formDataToSend.append("is_active", formData.is_active);

      if (formData.thumbnail) {
        formDataToSend.append("thumbnail", formData.thumbnail);
      }

      formData.gallery.forEach((file) => {
        formDataToSend.append("gallery", file);
      });

      const url = editingBlog ? `${API_BASE}/${editingBlog.id}` : API_BASE;
      const method = editingBlog ? "PUT" : "POST";

      const response = await fetch(url, {
        method,
        body: formDataToSend,
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.message || `HTTP error! status: ${response.status}`);
      }

      const result = await response.json();
      
      if (result.success === false) {
        throw new Error(result.message || "Failed to save blog");
      }

      showMessage(
        editingBlog ? "Blog updated successfully!" : "Blog created successfully!"
      );
      
      setShowModal(false);
      resetForm();
      fetchBlogs();
      
    } catch (error) {
      console.error("Error saving blog:", error);
      showMessage(error.message || "Failed to save blog", "error");
    } finally {
      setSubmitLoading(false);
    }
  };

  // Reset form
  const resetForm = () => {
    setFormData({
      title: "",
      description: "",
      is_active: true,
      thumbnail: null,
      gallery: [],
    });
    setFormErrors({});
    setEditingBlog(null);
  };

  // Handle view blog
  const handleView = (blog) => {
    setViewingBlog(blog);
    setShowViewModal(true);
  };

  // Handle edit
  const handleEdit = (blog) => {
    setEditingBlog(blog);
    setFormData({
      title: blog.title || "",
      description: blog.description || "",
      is_active: blog.is_active !== undefined ? blog.is_active : true,
      thumbnail: null,
      gallery: [],
    });
    setFormErrors({});
    setShowModal(true);
  };

  // Handle delete with better confirmation
  const handleDelete = async (id, title) => {
    if (!token) {
      showMessage("Authentication required", "error");
      return;
    }

    if (!window.confirm(`Are you sure you want to delete "${title}"? This action cannot be undone.`)) {
      return;
    }

    setLoading(true);
    
    try {
      const response = await fetch(`${API_BASE}/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.message || `HTTP error! status: ${response.status}`);
      }

      showMessage("Blog deleted successfully!");
      fetchBlogs();
      
    } catch (error) {
      console.error("Error deleting blog:", error);
      showMessage(error.message || "Failed to delete blog", "error");
    } finally {
      setLoading(false);
    }
  };

  // Toggle active status
  const toggleActive = async (id, isActive, title) => {
    if (!token) {
      showMessage("Authentication required", "error");
      return;
    }

    try {
      const endpoint = isActive ? "deactivate" : "activate";
      const response = await fetch(`${API_BASE}/${id}/${endpoint}`, {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.message || `HTTP error! status: ${response.status}`);
      }

      showMessage(`Blog "${title}" ${isActive ? "deactivated" : "activated"} successfully!`);
      fetchBlogs();
      
    } catch (error) {
      console.error("Error toggling blog status:", error);
      showMessage(error.message || "Failed to update blog status", "error");
    }
  };

  // Handle file uploads with validation
  const handleFileUpload = (e, type) => {
    const files = Array.from(e.target.files);
    
    if (files.length === 0) return;

    // Validate file types
    const validTypes = ['image/jpeg', 'image/png', 'image/gif', 'image/webp'];
    const invalidFiles = files.filter(file => !validTypes.includes(file.type));
    
    if (invalidFiles.length > 0) {
      showMessage("Please select only image files (JPEG, PNG, GIF, WebP)", "error");
      return;
    }

    // Validate file sizes (5MB limit)
    const maxSize = 5 * 1024 * 1024;
    const oversizedFiles = files.filter(file => file.size > maxSize);
    
    if (oversizedFiles.length > 0) {
      showMessage("File size should be less than 5MB", "error");
      return;
    }

    if (type === "thumbnail") {
      setFormData((prev) => ({ ...prev, thumbnail: files[0] }));
    } else {
      const newGallery = [...formData.gallery, ...files].slice(0, 10);
      setFormData((prev) => ({ ...prev, gallery: newGallery }));
      
      if (formErrors.gallery) {
        setFormErrors(prev => ({ ...prev, gallery: "" }));
      }
    }
  };

  // Remove gallery image
  const removeGalleryImage = (index) => {
    setFormData((prev) => ({
      ...prev,
      gallery: prev.gallery.filter((_, i) => i !== index),
    }));
  };

  // Filter blogs
  const filteredBlogs = blogs.filter((blog) =>
    blog.title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    blog.description?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Loading component
  const LoadingSpinner = () => (
    <div className="flex items-center justify-center p-8">
      <Loader2 className="h-8 w-8 animate-spin text-blue-600" />
      <span className="ml-2 text-gray-600">Loading...</span>
    </div>
  );

  // Error/Success messages
  const MessageAlert = ({ message, type }) => (
    <div className={`mb-4 p-4 rounded-lg flex items-center gap-2 ${
      type === "error" ? "bg-red-50 text-red-700 border border-red-200" : "bg-green-50 text-green-700 border border-green-200"
    }`}>
      <AlertCircle size={20} />
      <span>{message}</span>
    </div>
  );

  return (
    <DashboardHome>
      <div className="p-6 max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold">Manage Blogs</h1>
          <button
            onClick={() => {
              resetForm();
              setShowModal(true);
            }}
            disabled={!token}
            className="bg-blue-600 text-white px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <Plus size={20} />
            Add Blog
          </button>
        </div>

        {/* Error/Success Messages */}
        {error && <MessageAlert message={error} type="error" />}
        {success && <MessageAlert message={success} type="success" />}

        {/* Filters */}
        <div className="bg-white rounded-lg shadow-sm p-4 mb-6">
          <div className="flex flex-wrap gap-4 items-center">
            <div className="flex-1 min-w-64">
              <div className="relative">
                <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search blogs..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="recent">Recent</option>
              <option value="popular">Popular</option>
              <option value="views">Views</option>
              <option value="likes">Likes</option>
            </select>
            <label className="flex items-center gap-2">
              <input
                type="checkbox"
                checked={activeOnly}
                onChange={(e) => setActiveOnly(e.target.checked)}
                className="rounded"
              />
              Active Only
            </label>
          </div>
        </div>

        {/* Blog List */}
        <div className="bg-white rounded-lg shadow-sm overflow-hidden">
          {loading ? (
            <LoadingSpinner />
          ) : filteredBlogs.length === 0 ? (
            <div className="p-8 text-center text-gray-500">
              {searchTerm ? "No blogs found matching your search." : "No blogs available."}
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Title
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Status
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Created
                    </th>
                    <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {filteredBlogs.map((blog) => (
                    <tr key={blog.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4">
                        <div className="flex items-center">
                          {blog.thumbnail && (
                            <img
                              src={blog.thumbnail}
                              alt={blog.title}
                              className="h-10 w-10 rounded-lg object-cover mr-3"
                              onError={(e) => {
                                e.target.style.display = 'none';
                              }}
                            />
                          )}
                          <div>
                            <div className="text-sm font-medium text-gray-900 line-clamp-1">
                              {blog.title}
                            </div>
                            <div className="text-sm text-gray-500 line-clamp-2 max-w-xs">
                              {blog.description}
                            </div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span
                          className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                            blog.is_active
                              ? "bg-green-100 text-green-800"
                              : "bg-red-100 text-red-800"
                          }`}
                        >
                          {blog.is_active ? "Active" : "Inactive"}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {blog.created_at ? new Date(blog.created_at).toLocaleDateString() : "N/A"}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                        <div className="flex justify-end gap-2">
                          <button
                            onClick={() => handleView(blog)}
                            className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg"
                            title="View Details"
                          >
                            <Eye size={16} />
                          </button>
                          <button
                            onClick={() => toggleActive(blog.id, blog.is_active, blog.title)}
                            className={`p-2 rounded-lg ${
                              blog.is_active
                                ? "text-orange-600 hover:bg-orange-50"
                                : "text-green-600 hover:bg-green-50"
                            }`}
                            title={blog.is_active ? "Deactivate" : "Activate"}
                          >
                            {blog.is_active ? <PowerOff size={16} /> : <Power size={16} />}
                          </button>
                          <button
                            onClick={() => handleEdit(blog)}
                            className="p-2 text-indigo-600 hover:bg-indigo-50 rounded-lg"
                            title="Edit"
                          >
                            <Edit size={16} />
                          </button>
                          <button
                            onClick={() => handleDelete(blog.id, blog.title)}
                            className="p-2 text-red-600 hover:bg-red-50 rounded-lg"
                            title="Delete"
                          >
                            <Trash2 size={16} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="mt-6 flex justify-center gap-2">
            <button
              onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
              disabled={currentPage === 1}
              className="px-3 py-1 rounded bg-gray-200 text-gray-700 hover:bg-gray-300 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Previous
            </button>
            {Array.from({ length: totalPages }, (_, i) => (
              <button
                key={i + 1}
                onClick={() => setCurrentPage(i + 1)}
                className={`px-3 py-1 rounded ${
                  currentPage === i + 1
                    ? "bg-blue-600 text-white"
                    : "bg-gray-200 text-gray-700 hover:bg-gray-300"
                }`}
              >
                {i + 1}
              </button>
            ))}
            <button
              onClick={() => setCurrentPage(prev => Math.min(totalPages, prev + 1))}
              disabled={currentPage === totalPages}
              className="px-3 py-1 rounded bg-gray-200 text-gray-700 hover:bg-gray-300 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Next
            </button>
          </div>
        )}

        {/* View Blog Modal */}
        {showViewModal && viewingBlog && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg p-6 w-full max-w-4xl mx-4 max-h-[90vh] overflow-y-auto">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-2xl font-bold">Blog Details</h2>
                <button
                  onClick={() => {
                    setShowViewModal(false);
                    setViewingBlog(null);
                  }}
                  className="text-gray-500 hover:text-gray-700"
                >
                  <X size={24} />
                </button>
              </div>

              <div className="space-y-6">
                {/* Blog Status */}
                <div className="flex items-center gap-4">
                  <span
                    className={`inline-flex px-3 py-1 text-sm font-semibold rounded-full ${
                      viewingBlog.is_active
                        ? "bg-green-100 text-green-800"
                        : "bg-red-100 text-red-800"
                    }`}
                  >
                    {viewingBlog.is_active ? "Active" : "Inactive"}
                  </span>
                  <span className="text-sm text-gray-500">
                    Created: {viewingBlog.created_at ? new Date(viewingBlog.created_at).toLocaleDateString() : "N/A"}
                  </span>
                  {viewingBlog.updated_at && (
                    <span className="text-sm text-gray-500">
                      Updated: {new Date(viewingBlog.updated_at).toLocaleDateString()}
                    </span>
                  )}
                </div>

                {/* Blog Title */}
                <div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">
                    {viewingBlog.title}
                  </h3>
                </div>

                {/* Thumbnail */}
                {viewingBlog.thumbnail && (
                  <div>
                    <h4 className="text-lg font-medium text-gray-700 mb-2">Thumbnail</h4>
                    <img
                      src={viewingBlog.thumbnail}
                      alt={viewingBlog.title}
                      className="max-w-xs rounded-lg shadow-sm"
                      onError={(e) => {
                        e.target.style.display = 'none';
                      }}
                    />
                  </div>
                )}

                {/* Description */}
                <div>
                  <h4 className="text-lg font-medium text-gray-700 mb-2">Description</h4>
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <p className="text-gray-700 whitespace-pre-wrap">
                      {viewingBlog.description}
                    </p>
                  </div>
                </div>

                {/* Gallery Images */}
                {viewingBlog.gallery && viewingBlog.gallery.length > 0 && (
                  <div>
                    <h4 className="text-lg font-medium text-gray-700 mb-2">
                      Gallery ({viewingBlog.gallery.length} images)
                    </h4>
                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                      {viewingBlog.gallery.map((image, index) => (
                        <div key={index} className="relative group">
                          <img
                            src={image}
                            alt={`Gallery image ${index + 1}`}
                            className="w-full h-32 object-cover rounded-lg shadow-sm cursor-pointer hover:opacity-90 transition-opacity"
                            onError={(e) => {
                              e.target.style.display = 'none';
                            }}
                            onClick={() => {
                              // Open image in new tab
                              window.open(image, '_blank');
                            }}
                          />
                          <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-20 transition-all duration-200 rounded-lg flex items-center justify-center">
                            <Eye className="text-white opacity-0 group-hover:opacity-100 transition-opacity" size={24} />
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Blog Statistics (if available) */}
                {(viewingBlog.views || viewingBlog.likes || viewingBlog.comments) && (
                  <div>
                    <h4 className="text-lg font-medium text-gray-700 mb-2">Statistics</h4>
                    <div className="grid grid-cols-3 gap-4">
                      {viewingBlog.views !== undefined && (
                        <div className="bg-blue-50 p-3 rounded-lg text-center">
                          <div className="text-2xl font-bold text-blue-600">{viewingBlog.views}</div>
                          <div className="text-sm text-blue-600">Views</div>
                        </div>
                      )}
                      {viewingBlog.likes !== undefined && (
                        <div className="bg-green-50 p-3 rounded-lg text-center">
                          <div className="text-2xl font-bold text-green-600">{viewingBlog.likes}</div>
                          <div className="text-sm text-green-600">Likes</div>
                        </div>
                      )}
                      {viewingBlog.comments !== undefined && (
                        <div className="bg-purple-50 p-3 rounded-lg text-center">
                          <div className="text-2xl font-bold text-purple-600">{viewingBlog.comments}</div>
                          <div className="text-sm text-purple-600">Comments</div>
                        </div>
                      )}
                    </div>
                  </div>
                )}

                {/* Action Buttons */}
                <div className="flex gap-3 pt-4 border-t">
                  <button
                    onClick={() => {
                      setShowViewModal(false);
                      setViewingBlog(null);
                      handleEdit(viewingBlog);
                    }}
                    className="bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 flex items-center gap-2"
                  >
                    <Edit size={16} />
                    Edit Blog
                  </button>
                  <button
                    onClick={() => {
                      setShowViewModal(false);
                      setViewingBlog(null);
                      toggleActive(viewingBlog.id, viewingBlog.is_active, viewingBlog.title);
                    }}
                    className={`py-2 px-4 rounded-lg flex items-center gap-2 ${
                      viewingBlog.is_active
                        ? "bg-orange-600 text-white hover:bg-orange-700"
                        : "bg-green-600 text-white hover:bg-green-700"
                    }`}
                  >
                    {viewingBlog.is_active ? <PowerOff size={16} /> : <Power size={16} />}
                    {viewingBlog.is_active ? "Deactivate" : "Activate"}
                  </button>
                  <button
                    onClick={() => {
                      setShowViewModal(false);
                      setViewingBlog(null);
                    }}
                    className="bg-gray-300 text-gray-700 py-2 px-4 rounded-lg hover:bg-gray-400"
                  >
                    Close
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Create/Edit Blog Modal */}
        {showModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg p-6 w-full max-w-2xl mx-4 max-h-[90vh] overflow-y-auto">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-bold">
                  {editingBlog ? "Edit Blog" : "Add New Blog"}
                </h2>
                <button
                  onClick={() => {
                    setShowModal(false);
                    resetForm();
                  }}
                  className="text-gray-500 hover:text-gray-700"
                >
                  <X size={24} />
                </button>
              </div>

              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Title *
                  </label>
                  <input
                    type="text"
                    value={formData.title}
                    onChange={(e) => {
                      setFormData((prev) => ({ ...prev, title: e.target.value }));
                      if (formErrors.title) {
                        setFormErrors(prev => ({ ...prev, title: "" }));
                      }
                    }}
                    className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                      formErrors.title ? "border-red-500" : ""
                    }`}
                    required
                  />
                  {formErrors.title && (
                    <p className="text-red-500 text-sm mt-1">{formErrors.title}</p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Description *
                  </label>
                  <textarea
                    value={formData.description}
                    onChange={(e) => {
                      setFormData((prev) => ({ ...prev, description: e.target.value }));
                      if (formErrors.description) {
                        setFormErrors(prev => ({ ...prev, description: "" }));
                      }
                    }}
                    className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                      formErrors.description ? "border-red-500" : ""
                    }`}
                    rows="4"
                    required
                  />
                  {formErrors.description && (
                    <p className="text-red-500 text-sm mt-1">{formErrors.description}</p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Thumbnail
                  </label>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={(e) => handleFileUpload(e, "thumbnail")}
                    className="w-full px-3 py-2 border rounded-lg"
                  />
                  {formData.thumbnail && (
                    <div className="mt-2">
                      <img
                        src={URL.createObjectURL(formData.thumbnail)}
                        alt="Thumbnail preview"
                        className="h-20 w-20 object-cover rounded"
                      />
                    </div>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Gallery Images * (1-10 images)
                  </label>
                  <input
                    type="file"
                    accept="image/*"
                    multiple
                    onChange={(e) => handleFileUpload(e, "gallery")}
                    className={`w-full px-3 py-2 border rounded-lg ${
                      formErrors.gallery ? "border-red-500" : ""
                    }`}
                  />
                  {formErrors.gallery && (
                    <p className="text-red-500 text-sm mt-1">{formErrors.gallery}</p>
                  )}
                  {formData.gallery.length > 0 && (
                    <div className="mt-2 flex flex-wrap gap-2">
                      {formData.gallery.map((file, index) => (
                        <div key={index} className="relative">
                          <img
                            src={URL.createObjectURL(file)}
                            alt={`Gallery ${index + 1}`}
                            className="h-16 w-16 object-cover rounded"
                          />
                          <button
                            type="button"
                            onClick={() => removeGalleryImage(index)}
                            className="absolute -top-1 -right-1 bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs hover:bg-red-600"
                          >
                            ×
                          </button>
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                <div className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    checked={formData.is_active}
                    onChange={(e) =>
                      setFormData((prev) => ({ ...prev, is_active: e.target.checked }))
                    }
                    className="rounded"
                  />
                  <label className="text-sm font-medium text-gray-700">
                    Active
                  </label>
                </div>

                <div className="flex gap-3 pt-4">
                  <button
                    type="submit"
                    disabled={submitLoading}
                    className="flex-1 bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                  >
                    {submitLoading && <Loader2 size={16} className="animate-spin" />}
                    {submitLoading ? "Saving..." : editingBlog ? "Update" : "Create"}
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      setShowModal(false);
                      resetForm();
                    }}
                    disabled={submitLoading}
                    className="flex-1 bg-gray-300 text-gray-700 py-2 px-4 rounded-lg hover:bg-gray-400 disabled:opacity-50"
                  >
                    Cancel
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </DashboardHome>
  );
};

export default ManageBlogs;