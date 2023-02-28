import { RESTDataSource } from '@apollo/datasource-rest'

interface User {
  lastName: string
  firstName: string
  email: string
}

export class SlackAPI extends RESTDataSource {
  override baseURL = 'http://localhost:8080/slack/'

  async getAllUsers(): Promise<User[]> {
    return this.get('users')
  }
}