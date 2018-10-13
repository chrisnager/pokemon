import axios from 'axios';
import Link from 'next/link';

const PostLink = props => (
  <li>
    <Link as={`/p/${props.id}`} href={`/pokemon?id=${props.id}`}>
      <a>{props.name}</a>
    </Link>
  </li>
);

export default class Index extends React.Component {
  state = { characters: [] };

  getListOfAllPokemon = id =>
    axios
      .get(`https://pokeapi.co/api/v2/pokemon/?limit=9999`)
      .then(data => {
        console.log('got the data', data.data);
        this.setState({ characters: data.data.results });
      })
      .catch(err => console.log(err));

  componentDidMount() {
    this.getListOfAllPokemon();
  }

  render() {
    return (
      <div>
        <h1>Pokémon</h1>
        <ul>
          {this.state.characters.map(character => (
            <PostLink key={character.name} id={character.name} name={character.name} />
          ))}
        </ul>
      </div>
    );
  }
}
