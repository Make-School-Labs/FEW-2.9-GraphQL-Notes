# Queries and Mutations
## Queries
Get the about information:
```
query {
	about {
    name
    course
    description
  }
}
```
Get the array of the portfolio items:
```
query {
  portfolio {
    id
    title
    description
    url
  }
}
```
Get a portfolio item by id:
```
query {
	portfolioItem(id: 2) {
		id
		title
		description
		url
	}
}
```
## Mutations
Create a new portfolio item:
```
mutation {
  newPortfolioItem(
    title: "test"
    description: "test"
    url: "test"
  ) {
    id
  }
}
```
Edit an existing portfolio item:
```
mutation {
  editPortfolioItem(
    id: 2
    title: "This is different"
    url: "This is also different"
  ) {
    id
    title
    description
    url
  }
}
```
Delete a portfolio item:
```
mutation {
  deletePortfolioItem(
    id: 1
  ) {
    id
    title
    description
    url
  }
}
```
# Extra credit answers
## Use variables in your Query and Mutations
Copy this into query variables:
```
{
  "portfolioItemId": 1
}
```
Get a portfolio item using the `portfolioItemId` variable:
```
query($portfolioItemId: Int!) {
  portfolioItem(id: $portfolioItemId) {
    id
    title
    description
    url
  }
}
```
Delete a portfolio item using the `portfolioItemId` variable:
```
mutation($portfolioItemId: Int!) {
  deletePortfolioItem(id: $portfolioItemId) {
    id
    title
    description
    url
  }
}
```

## What is GraphQL
GraphQL can be classified as both a specification and a language.
- As a specification, GraphQL defines how developers should code up their GraphQL libraries. Because Facebook created GraphQL, they are the ones in charge of maintaining and updating the specification. You can view it [here](https://facebook.github.io/graphql/June2018/).
- As a language, GraphQL is strictly typed, and has the common basic data types such as Ints and Strings. GraphQL can accept variables in the query as long they follow the type definitions.

## What are it's advantages and disadvantages
- Advantages
	 - One single route to call
	 - No over-fetching - You do not get more data than is needed to render the client side application
	 - No under-fetching - You do not need to make multiple calls to different endpoints to grab all the necessary data to render the client side application
	 - As a result of no under-fetching, GraphQL is faster in cases where multiple resources need to be looked up on different endpoints (GraphQL does it in one call).
	 - Once the back end schema is set, the front end developers can do whatever they want without needing to ask the back end developers to implement another route.
- Disadvantages
	 - The schemas can get pretty complicated and hard to understand.
	 - The queries can get complicated as well.

## Describe a use case
One popular use case, and one of the main reasons why GraphQL was created is that Facebook wanted to limit how much data the Facebook was sending and receiving. The old Facebook app was using a lot of data, so people with data caps were less likely to use the app, and if they did, they would use it for less time. In order to make sure Facebook maximized their users' time on the sites, they had to limit how much data was being sent to and from the phones. GraphQL was the solution as it does not under-fetch or over-fetch data.

## Compare GraphQL and REST
Check out the advantages and disadvantages above, as those points are in comparison to REST.
Also check out this [link](https://www.howtographql.com/basics/1-graphql-is-the-better-rest/) on https://www.howtographql.com.
