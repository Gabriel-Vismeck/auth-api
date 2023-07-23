//Imports
require('dotenv').config()
const express = require('express')
const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

const app = express()

//config JSON response
app.use(express.json())

//Models
const User = require('./models/User')

//Public Route
app.get('/', (req, res) => {
    res.status(200).json({ msg: 'Bem vinda a API de autenticação!' })
})

//Privade Route
app.get("/user/:id", checkToken, async (req, res) => {

    const id = req.params.id

    /*check if user exists*/
    const user = await User.findById(id, '-password')

    if (!user) {
        return res.status(404).json({ msg: 'Usuário não encontrado!' })
    }

    res.status(200).json({ user })
})

function checkToken(req, res, next) {
    const authHeader = req.headers['authorization']
    const token = authHeader && authHeader.split(" ")[1]

    if (!token) {
        return res.status(401).json({ msg: 'Acesso negado!' })
    }

    try {
        const secret = process.env.SECRET

        jwt.verify(token, secret)

        next()

    } catch (error) {
        res.status(400).json({ msg: "Token inválido!" })
    }

}

//Register User
app.post('/auth/register', async (req, res) => {

    const { name, email, password, confirmpassword } = req.body

    if (!name) {
        return res.status(422).json({ msg: 'O nome é obrigatório!' })
    } else if (!email) {
        return res.status(422).json({ msg: 'O email é obrigatório!' })
    } else if (!password) {
        return res.status(422).json({ msg: 'A senha é obrigatória!' })
    } else if (password != confirmpassword) {
        return res.status(422).json({ msg: 'A senhas estão diferentes!' })
    }



    /*check if user exists*/
    const userExists = await User.findOne({ email: email })

    if (userExists) {
        return res.status(422).json({ msg: 'E-mail já cadastrado!' })
    }

    /*create password*/
    const salt = await bcrypt.genSalt(12)
    const passwordHash = await bcrypt.hash(password, salt)

    /*create user*/
    const user = new User({
        name,
        email,
        password: passwordHash
    })

    try {
        await user.save()
        res.status(201).json({ msg: 'Usuário criado com sucesso!' })

    } catch (error) {
        res.status(500).json({ error: 'Houve um erro no servidor, tente novamente mais tarde!' })
    }
})

//Login
app.post('/auth/login', async (req, res) => {

    const { email, password } = req.body

    if (!email) {
        return res.status(422).json({ msg: 'O email é obrigatório!' })
    } else if (!password) {
        return res.status(422).json({ msg: 'A senha é obrigatória!' })
    }

    /*check if user exists*/
    const user = await User.findOne({ email: email })

    if (!user) {
        return res.status(404).json({ msg: 'Usuário não encontrado!' })
    }

    /*Check if password match*/
    const checkPassword = await bcrypt.compare(password, user.password)

    if (!checkPassword) {
        return res.status(422).json({ msg: 'Usuário ou senha inválidos!' })
    }

    try {

        const secret = process.env.SECRET

        const token = jwt.sign({
            id: user.id
        }, secret
        )

        res.status(200).json({ msg: 'Autenticação realizada com sucesso!', token })

    } catch (error) {
        res.status(500).json({ error: 'Houve um erro no servidor, tente novamente mais tarde!' })
    }

})


//Credenciais
const DB_USER = process.env.DB_USER
const DB_PASS = encodeURIComponent(process.env.DB_PASS)

//Connect DB
mongoose.connect(`mongodb+srv://${DB_USER}:${DB_PASS}@cluster0.kvqieop.mongodb.net/?retryWrites=true&w=majority`)
    .then(() => {
        app.listen(3000)
        console.log('Conetado ao banco!')
    }).catch((err) => console.log(err))
