const express = require('express');
const router = express.Router();

router.get('/', (req, res)=>{
    const urls = [
        {origin: "www.google.com", shortURL: "FJDKFJ"},
        {origin: "www.facebook.com", shortURL: "FJDKFJ"},
        {origin: "www.youtube.com", shortURL: "FJDKFJ"}
    ];
    
    res.render("home",  {urls});

});

router.get("/login", (req, res)=>{
    res.render("login", {titulo: "login"})
})

module.exports = router;