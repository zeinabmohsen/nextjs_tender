import Link from 'next/link';
import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { BsSearch, BsStarFill, BsStarHalf, BsStar } from 'react-icons/bs'; // Icons
import { RxAddCircle, RxSketchLogo } from 'react-icons/rx';
import Modal from '../../components/PlaceModal'; // Import the modal component
import { approvedplace , deletePlace } from "../../redux/action/placeAction";

const Places = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedPlace, setSelectedPlace] = useState(null); // Track the selected place
  const [isModalOpen, setIsModalOpen] = useState(false); // Track modal open state

  const dispatch = useDispatch();

  // Fetching approved data
  const placesData = useSelector(({ placeReducer }) => placeReducer?.approvedPlaces?.data?.places);
  useEffect(() => {
    dispatch(approvedplace());
  }, [dispatch]);

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value.toLowerCase());
  };

  const handleApprove = () => {
    dispatch(deletePlace(place.placeid
    )); 
    toast.success("Place deleted successfully");
};

  const [places, setPlaces] = useState([]); // Initialize places state

  useEffect(() => {
    if (placesData) {
      const filteredPlaces = placesData.filter((place) =>
        place.name.toLowerCase().includes(searchTerm)
      );
      setPlaces(filteredPlaces);
    }
  }, [searchTerm, placesData]); // Re-filter on search term change or placesData change

  const openModal = (place) => {
    setSelectedPlace(place);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setSelectedPlace(null);
    setIsModalOpen(false);
  };

  return (
    <div className="container mx-auto px-4 mt-8">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-semibold text-019874">Places</h1>
        <div className="flex items-center space-x-4">
          <div className="relative flex items-center">
            <input
              type="text"
              className="px-4 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-019874"
              placeholder="Search places..."
              value={searchTerm}
              onChange={handleSearchChange}
              style={{ backgroundColor: '#f2f2f2', paddingLeft: 40 }}
            />
            <BsSearch className="absolute left-3 top-3 text-[#019874] cursor-pointer" />
          </div>
          <Link href="/place/form">
            <div className="bg-[#019874] text-white p-2 px-4 rounded-lg inline-block">+</div>
          </Link>
        </div>
      </div>

      <ul className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {places.map((place) => (
          <li key={place.placeid} className="rounded-lg shadow-md overflow-hidden bg-white cursor-pointer" onClick={() => openModal(place)}>
            {place.photos && place.photos.length > 0 && (
              <div>
                <img src={`http://localhost:3000${place.photos[0].photo_url}`} alt={place.name} className="w-full h-40 object-cover" />
              </div>
            )}
            <div className="p-4">
              <h3 className="text-lg font-medium text-019874">{place.name}</h3>
              <p className=" font-small text-gray-300">{place.classification}</p>
              <div className="flex items-center text-sm my-2">
                <BsStarFill className="text-[#019874] mr-1" />
                <BsStarFill className="text-[#019874] mr-1" />
                <BsStarFill className="text-[#019874] mr-1" />
                <BsStarHalf className="text-[#019874] mr-1" />
                <BsStar className="text-gray-300" />
                <span className="ml-2">{place.rating}</span>
              </div>
              <p className="text-gray-600 mb-2">{place.description}</p>
            </div>
          </li>
        ))}
      </ul>

      {/* Render the modal */}
      <Modal isOpen={isModalOpen} onClose={closeModal} place={selectedPlace} />
    </div>
  );
};

export default Places;

