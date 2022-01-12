import express, { Request, Response } from 'express';
import product_routes from './handlers/products';
import user_routes from './handlers/users';
import order_routes from './handlers/orders';
import dotenv from 'dotenv';
import cors from 'cors';

dotenv.config();

const app: express.Application = express();
const PORT: string | number = process.env.PORT || 3000;

app.use(express.json());
app.use(
  cors({
    origin: `http://localhost:${PORT}`
  })
);

app.get('/', function (req: Request, res: Response) {
  res.send('AHLAN!');
});

// Initialise all the routers
product_routes(app);
user_routes(app);
order_routes(app);

app.listen(PORT, function () {
  console.log(`starting app on port ${PORT}`);
});

export default app;