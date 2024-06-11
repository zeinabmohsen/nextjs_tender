import React, { useState } from 'react';
import { BsStarFill, BsStarHalf, BsStar, BsGeoAlt } from 'react-icons/bs';
import { useDispatch } from 'react-redux'; // Import useDispatch to dispatch actions
import { confirmPlace, rejectPlace } from '../redux/action/placeAction'; // Import actions
import { toast } from 'react-toastify'; // Import toast for displaying notifications

const Modal = ({ isOpen, onClose, place }) => {
    if (!isOpen || !place) return null;

    const [activeTab, setActiveTab] = useState('details');
    const [status, setStatus] = useState('pending');
    const dispatch = useDispatch(); // Initialize dispatch

    const handleApprove = () => {
        dispatch(confirmPlace(place.placeid
        )); // Dispatch action to confirm the place
        setStatus('approved');
        toast.success("Place approved successfully");
    };

    const handleReject = () => {
        dispatch(rejectPlace(place.placeid
        )); // Dispatch action to reject the place
        setStatus('rejected');
        toast.success("Place rejected successfully");
    };

    const handleTabChange = (tab) => {
        setActiveTab(tab);
    };

    const getStatusStyle = () => {
        if (status === 'approved') {
            return 'text-green-500';
        } else if (status === 'rejected') {
            return 'text-red-500';
        }
    };

    return (
        <div className="fixed inset-0 z-50 overflow-auto bg-black bg-opacity-50 flex">
            <div className="relative rounded-lg p-8 bg-white w-full max-w-md m-auto flex flex-col">
                
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
                <div className="flex flex-col items-center justify-center">
                    {place.photos && place.photos.length > 0 && place.photos[0].photo_url && (
                        <img src={`http://localhost:3000${place.photos[0].photo_url}`} alt={place.name} className="w-full h-40 object-cover relative" />
                    )}
                    <h3 className="text-lg font-medium text-019874 mt-4">{place.name}</h3>
                    {/* <div className="flex items-center text-sm my-2">
                        <BsStarFill className="text-[#019874] mr-1" />
                        <BsStarFill className="text-[#019874] mr-1" />
                        <BsStarFill className="text-[#019874] mr-1" />
                        <BsStarHalf className="text-[#019874] mr-1" />
                        <BsStar className="text-gray-300" />
                        <span className="ml-2">{place.rating}</span>
                    </div> */}
                    <p className={`text-sm mb-2 ${getStatusStyle()}`}>{status}</p>
                    {status === 'pending' && (
                        <div className="flex mt-4">
                            <button className="flex-1 px-4 py-2 mr-4 bg-green-500 text-white rounded-lg hover:bg-green-600" onClick={handleApprove}>Approve</button>
                            <button className="flex-1 px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600" onClick={handleReject}>Reject</button>
                        </div>
                    )}
                    <div className="flex mt-4">
                        <button
                            className={`flex-1 px-4 py-2 mr-4 border-b-2 ${activeTab === 'details' ? 'border-[#019874]' : ''}`}
                            onClick={() => handleTabChange('details')}
                        >
                            Details
                        </button>
               
                    </div>
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
