const fs = require("fs")
const path = require("path")
const dataPath = path.join(__dirname, "../../data/users.json")
const Data = fs.readFileSync(dataPath).length ? JSON.parse(fs.readFileSync(dataPath)) : []
const Contact = require("../../models/contact")
module.exports = {
    GET: (req, res) => {
        const {id} = req.params
        const user = Data.find(item => item.id == id)
        if(user){
            res.send(user.contacts)
        }else{
            res.status(400).send({message: "User Not Found"})
        }
    },
    POST: (req, res) => {
        const {id, name, phone} = req.body
        const userIndex = Data.findIndex(item => item.id == id)
        if(userIndex >= 0){
            const newContact = new Contact(name, phone)
            Data[userIndex].contacts.push(newContact)
            fs.writeFileSync(dataPath, JSON.stringify(Data, null, 4))
            res.send(Data[userIndex].contacts)
        }else{
            res.status(400).send({message: "User Not Found"})
        }
    }
}