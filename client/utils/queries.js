import { gql } from "@apollo/client";

export const QUERY_ME = gql`
  {
    me {
      _id
      username
      email
      phoneNumber
      savedHorses {
        horses
        age
        gender
        dam
        trainer
        country
      }
    }
  }
`;
