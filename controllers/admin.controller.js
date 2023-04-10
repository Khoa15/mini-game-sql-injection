exports.view_signin = (req, res, next)=>{
    try{
        const data = {
            title: "Control panel"
        }
        res.render("admin/signin", {data})
    }catch(err){
        next(err)
    }
}

exports.signIn = async(req, res, next) =>{
    try{
        const err = new Error("Some problem are occured!")
        if(req.method != "POST"){
            next(err)
            return
        }
        
        const key_privary = req.body["key_private"]
        console.log(req.method)
        if(key_privary != "!@#$%^&*()0"){
            next(err)
            return
        }
        res.json({
            "sts": 1,
            "message": "Sign-in successfully!"
        })
    }catch(err){
        next(err)
    }
}