import withLayout from '../components/Layout'
import fetch from 'isomorphic-unfetch'

const Content = props => 
  (props.show) ? 
    <div>
      <h1>{props.show.name}</h1>
      <p>{props.show.summary}</p>
      { props.show.image ? <img src={props.show.image.medium} /> : null }
    </div>
  : null

const Post = props => <Content {...props} />

Post.getInitialProps = async (ctx) => {
  const { id } = ctx.query
  const res = await fetch(`https://api.tvmaze.com/shows/${id}`)
  const show = await res.json()

  console.log(`Fetched show: ${show.name}`)
  return { show }
}

export default withLayout(Post)