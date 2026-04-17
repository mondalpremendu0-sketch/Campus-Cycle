const  express = require('express')
const { registerController, loginController, profileController, logoutController } = require('../controllers/user.controller');
const authMiddleware = require('../middlewares/auth.middleware');





const router = express.Router()



router.get("/",(req,res)=>{
    res.send("User route is working fine")
})

router.post("/register",registerController);
router.post("/login",loginController);
router.get("/profile",authMiddleware,profileController);
router.get("/logout",authMiddleware,logoutController);


module.exports = router