import Link from 'next/link'
import { compose, withState, withHandlers, lifecycle } from 'recompose'
import { withRouter } from 'next/router'
import { get } from '../services/api'
import Ops from '../config/ops'

const Pokemon = ({ router, data }) => (
  <div>
    <nav>
      <Link href="/">
        <a>Home</a>
      </Link>
    </nav>
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
    getPokemon: ({ updateData }) => async id => {
      try {
        const { data } = await get(Ops.Pokemon.getPokemonById(id))
        updateData(data)
      } catch (error) {
        console.log(error)
      }
    }
  }),
  lifecycle({
    componentDidMount() {
      this.props.getPokemon(this.props.router.query.id)
    }
  })
)(Pokemon)
