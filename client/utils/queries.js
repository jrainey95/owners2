import { gql } from "@apollo/client";

export const QUERY_ME = gql`
  {
    me {
      _id
      username
      email
      phoneNumber
      savedHorses {
        name
        age
        gender
        dam
        trainer
        country
      }
    }
  }
`;
