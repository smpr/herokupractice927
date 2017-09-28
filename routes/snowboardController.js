const express = require('express')
const router = express.Router({ mergeParams: true })

const Schema = require("../db/schema.js");
const CompanyModel = Schema.CompanyModel;

// INDEX
router.get('/', (request, response) => {

    const companyId = request.params.companyId

    CompanyModel.findById(companyId)
        .then((company) => {
            response.render('snowboards/index', {
                company: company
            })
        })
        .catch((error) => {
            console.log(error)
        })

})

// NEW route
router.get('/new', (request, response) => {

    const companyId = request.params.companyId

    response.render('snowboards/new', {
        companyId: companyId
    })
})

// CREATE route
router.post('/', (request, response) => {

    const companyId = request.params.companyId
    const newSnowboard = request.body

    CompanyModel.findById(companyId)
        .then((company) => {
            company.snowboards.push(newSnowboard)
            return company.save()
        })
        .then((company) => {
            response.redirect(`/companies/${companyId}/snowboards`)
        })

})

// EDIT route
router.get('/:snowboardId/edit', (request, response) => {

    const companyId = request.params.companyId
    const snowboardId = request.params.snowboardId
    
    CompanyModel.findById(companyId)
        .then((company) => {
            const snowboard = company.snowboards.id(snowboardId)

            response.render('snowboards/edit', {
                snowboard: snowboard,
                companyId: companyId
            })
        })
        .catch((error) => {
            console.log(error)
        })
})

// UPDATE route
router.put('/:snowboardId', (request, response) => {

    const companyId = request.params.companyId
    const snowboardId = request.params.snowboardId
    const updatedSnowboard = request.body
    
    CompanyModel.findById(companyId)
        .then((company) => {
            const snowboard = company.snowboards.id(snowboardId)

            snowboard.name = updatedSnowboard.name
            snowboard.price = updatedSnowboard.price

            return company.save()
        })
        .then(() => {
            response.redirect(`/companies/${companyId}/snowboards/${snowboardId}`)
        })

})

// SHOW route
router.get('/:snowboardId', (request, response) => {

    const companyId = request.params.companyId
    const snowboardId = request.params.snowboardId

    CompanyModel.findById(companyId)
        .then((company) => {
            const snowboard = company.snowboards.id(snowboardId)

            response.render('snowboards/show', {
                snowboard: snowboard,
                companyId: companyId
            })
        })
        .catch((error) => {
            console.log(error)
        })
})

// DELETE route
router.get('/:snowboardId/delete', (request, response) => {

    const companyId = request.params.companyId
    const snowboardId = request.params.snowboardId

    CompanyModel.findById(companyId)
        .then((company) => {
            const snowboard = company.snowboards.id(snowboardId).remove()

            return company.save()
        })
        .then(() => {
            response.redirect(`/companies/${companyId}/snowboards`)
        })
})


module.exports = router