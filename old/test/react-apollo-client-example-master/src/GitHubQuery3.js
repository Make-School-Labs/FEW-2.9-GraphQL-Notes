/* eslint-disable react/jsx-one-expression-per-line */
/* eslint-disable react/jsx-wrap-multilines */
/* eslint-disable semi */
/* eslint-disable react/jsx-filename-extension */
// ESLint

import React, { Component } from 'react'
import gql from 'graphql-tag'
import { Query, renderToStringWithData } from 'react-apollo'

const TEST_QUERY = gql`
query Search($query: String = "adventure", $first: Int = 5) {
  search(type:REPOSITORY, query: $query, first: $first) {
    edges {
      node {
        ... on Repository {
          name
          url
          stargazers(first:5) {
            totalCount
            edges {
              node {
                name
              }
            }
          }
        }
      }
    }
  }
}
`

class GitHubQuery3 extends Component {
  constructor(props) {
    super(props)
    this.state = {
      numberOfListings: 15,
      query: 'adventure'
    }
  }

  render() {
    const first = Math.floor(Number(this.state.numberOfListings))
    const query = this.state.query

    return (
      <div>

        <label>Number of listings</label>
        <input
          type="number"

          value={this.state.numberOfListings}
          onChange={e => this.setState({ numberOfListings: e.target.value })}
        />
        <input
          type="text"
          value={this.state.query}
          onChange={e => this.setState({ query: e.target.value })}
        />

        <Query query={TEST_QUERY} variables={{ first, query }}>
          {({ loading, error, data }) => {
            if (loading) return <h1>We're Loading...</h1>
            if (error) return <p>{`Error: ${error.message}`}</p>
            return (
              <div>
                <h1>Success!</h1>
                {console.log(data.search.edges[0].node)}
                {data.search.edges.map((item, i) => (
                  <p key={item.node.id}>
                    <b>{i + 1}</b> |
                    <span> <a href={item.node.url}>{item.node.name}</a></span> |
                    <span> <b>Stars </b>{item.node.stargazers.totalCount}</span>
                  </p>))
                }
              </div>
            )
          }
        }
        </Query>
      </div>
    )
  }
}

export default GitHubQuery3
