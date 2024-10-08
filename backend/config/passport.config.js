import passport from 'passport';
import GoogleStrategy from 'passport-google-oauth20';
import local from 'passport-local';
import userService from '../models/user.js';
import { createHash, isValidPassword } from '../utils.js';
import dotenv from 'dotenv';
import cartModel from '../models/cart.model.js';

dotenv.config();

const LocalStrategy = local.Strategy;

const initializePassport = () => {

    passport.use('register', new LocalStrategy(
        { passReqToCallback: true, usernameField: 'email' }, async (req, username, password, done) => {
            const { first_name, last_name, email, age } = req.body;
            try {
                let user = await userService.findOne({ email: username });
                if (user) {
                    console.log("El usuario ya existe");
                    return done(null, false);
                }
                const newUser = {
                    first_name,
                    last_name,
                    email,
                    age,
                    password: createHash(password),
                    role: 'user'
                };
                let result = await userService.create(newUser);

                return done(null, result);
            } catch (error) {
                return done("Error al obtener el usuario" + error);
            }
        }
    ));

    passport.use('google', new GoogleStrategy({
        clientID: process.env.GOOGLE_CLIENT_ID,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        callbackURL: "http://localhost:8080/api/sessions/google/callback"
    }, async (token, tokenSecret, profile, done) => {
        try {
            console.log(profile);
            let user = await userService.findOne({ email: profile.emails[0].value });
            if (!user) {
                let newUser = {
                    first_name: profile.name.givenName,
                    last_name: profile.name.familyName,
                    email: profile.emails[0].value,
                    password: "",
                    role: 'user'
                };
                let result = await userService.create(newUser);

                // Crear un carrito para el nuevo usuario
                const newCart = await cartModel.create({ products: [] });
                result.cartId = newCart._id;
                await result.save();

                done(null, result);
            } else {
                done(null, user);
            }
        } catch (error) {
            return done(error);
        }
    }));

    passport.serializeUser((user, done) => {
        done(null, user._id);
    });

    passport.deserializeUser(async (id, done) => {
        let user = await userService.findById(id);
        done(null, user);
    });

    passport.use('login', new LocalStrategy({ usernameField: 'email' }, async (username, password, done) => {
        try {
            const user = await userService.findOne({ email: username });
            if (!user) {
                console.log("El usuario no existe");
                return done(null, user);
            }
            if (!isValidPassword(user, password)) return done(null, false);
            return done(null, user);
        } catch (error) {
            return done(error);
        }
    }));
};

export default initializePassport;
