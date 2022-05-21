const userAdmin = true;
const validateAdmin = (req,res,next) =>{
    if(userAdmin){
        next()
    }else{
        res.send("No tiene permisos para ejecutar la operación") 
    };
}

export const checkUserPrivileges = (req,res,next)=>{
    switch (req.method) {
        case "GET":
            next();
            break;

        case "POST":
            validateAdmin(req,res,next);
            break;

        case "PUT":
            validateAdmin(req,res,next);
            break;

        case "DELETE":
            validateAdmin(req,res,next);
            break;
        
        default:
            res.send("No tiene permisos para ejecutar la operación");
            break;
    }
}

