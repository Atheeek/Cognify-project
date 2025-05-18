import React, { useState, useEffect } from 'react';
import { mockSupportProviders, indianStates, indianCities, supportTypes, conditionsServed } from '../components/mockSupportProviders'; // Adjust path if needed
// To use icons, you would:
// 1. npm install react-icons
// 2. Uncomment the import below and the icon components in the JSX
// import { FiMapPin, FiPhone, FiGlobe, FiFilter, FiBriefcase, FiUsers, FiHeart, FiSearch } from 'react-icons/fi';


const LocalSupportPage = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedState, setSelectedState] = useState('');
  const [selectedCity, setSelectedCity] = useState('');
  const [selectedCategory, setSelectedCategory] = useState(''); // "Specialist" or "Institution"
  const [selectedType, setSelectedType] = useState(''); // Specific type like "Child Psychologist" or "Therapy Center"
  const [selectedCondition, setSelectedCondition] = useState('');
  const [filteredProviders, setFilteredProviders] = useState(mockSupportProviders);
  const [availableCities, setAvailableCities] = useState([]);
  const [availableTypes, setAvailableTypes] = useState([]);

  useEffect(() => {
    if (selectedState && indianCities[selectedState]) {
      setAvailableCities(indianCities[selectedState]);
    } else {
      setAvailableCities([]);
    }
    setSelectedCity(''); // Reset city when state changes
  }, [selectedState]);

  useEffect(() => {
    if (selectedCategory && supportTypes[selectedCategory]) {
      setAvailableTypes(supportTypes[selectedCategory]);
    } else {
      setAvailableTypes([]);
    }
    setSelectedType(''); // Reset type when category changes
  }, [selectedCategory]);

  useEffect(() => {
    let results = mockSupportProviders;

    if (searchTerm) {
      results = results.filter(provider =>
        provider.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        (provider.description && provider.description.toLowerCase().includes(searchTerm.toLowerCase())) ||
        (provider.specialties && provider.specialties.some(s => s.toLowerCase().includes(searchTerm.toLowerCase())))
      );
    }

    if (selectedState) {
      results = results.filter(provider => provider.state === selectedState);
    }
    if (selectedCity) {
      results = results.filter(provider => provider.city === selectedCity);
    }
    if (selectedCategory) {
      results = results.filter(provider => provider.category === selectedCategory);
    }
    if (selectedType) {
      results = results.filter(provider => provider.type === selectedType);
    }
    if (selectedCondition) {
      results = results.filter(provider => provider.conditions.includes(selectedCondition));
    }

    setFilteredProviders(results);
  }, [searchTerm, selectedState, selectedCity, selectedCategory, selectedType, selectedCondition]);

  const clearFilters = () => {
    setSearchTerm('');
    setSelectedState('');
    setSelectedCity('');
    setSelectedCategory('');
    setSelectedType('');
    setSelectedCondition('');
  };

  const ProviderCard = ({ provider }) => (
    <div className="bg-white p-6 rounded-lg shadow-lg border border-gray-200 hover:shadow-xl transition-shadow duration-300">
      <h3 className="text-xl font-semibold text-brand-blue mb-2">{provider.name}</h3>
      <p className="text-sm text-brand-purple font-medium mb-1">
        {/* <FiBriefcase className="inline mr-2 mb-px" /> */}
        {provider.category}: {provider.type}
      </p>
      {provider.category === "Specialist" && provider.specialties && (
        <p className="text-sm text-medium-text mb-1">
          Specializes in: {provider.specialties.join(', ')}
        </p>
      )}
      <p className="text-sm text-medium-text mb-1">
        {/* <FiMapPin className="inline mr-2 mb-px" /> */}
        {provider.address}, {provider.city}, {provider.state}
      </p>
      {provider.contact && (
        <p className="text-sm text-medium-text mb-1">
          {/* <FiPhone className="inline mr-2 mb-px" /> */}
          Contact: {provider.contact}
        </p>
      )}
      {provider.website && provider.website !== "#" && (
        <a
          href={provider.website}
          target="_blank"
          rel="noopener noreferrer"
          className="text-sm text-brand-blue hover:underline break-all"
        >
          {/* <FiGlobe className="inline mr-2 mb-px" /> */}
          Visit Website
        </a>
      )}
      {provider.description && (
        <p className="text-xs text-gray-600 mt-3 pt-3 border-t border-gray-200">{provider.description}</p>
      )}
      <div className="mt-3 pt-3 border-t border-gray-200">
        <h4 className="text-xs font-semibold text-gray-700 mb-1">Conditions Served:</h4>
        <div className="flex flex-wrap gap-1">
          {provider.conditions.map(condition => (
            <span key={condition} className="text-xs bg-purple-100 text-brand-purple px-2 py-0.5 rounded-full">
              {condition}
            </span>
          ))}
        </div>
      </div>
    </div>
  );


  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-green-50 to-purple-50 p-4 sm:p-8 font-sans">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl sm:text-5xl font-extrabold text-brand-blue mb-4 tracking-tight">
            {/* <FiMapPin className="inline-block mr-3 text-4xl sm:text-5xl text-brand-purple" /> */}
            Find Local Support in India
          </h1>
          <p className="text-lg text-medium-text max-w-2xl mx-auto">
            Connect with specialists and institutions providing support for neurodevelopmental differences across India.
            Use the filters below to find resources near you.
          </p>
        </div>

        {/* Filters Section */}
        <div className="bg-white p-6 sm:p-8 rounded-xl shadow-2xl mb-12">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-6">
            {/* Search Term */}
            <div>
              <label htmlFor="searchTerm" className="block text-sm font-medium text-dark-text mb-1">
                {/* <FiSearch className="inline mr-1 mb-px" /> */}
                Search by Name/Keyword
              </label>
              <input
                type="text"
                id="searchTerm"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="e.g., Autism specialist, therapy center"
                className="w-full"
              />
            </div>
            {/* State */}
            <div>
              <label htmlFor="stateFilter" className="block text-sm font-medium text-dark-text mb-1">
                {/* <FiMapPin className="inline mr-1 mb-px" /> */}
                Select State
              </label>
              <select
                id="stateFilter"
                value={selectedState}
                onChange={(e) => setSelectedState(e.target.value)}
                className="w-full"
              >
                <option value="">All States</option>
                {indianStates.sort().map(state => <option key={state} value={state}>{state}</option>)}
              </select>
            </div>

            {/* City */}
            <div>
              <label htmlFor="cityFilter" className="block text-sm font-medium text-dark-text mb-1">
                {/* <FiMapPin className="inline mr-1 mb-px" /> */}
                Select City
              </label>
              <select
                id="cityFilter"
                value={selectedCity}
                onChange={(e) => setSelectedCity(e.target.value)}
                disabled={!selectedState || availableCities.length === 0}
                className="w-full disabled:bg-gray-100"
              >
                <option value="">All Cities in State</option>
                {availableCities.sort().map(city => <option key={city} value={city}>{city}</option>)}
              </select>
            </div>

            {/* Category (Specialist/Institution) */}
            <div>
              <label htmlFor="categoryFilter" className="block text-sm font-medium text-dark-text mb-1">
                {/* <FiUsers className="inline mr-1 mb-px" /> */}
                Support Category
              </label>
              <select
                id="categoryFilter"
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="w-full"
              >
                <option value="">All Categories</option>
                {Object.keys(supportTypes).map(cat => <option key={cat} value={cat}>{cat}</option>)}
              </select>
            </div>

            {/* Type (Specific type based on category) */}
            <div>
              <label htmlFor="typeFilter" className="block text-sm font-medium text-dark-text mb-1">
                {/* <FiBriefcase className="inline mr-1 mb-px" /> */}
                Specific Type
              </label>
              <select
                id="typeFilter"
                value={selectedType}
                onChange={(e) => setSelectedType(e.target.value)}
                disabled={!selectedCategory || availableTypes.length === 0}
                className="w-full disabled:bg-gray-100"
              >
                <option value="">All Types in Category</option>
                {availableTypes.sort().map(type => <option key={type} value={type}>{type}</option>)}
              </select>
            </div>

            {/* Condition Served */}
            <div>
              <label htmlFor="conditionFilter" className="block text-sm font-medium text-dark-text mb-1">
                {/* <FiHeart className="inline mr-1 mb-px" /> */}
                Condition Served
              </label>
              <select
                id="conditionFilter"
                value={selectedCondition}
                onChange={(e) => setSelectedCondition(e.target.value)}
                className="w-full"
              >
                <option value="">Any Condition</option>
                {conditionsServed.sort().map(con => <option key={con} value={con}>{con}</option>)}
              </select>
            </div>
          </div>
          <div className="flex justify-end">
            <button
              onClick={clearFilters}
              className="px-4 py-2 text-sm font-medium text-brand-blue hover:text-brand-purple underline"
            >
              Clear All Filters
            </button>
          </div>
        </div>

        {/* Results Section */}
        {filteredProviders.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredProviders.map(provider => <ProviderCard key={provider.id} provider={provider} />)}
          </div>
        ) : (
          <div className="text-center py-12">
            <img src="/no-results-placeholder.svg" alt="No Results" className="mx-auto mb-6 h-40 w-40 text-gray-400" /> {/* Replace with an actual SVG or image */}
            <p className="text-xl text-medium-text">No support providers found matching your criteria.</p>
            <p className="text-sm text-light-text mt-2">Try adjusting your filters or broadening your search.</p>
          </div>
        )}

        {/* Disclaimer/Note */}
        <div className="mt-16 pt-8 border-t border-gray-200 text-center text-light-text text-sm">
          <p className="italic leading-relaxed">
            <strong>Please Note:</strong> The list of providers above is for illustrative purposes only and uses mock data.
            In a real application, this information would be sourced from a verified database.
            Always conduct your own research and due diligence when selecting a specialist or institution.
            This directory does not constitute an endorsement.
          </p>
           <p className="mt-4">&copy; {new Date().getFullYear()} Cognify. All rights reserved.</p>
        </div>
      </div>
    </div>
  );
};

export default LocalSupportPage;