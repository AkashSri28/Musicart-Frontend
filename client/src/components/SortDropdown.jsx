import React, { useState } from 'react';
import axios from 'axios';

const options = [
  { value: 'featured', label: 'Featured' },
  { value: 'priceLowest', label: 'Price: Lowest' },
  { value: 'priceHighest', label: 'Price: Highest' },
  { value: 'nameAZ', label: 'Name: (A-Z)' },
  { value: 'nameZA', label: 'Name: (Z-A)' }
];

const SortDropdown = ({onSortingChange}) => {
  const [selectedValue, setSelectedValue] = useState('');
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const handleSortingChange = async (event) => {
    const selectedSortOption = event.target.value;
    setSelectedValue(selectedSortOption);
    onSortingChange(selectedSortOption);
  };

  const handleDropdownToggle = () => {
    setIsDropdownOpen(prevState => !prevState);
  };

  return (
    <select
      className="sort-dropdown"
      value={selectedValue}
      onChange={handleSortingChange}
      onFocus={handleDropdownToggle}
      onBlur={handleDropdownToggle}
    >
      {!isDropdownOpen && (
            <option value="">
            Sort by: {selectedValue ? options.find(option => option.value === selectedValue).label : 'Featured'}
            </option>
        )}

      {options.map(option => (
        <option key={option.value} value={option.value}>{option.label}</option>
      ))}
    </select>
  );
};

export default SortDropdown;
