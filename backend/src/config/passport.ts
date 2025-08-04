import passport from 'passport';
import { Strategy as LocalStrategy } from 'passport-local';
import User, { IUser } from '../models/User';

passport.use(
  new LocalStrategy(
    {
      usernameField: 'email',
      passwordField: 'password',
    },
    async (email: string, password: string, done: any) => {
      try {
        const user = await User.findOne({ email }) as IUser | null;
        if (!user) {
          return done(null, false, { message: 'Incorrect email.' });
        }
        const isMatch = await user.comparePassword(password);
        if (!isMatch) {
          return done(null, false, { message: 'Incorrect password.' });
        }
        return done(null, user);
      } catch (err) {
        return done(err);
      }
    }
  )
);

passport.serializeUser((user: IUser, done: any) => {
  done(null, user.id);
});

passport.deserializeUser(async (id: string, done: any) => {
  try {
    const user = await User.findById(id) as IUser | null;
    done(null, user);
  } catch (err) {
    done(err);
  }
});

export default passport;
