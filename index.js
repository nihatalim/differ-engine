import express from 'express';
import dotenv from 'dotenv'
import {hasDifference} from "./diff.js";
import {fetchParallelWithRetry} from "./differ.js";

dotenv.config();

const app = express()
app.use(express.json())

app.get('/favicon.ico', (req, res) => res.status(204));

app.post('/differ/execute', async (req, res) => {
    console.log("/differ/execute called, simply return an has difference as true...")

    var hasDiff = false;

    fetchParallelWithRetry(req.body).then(({ leftResponse, rightResponse }) => {
        hasDiff = hasDifference(leftResponse, rightResponse)

        res.send({
            hasDiff: hasDiff
        })
    })
    .catch(error => {
        console.error('Error:', error);
        res.sendStatus(500);
    });
})


app.get('*', function (req, res) {
    res.send('what???', 404);
});

app.listen(process.env.PORT, () => {
    console.log(`Differ tool is started on port: ${process.env.PORT}`)
})