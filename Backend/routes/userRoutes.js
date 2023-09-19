const express = require("express");
const router = express.Router();
const {
    showAllUsers,
    showUserID,
    registerUser,
    loginUser,
    currentUser,
    deleteUser,
    editUser
} = require("../controller/userController");
const validateToken = require("../middleware/validateTokenHandler");


router.get('/', showAllUsers);
router.get('/current', validateToken, currentUser);
router.route('/:id').get(showUserID).delete(deleteUser).put(editUser);
router.post('/register', registerUser);
router.post('/login', loginUser);




module.exports = router;