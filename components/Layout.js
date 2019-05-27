import React from 'react'
import Header from './Header'

const layoutStyle = {
  margin: 20,
  padding: 20,
  border: '1px solid #DDD'
}

const withLayout = async Page => {
  return class extends React.Component {
    static getInitialProps(ctx) {
      if (Page.getInitialProps) {
        return Page.getInitialProps(ctx)
      }

      return {...ctx.props}
    }

    render () {
      return <div style={layoutStyle}>
        <Header />
        <Page {...this.props} />
      </div>
    }
  }
}

export default withLayout