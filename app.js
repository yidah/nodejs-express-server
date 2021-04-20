const express = require('express');
const path = require('path');

const adminRoutes = require('./routes/admin');
const shopRoutes = require('./routes/shop');

const bodyParser = require('body-parser');

const app = express();

// parse body from a form if we need another such as json or file we would use another tool
app.use(bodyParser.urlencoded({ extended: false }));

// serve static pages - this means directly forwarded to the file system. 
// Basically content not handled by routers
// express.static grants read access to the path given
// express takes any request that tries to find some file such as .css or .js it will
// automatically will forward it to the public folder
app.use(express.static(path.join(__dirname, 'public')));

// using filters so all the routes in admin contain admin at the beggining
app.use('/admin',adminRoutes);
app.use(shopRoutes);

app.use((req,res,next)=>{
    // sending response with status 
    res.status(404).sendFile(path.join(__dirname,'views','404.html'));
})

app.listen(3000);
