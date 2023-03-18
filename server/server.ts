import * as dotenv from 'dotenv'
dotenv.config({ path: './.env' })

import expres from 'express'
import getConfigFromEnv from './Configuration'
import cors from 'cors'
import mongoose from 'mongoose'
import { DatabaseContent } from './Models/Content'
import { ContentDbModel } from './Models/DbModels'
import { sanitizeDbContentField } from './util/santizieDbContentField'
// import mongoose from 'mongoose'
const config = getConfigFromEnv()
const app = expres()
app.use(cors())

/**
 * @brief The endpoint gets a specific document by its id.
 * @response 200 ok: The item was found, sending as json response
 * @response 404 not found: The item could not be found.
 */
app.get('/content/get/:id', async (req, res) => {
    const id = req.params.id
    const getResult = () => ContentDbModel
        .findById(id)
        .lean()

    let dbContent = await getResult()

    if (dbContent === null) {
        return res.status(404).json({ err: `Couldnt find document with id ${id}` })
    }

    res.json(sanitizeDbContentField(dbContent))
})


/**
 * @brief The query returns the first 50 elements in the database.
 * @response 200 OK - An array of ids.
 */
app.get('/content/query', async (req, res) => {
    const getResult = () =>
        ContentDbModel.find({}, '_id')
            .limit(50)
    
    const result = await getResult()
    const idsArray = result.map(doc => doc._id)

    res.json(idsArray)
})

mongoose.connect(config.ConnectionString)
    .then(console.log)
    .catch(console.error)



app.listen(3000, () => {
    console.log(`Server started on ${3000}`)
})