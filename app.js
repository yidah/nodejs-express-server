const express = require('express');

const app = express();

app.use('/',(req,res,next)=>{
    console.log('always runs');
    // allows the next middleware to continue
    next();
});

app.use('/add-product',(req,res,next)=>{
    console.log('only if add product is needed');
    // sends response therefore next middleware will not run
    res.send('<h1>Add product</h1>');
});

app.use('/',(req,res,next)=>{
    console.log('only root');
    res.send('<h1>home page</h1>');
});

app.listen(3000);

