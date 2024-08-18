// src/components/LoadingSpinner.js
import React from 'react';
import { ClipLoader } from 'react-spinners'; // Import ClipLoader from react-spinners

const LoadingSpinner = ({ loading }) => {
  return (
    loading ? (
      <div className="loading-spinner">
        <ClipLoader size={50} color={"#123abc"} loading={loading} />
      </div>
    ) : null
  );
};

export default LoadingSpinner;
