import withLayout from '../components/Layout'
import Link from 'next/link'

const Blog = () => (
  <div>
    <h1>My Blog</h1>
    <p>Space for show entries</p>
  </div>
)

export default withLayout(Blog)