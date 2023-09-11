# Balance and Transactions API

## Intro

This is a TypeScript module that calculates historical balances based on a list of transactions retrieved from an API. It takes a from date, a to date, and a sort parameter to return a list of historical balances within the specified date range.

## How it Works
The function makes an API call to retrieve a list of transactions from a specific URL. 
It uses the API Key value to authenticate.The API Key value is `b4a4552e-1eac-44ac-8fcc-91acca085b98-f94b74ce-aa17-48f5-83e2-8b8c30509c18`

It sorts the transactions by date in `ascending` or `descending` order.

It calculates historical balances by iterating through the sorted transactions. Only non-cancelled transactions are considered, and the total balance is updated accordingly.

Historical balances are stored in an object with date keys.

The function filters the historical balances within the specified date range (from to to) and returns the result.

The final result is sorted based on the sort parameter.


### `GET /historical-balances` 

This endpoint returns the daily balance for a specific date range, such as `GET /historical-balances?from=2022-01-03&to=2022-01-05&sort=desc` The request respond with a list of of balances for these days in the following format:

```json
[
    {
        "date": "2022-01-01",
        "amount": -1379,
        "currency": "EUR"
    },
    {
        "date": "2022-01-02",
        "amount": -401,
        "currency": "EUR"
    }
]
```

### Note
- This api use authentication based on an API Key. 
The API Key value is `b4a4552e-1eac-44ac-8fcc-91acca085b98-f94b74ce-aa17-48f5-83e2-8b8c30509c18` which should be sent using an HTTP header `x-api-key`


## How to Run

### Build the project

```sh
npm run build
```

### Running the server 

```sh
# After cloning the repository, install the dependencies
npm install

# Start the server
npm start


> balances-and-transactions-api@1.0.0 start
> tsx src/server.ts --watch

🚀 Server started on port 3333!

# If you see the message above, everything worked!
# The `start` command has hot-reload on, i.e., anytime you modify a file
# the server restarts. Bear it in mind if your solution keeps state in memory.
```

### Running the tests

```sh
npm test
```
## Running the linter 
```sh
npm run lint
``` 

## Dependencies
- moment: A JavaScript date library for parsing, validating, manipulating, and formatting dates.
- axios: A popular JavaScript library for making HTTP requests.

## Swagger
- You can find more details in the [swagger.json]('./swagger.json'). 
## Author
This module was created by [Raheleh Bayat]( https://github.com/raheleh-bayat). If you have any questions or issues, please feel free to contact me or open an issue on GitHub.