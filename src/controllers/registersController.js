import STATUS_CODE from "../enums/status.js";
import db from '../db/db.js';

async function insertRegister(req, res){

    const token = req.headers.authorization?.replace('Bearer ', '');

    const { description, value, mode } = req.body;


    if(!token){
        return res.sendStatus(STATUS_CODE.BADREQUEST);
    }


    try{

        const session = await db.collection('sessions').findOne({
            token: token
        });

        if(!session){
            return res.sendStatus(STATUS_CODE.UNAUTHORIZED);
        }

        db.collection('registers').insertOne({
            description, 
            value, 
            mode,
            userId: session.userId
        })

        return res.sendStatus(STATUS_CODE.CREATED);

    } catch(err) {
        
        console.log(err);
        return res.sendStatus(STATUS_CODE.SERVERERROR);

    }


}

export { insertRegister }