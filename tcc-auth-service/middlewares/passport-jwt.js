const passport = require("passport");
const { Strategy: JwtStrategy, ExtractJwt } = require("passport-jwt");

const opts = {};
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
opts.secretOrKey = process.env.JWT_KEY;

passport.use(
  new JwtStrategy(opts, async function (jwtPayload, done) {
    try {
      const user = { userId: jwtPayload.userId, role: jwtPayload.role };
      if (user) {
        return done(null, user);
      }
    } catch (error) {
      done(error);
    }
  })
);

module.exports.authenticate = passport.authenticate("jwt", { session: false });
