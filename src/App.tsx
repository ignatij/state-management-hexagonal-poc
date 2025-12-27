import { BrowserRouter, Link, Route, Routes } from "react-router-dom";
// import { ComponentA } from "./adapters/primary/ui/components/ComponentA";
import { CreatePokemon } from "./adapters/primary/ui/pages/CreatePokemon/CreatePokemon";
import { PokemonsList } from "./adapters/primary/ui/pages/PokemonList/PokemonsList";

function App() {
  return (
    <BrowserRouter>
      <h1>Pokemons App</h1>
      <nav>
        <h2>Navigation</h2>
        <Link to="/">Pokemons List</Link>
        <br />
        <Link to="/create-pokemon">Create Pokemon</Link>
        {/* <Link to="/component-a">Component A</Link>
        <br /> */}
      </nav>
      <main>
        <h2>Content</h2>
        <Routes>
          <Route path="/" element={<PokemonsList />} />
          <Route path="/create-pokemon" element={<CreatePokemon />} />
          {/* <Route path="/component-a" element={<ComponentA />} /> */}
        </Routes>
      </main>
    </BrowserRouter>
  );
}

export default App;
