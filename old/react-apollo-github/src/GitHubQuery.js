/* eslint-disable semi */
/* eslint-disable react/jsx-filename-extension */
// ESLint
// npm install -g eslint


// Starter Project
// https://github.com/the-road-to-graphql/react-apollo-client-example

// Make a Github Auth token
// https://help.github.com/articles/creating-a-personal-access-token-for-the-command-line/

// Use the explorer
// https://developer.github.com/v4/explorer/

/* Some interestign queries

Repos and stargazers

query {
  search(type:REPOSITORY, query:"adventure", first:5) {
    edges {
      node {
        ... on Repository {
          name
          stargazers(first:5) {
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

Repos with >10000 stars and JavaScript

query{
  search(type:REPOSITORY, query:"language:JavaScript stars:>10000", first:5) {
    edges {
      node {
        ... on Repository {
          name
          url
        }
      }
    }
  }
}

Repos with JS > 10000 stars shows star and fork counts

query{
  search(type:REPOSITORY, query:"language:JavaScript stars:>10000", first:5) {
    edges {
      node {
        ... on Repository {
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

*/

import React, { Component } from 'react'
import gql from 'graphql-tag'
import { Query, renderToStringWithData } from 'react-apollo'

const TEST_QUERY = gql`
query MarketplaceListings($first: Int!) {
  marketplaceListings(first:$first) {
    edges {
      node {
        id
        name
        shortDescription
      }
    }
  }
}
`

class GitHubQuery extends Component {
  constructor(props) {
    super(props)
    this.state = {
      numberOfListings: 15
    }
  }

  render() {
    const first = Math.floor(Number(this.state.numberOfListings))
    return (
      <div>
        <label>Number of listings</label>
        <input 
          type="number"
          value={this.state.numberOfListings}
          onChange={e => this.setState({ numberOfListings: e.target.value })}
        />
        <Query query={TEST_QUERY} variables={{ first }}>
        {({ loading, error, data }) => {
            if (loading) return <h1>We're Loading...</h1>
            if (error) return <p>{`Error: ${error.message}`}</p>
            return (
              <div>
                <h1>Success!</h1>
                {console.log(data)}
                {data.marketplaceListings.edges.map(item => <p key={item.node.id}>{item.node.name}</p>)}
              </div>
            )
          }
        }
      </Query>
    </div>
)
  }
}

export default GitHubQuery


// import React from 'react';
// import gql from 'graphql-tag';
// import { Query, Mutation } from 'react-apollo';

// import './App.css';

// const GET_REPOSITORIES_OF_ORGANIZATION = gql`
//   {
//     organization(login: "Make-School-Courses") {
//       repositories(first: 20) {
//         edges {
//           node {
//             id
//             name
//             url
//             viewerHasStarred
//           }
//         }
//       }
//     }
//   }
// `;

// const STAR_REPOSITORY = gql`
//   mutation($id: ID!) {
//     addStar(input: { starrableId: $id }) {
//       starrable {
//         id
//         viewerHasStarred
//       }
//     }
//   }
// `;

// const App = () => (
//   <Query query={GET_REPOSITORIES_OF_ORGANIZATION}>
//     {({ data: { organization }, loading }) => {
//       if (loading || !organization) {
//         return <div>Loading ...</div>;
//       }

//       return (
//         <Repositories repositories={organization.repositories} />
//       );
//     }}
//   </Query>
// );

// class Repositories extends React.Component {
//   state = {
//     selectedRepositoryIds: [],
//   };

//   toggleSelectRepository = (id, isSelected) => {
//     let { selectedRepositoryIds } = this.state;

//     selectedRepositoryIds = isSelected
//       ? selectedRepositoryIds.filter(itemId => itemId !== id)
//       : selectedRepositoryIds.concat(id);

//     this.setState({ selectedRepositoryIds });
//   };

//   render() {
//     return (
//       <RepositoryList
//         repositories={this.props.repositories}
//         selectedRepositoryIds={this.state.selectedRepositoryIds}
//         toggleSelectRepository={this.toggleSelectRepository}
//       />
//     );
//   }
// }

// const RepositoryList = ({
//   repositories,
//   selectedRepositoryIds,
//   toggleSelectRepository,
// }) => (
//   <ul>
//     {repositories.edges.map(({ node }) => {
//       const isSelected = selectedRepositoryIds.includes(node.id);

//       const rowClassName = ['row'];

//       if (isSelected) {
//         rowClassName.push('row_selected');
//       }

//       return (
//         <li className={rowClassName.join(' ')} key={node.id}>
//           <Select
//             id={node.id}
//             isSelected={isSelected}
//             toggleSelectRepository={toggleSelectRepository}
//           />{' '}
//           <a href={node.url}>{node.name}</a>{' '}
//           {!node.viewerHasStarred && <Star id={node.id} />}
//         </li>
//       );
//     })}
//   </ul>
// );

// const Star = ({ id }) => (
//   <Mutation mutation={STAR_REPOSITORY} variables={{ id }}>
//     {starRepository => (
//       <button type="button" onClick={starRepository}>
//         Star
//       </button>
//     )}
//   </Mutation>
// );

// const Select = ({ id, isSelected, toggleSelectRepository }) => (
//   <button
//     type="button"
//     onClick={() => toggleSelectRepository(id, isSelected)}
//   >
//     {isSelected ? 'Unselect' : 'Select'}
//   </button>
// );

// export default App;


const arr = ['a', 'b', 'c']
const [aaa, bbb, ccc] = arr
