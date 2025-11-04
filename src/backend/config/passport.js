import passport from "passport";
import { PrismaClient } from "@prisma/client";
import { Strategy as GoogleStrategy } from "passport-google-oauth20";

const prisma = new PrismaClient();

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.CLIENT_ID,
      clientSecret: process.env.SECRET_CLIENT,
      callbackURL: "http://localhost:3000/api/auth/google/callback",
    },
    async (accessToken, refreshToken, profile, done) => {
      try {
        const email = profile.emails[0].value;
        const googleId = profile.id;

        // Verificar si el usuario ya existe por Google ID
        let user = await prisma.user.findUnique({
          where: { googleId },
        });

        // Si no existe por Google ID, verificamos por email
        if (!user) {
          user = await prisma.user.findUnique({
            where: { email },
          });

          // Si existe por email, actualizamos con su Google ID y avatar
          if (user) {
            user = await prisma.user.update({
              where: { email },
              data: {
                googleId,
                avatar: profile.photos[0].value,
              },
            });
          } else {
            // Si no existe, lo creamos nuevo
            user = await prisma.user.create({
              data: {
                email,
                name: profile.displayName,
                googleId,
                avatar: profile.photos[0].value,
              },
            });
          }
        }

        return done(null, user);
      } catch (error) {
        return done(error, null);
      }
    }
  )
);

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
  try {
    const user = await prisma.user.findUnique({ where: { id } });
    done(null, user);
  } catch (error) {
    done(error, null);
  }
});
