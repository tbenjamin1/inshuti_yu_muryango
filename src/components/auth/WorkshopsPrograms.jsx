import React, { useState, useEffect } from "react";
import {
  Star,
  Clock,
  Users,
  ChevronRight,
  Heart,
  BookOpen,
  Palette,
  Scissors,
  Camera,
  Music,
  Paintbrush,
  ShoppingBag,
  User,
  UserPlus,
  Shield,
  Eye,
  EyeOff,
  Calendar,
  Settings,
  Crown,
  CheckCircle,
  XCircle,
  Loader,
} from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchAsynGroups,
  fetchAsynServices,
  getAllGroups,
  getAllPaginatedGroups,
  getAllPaginatedServices,
  getAllServices,
  getIsLoadingGroups,
  getIsLoadingServices,
  getUser,
} from "../../redux/transactions/TransactionSlice";

const API_BASE = "https://ecommerce-backend-0v7j.onrender.com/api";

const WorkshopsPrograms = () => {
  const dispatch = useDispatch();
  const user = useSelector(getUser);
  const token = user?.token;
  
  // Get Groups
  const groupsList = useSelector(getAllGroups);
  const paginatedGroupsList = useSelector(getAllPaginatedGroups);
  const isLoadingGroups = useSelector(getIsLoadingGroups);

  const [loading, setLoading] = useState(true);
  const [visibleprograms, setVisibleprograms] = useState(8);
  const [joiningGroups, setJoiningGroups] = useState(new Set());
  const [selectedGroup, setSelectedGroup] = useState(null);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    if (token) {
      dispatch(
        fetchAsynGroups({
          currentPage: 1,
          searchQuery: "",
          categoryId: "",
          serviceId: "",
        })
      );
    }
  }, [token, dispatch]);

  const loadMore = () => {
    setVisibleprograms((prev) => Math.min(prev + 4, groupsList.length));
  };

  const joinGroup = async (groupId) => {
    if (!token) return;
    
    setJoiningGroups(prev => new Set(prev).add(groupId));
    
    try {
      const response = await fetch(`${API_BASE}/groups/${groupId}/join`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });
      
      if (response.ok) {
        // Refresh groups list after successful join
        dispatch(
          fetchAsynGroups({
            currentPage: 1,
            searchQuery: "",
            categoryId: "",
            serviceId: "",
          })
        );
        
        // Show success message or update UI
        alert('Successfully joined the group!');
        const joinData = await response.json();
        console.log('joinData', joinData);
        
        // Redirect user if redirect_link is provided
        if (joinData?.redirect_link) {
          // Option 1: Redirect in the same tab
          window.location.href = joinData.redirect_link;
          
          // Option 2: Open in a new tab (comment out the line above and uncomment below)
          // window.open(joinData.redirect_link, '_blank');
        }
      } else {
        const errorData = await response.json();
        alert(`Failed to join group: ${errorData.message || 'Unknown error'}`);
      }
    } catch (error) {
      console.error('Error joining group:', error);
      alert('Failed to join group. Please try again.');
    } finally {
      setJoiningGroups(prev => {
        const newSet = new Set(prev);
        newSet.delete(groupId);
        return newSet;
      });
    }
  };

  const openGroupDetails = (group) => {
    setSelectedGroup(group);
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setSelectedGroup(null);
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  const getGroupIcon = (group) => {
    if (group.group_icon && group.group_icon !== 'default-group-icon-url') {
      return group.group_icon;
    }
    // Default icon based on service or fallback
    return group.service_id?.icon || '/default-group-icon.png';
  };

  const GroupCard = ({ group }) => (
    <div className="group bg-white bg-opacity-10 backdrop-blur-md rounded-2xl overflow-hidden border border-white border-opacity-20 hover:bg-opacity-20 transition-all duration-300 hover:scale-105 hover:shadow-2xl">
      <div className="relative overflow-hidden">
        <div className="w-full h-48 bg-gradient-to-br from-purple-500 to-blue-500 flex items-center justify-center">
          {group.group_icon && group.group_icon !== 'default-group-icon-url' ? (
            <img
              src={group.group_icon}
              alt={group.name}
              className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
            />
          ) : (
            <div className="text-white text-6xl opacity-80">
              <Users />
            </div>
          )}
        </div>
        
        <div className="absolute inset-0 bg-gradient-to-t from-black from-opacity-20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
        
        <div className="absolute top-3 right-3 flex gap-2">
          <span className={`text-white text-xs font-bold px-2 py-1 rounded-full ${
            group.is_active ? 'bg-green-500' : 'bg-red-500'
          }`}>
            {group.is_active ? 'Active' : 'Inactive'}
          </span>
          
          <span className={`text-white text-xs font-bold px-2 py-1 rounded-full ${
            group.is_private ? 'bg-orange-500' : 'bg-blue-500'
          }`}>
            {group.is_private ? (
              <span className="flex items-center gap-1">
                <EyeOff className="w-3 h-3" />
                Private
              </span>
            ) : (
              <span className="flex items-center gap-1">
                <Eye className="w-3 h-3" />
                Public
              </span>
            )}
          </span>
        </div>

        <div className="absolute bottom-3 left-3">
          <span className="bg-black bg-opacity-50 text-white text-xs px-2 py-1 rounded-full flex items-center gap-1">
            <Users className="w-3 h-3" />
            {group.formatted_members || `${group.members_count || 0} members`}
          </span>
        </div>
      </div>

      <div className="p-6">
        <div className="flex items-start justify-between mb-3">
          <h3 className="text-white font-bold text-lg group-hover:text-blue-100 transition-colors duration-300 flex-1">
            {group.name}
          </h3>
          {group.approval_status === 'approved' && (
            <CheckCircle className="w-5 h-5 text-green-400 flex-shrink-0 ml-2" />
          )}
        </div>

        <p className="text-white text-opacity-80 text-sm mb-3 line-clamp-2">
          {group.description || 'No description available'}
        </p>

        {group.service_id && (
          <div className="bg-white bg-opacity-10 rounded-lg p-3 mb-4">
            <p className="text-white text-opacity-90 text-xs font-medium mb-1">
              Service Category
            </p>
            <p className="text-white text-sm font-semibold">
              {group.service_id.title}
            </p>
            <p className="text-white text-opacity-70 text-xs">
              {group.service_id.subtitle}
            </p>
          </div>
        )}

        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <Crown className="w-4 h-4 text-yellow-400" />
            <span className="text-white text-opacity-70 text-xs">
              Admin: {group.group_admin?.fullName || 'Unknown'}
            </span>
          </div>
          <span className="text-white text-opacity-60 text-xs">
            <Calendar className="w-3 h-3 inline mr-1" />
            {formatDate(group.createdAt)}
          </span>
        </div>

        <div className="flex gap-2">
          <button
            onClick={() => openGroupDetails(group)}
            className="flex-1 bg-white bg-opacity-20 text-white px-3 py-2 rounded-lg text-sm font-medium hover:bg-opacity-30 transition-all duration-300 border border-white border-opacity-20 flex items-center justify-center gap-2"
          >
            <BookOpen className="w-4 h-4" />
            View Details
          </button>
          
          {group.is_active && (
            <button
              onClick={() => joinGroup(group.id)}
              disabled={joiningGroups.has(group.id)}
              className="flex-1 bg-green-500 hover:bg-green-600 text-white px-3 py-2 rounded-lg text-sm font-medium transition-all duration-300 flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {joiningGroups.has(group.id) ? (
                <>
                  <Loader className="w-4 h-4 animate-spin" />
                  Joining...
                </>
              ) : (
                <>
                  <UserPlus className="w-4 h-4" />
                  Join Group
                </>
              )}
            </button>
          )}
        </div>
      </div>
    </div>
  );

  const LoadingCard = () => (
    <div className="bg-white bg-opacity-10 backdrop-blur-md rounded-2xl overflow-hidden border border-white border-opacity-20 animate-pulse">
      <div className="bg-white bg-opacity-20 h-48 w-full"></div>
      <div className="p-6">
        <div className="bg-white bg-opacity-20 h-6 w-3/4 rounded mb-2"></div>
        <div className="bg-white bg-opacity-20 h-4 w-1/2 rounded mb-3"></div>
        <div className="bg-white bg-opacity-20 h-10 w-full rounded"></div>
      </div>
    </div>
  );

  const GroupDetailsModal = ({ group, onClose }) => {
    if (!group) return null;

    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
        <div className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
          <div className="p-6">
            <div className="flex items-start justify-between mb-6">
              <h2 className="text-2xl font-bold text-gray-800">{group.name}</h2>
              <button
                onClick={onClose}
                className="text-gray-400 hover:text-gray-600 transition-colors"
              >
                <XCircle className="w-6 h-6" />
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              <div className="space-y-4">
                <div>
                  <h3 className="text-lg font-semibold text-gray-700 mb-2">Group Information</h3>
                  <div className="space-y-2">
                    <p className="text-gray-600">
                      <strong>Description:</strong> {group.description || 'No description available'}
                    </p>
                    <p className="text-gray-600">
                      <strong>Members:</strong> {group.formatted_members || `${group.members_count || 0} members`}
                    </p>
                    <p className="text-gray-600">
                      <strong>Status:</strong> 
                      <span className={`ml-2 px-2 py-1 rounded-full text-xs ${
                        group.is_active ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                      }`}>
                        {group.is_active ? 'Active' : 'Inactive'}
                      </span>
                    </p>
                    <p className="text-gray-600">
                      <strong>Privacy:</strong> 
                      <span className={`ml-2 px-2 py-1 rounded-full text-xs ${
                        group.is_private ? 'bg-orange-100 text-orange-800' : 'bg-blue-100 text-blue-800'
                      }`}>
                        {group.is_private ? 'Private' : 'Public'}
                      </span>
                    </p>
                    <p className="text-gray-600">
                      <strong>Created:</strong> {formatDate(group.createdAt)}
                    </p>
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <div>
                  <h3 className="text-lg font-semibold text-gray-700 mb-2">Administration</h3>
                  <div className="space-y-2">
                    <p className="text-gray-600">
                      <strong>Admin:</strong> {group.group_admin?.fullName || 'Unknown'}
                    </p>
                    <p className="text-gray-600">
                      <strong>Username:</strong> @{group.group_admin?.username || 'unknown'}
                    </p>
                    <p className="text-gray-600">
                      <strong>Created by:</strong> {group.created_by?.fullName || 'Unknown'}
                    </p>
                    <p className="text-gray-600">
                      <strong>Approval Status:</strong> 
                      <span className={`ml-2 px-2 py-1 rounded-full text-xs ${
                        group.approval_status === 'approved' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
                      }`}>
                        {group.approval_status}
                      </span>
                    </p>
                  </div>
                </div>

                {group.service_id && (
                  <div>
                    <h3 className="text-lg font-semibold text-gray-700 mb-2">Service Category</h3>
                    <div className="bg-gray-50 rounded-lg p-4">
                      <p className="font-medium text-gray-800">{group.service_id.title}</p>
                      <p className="text-gray-600 text-sm mt-1">{group.service_id.subtitle}</p>
                      <div className="flex gap-4 mt-2 text-sm text-gray-500">
                        <span>{group.service_id.formatted_groups}</span>
                        <span>{group.service_id.formatted_members}</span>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>

            <div className="flex gap-4 pt-4 border-t">
              <button
                onClick={onClose}
                className="flex-1 bg-gray-100 hover:bg-gray-200 text-gray-800 px-4 py-2 rounded-lg transition-colors"
              >
                Close
              </button>
              {group.is_active && (
                <button
                  onClick={() => {
                    joinGroup(group.id);
                    onClose();
                  }}
                  disabled={joiningGroups.has(group.id)}
                  className="flex-1 bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-lg transition-colors flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {joiningGroups.has(group.id) ? (
                    <>
                      <Loader className="w-4 h-4 animate-spin" />
                      Joining...
                    </>
                  ) : (
                    <>
                      <UserPlus className="w-4 h-4" />
                      Join Group
                    </>
                  )}
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="bg-gradient-to-br from-purple-400 via-purple-400 to-blue-400 rounded-3xl p-8 shadow-2xl">
      {/* Header Section */}
      <div className="text-center mb-8">
        <h1 className="text-4xl font-bold text-white mb-4">Groups & Programs</h1>
        <p className="text-white text-opacity-80 text-lg">
          Join communities and discover programs that match your interests
        </p>
      </div>

      {/* Groups Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-8 mb-10">
        {isLoadingGroups
          ? // Loading state
            Array.from({ length: 8 }).map((_, index) => (
              <LoadingCard key={index} />
            ))
          : // Group cards
            groupsList
              .slice(0, visibleprograms)
              .map((group) => (
                <GroupCard key={group.id} group={group} />
              ))}
      </div>

      {/* Load More Section */}
      {!isLoadingGroups && groupsList.length > visibleprograms && (
        <div className="text-center">
          <button
            onClick={loadMore}
            className="group relative bg-white bg-opacity-20 text-white font-bold px-8 py-4 rounded-2xl hover:bg-opacity-30 transition-all duration-300 shadow-xl text-lg backdrop-blur-md border border-white border-opacity-20 overflow-hidden"
          >
            <span className="relative z-10 flex items-center space-x-2">
              <span>Load More Groups</span>
              <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" />
            </span>
            <div className="absolute inset-0 bg-white bg-opacity-10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
          </button>
          <p className="text-white text-opacity-70 mt-4 text-sm">
            Showing {visibleprograms} of {groupsList.length} groups
          </p>
        </div>
      )}

      {/* No Groups Message */}
      {!isLoadingGroups && groupsList.length === 0 && (
        <div className="text-center py-12">
          <Users className="w-16 h-16 text-white text-opacity-50 mx-auto mb-4" />
          <h3 className="text-white text-xl font-semibold mb-2">No Groups Available</h3>
          <p className="text-white text-opacity-70">
            There are no groups to display at the moment. Check back later!
          </p>
        </div>
      )}

      {/* Group Details Modal */}
      {showModal && (
        <GroupDetailsModal 
          group={selectedGroup} 
          onClose={closeModal} 
        />
      )}
    </div>
  );
};

export default WorkshopsPrograms;