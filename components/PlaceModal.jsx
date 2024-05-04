// Modal.jsx
import React, { useState } from 'react';
import { BsStarFill, BsStarHalf, BsStar, BsGeoAlt } from 'react-icons/bs';

const Modal = ({ isOpen, onClose, place }) => {
  console.log(place)
    if (!isOpen || !place) return null;

    const [activeTab, setActiveTab] = useState('details');
    const [currentImageIndex, setCurrentImageIndex] = useState(0);

    const handleTabChange = (tab) => {
        setActiveTab(tab);
    };

    const nextImage = () => {
        setCurrentImageIndex((prevIndex) => (prevIndex + 1) % place.photos.length);
    };

    const prevImage = () => {
        setCurrentImageIndex((prevIndex) => (prevIndex - 1 + place.photos.length) % place.photos.length);
    };

    return (
        <div className="fixed inset-0 z-50 overflow-auto bg-black bg-opacity-50 flex">
            <div className="relative rounded-lg p-8 bg-white w-full max-w-md m-auto flex flex-col">
                {/* Close button */}
                <button onClick={onClose} className="absolute top-0 right-0 p-2">
                    <svg
                        className="w-6 h-6 text-gray-500 cursor-pointer hover:text-gray-700"
                        fill="none"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                    >
                        <path d="M6 18L18 6M6 6l12 12"></path>
                    </svg>
                </button>
                {/* Modal content */}
                <div className="flex flex-col items-center justify-center">
                    <div className="relative w-full h-64">
                        <button onClick={prevImage} className="absolute left-0 top-1/2 transform -translate-y-1/2 bg-gray-100 rounded-full p-2">
                            {'<'}
                        </button>
                        <button onClick={nextImage} className="absolute right-0 top-1/2 transform -translate-y-1/2 bg-gray-100 rounded-full p-2">
                            {'>'}
                        </button>
                        <img src={`http://localhost:3000${place.photos[currentImageIndex]?.photo_url}`} alt={place.name} className="w-full h-full object-cover cursor-pointer" />
                    </div>
                    <h3 className="text-lg font-medium text-019874 mt-4">{place.name}</h3>
                    <div className="flex items-center text-sm my-2">
                        <BsStarFill className="text-[#019874] mr-1" />
                        <BsStarFill className="text-[#019874] mr-1" />
                        <BsStarFill className="text-[#019874] mr-1" />
                        <BsStarHalf className="text-[#019874] mr-1" />
                        <BsStar className="text-gray-300" />
                        <span className="ml-2">{place.rating}</span>
                    </div>

                    {/* Tabs */}
                    <div className="flex mt-4">
                        <button
                            className={`flex-1 px-4 py-2 mr-4 border-b-2 ${activeTab === 'details' ? 'border-[#019874]' : ''}`}
                            onClick={() => handleTabChange('details')}
                        >
                            Details
                        </button>
                    </div>
                    {/* Tab content */}
                    <div className="mt-4 h-64 overflow-y-auto">
                        {activeTab === 'details' && (
                            <div>
                                <p className="text-gray-600 mb-2">
                                    <span className="font-medium">Classification:</span> {place.classification}
                                </p>
                                <p className="text-gray-600 mb-2">
                                    <span className="font-medium">Region:</span> {place.region}
                                </p>
                                <p className="text-gray-600 mb-2">
                                    <span className="font-medium">City:</span> {place.city}
                                </p>
                                <p className="text-gray-600 mb-2 flex items-center">
                                    <span className="font-medium">Location:</span> 
                                    <a href={place.location} className="text-blue-500 ml-1">
                                        <BsGeoAlt className="inline-block" />
                                    </a>
                                </p>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Modal;


