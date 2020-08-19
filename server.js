projectData = {}

const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const fetch = require('node-fetch')
const app = express()

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

app.use(cors())
app.use(express.static('website'))

app.get('/api/projectdata', (req, res) => {
    res.status(200).send(projectData)
})

app.post('/api/projectdata', (req, res) => {
    const { date, temp, content } = req.body
    projectData[date] = {
        temp,
        content,
    }
    res.status(201).send()
})

app.listen(8080, () => {
    console.log('Server running on 8080')
})