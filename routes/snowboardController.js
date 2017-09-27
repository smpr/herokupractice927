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
router.get('/new', (request, response)=>{
    const companyId = request.params.companyId
    response.render('snowboards/new',{
        companyId: companyId
    })
})
router.post('/', (request, response)=>{
    const companyId = request.params.companyId
    const newSnowboard = request.body
    CompanyModel.findById(companyId)
    .then((company)=>{
        company.snowboards.push(newSnowboard)
        return company.save()
    })
    .then((company)=>{
        response.redirect(`/companies/${companyId}}/snowboards`)
    })
})
router.get('/:snowboardId/edit', (request, response)=>{
    const companyId = request.params.companyId
    const snowboardId = request.params.snowboardId
    CompanyModel.findById(companyId)
            .then((company)=>{
                const snowboard = company.snowboards.id(snowboardId)
                response.render('snowboards/edie', {
                    snowboard: snowboard,
                    companyId: companyId
                })
            })
})
router.get('/:snowboardId', (request, response)=>{
    const companyId = request.params.companyId
    const snowboardId = request.params.snowboardId

    CompanyModel.findById(companyId)
        .then((company)=>{
                const snowboard = company.snowboards.id(snowboardId)
                response.render('snowboards/show', {
                    snowboard: snowboard,
                    companyId: companyId
                })
        })
        .catch((error)=>{
            console.log(error)
        })
})


module.exports = router