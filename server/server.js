const express = require("express");
const cors = require("cors")
const bodyParser = require('body-parser');
const app = express();
const {
    getPolls, 
    getPollById, 
    getOptionsByPollId, 
    createPoll,
    createOption,
    updateOptionScore,
    deletePoll,
    deleteOption,
    getOptionById,
} = require("./crud");

app.use(express.urlencoded({ extended: true}));
app.use(bodyParser.json());

app.use(cors({
    origin: '*'  // dev only
}));

app.get("/polls", async (req, res) => {
    const result = await getPolls(parseInt(req.query.page));
    res.send(result);
});

app.get("/polls/:id", async (req, res) => {
    const result = await getPollById(req.params.id);
    res.send(result);
});

app.post("/polls", async (req, res) => {
    const object = {title: req.body.title, start: req.body.start, end: req.body.end}
    const newPoll = await createPoll(object);
    res.send({id: newPoll});
});

app.post("/polls/:id", async (req, res) => {
    await deletePoll(req.params.id)
});

app.get("/option/:id", async (req, res) => {
    const result = await getOptionById(req.params.id);
    res.send(result);
});

app.get("/options/:id", async (req, res) => {
    const result = await getOptionsByPollId(req.params.id);
    res.send(result);
});

app.post("/options", async (req, res) => {
    let object = {label: req.body.label, score: 0, pollid: req.body.pollId};
    await createOption(object);
});

app.put("/options/:id", async (req, res) => {
    const poll = await getPollById(req.body.pollId)
    const result = await updateOptionScore(req.params.id, poll);
    res.send(result);
});

app.post("/options/:id", async (req, res) => {
    await deleteOption(req.params.id);
});

app.listen(3001, () => console.log("Server started!"))
