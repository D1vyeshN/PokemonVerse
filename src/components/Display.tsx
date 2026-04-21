import { gql, useQuery } from "@apollo/client";
import { FC, useState } from "react";
import { ColorSelector } from "./DisplayList";
import Evolution from "./Evolution";
import { IoClose } from "react-icons/io5";

interface Display {
  id: number;
  setCurrentPokemon: React.Dispatch<React.SetStateAction<number>>;
}

export const typeColors = [
  "bg-[#df2140]",
  "bg-[#FF9940]",
  "bg-[#eecd3d]",
  "bg-[#85ddff]",
  "bg-[#96da83]",
  "bg-[#fb94a8]",
  "bg-[#FFCD30]",
  "bg-[#78CD54]",
  "bg-[#2F9AFF]",
  "bg-[#bcbcac]",
  "bg-[#BC5442]",
  "bg-[#669AFF]",
  "bg-[#AB549A]",
  "bg-[#DEBC54]",
  "bg-[#BCAC66]",
  "bg-[#ABBC1C]",
  "bg-[#6666BC]",
  "bg-[#ABACBC]",
  "bg-[#FF421C]",
];

const Display: FC<Display> = ({ id, setCurrentPokemon }) => {
  const [selectedTab, setSelectedTab] = useState<"states" | "evolution">(
    "evolution",
  );
  const GET_POKEMON = gql`
    query PokemonQuery($id: Int!) {
      pokemon_v2_pokemonspecies_by_pk(id: $id) {
        pokemon_v2_pokemonspeciesflavortexts(
          where: { language_id: { _eq: 9 } }
        ) {
          flavor_text
        }
      }
      pokemon_v2_pokemonspecies_by_pk(id: $id) {
        evolution_chain_id
      }
      pokemon_v2_pokemon_by_pk(id: $id) {
        id
        name
        pokemon_v2_pokemontypes {
          pokemon_v2_type {
            id
            name
          }
        }
        height
        weight
        pokemon_v2_pokemonabilities {
          pokemon_v2_ability {
            name
          }
        }
        pokemon_v2_pokemonstats {
          base_stat
          pokemon_v2_stat {
            name
          }
        }
      }
    }
  `;
  const { loading, data } = useQuery(GET_POKEMON, {
    variables: {
      id: id,
    },
  });

  // useEffect(() => {}, [id]);

  if (id <= 0) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="flex min-h-[160px] lg:mt-32 items-center flex-col rounded-2xl w-full mx-auto bg-white shadow-lg">
          <img
            className="w-28 pb-6 lg:-mt-32 text-center contrast-75"
            alt="location-reference"
            src="./no-pokemon-selected-image.png"
          />

          <div className="flex items-center justify-center">
            <h1 className="font-bold text-xl px-6 text-center text-gray-400">
              Select a Pokemon to display here.
            </h1>
          </div>
        </div>
      </div>
    );
  }

  if (loading)
    return (
      <div className="lg:flex items-center justify-center hidden h-screen">
        <img
          src="./pokeball-icon.png"
          className="animate-spin-slow w-24 contrast-75"
          alt="Loading..."
        />
      </div>
    );
  // if (error) return <p>Error : {error.message}</p>;

  return (
    <div className="flex justify-center items-center h-screen">
      <div className="fixed lg:relative flex justify-center px-6 sm:px-20 lg:px-4 h-screen lg:h-auto py-5 lg:max-w-[500px] items-center flex-col rounded-2xl w-full mx-auto lg:mt-32 bg-white shadow-lg">
        <div onClick={() => setCurrentPokemon(0)} className="lg:hidden">
          <span className=" bg-red-200 hover:opacity-80 shadow-lg shadow-red-200 p-2 rounded-xl absolute right-5 top-5">
            <IoClose className="w-6 h-6" />
          </span>
        </div>

        <img
          className="w-36 h-36 sm:w-44 sm:h-44 lg:w-52 lg:h-52 xl:w-70 xl:h-70 -mb-1 lg:-mt-40 text-center  p-1 contrast-125 brightness-95 drop-shadow-2xl"
          alt={`Display-${id}`}
          src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${id}.png`}
        />
        <div className="w-full text-center">
          <div className="flex gap-5 mx-2 relative">
            <p className="text-xs absolute top-0 left-0">
              N°{data.pokemon_v2_pokemon_by_pk?.id}
            </p>
            <h1 className="text-2xl capitalize font-bold mt-3 pb-1">
              {data.pokemon_v2_pokemon_by_pk?.name}
            </h1>
            <div className="flex items-center">
              {data.pokemon_v2_pokemon_by_pk.pokemon_v2_pokemontypes?.map(
                (el: any, i: number) => (
                  <div
                    key={i}
                    className={`inline-block my-auto px-2 py-0.5 h-fit text-center capitalize bg-[${ColorSelector(
                      el?.pokemon_v2_type?.name,
                    )}] rounded-lg font-medium mx-2 text-sm opacity-85`}
                  >
                    <p>{el?.pokemon_v2_type?.name}</p>
                  </div>
                ),
              )}
            </div>
          </div>
          {/* <h1 className="text-base capitalize font-bold ">pokemon-Types</h1> */}

          {data?.pokemon_v2_pokemonspecies_by_pk
            ?.pokemon_v2_pokemonspeciesflavortexts[10]?.flavor_text && (
            <div>
              {/* <h1 className="text-base capitalize font-bold mt-2">
                Pokedex Entry
              </h1> */}
              <p className="text-sm w-full text-gray-400 font-medium text-justify text-wrap -mt-0.5 px-3">
                {
                  data.pokemon_v2_pokemonspecies_by_pk
                    ?.pokemon_v2_pokemonspeciesflavortexts[10]?.flavor_text
                }
              </p>
            </div>
          )}
          <div className="flex w-full justify-evenly mt-2 gap-1 ">
            <div className="flex justify-center items-center flex-col w-1/2">
              {/* <h1 className="text-base capitalize font-bold pb-1">Height</h1> */}
              <p className="bg-gray-100 text-sm font-medium rounded-full w-full py-1 ">
                <span className="text-base capitalize font-bold pb-1">
                  Height
                </span>{" "}
                ({data.pokemon_v2_pokemon_by_pk?.height}m)
              </p>
            </div>
            <div className="flex justify-center items-center flex-col w-1/2">
              {/* <h1 className="text-base capitalize font-bold pb-1">Weight</h1> */}
              <p className="bg-gray-100 text-sm font-medium rounded-full w-full py-1 ">
                <span className="text-base capitalize font-bold pb-1">
                  Weight
                </span>{" "}
                ({data.pokemon_v2_pokemon_by_pk?.weight}kg)
              </p>
            </div>
          </div>
          <div className="flex items-center gap-4 my-1 px-2">
            <h1 className="text-base capitalize font-bold my-3">Abilities</h1>
            <div className="text-sm font-medium w-full">
              <div className="flex justify-evenly items-center capitalize gap-1 ">
                <p className="bg-gray-100 rounded-full w-1/2 py-1">
                  {
                    data.pokemon_v2_pokemon_by_pk.pokemon_v2_pokemonabilities[0]
                      ?.pokemon_v2_ability?.name
                  }
                </p>
                {data.pokemon_v2_pokemon_by_pk.pokemon_v2_pokemonabilities[1]
                  ?.pokemon_v2_ability?.name && (
                  <p className="bg-gray-100 rounded-full w-1/2 py-1">
                    {
                      data.pokemon_v2_pokemon_by_pk
                        .pokemon_v2_pokemonabilities[1]?.pokemon_v2_ability
                        ?.name
                    }
                  </p>
                )}
              </div>
            </div>
          </div>

          <div className="flex w-full justify-evenly mt-2 gap-1 ">
            <div className="flex justify-center items-center flex-col w-1/2">
              {/* <h1 className="text-base capitalize font-bold pb-1">Height</h1> */}
              <p
                className={` rounded-full w-full py-1 cursor-pointer ${selectedTab == "evolution" ? "text-base capitalize font-bold bg-gray-200" : "text-sm capitalize font-medium bg-gray-100"}`}
                onClick={() => setSelectedTab("evolution")}
              >
                Evolution
              </p>
            </div>
            <div className="flex justify-center items-center flex-col w-1/2">
              {/* <h1 className="text-base capitalize font-bold pb-1">Weight</h1> */}
              <p
                className={`rounded-full w-full py-1 cursor-pointer ${selectedTab == "states" ? "text-base capitalize font-bold bg-gray-200 " : "text-sm capitalize font-medium bg-gray-100 "}`}
                onClick={() => setSelectedTab("states")}
              >
                States
              </p>
            </div>
          </div>
          <div className="w-full h-28 lg:h-36 overflow-auto pt-2">
            {selectedTab == "states" ? (
              <div className="w-full flex px-2 pt-1 gap-2">
                <div
                  className={`flex flex-col items-center justify-center text-xs rounded-xl px-2 py-0.5 bg-gray-100`}
                >
                  <p className="font-medium">HP</p>
                  <p
                    className={`${typeColors[0]} rounded-full text-white px-2 py-1`}
                  >
                    {
                      data.pokemon_v2_pokemon_by_pk.pokemon_v2_pokemonstats[0]
                        ?.base_stat
                    }
                  </p>
                </div>
                <div
                  className={`flex flex-col items-center justify-center text-xs rounded-xl px-2 py-0.5 bg-gray-100`}
                >
                  <p className="font-medium">ATK</p>
                  <p
                    className={`${typeColors[1]} rounded-full text-white px-2 py-1`}
                  >
                    {
                      data.pokemon_v2_pokemon_by_pk.pokemon_v2_pokemonstats[1]
                        ?.base_stat
                    }
                  </p>
                </div>
                <div
                  className={`flex flex-col items-center justify-center text-xs rounded-xl px-2 py-0.5 bg-gray-100`}
                >
                  <p className="font-medium">DEF</p>
                  <p
                    className={`${typeColors[2]} rounded-full text-white px-2 py-1`}
                  >
                    {
                      data.pokemon_v2_pokemon_by_pk.pokemon_v2_pokemonstats[2]
                        ?.base_stat
                    }
                  </p>
                </div>
                <div
                  className={`flex flex-col items-center justify-center text-xs rounded-xl px-2 py-0.5 bg-gray-100`}
                >
                  <p className="font-medium">SpA</p>
                  <p
                    className={`${typeColors[3]} rounded-full text-white px-2 py-1`}
                  >
                    {
                      data.pokemon_v2_pokemon_by_pk.pokemon_v2_pokemonstats[3]
                        ?.base_stat
                    }
                  </p>
                </div>
                <div
                  className={`flex flex-col items-center justify-center text-xs rounded-xl px-2 py-0.5 bg-gray-100`}
                >
                  <p className="font-medium">SpD</p>
                  <p
                    className={`${typeColors[4]} rounded-full text-white px-2 py-1`}
                  >
                    {
                      data.pokemon_v2_pokemon_by_pk.pokemon_v2_pokemonstats[4]
                        ?.base_stat
                    }
                  </p>
                </div>
                <div
                  className={`flex flex-col items-center justify-center text-xs rounded-xl px-2 py-0.5 bg-gray-100`}
                >
                  <p className="font-medium">SPD</p>
                  <p
                    className={`${typeColors[5]} rounded-full text-white px-2 py-1`}
                  >
                    {
                      data.pokemon_v2_pokemon_by_pk.pokemon_v2_pokemonstats[5]
                        ?.base_stat
                    }
                  </p>
                </div>
              </div>
            ) : (
              <div className="w-full flex px-2 pt-1 gap-2">
                {data?.pokemon_v2_pokemonspecies_by_pk?.evolution_chain_id && (
                  <div className="mt-0">
                    <div className="flex justify-around overflow-x-scroll">
                      <Evolution
                        id={
                          data?.pokemon_v2_pokemonspecies_by_pk
                            ?.evolution_chain_id
                        }
                        setCurrentPokemon={setCurrentPokemon}
                      />
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Display;
