import { BrowserRouter, Link, Route, Routes } from "react-router-dom";
import { CreatePokemon } from "./ui/CreatePokemon/CreatePokemon";
import { PokemonsList } from "./ui/PokemonList/PokemonsList";

function App() {
  return (
    <BrowserRouter>
      <h1>Pokemons App</h1>
      <nav>
        <h2>Navigation</h2>
        <Link to="/">Pokemons List</Link>
        <br />
        <Link to="/create-pokemon">Create Pokemon</Link>
      </nav>
      <main>
        <h2>Content</h2>
        <Routes>
          <Route path="/" element={<PokemonsList />} />
          <Route path="/create-pokemon" element={<CreatePokemon />} />
        </Routes>
      </main>
    </BrowserRouter>
  );
}

export default App;
