import * as dotenv from 'dotenv'
dotenv.config()
import expres from 'express'
import { FindOptions, MongoClient, ServerApiVersion } from 'mongodb'
import getConfigFromEnv from './Configuration'
import { DatabaseContent } from './Models/Content'
import { sanitizeDbContentField } from './util/santizieDbContentField'
import cors from 'cors'
const config = getConfigFromEnv()

const app = expres()
app.use(cors)

const client = new MongoClient(config.ConnectionString, { serverApi: ServerApiVersion.v1 });

const Collections = {
    Content: 'content'
} as const

/**
 * @brief The endpoint gets a specific document by its id.
 * @response 200 ok: The item was found, sending as json response
 * @response 404 not found: The item could not be found.
 */
app.get('/content/get/:id', async (req, res) => {
    const id = req.params.id
    const getResult = () => client
        .db(config.UsedDb)
        .collection<DatabaseContent>(Collections.Content)
        .findOne<DatabaseContent>({ id: id })

    let dbContent: DatabaseContent | null = null

    dbContent = await getResult()

    if (dbContent === null) {
        res.status(404).json({ err: `Couldnt find document with id ${id}` })
        return;
    }

    return res.json(sanitizeDbContentField(dbContent))
})


/**
 * @brief The query returns the first 50 elements in the database.
 */
app.get('/content/query', async (req, res) => {
    const getResult = () => {
        const findOptions: FindOptions<DatabaseContent> = { projection: { id: 1, _id: 0 } }
        return client.db(config.UsedDb)
        .collection<DatabaseContent>(Collections.Content)
        .find<string[]>({}, findOptions)
        .limit(50)
    }

    const result = await getResult().toArray()

    res.json(result)
})


app.listen(3000, () => {
    console.log('Server started o 3000')
})
