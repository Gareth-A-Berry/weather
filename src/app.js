const path = require('path')
const express = require('express')
const hbs = require('hbs')
const utils= require('./utils/utils')

const app = express()
const port = process.env.PORT || 3000

// Define paths for Express config
const publicPath =  path.join(__dirname, '../public')
const viewsPath = path.join(__dirname,  '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

// Setup handlebars engine and views location
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

// Setup static directory to serve
app.use(express.static(publicPath))

// Routes
app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather',
        name: 'Gareth Berry'
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        title: 'Help',
        text: 'Some helpful text',
        name: 'Gareth Berry'
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About',
        name: 'Gareth Berry'
    })
})

app.get('/weather', (req, res) => {
    if (!req.query.address) {
        return res.send({
            error: 'An Address must be provided'
        })
    }

    utils.geoCode(req.query.address, (error, {latitude, longitude } = {}) => {
        if (error) {
            return res.send({ error })
        }
        utils.forecast(latitude, longitude, (error, forecast) => {
            if (error) {
                return res.send({ error })
            } else {
                res.send(forecast)
            }
        })
    })
})

app.get('/help/*', (req, res) => {
    res.render('404', {
        title: '404',
        errorMessage: 'Help article not found',
        name: 'Gareth Berry'
    })
})
app.get('*', (req, res) => {
    res.render('404', {
        title: '404',
        errorMessage: 'Page not found',
        name: 'Gareth Berry'
    })
})

app.listen(port, () => {
    console.log(`Server is up on port ${port}`)
})

