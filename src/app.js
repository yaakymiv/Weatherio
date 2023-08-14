const path = require('path')
const express = require('express')
const hbs = require('hbs')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

//we call it to generate a new instance of the application
const app = express()

//define path for Express config
const publicDirectoryPath = path.join(__dirname,"../public")
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

//setup handlebars engine,views location
app.set('view engine','hbs')
app.set('views',viewsPath)
hbs.registerPartials(partialsPath)

//setup static directory to server
app.use(express.static(publicDirectoryPath))

app.get('',(req,res)=>{
    res.render('index',{
        title:'WeatherApp'
    })
})

app.get('/about',(req,res)=>{
    res.render('about',{
        title:'About'
    })
})

app.get('/help',(req,res)=>{
    res.render('help',{
        message:'If you have any questions, feel free to contact via this number:'
    })
})

app.get('/weather',(req,res)=>{
    if(!req.query.address){
        return res.send({
            error: 'Provide address'
        })
    }

    geocode(req.query.address,(error,{latitude,longitude,location}={})=>{
        if(error){
            return res.send({error})
        }
        
        forecast(latitude,longitude,(error,forecastData)=>{
            if(error){
                return res.send({error})
            }

            res.send({
                forecast:forecastData,
                location,
                address:req.query.address
            })
        })
    })
})

//handling wrong urls
app.get('*',(req,res)=>{
    res.render('404')
})

app.listen(3000,()=>{
    //setting a server
    console.log('Server is up on port 3000')
})