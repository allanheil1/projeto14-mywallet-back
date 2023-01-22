import db from '../db/db.js';

async function authMiddleware(req, res, next){

    const token = req.headers.authorization?.replace('Bearer ', '');

    if(!token){
        //STATUS_CODE: BAD_REQUEST
        return res.sendStatus(400);
    }

    try{
        //Check if session exists
        const session = await db.collection('sessions').findOne({
            sessionToken: token
        });

        if(!session){
            //STATUS_CODE: UNAUTHORIZED
            return res.sendStatus(401);
        }

        //the controller needs to know the session
        res.locals.session = session;

        next();

    } catch(err) {
        
        console.log(err);
        //STATUS_CODE: SERVER_ERROR
        return res.sendStatus(500);

    }
}

export { authMiddleware };