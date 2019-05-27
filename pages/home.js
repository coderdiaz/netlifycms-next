import withLayout from '../components/Layout'
import content from '../content/home.md'

let { html , attributes:{ title, cats } } = content;
const Blog = () => (
  <div>
    <h1>My Blog</h1>
    <p>Space for show entries</p>

    <article>
      <h1>{title}</h1>
      <div dangerouslySetInnerHTML={{ __html: html }}/>
      <ul>
        { cats.map((cat, k) => (
          <li key={k}>
            <h2>{cat.name}</h2>
            <p>{cat.description}</p>
          </li>
        ))}
      </ul>
    </article>
  </div>
)

export default withLayout(Blog)