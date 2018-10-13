import axios from 'axios';
import { withRouter } from 'next/router';

// const getGolduck = async () => {
//   try {
//     const golduck = await P.getPokemonByName('golduck');
//     console.log(golduck);
//   } catch (error) {
//     console.log(error);
//   }
// };

class Pokemon extends React.Component {
  state = { data: { sprites: {} } };
  getPokemonByName = id =>
    axios
      .get(`https://pokeapi.co/api/v2/pokemon/${id}/`)
      .then(data => {
        console.log('got the data', data.data);
        this.setState({ data: data.data, images: data.data.sprites });
      })
      .catch(err => console.log(err));

  componentDidMount() {
    this.getPokemonByName(this.props.router.query.id);
  }

  render() {
    return (
      <div>
        <h1>{this.props.router.query.id}</h1>
        {Object.values(this.state.data.sprites)
          .filter(i => i)
          .map((src, index) => (
            <img key={src} alt={`${this.props.router.query.id} stance ${index + 1}`} {...{ src }} />
          ))}
      </div>
    );
  }
}

export default withRouter(Pokemon);
