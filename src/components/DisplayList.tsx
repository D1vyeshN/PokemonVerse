import { useQuery, gql } from "@apollo/client";
import { FC, useEffect, useRef, useState } from "react";
import { useDebounce } from "../hooks/debounce";

// const typeColors = {
//     'normal': '#BCBCAC',
//     'fighting': '#BC5442',
//     'flying': '#669AFF',
//     'poison': '#AB549A',
//     'ground': '#DEBC54',
//     'rock': '#BCAC66',
//     'bug': '#ABBC1C',
//     'ghost': '#6666BC',
//     'steel': '#ABACBC',
//     'fire': '#FF421C',
//     'water': '#2F9AFF',
//     'grass': '#78CD54',
//     'electric': '#FFCD30',
//     'psychic': '#FF549A',
//     'ice': '#78DEFF',
//     'dragon': '#7866EF',
//     'dark': '#785442',
//     'fairy': '#FFACFF',
//     'shadow': '#0E2E4C'
// };

export function ColorSelector(params: any) {
  switch (params) {
    case "normal":
      return "bg-[#BCBCAC]";
    case "fighting":
      return "bg-[#BC5442]";
    case "flying":
      return "bg-[#669AFF]";
    case "poison":
      return "bg-[#AB549A]";
    case "ground":
      return "bg-[#DEBC54]";
    case "rock":
      return "bg-[#BCAC66]";
    case "bug":
      return "bg-[#ABBC1C]";
    case "ghost":
      return "bg-[#6666BC]";
    case "steel":
      return "bg-[#ABACBC]";
    case "fire":
      return "bg-[#FF421C]";
    case "water":
      return "bg-[#2F9AFF]";
    case "grass":
      return "bg-[#78CD54]";
    case "electric":
      return "bg-[#FFCD30]";
    case "psychic":
      return "bg-[#FF549A]";
    case "ice":
      return "bg-[#78DEFF]";
    case "dragon":
      return "bg-[#7866EF]";
    case "dark":
      return "bg-[#785442]";
    case "fairy":
      return "bg-[#FFACFF]";
    case "shadow":
      return "bg-[#0E2E4C]";
    default:
      return "bg-[#000]";
  }
}

interface DisplayLists {
  pokemonName: string;
  setCurrentPokemon: React.Dispatch<React.SetStateAction<number>>;
}

const DisplayList: FC<DisplayLists> = ({ pokemonName, setCurrentPokemon }) => {
  const [offset, setOffset] = useState(0);
  const [pokemonData, setPokemonData] = useState<any>([]);
  const [searchData, setSearchData] = useState<any>([]);
  const [lastMessage, setLastMessage] = useState<Boolean>(false);
  const [mainLoader, setMainLoader] = useState<Boolean>(true);
  const isFetchingRef = useRef(false);

  const handleScroll = () => {
    if (lastMessage) return;
    if (isFetchingRef.current) return;
    const reachedBottom =
      window.innerHeight + document.documentElement.scrollTop + 200 >=
      document.documentElement.scrollHeight;

    if (reachedBottom) {
      isFetchingRef.current = true;

      setOffset((prev) => prev + 30);
    }
  };

  const GET_POKEMONLIST = gql`
    query samplePokeAPIquery($pokemonName: String, $offset: Int) {
      pokemon_v2_pokemon(
        where: { name: { _iregex: $pokemonName } }
        limit: 18
        offset: $offset
      ) {
        id
        name
        pokemon_v2_pokemontypes {
          pokemon_v2_type {
            name
          }
        }
      }
    }
  `;

  const debouncedSearch = useDebounce(pokemonName, 500);
  const { data, loading, error } = useQuery(GET_POKEMONLIST, {
    fetchPolicy: "cache-and-network",
    variables: {
      pokemonName: debouncedSearch?.trim() || ".*", // fallback regex
      offset: offset,
    },
  });

  const newPokemonData = data?.pokemon_v2_pokemon || [];
  const filteredPokemon =
    pokemonName.trim().length > 0
      ? searchData.filter((pokemon: any) =>
          pokemon.name.toLowerCase().includes(pokemonName.toLowerCase()),
        )
      : pokemonData;

  useEffect(() => {
    setOffset(0);
    setLastMessage(false);
  }, [pokemonName]);

  useEffect(() => {
    if (!loading) {
      isFetchingRef.current = false;
      setMainLoader(false);
    }
  }, [loading]);

  useEffect(() => {
    console.log(searchData, newPokemonData, lastMessage, loading, offset);
    if (loading) return;

    if (!newPokemonData || newPokemonData.length == 0) {
      setLastMessage(true);
      return;
    }
    if (newPokemonData.length != 0 && pokemonName.trim().length > 0) {
      setSearchData((prevData: any) => {
        return [...prevData, ...newPokemonData].filter(
          (el, i, self) => self.findIndex((u) => u.id === el.id) === i,
        );
      });
    } else {
      setPokemonData((prevData: any) =>  {
        return [...new Set([...prevData, ...newPokemonData])];
      });
    }
  }, [newPokemonData]);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastMessage]);

  // const basic = BasicData(0);

  if (mainLoader)
    return (
      <div className="flex items-center justify-center h-[100vh] ">
        <img
          src="./pokeball-icon.png"
          className="w-52 animate-spin-slow"
          alt="Loading..."
        />
      </div>
    );

  return (
    <div className="my-4">
      <div className="w-full md:px-1 flex flex-wrap bg-transparent justify-evenly">
        {filteredPokemon?.map((pokemon: any, i: number) => (
          <div
            key={i}
            onClick={() => setCurrentPokemon(pokemon.id)}
            // onClick={()=>setIsOpen(true)}
            className=" w-36 md:w-44 lg:w-40 m-0.5 lg:m-1.5 mt-10 lg:mt-3  flex items-center justify-end flex-col"
          >
            <div className="w-full mt-14 group  border-2 border-transparent bg-white shadow-lg hover:border-gray-400 rounded-2xl flex items-center justify-center flex-col">
              <img
                className="w-28 h-28 -mt-14 group-hover:scale-125 p-2 brightness-95 contrast-150"
                alt={pokemon.name.slice(0, 15)}
                // src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/${pokemon.id}.svg`}
                src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${pokemon.id}.png`}
              />
              <p className="text-xs">N°{pokemon.id}</p>
              <h1 className="text-base md:text-lg capitalize font-bold m-2">
                {pokemon.name.slice(0, 19)}
              </h1>

              <div className="flex justify-center items-center gap-3 pb-4">
                {pokemon.pokemon_v2_pokemontypes.map((el: any, i: number) => (
                  <p
                    key={i}
                    className={`px-3 py-1 text-sm rounded-lg ${ColorSelector(
                      el?.pokemon_v2_type?.name,
                    )} text-center font-semibold capitalize opacity-85`}
                  >
                    {el?.pokemon_v2_type?.name}
                  </p>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
      {!isFetchingRef.current && !loading && lastMessage && (
        <p className="w-full text-center pt-4">End of Results</p>
      )}
      {loading && (
        <div className="flex items-center justify-center h-fit py-6">
          <img
            src="./pokeball-icon.png"
            className="w-24 animate-spin-slow contrast-75"
            alt="Loading..."
          />
        </div>
      )}
      {error && <p className="w-full text-center">Error : {error?.message}</p>}
    </div>
  );
};

export default DisplayList;
