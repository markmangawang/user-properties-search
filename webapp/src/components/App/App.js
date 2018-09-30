import React from 'react';
import { Segment, Container } from 'semantic-ui-react';

import Properties from '../Properties';

export default function App() {
  const properties = [
    {
      "id": "11",
      "street": "Wintheiser Gateway",
      "city": "Samirstad",
      "state": "South Carolina",
      "zip": "67045",
      "rent": 829.6,
      "user": {
        "id": "54",
        "firstName": "Lukas",
        "lastName": "Huels"
      }
    },
    {
      "id": "12",
      "street": "Braulio Cape",
      "city": "North Kristin",
      "state": "Vermont",
      "zip": "33846-6770",
      "rent": 629.33,
      "user": {
        "id": "17",
        "firstName": "Liliana",
        "lastName": "Wehner"
      }
    },
    {
      "id": "13",
      "street": "Javier Groves",
      "city": "Port Mallieton",
      "state": "Indiana",
      "zip": "44469-6898",
      "rent": 451.02,
      "user": {
        "id": "91",
        "firstName": "Arvid",
        "lastName": "Bailey"
      }
    },
    {
      "id": "14",
      "street": "Lacey Course",
      "city": "North Leathabury",
      "state": "West Virginia",
      "zip": "74878",
      "rent": 418.56,
      "user": {
        "id": "16",
        "firstName": "Constance",
        "lastName": "Pfeffer"
      }
    },
    {
      "id": "15",
      "street": "Annamarie Lodge",
      "city": "West Rashawn",
      "state": "Georgia",
      "zip": "50842-1697",
      "rent": 376.16,
      "user": {
        "id": "85",
        "firstName": "Maryse",
        "lastName": "Hegmann"
      }
    },
    {
      "id": "16",
      "street": "Ondricka Stream",
      "city": "Lake Hugh",
      "state": "Wyoming",
      "zip": "85214-6380",
      "rent": 611.08,
      "user": {
        "id": "53",
        "firstName": "Ayden",
        "lastName": "Wunsch"
      }
    },
    {
      "id": "17",
      "street": "Mack Street",
      "city": "Keithberg",
      "state": "New Mexico",
      "zip": "08842-4720",
      "rent": 740.47,
      "user": {
        "id": "9",
        "firstName": "Annabelle",
        "lastName": "Nolan"
      }
    },
    {
      "id": "18",
      "street": "Kacie Summit",
      "city": "Port Adalineport",
      "state": "Wyoming",
      "zip": "80991",
      "rent": 842.95,
      "user": {
        "id": "53",
        "firstName": "Ayden",
        "lastName": "Wunsch"
      }
    },
    {
      "id": "19",
      "street": "Brooks Dale",
      "city": "New Alvahberg",
      "state": "Tennessee",
      "zip": "00149",
      "rent": 828.34,
      "user": {
        "id": "15",
        "firstName": "Glen",
        "lastName": "Hahn"
      }
    },
    {
      "id": "20",
      "street": "Dibbert Extensions",
      "city": "Dooleyborough",
      "state": "Missouri",
      "zip": "74613",
      "rent": 364.5,
      "user": {
        "id": "9",
        "firstName": "Annabelle",
        "lastName": "Nolan"
      }
    }
  ];

  return (
    <Segment vertical style={{ padding: '8em 0' }}>
      <Container>
        <h1>App</h1>
        <Properties properties={properties}/>
      </Container>
    </Segment>
  );
}
