import bcrypt from 'bcrypt';
import joi from 'joi';
import { v4 as uuid } from 'uuid';
import db from '../db/db.js';
import { signInSchema, signUpSchema } from '../schemas/authenticationSchemas.js';

async function signUp (req, res) {

    const { name, email, password } = req.body;

    const validateSchema = signUpSchema.validate({ name, email, password });

    if(validateSchema.error){
        //bad request
        return res.sendStatus(400);
    }

    const cryptedPassword = bcrypt.hashSync(password, 10);

    try{

        db.collection('users').insertOne({ 
            name: name,
            email: email,
            password: cryptedPassword
         });

        return res.sendStatus(201);
        
    } catch (err) {
        console.log(err);
        return res.sendStatus(500);
    }

}

async function signIn (req, res) {

    const { email, password } = req.body;

    const validateSchema = signInSchema.validate({ email, password });

    if(validateSchema.error){
        //bad request
        return res.sendStatus(400);
    }

    //encrypt password
    const cryptedPassword = bcrypt.hashSync(password, 10);

    try{
        //find if user exists
        const user = await db.collection('users').findOne({
            email: email
        });

        //check if password is correct
        const isPasswordCorrect = bcrypt.compareSync(password, user.password);

        //if user does not exist or password is incorrect
        if(!user || !isPasswordCorrect){
            return res.sendStatus(401);
        }

        //create session token
        const sessionToken = uuid();

        //create session for user in the db
        db.collection('sessions').insertOne({ 
            userId: user._id,
            sessionToken: sessionToken
         });

        //return the session token
        return res.send(sessionToken);
        
    } catch (err) {
        console.log(err);
        return res.sendStatus(500);
    }

}

export { signUp, signIn };