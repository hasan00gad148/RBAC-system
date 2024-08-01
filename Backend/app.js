require('dotenv').config();
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const session = require('express-session');
const {authRouter} = require('./routers/authRoutes.js');
const {rolesRouter} = require("./routers/rolesRoutes.js")
const {usermanagementRouter} = require("./routers/userManagementRoutes.js")
const {articlesRoutes} = require("./routers/articlesRoutes.js")
const {authenticateToken, authenticateRole} = require("./middlewares/authMiddleware")


const app = express();


app.use(express.static(path.join(__dirname, 'public')));
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(cors());
app.use(session({
  secret:process.env.TOKEN_SECRET, 
  resave: false,
  saveUninitialized: true,
  cookie: { secure: false } // Set to true if using HTTPS
}));


app.use(authRouter);

app.use(authenticateToken)

app.use(rolesRouter)
app.use(usermanagementRouter)
app.use(articlesRoutes)


app.use((req, res, next) => {
  res.status(404).json({ok:false, message:'Sorry, we could not find that!!!'});
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});