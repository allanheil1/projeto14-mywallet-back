import db from '../db/db.js';

async function authMiddleware(req, res, next){

    const token = req.headers.authorization?.replace('Bearer ', '');

    //If we do not find any session with this token, return bad request
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

        //Find the user
        const user = await db.collection('users').findOne({
            _id: session.userId
        })

        console.log(session);
        console.log(user);

        //the controller needs to know the session and the user
        res.locals.user = user;
        res.locals.session = session;
        next();

    } catch(err) {
        
        console.log(err);
        //STATUS_CODE: SERVER_ERROR
        return res.sendStatus(500);

    }
}

export { authMiddleware };