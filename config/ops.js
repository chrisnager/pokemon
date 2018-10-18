import config from './config'

const endpoints = {
  pokemon: `${config.root}pokemon`,
  evolution: `${config.root}evolution-chain`
}

class PokemonService {
  getList = () => `${endpoints.pokemon}/`
  getPokemonById = id => `${endpoints.pokemon}/${id}/`
}

class EvolutionService {
  getEvolutionById = id => `${endpoints.evolution}/${id}/`
}

class Ops {
  static get Pokemon() {
    return new PokemonService()
  }
  static get Evolution() {
    return new EvolutionService()
  }
}

export default Ops
