const express = require('express')
const router = express.Router()

const Schema = require("../db/schema.js");
const CompanyModel = Schema.CompanyModel;

// INDEX route
router.get('/', (request, response) => {

    // FIND all of the companies in the database
    CompanyModel.find({})
        .then((companies) => {

            // THEN once they come back from the database
            // RENDER them in Handlebars
            response.render('companies/index', {
                companies: companies
            })
        })
        .catch((error) => {
            console.log(error)
        })
})

// NEW route
router.get('/new', (request, response) => {
    response.render('companies/new')
})

// CREATE route
router.post('/', (request, response) => {

    const newCompany = request.body

    CompanyModel.create(newCompany)
        .then(() => {
            response.redirect('/companies')
        })
        .catch((error) => {
            console.log(error)
        })
})

// EDIT route
router.get('/:companyId/edit', (request, response) => {

    const companyId = request.params.companyId

    CompanyModel.findById(companyId)
        .then((company) => {
            response.render('companies/edit', {
                company: company
            })
        })
})

// UPDATE route
router.put('/:companyId', (request, response) => {

    const companyId = request.params.companyId
    const updatedCompany = request.body

    CompanyModel.findByIdAndUpdate(companyId, updatedCompany, { new: true })
        .then(() => {
            response.redirect(`/companies/${companyId}`)
        })
})

// SHOW route
router.get('/:companyId', (request, response) => {

    const companyId = request.params.companyId

    CompanyModel.findById(companyId)
        .then((company) => {
            response.render('companies/show', {
                company: company
            })
        })
        .catch((error) => {
            console.log(error)
        })
})

// DELETE route
router.get('/:companyId/delete', (request, response) => {

    const companyId = request.params.companyId

    CompanyModel.findByIdAndRemove(companyId)
        .then(() => {
            response.redirect('/companies')
        })
})

module.exports = router