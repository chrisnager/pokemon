import Link from 'next/link'
import { compose, withState, withHandlers, lifecycle } from 'recompose'
import { withRouter } from 'next/router'
import { get } from '../services/api'
import Ops from '../config/ops'

const Pokemon = ({ router, data, evolution }) => (
  <div>
    <nav>
      <Link href="/">
        <a>Home</a>
      </Link>
    </nav>
    <h1>{data.name}</h1>
    {Object.values(data.sprites)
      .filter(i => i)
      .map((src, index) => (
        <img key={src} alt={`${router.query.id} stance ${index + 1}`} {...{ src }} />
      ))}
    {evolution && (
      <div>
        Evolves to{' '}
        <Link as={`/p/${evolution}`} href={`/pokemon?id=${evolution}`}>
          <a>{evolution}</a>
        </Link>
      </div>
    )}
  </div>
)

export default compose(
  withRouter,
  withState('data', 'updateData', { sprites: {} }),
  withState('evolution', 'updateEvolution', ''),
  withHandlers({
    getPokemon: ({ updateData }) => async id => {
      try {
        const { data } = await get(Ops.Pokemon.getPokemonById(id))
        updateData(data)
      } catch (error) {
        console.log(error)
      }
    },
    getEvolution: ({ updateEvolution }) => async id => {
      try {
        const { data } = await get(Ops.Evolution.getEvolutionById(id))
        updateEvolution(data.chain.evolves_to[0].species.name)
      } catch (error) {
        console.log(error)
      }
    }
  }),
  lifecycle({
    componentDidMount() {
      this.props.getPokemon(this.props.router.query.id)
      this.props.getEvolution(this.props.router.query.id)
    }
  })
)(Pokemon)
