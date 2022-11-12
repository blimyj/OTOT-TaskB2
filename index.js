// FileName: index.js// Import express
let express = require('express')// Initialize the app
let app = express();// Setup server port


// Import routes
let apiRoutes = require("./api-routes")// Use Api routes in the App

// Import Body parser
let bodyParser = require('body-parser');
// Import Mongoose
let mongoose = require('mongoose');

app.use(bodyParser.json());
// Configure bodyparser to handle post requests
app.use(bodyParser.urlencoded({
   extended: true
}));

// mongoose.connect('mongodb://localhost/resthub', { useNewUrlParser: true});
async function mongooseConnect() {
    await mongoose.connect('mongodb+srv://user:vZi8rwOKMcczEZ8z@cluster0.skh7rhi.mongodb.net/resthub?retryWrites=true&w=majority', { useNewUrlParser: true});
}

try {
    mongooseConnect()

  } catch (error) {
    console.log('Error while trying to connect to mongoDB.')
    console.log(error)
  }
var db = mongoose.connection;

// Added check for DB connection
if(!db)
    console.log("Error connecting db")
else
    console.log("Db connected successfully")
    
app.use('/api', apiRoutes)
var port = process.env.PORT || 8080;// Send message for default URL
app.get('/', (req, res) => res.send('Hello World with Express'));// Launch app to listen to specified port

app.get('*', function(req, res){
    res.status(404).json({message: 'Not Found Error'})
})

app.listen(port, function () {
        console.log("Running RestHub on port " + port);
});

module.exports = app;