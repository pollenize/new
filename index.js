import basicStrategy from './strategies/basic';
import jwtStrategy from './strategies/jwt';
import bodyParser from 'body-parser';
import cors from 'cors';
import express from 'express';
import passport from 'passport';
import routes from './routes';
import {sequelize} from './models';

const app = express();
app.use(bodyParser.json());
app.use(passport.initialize());
app.use(
  cors({
    origin: /^https?:\/\/(localhost(:\d{4})?|pollenize.org|d2pzrhl3yg1jg2.cloudfront.net)$/,
    methods: ['GET', 'POST', 'PUT', 'DELETE']
  })
);

passport.use(basicStrategy);
passport.use(jwtStrategy);

app.use('/', routes);

sequelize
  .sync()
  .then(() =>
    app.listen(process.env.PORT, () =>
      console.log(`Listening on port ${process.env.PORT}`)
    )
  );
