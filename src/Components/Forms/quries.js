import {gql} from "@apollo/client";


export const USER_SIGNIN_MUTATION = gql`
    mutation SignIn($email: EmailAddress!, $password: String!) {
  signIn(email: $email, password: $password) {
    token
    user {
      email
      id
      firstName
      lastName
    }
  }
}`


export const USER_SIGNUP_MUTATION = gql`
    mutation SignUp($email: EmailAddress!, $password: String!, $firstName: String!, $lastName: String!, $role: String!) {
  signUp(email: $email, password: $password, firstName: $firstName, lastName: $lastName, role: $role)
}`