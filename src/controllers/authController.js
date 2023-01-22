import bcrypt from 'bcrypt';
import joi from 'joi';
import { v4 as uuid } from 'uuid';
import db from '../db/db.js';
import { signInSchema, signUpSchema } from '../schemas/authenticationSchemas.js';

async function signUp (req, res) {

    const { name, email, password } = req.body;

    const validateSchema = signUpSchema.validate({ name, email, password });

    if(validateSchema.error){
        //STATUS_CODE: BAD_REQUEST
        return res.sendStatus(400);
    }

    const cryptedPassword = bcrypt.hashSync(password, 10);

    try{
        //insert in the DB
        db.collection('users').insertOne({ 
            name: name,
            email: email,
            password: cryptedPassword
         });
        //STATUS_CODE: CREATED
        return res.sendStatus(201);
        
    } catch (err) {
        console.log(err);
        //STATUS_CODE: SERVER_ERROR
        return res.sendStatus(500);
    }

}

async function signIn (req, res) {

    const { email, password } = req.body;

    const validateSchema = signInSchema.validate({ email, password });

    if(validateSchema.error){
        //STATUS_CODE: BAD_REQUEST
        return res.sendStatus(400);
    }

    try{
        //Find if user exists
        const user = await db.collection('users').findOne({
            email: email
        });

        if(!user){
            //STATUS_CODE: UNAUTHORIZED
            return res.sendStatus(401);  
        }

        //Check if password is correct
        const isPasswordCorrect = bcrypt.compareSync(password, user.password);

        if(!isPasswordCorrect){
            //STATUS_CODE: UNAUTHORIZED
            return res.sendStatus(401);
        }

        //Create session token
        const sessionToken = uuid();

        //Create session for user in the db
        db.collection('sessions').insertOne({ 
            userId: user._id,
            sessionToken: sessionToken
         });

        //Return the session token
        return res.send(sessionToken);
        
    } catch (err) {
        console.log(err);
        //STATUS_CODE: SERVER_ERROR
        return res.sendStatus(500);
    }

}

export { signUp, signIn };