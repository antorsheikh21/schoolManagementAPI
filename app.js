const express = require('express');
const morgan = require('morgan');
const dotenv = require('dotenv');
dotenv.config()
const app = express();

/**
 * @internalImport 
 */

const defaultError = require('./errors/defaultError')
const notFound = require('./errors/notFound');
const adminRouter = require('./routers/adminRouter')

app.use(express.json())
if (process.env.NODE_ENV === 'development') {
    app.use(morgan('dev'))
}
/**
 * @mainRoute
 */

app.use('/api/admin', adminRouter)







/**
 * @unexpected
 */

app.use(defaultError)
app.use(notFound)

module.exports = app;