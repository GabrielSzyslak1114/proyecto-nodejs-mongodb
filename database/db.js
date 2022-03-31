const mongoose = require('mongoose');

mongoose
    .connect(process.env.URI)
    .then(()=> console.log('db connect'))
    .catch((e) => console.log("error db" + e))