import React, { useState } from "react";
import "./App.scss";
import LoadingScreen from "./components/LoadingScreen";
import PortfolioPage from "./components/PortfolioPage";

function App() {
  const [loading, setLoading] = useState(true);
  const [resourcesLoaded, setResourcesLoaded] = useState(0);
  const [totalResources, setTotalResources] = useState(0);

  const handleResourcesLoaded = (loaded: number, total: number) => {
    setResourcesLoaded(loaded);
    setTotalResources(total);

    if (loaded >= total) {
      setTimeout(() => setLoading(false), 500); // Small delay for smooth transition
    }
  };
  return (
    <div className="App">
      {loading && (
        <LoadingScreen
          resourcesLoaded={resourcesLoaded}
          totalResources={totalResources}
        />
      )}
      <PortfolioPage onResourcesLoaded={handleResourcesLoaded} />
    </div>
  );
}

export default App;
