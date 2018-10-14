import Link from 'next/link'
import { compose, withState, withHandlers, lifecycle } from 'recompose'
import { get } from '../services/api'
import Ops from '../config/ops'

const PokemonLink = ({ id, name }) => (
  <li>
    <Link as={`/p/${id}`} href={`/pokemon?id=${id}`}>
      <a>{name}</a>
    </Link>
  </li>
)

const Index = ({ characters }) => (
  <div>
    <h1>Pokémon</h1>
    <ul>
      {characters.map(({ name, url }) => (
        <PokemonLink key={name} name={name} id={url.slice(34, -1)} />
      ))}
    </ul>
  </div>
)

export default compose(
  withState('characters', 'updateCharacters', []),
  withHandlers({
    getListOfAllPokemon: ({ updateCharacters }) => async () => {
      try {
        const { data } = await get(Ops.Pokemon.getList())
        updateCharacters(data.results)
      } catch (error) {
        console.log(error)
      }
    }
  }),
  lifecycle({
    componentDidMount() {
      this.props.getListOfAllPokemon()
    }
  })
)(Index)
