export type GetPokemonsGatewayPort = {
  getPokemons: () => Promise<GetPokemonsApiResponse>
}

export type GetPokemonsApiResponse = {
  results: {
    name: string
    url: string
  }[]
}