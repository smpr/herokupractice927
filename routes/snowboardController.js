const express = require('express')
const router = express.Router({mergeParams: true});
//this pulls everything from the schemajs page
const Schema = require("../db/Schema.js")
const SnowboardModel = Schema.SnowboardModel
const CompanyModel = Schema.CompanyModel
router.get('/', (request, response)=>{
   
    const companyId = request.params.companyId
    CompanyModel.findById(companyId)
     .then((company)=>{
         const snowboards = company.snowboards
         response.render('snowboards/index', {
             company: company
         })
     })
     .catch((error)=>{
    console.log(error)})
})

module.exports = router