import db from '../db/db.js';

async function insertRegister(req, res){

    const { description, value, mode } = req.body;

    //Get the sessions from locals (from authMiddleware)
    const { session } = res.locals;
    
    try{
        //insert in the DB
        db.collection('registers').insertOne({
            description, 
            value: Number(value), 
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

async function listRegisters(req, res){

    //Get the user from locals (from authMiddleware)
    const { user } = res.locals;

    try{
        //Find all registers from that user
        const userRegisters = await db.collection('registers').find({
            userId: user._id
        }).toArray();
        return res.send(userRegisters);

    } catch(err) {

        console.log(err);
        //STATUS_CODE: BAD_REQUEST
        return res.sendStatus(400);

    }
}

export { insertRegister, listRegisters }