import "./App.css";
import "./index.css";
import { SwiperComponent } from "./components/SwiperComponent";
import LoadingButton from "./components/LoadingButton";
import { useState } from "react";
import { Header } from "./components/Header";

function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [reloadTrigger, setReloadTrigger] = useState(0);
  const handleLoadComplete = () => {
    setIsLoading(false);
  };

  const handleReload = () => {
    setIsLoading(true);
    setReloadTrigger((prev) => prev + 1);
  };
  return (
    <>
      <div className="bg-gradient-to-tl from-neutral-200 via-neutral-300 to-neutral-400 pt-2 pb-28 space-y-8">
        <Header
          title="Movie Random List"
          color={"#3432c9d8"}
          author="César Araujo"
          authorLink="https://github.com/araujocesarr"
        />
        <LoadingButton
          label="Reload"
          isLoading={isLoading}
          onClick={handleReload}
        />
        <SwiperComponent
          onLoadComplete={handleLoadComplete}
          reloadTrigger={reloadTrigger}
        />
      </div>
    </>
  );
}

export default App;
