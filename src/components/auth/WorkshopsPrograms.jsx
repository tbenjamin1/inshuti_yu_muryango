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

const WorkshopsPrograms = ({}) => {
  const dispatch = useDispatch();
  const user = useSelector(getUser);
  const token = user?.token;
  //  get Groups
  const groupsList = useSelector(getAllGroups);
  const paginatedGroupsList = useSelector(getAllPaginatedGroups);
  const isLoadingGroups = useSelector(getIsLoadingGroups);

  console.log("Groups List:", groupsList);
  console.log("Paginated Groups List:", paginatedGroupsList);
  console.log("Is Loading Groups:", isLoadingGroups);



  const [loading, setLoading] = useState(true);
  const [visibleprograms, setVisibleprograms] = useState(8);

  // Sample product data with relevant content
  

  useEffect(() => {
    
    if (token) {
      dispatch(
        fetchAsynGroups({
                 currentPage: 1,
                 searchQuery: "",
                 categoryId: "",
                 serviceId: "6866e54235c41e4f64617892",
               })
      );
    }
  }, [token, dispatch]);

  const loadMore = () => {
    setVisibleprograms((prev) => Math.min(prev + 4, groupsList.length));
  };

  const ServiceCard = ({ service }) => (
    <div className="group bg-white bg-opacity-10 backdrop-blur-md rounded-2xl overflow-hidden border border-white border-opacity-20 hover:bg-opacity-20 transition-all duration-300 hover:scale-105 hover:shadow-2xl">
      <div className="relative overflow-hidden">
        <img
          src={service.icon}
          alt={service.title}
          className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-500"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black from-opacity-20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
        <div className="absolute top-3 right-3">
          <span className="bg-green-500 text-white text-xs font-bold px-2 py-1 rounded-full">
            {service.is_active ? "available" : "unavailable"}
          </span>
        </div>
      </div>

      <div className="p-6">
        <h3 className="text-white font-bold text-lg mb-2 group-hover:text-blue-100 transition-colors duration-300">
          {service.title}
        </h3>
        <p className="text-white text-opacity-80 text-sm mb-3 capitalize">
          {service.subtitle}
        </p>
        <div className="flex items-center justify-between">
          <span className="text-white text-opacity-70 text-xs">
            Status: {service.is_active ? "Active" : "Inactive"}
          </span>
          <button className="bg-white bg-opacity-20 text-white px-3 py-1 rounded-lg text-xs font-medium hover:bg-opacity-30 transition-all duration-300 border border-white border-opacity-20">
            Learn More
          </button>
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
        <div className="bg-white bg-opacity-20 h-3 w-1/4 rounded"></div>
      </div>
    </div>
  );

  return (
    <div className="bg-gradient-to-br from-purple-400 via-purple-400 to-blue-400 rounded-3xl p-8 shadow-2xl">
      {/* Header Section */}

      {/* programs Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mb-10">
        {isLoadingGroups
          ? // Loading state
            Array.from({ length: 8 }).map((_, index) => (
              <LoadingCard key={index} />
            ))
          : // Product cards
          groupsList
              .slice(0, visibleprograms)
              .map((service) => (
                <ServiceCard key={service.id} service={service} />
              ))}
      </div>

      {/* Load More Section */}
      {!isLoadingGroups &&  groupsList.length && (
        <div className="text-center">
          <button
            onClick={loadMore}
            className="group relative bg-white bg-opacity-20 text-white font-bold px-8 py-4 rounded-2xl hover:bg-opacity-30 transition-all duration-300 shadow-xl text-lg backdrop-blur-md border border-white border-opacity-20 overflow-hidden"
          >
            <span className="relative z-10 flex items-center space-x-2">
              <span>Load More Programs</span>
              <svg
                className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path
                  fillRule="evenodd"
                  d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z"
                  clipRule="evenodd"
                />
              </svg>
            </span>
            <div className="absolute inset-0 bg-white bg-opacity-10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
          </button>
          <p className="text-white text-opacity-70 mt-4 text-sm">
            Showing {visibleprograms} of {groupsList.length} programs
          </p>
        </div>
      )}

      {/* Stats Section */}
    </div>
  );
};

export default WorkshopsPrograms;
