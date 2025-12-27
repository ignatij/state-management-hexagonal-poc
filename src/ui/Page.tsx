import React from "react";
import AllPokemons from "./components/AllPokemons/AllPokemons";
import OnePokemon from "./components/OnePokemon/OnePokemon";
import { useSelection } from "../state/selection";

const Component: React.FunctionComponent = () => {
  const selection = useSelection((state) => state.selection);

  return (
    <div>
      <table>
        <tbody>
          <tr>
            <td>
              <AllPokemons />
            </td>
            <td>{selection && <OnePokemon />}</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default Component;
