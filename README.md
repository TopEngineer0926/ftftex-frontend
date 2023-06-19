# FTFTex

UAB FTFTex TRADING is a professional global digital currency market data provider, a subsidiary platform of Nasdaq-listed Future Fintech’s company (NASDAQ: FTFT) .

UAB FTFTex TRADING provides institutional and individual investors with real-time, high-quality, reliable digital currency market data, such as Bitcoin, Ethereum, EOS, Litecoin, TRON and other digital currencies. 

FTFTex aggregates the currency and transaction data of global digital currency platforms, conducting multi-dimensional and all-round analysis, delivering the most valuable information to users.

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Structure
Working towards restructuring the project similar to [this repo](https://github.com/TopEngineer0926/ftftex-frontend). Many additions and iterations have been completed for this project and it increasing in size and losing organization. This is an effort to standardize how changes are written in the code going forward.

```
src
|
+-- assets            # assets folder can contain all the static files such as images, fonts, etc.
|
+-- components        # shared components used across the entire application
|
+-- data              # all of the constant variables and data
|
+-- hooks             # shared hooks used across the entire application
|
+-- services          # all of the application services for API service, countryData service and tradingData service
|
+-- utils             # shared utility functions
```

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

The page will reload when you make changes.\
You may also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can't go back!**

If you aren't satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you're on your own.

You don't have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn't feel obligated to use this feature. However we understand that this tool wouldn't be useful if you couldn't customize it when you are ready for it.

## TODO Features
- [ ] Xt.com Wallet part.
- [ ] Other new features

## Tech Stack
```
    "@emotion/react": "^11.10.6",
    "@emotion/styled": "^11.10.6",
    "@mui/material": "^5.12.0",
    "@mui/styled-engine-sc": "^5.12.0",
    "@testing-library/jest-dom": "^5.16.5",
    "@testing-library/react": "^13.4.0",
    "@testing-library/user-event": "^13.5.0",
    "axios": "^1.3.4",
    "bootstrap": "^4.6.2",
    "i18next": "^22.4.13",
    "igniteui-react-charts": "^18.1.2",
    "igniteui-react-core": "^18.1.2",
    "moment": "^2.29.4",
    "numeral": "^2.0.6",
    "react": "^18.2.0",
    "react-apexcharts": "^1.4.0",
    "react-bootstrap": "^2.7.2",
    "react-content-loader": "^6.2.1",
    "react-datepicker": "^4.11.0",
    "react-dom": "^18.2.0",
    "react-i18next": "^12.2.0",
    "react-qrcode-logo": "^2.9.0",
    "react-router-dom": "^6.10.0",
    "react-scripts": "5.0.1",
    "react-toastify": "^9.1.2",
    "sass": "^1.60.0",
    "swiper": "^8.4.7",
    "titlecase": "^1.1.3",
    "web-vitals": "^2.1.4"
```
