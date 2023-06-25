const express = require("express");
const { users, register, deleteUser, login } = require("../controllers/userController");
const router = express.Router();

router.get('/', users)
router.post('/register', register)
router.post('/login', login)
router.delete('/deleteuser/:id', deleteUser)

module.exports = router;