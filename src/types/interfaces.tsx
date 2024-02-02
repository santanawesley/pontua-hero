export interface IMockLogin {
  isAuthenticated: boolean;
}

export interface PersonDetails {
  available: number;
  collectionURI: string;
  items: [
    {
      resourceURI: string;
      name: string;
    }[]
  ];
  returned: number;
}
export interface Person {
  id: number;
  name: string;
  description: string;
  modified: string;
  thumbnail: {
    path: string;
    extension: string;
  };
  resourceURI: string;
  comics: PersonDetails;
  series: PersonDetails;
  stories: PersonDetails;
  events: PersonDetails;
  urls: [
    {
      type: string;
      url: string;
    }[]
  ];
}

export interface CharactersData {
  offset: number;
  limit: number;
  total: number;
  count: number;
  results: Person[];
}
export interface ICharacters {
  data: {
    attributionHTML: string;
    attributionText: string;
    code: number;
    copyright: string;
    data: CharactersData;
    status: string;
    etag: string;
  };
  status: number;
  statusText: string;
}
