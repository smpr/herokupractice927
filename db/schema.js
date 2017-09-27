const mongoose = require('mongoose');

// First, we instantiate a namespace for our Schema constructor defined by mongoose.
const Schema = mongoose.Schema;

const SnowboardSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    }
})

const CompanySchema = new Schema({
    name: {
        type: String,
        required: true,
        unique: true
    },
    country: {
        type: String,
        required: true
    },
    snowboards: [SnowboardSchema]
});



const CompanyModel = mongoose.model('Company', CompanySchema)
const SnowboardModel = mongoose.model('Snowboard', SnowboardSchema)

module.exports = {
    CompanyModel: CompanyModel,
    SnowboardModel: SnowboardModel
}