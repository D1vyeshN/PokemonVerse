import { useEffect, useState } from "react";
import Display from "./components/Display";
import DisplayList from "./components/DisplayList";
import SearchBar from "./components/SearchBar";

function App() {
  const [pokemonName, setPokemonName] = useState("");
  const [currentPokemon, setCurrentPokemon] = useState(0);

  return (
    <div className="lg:mx-5 xl:mx-20 text-gray-800">
      <div className="relative">
        <div className="flex justify-between gap-5">
          <div className="w-full lg:w-2/3 relative">
            <SearchBar
              pokemonName={pokemonName}
              setPokemonName={setPokemonName}
            />
            <DisplayList
              // offset={offset}
              pokemonName={pokemonName}
              setCurrentPokemon={setCurrentPokemon}
            />
          </div>
          <div className="hidden lg:w-1/3  h-full sticky top-0 lg:flex items-center">
            <div className="h-full overflow-scroll w-full">
              <Display
                id={currentPokemon}
                setCurrentPokemon={setCurrentPokemon}
              />
            </div>
          </div>
        </div>
        {currentPokemon > 0 && (
          <div className=" lg:hidden w-full h-full top-0 absolute z-50">
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
