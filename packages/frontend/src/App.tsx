import { useState } from 'react'
import { useQuery } from '@apollo/client';
import { gql } from './__generated__/gql';
import './App.css'
import { GetUsersQuery } from './__generated__/graphql';

const GET_USERS = gql(/* GraphQL */ `
  query GetUsers {
    users {
      firstName
      lastName
      email
    }
  }
`);

function App() {
  const { loading, error, data } = useQuery<GetUsersQuery>(GET_USERS);
  if (loading) return <h3>Loading...</h3>
  if (error) return <div>An error has occured !</div>
  if (!data) return <div>No data</div>

  return data.users.map(user => <div>{user.firstName} {user.lastName} {user.email}</div>)
}

export default App
