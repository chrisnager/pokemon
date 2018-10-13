import Link from 'next/link'
import { compose, withState, withHandlers, lifecycle } from 'recompose'
import axios from 'axios'

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
    getListOfAllPokemon: ({ updateCharacters }) => () =>
      axios
        .get('https://pokeapi.co/api/v2/pokemon/?limit=9999')
        .then(({ data }) => updateCharacters(data.results))
        .catch(err => console.log(err))
  }),
  lifecycle({
    componentDidMount() {
      this.props.getListOfAllPokemon()
    }
  })
)(Index)
