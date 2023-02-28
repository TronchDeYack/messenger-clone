import { useState } from 'react'
import { useQuery, gql } from '@apollo/client';
import reactLogo from './assets/react.svg'
import './App.css'

const GET_USERS = gql`
  query GetUsers {
    users {
      firstName
      lastName
      email
    }
  }
`;

function App() {
  const { loading, error, data } = useQuery(GET_USERS);
  if (loading) return <h3>Loading...</h3>
  if (error) return <div>An error has occured !</div>

  return data.users.map((user: any) => <div>{user.firstName} {user.lastName} {user.email}</div>)
}

export default App
