const express = require("express");
const { fetchToDo, publishToDo, deleteToDo, editToDo, putToDo } = require("../controllers/doController");
const router = express.Router();

router.get('/fetchtodo', fetchToDo)
router.post('/publishtodo', publishToDo)
router.delete('/deletetodo/:id', deleteToDo)
router.put('/puttodo/:id', putToDo)

module.exports = router;
