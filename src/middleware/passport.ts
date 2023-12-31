import dotenv from 'dotenv';
import { Strategy as JwtStrategy, ExtractJwt } from 'passport-jwt';
import { type PassportStatic } from 'passport';

import { User } from '../models/User';

dotenv.config();

const options = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: process.env.SECRET,
};

const passportStrategy = async (passport: PassportStatic): Promise<void> => {
  passport.use(
    // eslint-disable-next-line @typescript-eslint/no-misused-promises
    new JwtStrategy(options, async (payload, done) => {
      try {
        const user = await User.findById(payload.userId).select('');

        if (user) {
          done(null, user);
        } else {
          done(null, false);
        }
      } catch (error) {
        console.log(error);
      }
    })
  );
};

export { passportStrategy };
