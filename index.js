const express = require('express');
const mongoose = require('mongoose');
const cookieSession = require('cookie-session');
const passport = require('passport');
const keys = require('./config/keys');
const bodyParser = require('body-parser');
require('./models/User');
require('./services/passport');

mongoose.connect(keys.mongoURI);

const app = express();

//Middlewares
app.use(
	cookieSession({
		maxAge: 30 * 24 * 60 * 60 * 1000,
		keys: [keys.cookieKey]
	})
)
app.use(passport.initialize());
app.use(passport.session());
app.use(bodyParser.json());


//All Routes
require('./routes/authRoutes')(app);
require('./routes/billingRoutes')(app);

//Config for production
if (process.env.NODE_ENV === 'production') {
	// express will serve up production assets, example: main.js / main.css
	app.use(express.static('client/build'));

	// if express does not know the route, kick user to client side of the app
	const path = require('path');
	app.get('*', (req, res) => {
		res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
	});
}

const PORT = process.env.PORT || 5000;
app.listen(PORT);
