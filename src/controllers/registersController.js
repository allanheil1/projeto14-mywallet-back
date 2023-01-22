import db from '../db/db.js';

async function insertRegister(req, res){

    const { description, value, mode } = req.body;

    //res.locals passed by authMiddleware
    const { session } = res.locals;
    
    try{

        //insert in the DB
        db.collection('registers').insertOne({
            description, 
            value, 
            mode,
            userId: session.userId,
            date: +new Date()
        })
        //STATUS_CODE: CREATED
        return res.sendStatus(201);

    } catch(err) {
        console.log(err);
        //STATUS_CODE: SERVER_ERROR
        return res.sendStatus(500);

    }
    
}

export { insertRegister }