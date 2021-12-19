const Product = require('../models/product')

const getAllProducts = async (req, res) => {
    const { featured, company, name, sort, fields, numbericFilters } = req.query
    const queryObj = {}
    let sortQuery = ''
    let fieldQuery = ''
    if (featured) {
        queryObj.featured = featured === 'true' ? true : false
    }
    if (company) {
        queryObj.company = company
    }
    if (name) {
        //queryObj.name = new RegExp(`${name}`,'i')
        queryObj.name = { $regex: name, $options: 'i' }
    }
    if (sort) {
        sortQuery = sort.replace(/,/g, ' ')
    }
    if (fields) {
        fieldQuery = fields.replace(/,/g, ' ')
    }
    if (numbericFilters) {
        let operator = new Map([
            ['>', '$gt'],
            ['>=', '$gte'],
            ['=', '$eq'],
            ['<', '$lt'],
            ['<=', '$lte'],
        ])
        let regex = /(<|<=|=|>|>=)/g
        let filters = numbericFilters.replace(regex, (match) => `#${operator.get(match)}#`)
        console.log(filters);
        const options = ['price', 'rating']
        filters.split(',').forEach(element => {
            const [ field, operator, value ] = element.split('#')
            if (options.includes(field)) {
                queryObj[field] = { ...queryObj[field],[operator]: Number(value) }
            }
        });
    }
    console.log(queryObj);
    const page = Number(req.query.page) || 1
    const limit = Number(req.query.limit) || 10
    const skip = (page - 1) * limit
    console.log(queryObj, sortQuery, fieldQuery);
    const products = await Product.find(queryObj).sort(sortQuery).select(fieldQuery).skip(skip).limit(limit)
    res.status(200).json({ products, nbHits: products.length })
}

module.exports = { getAllProducts }