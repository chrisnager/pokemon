import { compose, withState, withHandlers, lifecycle } from 'recompose'
import { withRouter } from 'next/router'
import axios from 'axios'

const Pokemon = ({ router, data }) => (
  <div>
    <h1>{router.query.id}</h1>
    {Object.values(data.sprites)
      .filter(i => i)
      .map((src, index) => (
        <img key={src} alt={`${router.query.id} stance ${index + 1}`} {...{ src }} />
      ))}
  </div>
)

export default compose(
  withRouter,
  withState('data', 'updateData', { sprites: {} }),
  withHandlers({
    getPokemonById: ({ updateData }) => id =>
      axios
        .get(`https://pokeapi.co/api/v2/pokemon/${id}/`)
        .then(({ data }) => updateData(data))
        .catch(err => console.log(err))
  }),
  lifecycle({
    componentDidMount() {
      this.props.getPokemonById(this.props.router.query.id)
    }
  })
)(Pokemon)
