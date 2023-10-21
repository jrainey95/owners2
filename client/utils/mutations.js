import { gql } from "@apollo/client";


export const LOGIN_USER = gql`
  mutation login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
      user {
        _id
        email
        username
      }
    }
  }
`;

export const SAVE_HORSE = gql`
  mutation saveHorse($horseData: HorseInput!) {
    saveHorse(horseData: $horseData) {
      _id
      username
      email
      savedHorse {
            horseName
            age
            gender
            sire
            dam
            trainer
            country
      }
    }
  }
`;

export const ADD_USER = gql`
  mutation addUser($username: String!, $email: String!, $phoneNumber: String!,$password: String!) {
    addUser(username: $username, email: $email, phoneNumber: $phoneNumber, password: $password) {
      token
      user {
        _id
        email
        username
      }
    }
  }
`;