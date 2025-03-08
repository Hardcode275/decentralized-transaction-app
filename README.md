# Decentralized Transaction App

This project is a decentralized application designed to facilitate transactions between Bitcoin (BTC) and Monero (XMR) using a swap methodology. The application aims to provide a seamless and secure way to perform cryptocurrency swaps without relying on centralized exchanges.

## Features

- **Decentralized Swaps**: Initiate swaps between BTC and XMR in a decentralized manner.
- **Transaction Management**: Monitor and manage transaction statuses.
- **Service Integration**: Utilizes dedicated services for handling Bitcoin and Monero transactions.

## Project Structure

```
decentralized-transaction-app
├── src
│   ├── app.ts                  # Entry point of the application
│   ├── services
│   │   ├── btcService.ts       # Service for Bitcoin transactions
│   │   └── moneroService.ts    # Service for Monero transactions
│   ├── controllers
│   │   └── transactionController.ts # Controller for transaction logic
│   ├── routes
│   │   └── index.ts            # API routes definition
│   └── types
│       └── index.ts            # Type definitions for transactions
├── package.json                 # NPM package configuration
├── tsconfig.json                # TypeScript configuration
└── README.md                    # Project documentation
```

## Installation

1. Clone the repository:
   ```
   git clone https://github.com/yourusername/decentralized-transaction-app.git
   ```

2. Navigate to the project directory:
   ```
   cd decentralized-transaction-app
   ```

3. Install the dependencies:
   ```
   npm install
   ```

## Usage

To start the application, run the following command:

```
npm start
```

The application will be available at `http://localhost:3000`.

## API Endpoints

- **POST /swap**: Initiate a swap between BTC and XMR.
- **GET /transaction/:id**: Retrieve the status of a transaction.

## Contributing

Contributions are welcome! Please open an issue or submit a pull request for any enhancements or bug fixes.

## License

This project is licensed under the MIT License. See the LICENSE file for more details.