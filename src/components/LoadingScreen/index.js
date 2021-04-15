import React from 'react';
import './LoadingScreen.scss';

const LoadingScreen = props => (
  <div className={`loading-screen ${props.className}`}>
    <p className="loading-screen__message">
      Loading content, please wait
    </p>
  </div>
);

export default LoadingScreen;
