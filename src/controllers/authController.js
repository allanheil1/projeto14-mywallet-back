

import mongo from './db/db.js';

async function signUp (req, res) {

    const { name, email, password } = req.body;



    try{

        mongo.collection('users').insertOne({ name, email, password });

        return res.sendStatus(201);
        
    } catch (err) {
        console.log(err);
        console.log('error!!!!');
        return res.sendStatus(500);
    }

}

export { signUp };