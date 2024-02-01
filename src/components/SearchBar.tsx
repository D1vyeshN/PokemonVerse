import { FC } from "react";
import { IoClose, IoSearch } from "react-icons/io5";

interface SearchBar {
  pokemonName: string;
  setPokemonName: React.Dispatch<React.SetStateAction<string>>;
}

const SearchBar: FC<SearchBar> = ({ pokemonName, setPokemonName }) => {
  const handleSearch: (e: React.ChangeEvent<HTMLInputElement>) => void = (
    e
  ) => {
    e.preventDefault();
    setPokemonName(e.target.value);
  };
  return (
    <div className="w-full h-24 flex items-center justify-center">
      <div className="w-full mt-6 border-transparent  flex items-center relative">
        <input
          value={pokemonName}
          type="text"
          placeholder="Search Your Pokemon"
          className="w-full mx-10 rounded-xl text-lg placeholder:text-gray-500 placeholder:text-lg p-6 pe-12 shadow-lg outline-none"
          onChange={(e) => handleSearch(e)}
        />
        {pokemonName.length > 0 ? (
          <span
            className="  hover:opacity-80 p-2 rounded-xl absolute right-16 "
            onClick={() => setPokemonName("")}
          >
            <IoClose className="w-8 h-8 " />
          </span>
        ) : (
          <span className=" bg-red-500 hover:opacity-80 shadow-lg shadow-red-400 p-2 rounded-xl absolute right-16 ">
            <IoSearch className="w-6 h-6 text-white" />
          </span>
        )}
      </div>
    </div>
  );
};

export default SearchBar;
