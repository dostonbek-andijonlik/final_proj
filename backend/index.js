const express = require("express")
const routes = require("./modules/router")
const cors = require('cors');
const app = express()
app.use(express.json())
app.use(cors())
app.use(routes)
const PORT = process.env.PORT || 8080

app.listen(PORT, console.log(`Server is running on port ${PORT}`))