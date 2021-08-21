export const Garages = [
  {
    garageId: '378b7626-8ee0-4b8d-a5f7-ca6418f8b4fd',
    garageName: 'ParkBee(26812): Paviljoensgracht',
    name: 'Paviljoensgracht',
    zoneNumber: 26812,
    availableSpaces: 10,
    capacity: 41,
    basePrice: Math.floor(Math.random() * 10),
    dailyCap: Math.floor(Math.random() * 20),
    latitude: 51.922474,
    longitude: 4.486856,
    streetAddress: 'Librijesteeg',
    postalCode: '3011NH    ',
    city: 'Amsterdam',
    countryCode: 'nl',
    doors: [
      {
        doorType: 'Entry',
        description: 'The entry door',
        doorId: '2d0c6f00-c520-46a1-9a13-3f1a1fc5cbf4',
      },
      {
        doorType: 'Exit',
        description: 'The exit door',
        doorId: '981bc76e-3932-4c1f-a28c-0bbce8aecff4',
      },
      {
        doorType: 'Human',
        description: 'The pedestrian door',
        doorId: 'a25ef938-82e9-42fa-ab2f-82395007d5e7',
      },
    ],
    photos: [
      {
        description: 'Entry door',
        urls: [
          {
            name: 'Small',
            size: '300x225',
            url: 'https://ddp49kz334y0n.cloudfront.net/9afdd073-1684-4d12-9189-3e79f5ed8854/300x225/29e48488-62f6-4507-9c7a-2b3c4e920fee.jpg',
          },
          {
            name: 'Large',
            size: '1200x900',
            url: 'https://ddp49kz334y0n.cloudfront.net/9afdd073-1684-4d12-9189-3e79f5ed8854/1200x900/29e48488-62f6-4507-9c7a-2b3c4e920fee.jpg',
          },
        ],
        extension: '.jpg',
      },
      {
        description: 'Interior',
        urls: [
          {
            name: 'Small',
            size: '300x225',
            url: 'https://ddp49kz334y0n.cloudfront.net/9afdd073-1684-4d12-9189-3e79f5ed8854/300x225/6192159d-0d32-44be-a183-306c7e8e22fb.jpg',
          },
          {
            name: 'Large',
            size: '1200x900',
            url: 'https://ddp49kz334y0n.cloudfront.net/9afdd073-1684-4d12-9189-3e79f5ed8854/1200x900/6192159d-0d32-44be-a183-306c7e8e22fb.jpg',
          },
        ],
        extension: '.jpg',
      },
    ],
  },
]
