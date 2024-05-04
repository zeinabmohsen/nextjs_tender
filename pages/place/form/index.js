import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { BsGeoAltFill, BsCameraFill, BsCheckCircleFill } from 'react-icons/bs'; // Icons
import { GoogleMap, Marker, useLoadScript } from "@react-google-maps/api";
import MultiImageInput from 'react-multiple-image-input';
import {
  Button,
  CircularProgress,
} from "@nextui-org/react";
import { createPlace, getAllServices } from '../../../redux/action/placeAction';

const Form = () => {
  const dispatch = useDispatch();
  const ServicesData = useSelector(({ placeReducer }) => placeReducer?.allPlaces.data.services);

  useEffect(() => {
    dispatch(getAllServices());
  }, [dispatch]);
  

  const [formData, setFormData] = useState({
    userid: '4',
    name: '',
    classification: '',
    region: '',
    city: '',
    services: [], // Change to an array
    location: '',
    photos: [],
    termsAccepted: false,
  });

  const [isLoaded, setIsLoaded] = useState(false);

  const handleChange = (event) => {
    const { name, type, checked } = event.target;

    if (name === 'services') {
      const serviceid = event.target.dataset.serviceid; 
      const updatedServices = checked
        ? [...formData.services, serviceid]
        : formData.services.filter((id) => id !== serviceid);

      setFormData((prevData) => ({
        ...prevData,
        services: updatedServices,
      }));
    } else {
      setFormData((prevData) => ({
        ...prevData,
        [name]: type === 'checkbox' ? checked : event.target.value,
      }));
    }
  };
  
  

  const handleSubmit = (event) => {
    event.preventDefault();

    // Dispatch action to create place with the new form data
    dispatch(createPlace(formData));

    // Log the form data
    console.log('Form submitted:', formData);

    // Clear form after submission (optional)
    setFormData({
      userid: '4',
      name: '',
      classification: '',
      region: '',
      city: '',
      services: [],
      location: '',
      photos: [],
      termsAccepted: false,
    });
  };
    
  return (
    <div className="bg-gray-100 px-4 py-8">
    <div className="container mx-auto px-4 py-8 shadow-lg rounded-lg bg-white">
  

      <h2 className="text-2xl font-semibold text-[#019874] mb-4 text-center">Request to Add a New Place</h2>
      <p className="text-gray-700 mb-8 text-center"> 
  Please fill out the questionnaire with correct and accurate information. All
  information will be reviewed before adding the place.
</p>

      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label htmlFor="name" className="block text-sm font-medium text-gray-800 mb-2">
            Name of the Place
          </label>
          <input
            type="text"
            id="name"
            name="name"
            className="shadow-sm focus:ring-green-500 focus:outline-none w-full sm:text-sm rounded-md border border-gray-300 py-2 px-3"
            value={formData.name}
            onChange={handleChange}
            required
          />
        </div>
        <div className="mb-4">
          <label
            htmlFor="classification"
            className="block text-sm font-medium text-gray-800 mb-2"
          >
            Place Classification
          </label>
          <select
            id="classification"
            name="classification"
            className="focus:ring-green-500 focus:outline-none w-full sm:text-sm rounded-md border border-gray-300 py-2 px-3"
            value={formData.classification}
            onChange={handleChange}
            required
          >
            <option value="">-- Select Classification --</option>
            <option value="restaurant">Restaurant</option>
            <option value="hotel">Hotel</option>
            <option value="tourist_attraction">Tourist Attraction</option>
            {/* Add more options as needed */}
          </select>
        </div>
        <div className="mb-4">
          <label htmlFor="region" className="block text-sm font-medium text-gray-800 mb-2">
            Region
          </label>
          <input
            type="text"
            id="region"
            name="region"
            className="shadow-sm focus:ring-green-500 focus:outline-none w-full sm:text-sm rounded-md border border-gray-300 py-2 px-3"
            value={formData.region}
            onChange={handleChange}
            required
          />
        </div>
        <div className="mb-4">
          <label htmlFor="city" className="block text-sm font-medium text-gray-800 mb-2">
            City
          </label>
          <input
            type="text"
            id="city"
            name="city"
            className="shadow-sm focus:ring-green-500 focus:outline-none w-full sm:text-sm rounded-md border border-gray-300 py-2 px-3"
            value={formData.city}
            onChange={handleChange}
            required
          />
        </div>

        <div className="mb-4 space-y-2">
  <label className="block text-sm font-medium text-gray-800 mb-2">Services Provided</label>
  <div className="grid grid-cols-2 gap-4">
  {ServicesData && ServicesData.map((service) => (
    <div className="flex items-center" key={service.serviceid}>
<input
  id={service.servicename}
  name="services"
  data-serviceid={service.serviceid}
  type="checkbox"
  className="focus:ring-green-500 h-4 w-4 text-green-500 border-gray-300 rounded checked:bg-green-500 checked:border-transparent"
  checked={formData.services[service.serviceid] || false}
  onChange={(event) => {
    handleChange(event); // Call the handleChange function
  }}
/>

      <label htmlFor={service.servicename} className="ml-3">
        {service.servicename}
      </label>
    </div>
  ))}
</div>
</div>
        {/* Location Selection Component Goes Here */}
        <div className="mb-4">
          {/* Placeholder for Location Selection Component */}
          <p className="text-gray-800">Location URL</p>
          <input
  type="text"
  id="location"
  name="location"
  className="shadow-sm focus:ring-green-500 focus:outline-none w-full sm:text-sm rounded-md border border-gray-300 py-2 px-3"
  value={formData.location}
  onChange={handleChange} 
  required
/>

        </div>
                  
        {/* Photo Upload Component Goes Here */}
        <div className="mb-4">
          {/* Placeholder for Photo Upload Component */}
          <p className="text-gray-800">Photo Upload Component Goes Here</p>
          <div>
          {/* <MultiImageInput
  // images={images}
  // setImages={setImages}
  theme={{
    background: '#ffffff',
    outlineColor: '#019874',
    textColor: 'rgba(255,255,255,0.6)',
    buttonColor: '#019874',
    modalColor: '#ffffff'
  }}    
  max={5}
/> */}
    </div>

        </div>
        <div className="mb-4">
          <label htmlFor="termsAccepted" className="flex items-center">
            <input
              id="termsAccepted"
              name="termsAccepted"
              type="checkbox"
              className="focus:ring-green-500 h-4 w-4 text-green-500 border-gray-300 rounded"
              checked={formData.termsAccepted}
              onChange={handleChange}
              required
            />
            <span className="ml-2 text-gray-800">
              I agree to the terms and conditions and privacy policy
            </span>
          </label>
        </div>
        <button
          type="submit"
          className="w-full py-2 px-4 border border-transparent rounded-md shadow-md text-white bg-[#019874] hover:bg-[#99DFBD] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
        >
          Submit
        </button>
      </form>
    </div>
    </div>
  );
};

export default Form;
