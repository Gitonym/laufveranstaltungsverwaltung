//dependencies
const express = require("express");
const expressLayouts = require("express-ejs-layouts");
const passport = require("passport");
const session = require("express-session");
const MemoryStore = require("memorystore")(session);
require("./config/passport.js")(passport);

const app = express();

//routes
const indexRouter = require("./routes/index");
const profileRouter = require("./routes/profile");
const loginRouter = require("./routes/login");
const registerRouter = require("./routes/register");
const eventsRouter = require("./routes/events");
const clubsRouter = require("./routes/clubs");
const logoutRouter = require("./routes/logout");

//setup middleware
app.set("view engine", "ejs");
app.set("views", __dirname + "/views");
app.set("layout", "layouts/layout");

app.use(expressLayouts);
app.use(express.static("public"));
app.use(express.urlencoded({extended: false}))

//login
app.use(
    session({
        secret: 'asdwarsfd9244h',
        resave: false,
        saveUninitialized: false,
        store: new MemoryStore({
            checkPeriod: 86400000, // prune expired entries every 24h
        }),
    })
);
app.use(passport.initialize());
app.use(passport.session());

//pass the user to ejs templates
app.use((req, res, next) => {
    // Attach the user object to res.locals
    res.locals.user = req.user;
    next();
});


//setup routes
app.use("/", indexRouter);
app.use("/profile", profileRouter);
app.use("/login", loginRouter);
app.use("/register", registerRouter);
app.use("/events", eventsRouter);
app.use("/clubs", clubsRouter);
app.use("/logout", logoutRouter);

//start server
console.log("Started on port 3500");
app.listen(process.env.PORT || 3500);
