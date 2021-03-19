/* eslint-disable react/jsx-one-expression-per-line */
/* eslint-disable react/jsx-wrap-multilines */
/* eslint-disable semi */
/* eslint-disable react/jsx-filename-extension */
// ESLint

import React, { Component } from 'react'
import gql from 'graphql-tag'
import { Query, renderToStringWithData } from 'react-apollo'

const TEST_QUERY = gql`
query SearchParams($type: SearchType = REPOSITORY, $first: Int = 5, $language: String!) {

  search(type:$type, query:"language:JavaScript stars:>10000", first:$first) {
    edges {
      node {
        ... on Repository {
          id
          name
          url
          stargazers {
            totalCount
          }
          forks {
            totalCount
          }
        }
      }
    }
  }
}
`

class GitHubQuery2 extends Component {
  constructor(props) {
    super(props)
    this.state = {
      numberOfListings: 15,
      language: 'JavaScript',
      type: 'REPOSITORY'
    }
  }

  render() {
    const first = Math.floor(Number(this.state.numberOfListings))
    const language = this.state.language
    const type = this.state.type

    return (
      <div>

        <label>Number of listings</label>
        <input
          type="number"
          value={this.state.numberOfListings}
          onChange={e => this.setState({ numberOfListings: e.target.value })}
        />
        <select
          value={this.state.type}
          onChange={e => this.setState({ type: e.target.value })}>
          <option>ISSUE</option>
          <option>REPOSITORY</option>
          <option>USER</option>
        </select>

        <Query query={TEST_QUERY} variables={{ first, language, type }}>
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
                    <span> {item.node.name}</span> | 
                    <span> <b>Forks </b>{item.node.forks.totalCount}</span> | 
                    <span> <b>Stars </b>{item.node.stargazers.totalCount}</span> | 
                    <span> <a href={item.node.url}>{item.node.url}</a></span>
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

export default GitHubQuery2
