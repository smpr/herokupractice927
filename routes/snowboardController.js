const express = require('express')
const router = express.Router({ mergeParams: true })

const Schema = require("../db/schema.js");
const CompanyModel = Schema.CompanyModel;

// INDEX route
router.get('/', (request, response) => {

    // GRAB the company ID from the parameters
    const companyId = request.params.companyId

    // Use the CompanyModel to find the company by ID
    CompanyModel.findById(companyId)
        .then((company) => {
            // THEN once you have found the company in the database
            // RENDER the company and its EMBEDDED snowboard info 
            // using Handlebars
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

    // GRAB the company ID from the parameters
    const companyId = request.params.companyId

    // RENDER a new form for a fresh Snowboard,
    // also passing the companyId to use in the
    // form's ACTION
    response.render('snowboards/new', {
        companyId: companyId
    })
})

// CREATE route
router.post('/', (request, response) => {

    // GRAB the company ID from the parameters
    const companyId = request.params.companyId

    // GRAB the new snowboard info from the request body
    const newSnowboard = request.body

    // USE the CompanyModel to find the company by ID
    CompanyModel.findById(companyId)
        .then((company) => {
            // THEN once you have found the company from the database
            // PUSH the new snowboard object into the Company's 
            // snowboard array            
            company.snowboards.push(newSnowboard)

            // SAVE the company and return the PROMISE
            return company.save()
        })
        .then((company) => {
            // THEN once the company has been saved, 
            // REDIRECT to the Snowboards index for that company
            response.redirect(`/companies/${companyId}/snowboards`)
        })

})

// EDIT route
router.get('/:snowboardId/edit', (request, response) => {

    // GRAB the company ID from the parameters
    const companyId = request.params.companyId

    // GRAB the snowboard ID from the parameters
    const snowboardId = request.params.snowboardId

    // USE the CompanyModel to find the company by ID
    CompanyModel.findById(companyId)
        .then((company) => {
            // THEN once the company has been returned,
            // FIND the snowboard by ID that you want to edit
            const snowboard = company.snowboards.id(snowboardId)

            // RENDER a form pre-populated with that snowboard info,
            // ALSO passing the companyId to use for the form's ACTION
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

    // GRAB the company ID from the parameters
    const companyId = request.params.companyId

    // GRAB the snowboard ID from the parameters
    const snowboardId = request.params.snowboardId

    // GRAB the updated snowboard object from the request body
    const updatedSnowboard = request.body

    // USE the CompanyModel to find the company by ID
    CompanyModel.findById(companyId)
        .then((company) => {
            // THEN once the company has been returned,
            // FIND the snowboard by ID from the company's snowboards
            const snowboard = company.snowboards.id(snowboardId)

            // MAP each attribute from the updated snowboard object to
            // the same attribute on the original snowboard
            snowboard.name = updatedSnowboard.name
            snowboard.price = updatedSnowboard.price

            // SAVE the updated company and return the PROMISE
            return company.save()
        })
        .then(() => {
            // THEN once the company has saved, REDIRECT to the 
            // snowboard's SHOW page
            response.redirect(`/companies/${companyId}/snowboards/${snowboardId}`)
        })

})

// SHOW route
router.get('/:snowboardId', (request, response) => {

    // GRAB the company ID from the parameters
    const companyId = request.params.companyId
    
    // GRAB the snowboard ID from the parameters
    const snowboardId = request.params.snowboardId

    // USE the CompanyModel to find the company by ID
    CompanyModel.findById(companyId)
        .then((company) => {
            // THEN once the company has been returned,
            // FIND the snowboard by ID from the company's snowboards
            const snowboard = company.snowboards.id(snowboardId)

            // THEN render the snowboard info using Handlebars
            // and pass the companyId to use in link URLs
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

    // GRAB the company ID from the parameters
    const companyId = request.params.companyId
    
    // GRAB the snowboard ID from the parameters
    const snowboardId = request.params.snowboardId

    // USE the CompanyModel to find the company by ID
    CompanyModel.findById(companyId)
        .then((company) => {
            // THEN once the company has been returned,
            // REMOVE the snowboard from the company's snowboard array
            const snowboard = company.snowboards.id(snowboardId).remove()

            // THEN save the company and return the PROMISE
            return company.save()
        })
        .then(() => {
            // THEN once the company has saved, redirect to the 
            // company's Snowboards INDEX page
            response.redirect(`/companies/${companyId}/snowboards`)
        })
})


module.exports = router