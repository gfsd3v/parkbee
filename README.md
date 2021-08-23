## ParkBee - GFS

## Stack
- Based on `Gatsby@3`
- Mapbox
- ReduxToolkit with persistant data
- Static type checking with `Typescript`
- Tests with `Cypress`
- Toggable theme
- Utility-first styling with `Tailwind`
- SEO component to improve SEO with `React Helmet`

I would like to refeer you guys to [this](https://coding-guide-pattern.netlify.app/) documentation about project structure/coding guidelines that I wrote a while ago, I always try to follow these guidelines, it varies accordingly with the stack, but I always try to use it as reference and it will definitely help you guys understand my train of thought.

Since I decided to use a utility-first styling with Tailwind and DaisyUI it wasn't necessary to create basic components like buttons, cards, inputs, etc. But the UI components for this challenge only have a dependency with tailwind. 
Tailwind is themable, so consuming these components in other projects wouldn't be hard, I would use for this Bit.dev, I recently made a refactor on our internal UI library using Tailwind with Styled Components and Bit.dev, it's still a WIP, but the feedbacks have been good this far, its an awesome stack to work with.
I've mocked all the data that is displayed on the product, I didn't simulate any HTTP request, I used class servicer as I usually do but I decided to just return a Promise and resolve it with the mocked data. I explain a bit more in the technical.md. Basically all the platform logic is located at the `pages/index.tsx` and the stores from reduxtoolkit, we also have some more complex components like `src/components/GarageCard` and `src/components/Map`, the only dependency that they have are Tailwind and type definitions, I've used reduxtoolkit `createAsyncThunk` to manage the requests alongside the store/state of redux, all data from the application is properly separated at the redux store.

I've assumed that the `Garage` interface that we receive is as follow:
```js
export interface IGarageDoor {
  doorId: string
  doorType?: string
  description?: string
  streetAddress?: string
}

export interface IGaragePhotoUrl {
  name: string
  size: string
  url: string
}

export interface IGaragePhoto {
  description: string
  urls: IGaragePhotoUrl[]
  extension: string
}

export interface IGarage {
  garageId: string
  garageName: string
  name: string
  zoneNumber: number
  availableSpaces: number
  capacity: number
  latitude: number
  longitude: number
  basePrice: number
  dailyCap: number
  streetAddress: string
  postalCode: string
  city: string
  countryCode: string
  doors: IGarageDoor[]
  photos: IGaragePhoto[]
}
```
Saddly its a little but off from a real world situation.

## Setup

> Project requires `node` >= 12.13.0 and uses `npm` as the package manager

1. **Create a Gatsby site**

   Clone or download this repository:

   ```shell
   git clone ....
   ```


1. **Setup the project**

   Install dependencies and run validation scripts:

   ```shell
   npm run setup
   ```

1. **Run the application**

   This script starts the development server on http://localhost:8000:

   ```shell
   npm start
   ```
   
## Scripts

| `npm run <command>` | Description                                                                                |
| ------------------- | ------------------------------------------------------------------------------------------ |
| `start`             | Build app in dev mode and start development server on 8000                                 |
| `build`             | Build app in prod mode in `public` folder                                                  |
| `serve`             | Browse production build from `public` folder locally on 8000                               |
| `test`              | Run Cypress locally                                                                   |
| `stats`             | Open Webpack Bundle Analyzer reports. You need to generate them with `build` first         |
| `lint`              | Run ESLint in fix mode on `.tsx`, `.ts` and `.js` files except of ignored folders          |
| `format`            | Run Prettier in write mode on all files except of ignored folders                          |
| `type-check`        | Run Typescript compiler for types checking                                                 |
| `validate`          | Full code quality control: `lint`, `format`, `type-check` and `test:coverage`              |
| `clean`             | Clean `public` and `.cache` folders for the moments when you cannot rely on cache          |
| `setup`             | Install dependencies and run validation script                                             |
