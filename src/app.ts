import "dotenv/config";
import express from "express";
import swaggerUi from "swagger-ui-express";
import swaggerDocument from "../swagger.json";
import { getHistoricalBalance } from "./services/getHistoricalBalances";
import { validateParameters } from "./services/validation";


const validApiKey = 'b4a4552e-1eac-44ac-8fcc-91acca085b98-f94b74ce-aa17-48f5-83e2-8b8c30509c18';

// Middleware function to check x-api-key header
const checkApiKeyMiddleware = (req: express.Request, res: express.Response, next: express.NextFunction) => {
  const apiKey = req.header('x-api-key');

  if (!apiKey || apiKey !== validApiKey) {
    console.error('API Call Error:', "Unauthorized");
    return res.status(401).json({ error: 'Unauthorized' });
  }

  next(); // Move to the next middleware or route handler
};


const app = express();
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));
app.use(checkApiKeyMiddleware);


app.get("/historical-balances", (req, res) => {
  const from = req.query.from as string | undefined;
  const to = req.query.to as string | undefined;
  const sort = req.query.sort as string | undefined;

  const validationError = validateParameters(from, to, sort);
  if (validationError) {
    return res.status(400).json({ error: validationError });
  }

  const historicalBalance = getHistoricalBalance(from as string, to as string, sort as string);
  historicalBalance.then((data) => {
    console.log('Successful API call. Result:', historicalBalance); // Logging the successful result
    return res.json(data);
  }).catch((error) => {
    console.error('API Call Error:', error); // Logging the API call error
    return res.status(500).json({ error: error.message });
  });

});



export default app;
