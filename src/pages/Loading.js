import React from 'react';

function Loading() {
  const spinnerStyle = {
    position: 'relative',
    width: '50px',
    height: '50px',
    margin: 'auto',
  };

  const spinnerOuterStyle = {
    width: '100%',
    height: '100%',
    borderRadius: '50%',
    background: 'conic-gradient(red, orange, yellow, green, cyan, blue, violet, red)',
    animation: 'spin 1.5s linear infinite',
  };

  const spinnerInnerStyle = {
    position: 'absolute',
    top: '5%',
    left: '5%',
    width: '90%',
    height: '90%',
    backgroundColor: '#000',
    borderRadius: '50%',
  };

  const textStyle = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    color: '#FFF',
    fontSize: '12px',
    textAlign: 'center',
  };

  const containerStyle = {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100vh',
    backgroundColor: '#000',
  };

  return (
    <div style={containerStyle}>
      <div style={spinnerStyle}>
        <div style={spinnerOuterStyle}></div>
        <div style={spinnerInnerStyle}></div>
        <div style={textStyle}>Loading...</div>
      </div>
    </div>
  );
}

export default Loading;
