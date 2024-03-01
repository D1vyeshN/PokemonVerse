import { useQuery, gql } from "@apollo/client";
import { FC, useEffect, useState } from "react";

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
  offset: number;
  pokemonName: string;
  setCurrentPokemon: React.Dispatch<React.SetStateAction<number>>;
}

const DisplayList: FC<DisplayLists> = ({
  offset,
  pokemonName,
  setCurrentPokemon,
}) => {
  const [pokemonData, setPokemonData] = useState<any>([]);
  const GET_POKEMONLIST = gql`
    query samplePokeAPIquery($pokemonName: String = "${pokemonName}") {
      pokemon_v2_pokemon(
        where: { name: { _iregex: $pokemonName } }
        limit:18, offset: ${offset}
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
  const { loading, error, data } = useQuery<any>(GET_POKEMONLIST);

  const newPokemonData = data?.pokemon_v2_pokemon || [];

  useEffect(() => {
    if (newPokemonData.length != 0) {
      setPokemonData((prevData: any) => [...prevData, ...newPokemonData]);
    }
  }, [newPokemonData]);

  const basic = BasicData(offset);

  const filteredPokemon = pokemonName
    ? pokemonData.filter((pokemon: any) =>
        pokemon.name.toLowerCase().includes(pokemonName.toLowerCase())
      )
    : basic;

  if (loading)
    return (
      <div className="flex items-center justify-center h-[100vh] ">
        <img
          src="./pokeball-icon.png"
          className="w-52 animate-spin-slow"
          alt="Loading..."
        />
      </div>
    );
  if (error) return <p>Error : {error.message}</p>;

  return (
    <div className="my-4">
      <div className="w-full px-0.5 flex flex-wrap bg-transparent justify-evenly">
        {filteredPokemon?.map((pokemon: any, i: number) => (
          <div
            key={i}
            onClick={() => setCurrentPokemon(pokemon.id)}
            // onClick={()=>setIsOpen(true)}
            className=" w-48 lg:w-52 m-0.5 lg:m-1.5 mt-10 lg:mt-3  flex items-center justify-end flex-col"
          >
            <div className="w-full mt-14 group  border-2 border-transparent bg-white shadow-lg hover:border-gray-400 rounded-2xl flex items-center justify-center flex-col">
              <img
                className="w-24 h-24 -mt-14 group-hover:scale-125 p-2 brightness-95 contrast-150"
                alt="location-reference"
                // src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/${pokemon.id}.svg`}
                src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${pokemon.id}.png`}
              />
              <p className="text-xs">N°{pokemon.id}</p>
              <h1 className="text-lg capitalize font-bold m-2">
                {pokemon.name.slice(0, 19)}
              </h1>

              <div className="flex justify-center items-center gap-3 pb-4">
                {pokemon.pokemon_v2_pokemontypes.map((el: any, i: number) => (
                  <p
                    key={i}
                    className={`px-3 py-1 text-sm rounded-lg ${ColorSelector(
                      el?.pokemon_v2_type?.name
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
    </div>
  );
};

function BasicData(offset: any) {
  const GET_POKEMONLIST_BASIC = gql`
  query samplePokeAPIquery($pokemonName: String = "") {
    pokemon_v2_pokemon(
      where: { name: { _iregex: $pokemonName } }
      limit:18, offset: ${offset}
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
  const [pokemonData, setPokemonData] = useState<any>([]);

  const { loading, error, data } = useQuery<any>(GET_POKEMONLIST_BASIC);

  const newPokemonData = data?.pokemon_v2_pokemon || [];

  useEffect(() => {
    if (newPokemonData.length != 0) {
      setPokemonData((prevData: any) => [...prevData, ...newPokemonData]);
    }
  }, [newPokemonData]);
  if (loading)
    return (
      <div className="flex items-center justify-center h-[100vh] ">
        <img
          src="./pokeball-icon.png"
          className="w-52 animate-spin-slow"
          alt="Loading..."
        />
      </div>
    );
  if (error) return <p>Error : {error.message}</p>;

  return pokemonData;
}

export default DisplayList;
