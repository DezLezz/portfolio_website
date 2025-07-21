import React from "react";
import "../App";

interface LoadingScreenProps {
  resourcesLoaded?: number;
  totalResources?: number;
}

const LoadingScreen: React.FC<LoadingScreenProps> = ({
  resourcesLoaded = 0,
  totalResources = 0,
}) => {
  const progressPercentage =
    totalResources > 0 ? (resourcesLoaded / totalResources) * 100 : 0;

  return (
    <div className="loading-screen">
      <div className="loading-screen__holder">
        <div className="loading-screen__name">Marco Cabral</div>
        <div className="loading-screen__symbols-holder">
          <span className="material-symbols-outlined loading-screen__symbols">
            videogame_asset
          </span>
          <span className="material-symbols-outlined loading-screen__symbols">
            joystick
          </span>
          <span className="material-symbols-outlined loading-screen__symbols">
            sports_esports
          </span>
        </div>
        <div className="loading-screen__loading-holder">
          <div
            className="loading-screen__loading-bar"
            style={{ width: `${progressPercentage}%` }}
          />
        </div>
        <div className="loading-screen__progress-text">
          Loading resources... {resourcesLoaded}/{totalResources}
        </div>
      </div>
    </div>
  );
};

export default LoadingScreen;
