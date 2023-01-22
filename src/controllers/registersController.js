import db from '../db/db.js';

async function insertRegister(req, res){

    const token = req.headers.authorization?.replace('Bearer ', '');

    console.log(token)

    const { description, value, mode } = req.body;


    if(!token){
        return res.sendStatus(400);
    }


    try{

        const session = await db.collection('sessions').findOne({
            sessionToken: token
        });

        if(!session){
            return res.sendStatus(401);
        }

        db.collection('registers').insertOne({
            description, 
            value, 
            mode,
            userId: session.userId
        })

        return res.sendStatus(201);

    } catch(err) {
        
        console.log(err);
        return res.sendStatus(500);

    }


}

export { insertRegister }