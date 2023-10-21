import { gql } from "@apollo/client";

export const QUERY_ME = gql`
  {
    me {
      _id
      username
      email
      phoneNumber
      savedHorses {
        horseId
        name
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
