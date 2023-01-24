const fs = require("fs")
const path = require("path")
const dataPath = path.join(__dirname, "../../data/users.json")
const Data = fs.readFileSync(dataPath).length ? JSON.parse(fs.readFileSync(dataPath)) : []
module.exports = {
    POST: (req, res) => {
        const {login, password} = req.body
        console.log(login, password);
        const user = Data.find(item => item.login == login && item.password == password)
        if(user){
            const {id, login} = user
            res.send({id: id, login: login})
        }else{
            res.status(400).send({message: "User Not Found"})
        }
    }
}