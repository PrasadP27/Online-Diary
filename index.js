const express = require('express');
const app = express()

app.get('/', (req, res) => {
    res.send("Online diary")
})

app.listen(8080, () => {
    console.log("Express Running on http://localhost:8080");
})