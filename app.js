const express = require('express');

const adminRoutes = require('./routes/admin');
const shopRoutes = require('./routes/shop');

const bodyParser = require('body-parser');

const app = express();

// parse body from a form if we need another such as json or file we would use another tool
app.use(bodyParser.urlencoded({ extended: false }));

// using filters so all the routes in admin contain admin at the beggining
app.use('/admin',adminRoutes);
app.use(shopRoutes);

app.use((req,res,next)=>{
    // sending response with status 
    res.status(404).send('<h1>Page not found</>');
})

app.listen(3000);
