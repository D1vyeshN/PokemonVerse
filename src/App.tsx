import { useEffect, useState } from "react";
import Display from "./components/Display";
import DisplayList from "./components/DisplayList";
import SearchBar from "./components/SearchBar";

function App() {
  const [pokemonName, setPokemonName] = useState("");
  const [currentPokemon, setCurrentPokemon] = useState(0);
  const [offset, setOffset] = useState(0);

  const handleScroll = () => {

    if (
      window.innerHeight + document.documentElement.scrollTop+10 >
      document.documentElement.scrollHeight
    ) {
      setOffset((prev) => prev + 18);
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="lg:mx-36 text-gray-800">
      <div className="relative ">
        <div className="flex justify-between ">
          <div className="w-full lg:w-4/5">
            <SearchBar
              pokemonName={pokemonName}
              setPokemonName={setPokemonName}
            />
            <DisplayList
              offset={offset}
              pokemonName={pokemonName}
              setCurrentPokemon={setCurrentPokemon}
            />
          </div>
          <div className="hidden lg:w-4/12 h-full sticky top-0 lg:flex items-center">
            <div className="h-[calc(100vh)] w-full">
              <Display
                id={currentPokemon}
                setCurrentPokemon={setCurrentPokemon}
              />
            </div>
          </div>
        </div>
        {currentPokemon > 0 && (
          <div className=" lg:hidden w-full h-full top-0 absolute">
            <Display
              id={currentPokemon}
              setCurrentPokemon={setCurrentPokemon}
            />
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
