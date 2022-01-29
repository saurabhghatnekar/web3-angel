import {gql} from "@apollo/client";

export const CREATE_COMPANY_MUTATION = gql`
    mutation CreateCompany($name: String!, $markets: [String]!, $elevatorPitch: String!, $whyYourCompany: String!, $type: companyType!) {
        createCompany(name: $name, markets: $markets, elevatorPitch: $elevatorPitch, whyYourCompany: $whyYourCompany, type: $type, website: $website) {
            id
            name
        }
    }`