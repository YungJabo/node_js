const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");
const logger = require("morgan");
const passport = require("passport");
const LocalStrategy = require("passport-local");
const passportJWT = require("passport-jwt");
const session = require("express-session");

const FileStore = require("session-file-store")(session);

const JWTStrategy = passportJWT.Strategy;
const ExtractJWT = passportJWT.ExtractJwt;
const indexRouter = require("./routes/api");

const app = express();

app.use(
  session({
    store: new FileStore(),
    secret: "secret",
    resave: false,
    saveUninitialized: true,
  })
);
app.use(passport.initialize());
app.use(passport.session());

const user = {
  id: "1",
  email: "123@example.com",
  password: "pass",
};

// view engine setup

passport.serializeUser((user, done) => {
  done(null, user.id);
});
passport.deserializeUser((id, done) => {
  const _user = user.id === id ? user : false;
  done(null, user);
});

passport.use(
  new LocalStrategy(
    {
      usernameField: "email",
    },
    (email, password, done) => {
      if (email === user.email && password === user.password) {
        return done(null, user);
      } else {
        return done(null, false);
      }
    }
  )
);

passport.use(
  new JWTStrategy(
    {
      jwtFromRequest: passportJWT.ExtractJwt.fromAuthHeaderAsBearerToken,
      secretOrKey: "jwt_secret",
    },
    (jwt_paylod, done) => {
      if (user.id === jwt_paylod.user._id) {
        return done(null, user);
      } else {
        return done(null, false, {
          message: "Token not matched",
        });
      }
    }
  )
);
app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

app.use("/", indexRouter);
app.use("/users", usersRouter);

// catch 404 and forward to error handler
// app.use(function (req, res, next) {
//   next(createError(404));
// });

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.send(err.message);
});

module.exports = app;
