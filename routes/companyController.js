const express = require('express')
const router = express.Router();
//this pulls everything from the schemajs page
const Schema = require("../db/Schema.js")
const CompanyModel = Schema.CompanyModel

//this will grab info from the db and post it to this route

router.get('/', (request, response)=>{
    CompanyModel.find({})
    .then((company)=>{
        //sends this data to the companies/index.hbs
        response.render('companies/index', {
            companies
        })
    })
    .catch((error)=>{
        console.log(error)
    })
})

module.exports = router
