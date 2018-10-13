import config from './config'

const endpoints = {
  pokemon: `${config.root}pokemon`
}

class PokemonService {
  getList = () => `${endpoints.pokemon}/?limit=9999`
  getPokemon = id => `${endpoints.pokemon}/${id}`
}

class Ops {
  static get Pokemon() {
    return new PokemonService()
  }
}

export default Ops
