require('dotenv').config();
require('express-async-errors');

const port = process.env.PORT || 5000;
const express = require('express');
const app = express();

/* DB import */
const connectDB = require('./db/connect')

/* Security Packages Import */
const helmet = require('helmet');
const cors = require('cors');
const xss = require('xss-clean');
const rateLimiter = require('express-rate-limit');


/* Swagger UI & YAML import */
const swaggerUI = require('swagger-ui-express');
const YAML = require('yamljs');
const swaggerDocument = YAML.load('./swagger.yaml');

/* Router import */
const authRouter = require('./routes/auth');
const jobRouter = require('./routes/jobs');

/* Middleware import */
const authMiddleware = require('./middleware/authentication');
const notFoundMiddleware = require('./middleware/not-found');
const errorHandlerMiddleware = require('./middleware/error-handler');


app.set('trust proxy', 1);
app.use(
  rateLimiter({
    windowMs: 15 * 60 * 1000,   // 15 minutes
    max: 100,                  // limit each IP to 100 requests per windowMs
  })
);
app.use(express.json());
app.use(helmet());
app.use(cors());
app.use(xss());


app.use('/docs', swaggerUI.serve, swaggerUI.setup(swaggerDocument));

app.get('/', (req, res) => {
  res.status(200).json({ success: true, msg: 'Hello Test user1' });
})


app.use('/api/v1/auth', authRouter);
app.use('/api/v1/jobs',authMiddleware,jobRouter);
app.use(notFoundMiddleware);
app.use(errorHandlerMiddleware);


const start = async() => {
  try {
    await connectDB(process.env.MONGO_URI);
    app.listen(port, () => {
      console.log(`server listening at port ${port}`);
    });
  }catch (err) {
    console.log(err);
  }
}


start();
