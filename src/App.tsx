import { useState } from "react";
import Display from "./components/Display";
import DisplayList from "./components/DisplayList";
import SearchBar from "./components/SearchBar";

function App() {
  const [pokemonName, setPokemonName] = useState("");
  const [currentPokemon, setCurrentPokemon] = useState(0);
  const [currentBg, setCurrentBg] = useState({
    color_1: "",
    color_2: "",
  });
  console.log(currentBg);

  return (
    <div className={`relative`}>
      <div
        className="min-h-screen h-screen w-full fixed top-0 left-0 z-0"
        style={{
          backgroundImage: `linear-gradient(to right, ${currentBg.color_1+80}, ${currentBg.color_2 == "#000" ? currentBg.color_1+80 : currentBg.color_2+80})`,
        }}
      ></div>
      <div className="lg:px-5 xl:px-20 text-gray-800  relative bg-transparent z-20">
        <div className="flex justify-between gap-5">
          <div className="w-full lg:w-2/3 relative">
            <SearchBar
              pokemonName={pokemonName}
              setPokemonName={setPokemonName}
            />
            <DisplayList
              // offset={offset}
              pokemonName={pokemonName}
              setCurrentBg={setCurrentBg}
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
