'use strict';
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const config = require('./config');
const apiRoutes = require('./routes/api-routes');
const usersRoutes = require('./routes/users-routes');
const {registerMiddleware, loginMiddleware, logoutMiddleware, forgotPassword} = require('./routes/auth-routes');
const {checkAuth} = require('./routes/authlogin-routes');

const app = express();

app.use(express.json());
app.use(cors());
app.use(bodyParser.json());

app.use('/auth/register', registerMiddleware);
app.use('/auth/login',loginMiddleware);
app.use('/auth/logout', logoutMiddleware);
app.use('/auth/forgotpassword', forgotPassword);

app.use('/middleware/authlogincheck', checkAuth);

app.use('/user', checkAuth, usersRoutes.routes);
app.use('/api', checkAuth, apiRoutes.routes);





app.listen(config.port, () => console.log('App is listening on url http://localhost:' + config.port));
