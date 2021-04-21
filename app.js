const express = require('express');
const path = require('path');

const adminData = require('./routes/admin');
const shopRoutes = require('./routes/shop');

const bodyParser = require('body-parser');

// Handlebars template is not a build-in like pug we need to set it up
const expressHbs = require('express-handlebars');

const app = express();

// we can choose any name for our engine making sure it does not clash with others
// expressHbs initialize the view engine
app.engine('hbs', expressHbs({layoutsDir:'views/layouts', defaultLayout:'main-layout', extname:'hbs'}));


// set let us declare a global configuration value
// in this case we are setting up the template we want to handle dynamic content in our views
app.set('view engine', 'hbs');
app.set('views','views');

// parse body from a form if we need another such as json or file we would use another tool
app.use(bodyParser.urlencoded({ extended: false }));

// serve static pages - this means directly forwarded to the file system. 
// Basically content not handled by routers
// express.static grants read access to the path given
// express takes any request that tries to find some file such as .css or .js it will
// automatically will forward it to the public folder
app.use(express.static(path.join(__dirname, 'public')));

// using filters so all the routes in admin contain admin at the beggining
app.use('/admin',adminData.routes);
app.use(shopRoutes);

app.use((req,res,next)=>{
    // sending response with status and sending a file
    // res.status(404).sendFile(path.join(__dirname,'views','404.html'));

    // sending data to the template
    res.status(404).render('404', {pageTemplate:'Page Not Found'});
})

app.listen(3000);
