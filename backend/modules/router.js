const {Router} = require("express")
const route = Router()
const LoginModule = require("./login/login")
const ContactsModule = require("./get_contacts/get_contacts")

route.post("/login", LoginModule.POST)
route.get("/contacts/:id", ContactsModule.GET)
route.post("/contacts/add", ContactsModule.POST)

module.exports = route