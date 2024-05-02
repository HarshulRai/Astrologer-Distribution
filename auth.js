const passport = require('passport');
const passportJWT = require('passport-jwt');
const JWTStrategy = passportJWT.Strategy;
const ExtractJWT = passportJWT.ExtractJwt;
const jwt = require('jsonwebtoken');
const pool = require('./db');

const secretKey = '8F3DD65511245A62F1C11EEB3F03352311758E9A7E96F8950BD85F5CDAA371F1';

passport.use(new JWTStrategy({
    jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken(),
    secretOrKey: secretKey
}, async (jwtPayload, done) => {
    try {
        const query = {
            text: 'SELECT * FROM users WHERE id = $1',
            values: [jwtPayload.id]
        };
        const result = await pool.query(query);
        if (result.rows.length > 0) {
            const user = { id: result.rows[0].id, username: result.rows[0].username };
            return done(null, user);
        } else {
            return done(null, false);
        }
    } catch (error) {
        return done(error, false);
    }
}));

function generateToken(user) {
    return jwt.sign({ id: user.id, username: user.username }, secretKey, { expiresIn: '1h' });
}

module.exports = { passport, generateToken };
