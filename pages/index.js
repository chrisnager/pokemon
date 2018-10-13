import Link from 'next/link'
import { compose, withState, withHandlers, lifecycle } from 'recompose'
import { get } from '../services/api'
import Ops from '../config/ops'

const PokemonLink = ({ id }) => (
  <li>
    <Link as={`/p/${id}`} href={`/pokemon?id=${id}`}>
      <a>{id}</a>
    </Link>
  </li>
)

const Index = ({ characters }) => (
  <div>
    <h1>Pokémon</h1>
    <ul>
      {characters.map(({ name }) => (
        <PokemonLink key={name} id={name} />
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
