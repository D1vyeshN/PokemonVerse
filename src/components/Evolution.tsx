import { gql, useQuery } from "@apollo/client";
import { FC } from "react";

interface Evolution {
  id: number;
  setCurrentPokemon: React.Dispatch<React.SetStateAction<number>>;
}

const Evolution: FC<Evolution> = ({ id, setCurrentPokemon }) => {
  const GET_EVO = gql`
    query samplePokeAPIquery {
      pokemon_v2_evolutionchain_by_pk(id: ${id}) {
        pokemon_v2_pokemonspecies {
          name
          id
          evolution_chain_id
          pokemon_v2_pokemonevolutions {
            min_level
          }
        }
      }
    }
  `;

  const { loading, error, data } = useQuery(GET_EVO);
  if (loading)
    return (
      <div className="flex items-center justify-center mt-8">
        <img
          src="./pokeball-icon.png"
          className="animate-spin w-10 contrast-75 "
          alt="Loading..."
        />
      </div>
    );
  if (error) return <p>Error : {error.message}</p>;

  return (
    <div className="flex w-full justify-center lg:justify-normal gap-2 md:gap-7 scro px-4">
      {data?.pokemon_v2_evolutionchain_by_pk?.pokemon_v2_pokemonspecies?.map(
        (el: any) => (
          <div
            key={el?.id}
            className="flex my-2 group flex-col w-fit items-center justify-around rounded-lg bg-gray-100 shadow-lg border hover:border-gray-400"
            onClick={() => setCurrentPokemon(el?.id)}
          >
            <div className="w-16 lg:w-20 px-2 py-1 flex items-center justify-center">
              <img
                className="w-10 h-10 lg:w-16 lg:h-16 brightness-95 contrast-125" 
                alt="location-reference"
                
                src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${el.id}.png`}
              />
            </div>
            <div className="flex justify-between ">
              <p className="text-sm font-medium bg-gray-200 shadow px-2 rounded-lg my-1 ">
                {el?.pokemon_v2_pokemonevolutions[0]?.min_level
                  ? `Lv.${el?.pokemon_v2_pokemonevolutions[0]?.min_level}`
                  : "?"}
              </p>
            </div>
          </div>
        )
      )}
    </div>
  );
};

export default Evolution;
