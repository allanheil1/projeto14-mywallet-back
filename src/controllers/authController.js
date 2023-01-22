import bcrypt from 'bcrypt';
import joi from 'joi';
import { v4 as uuid } from 'uuid';
import STATUS_CODE from '../enums/status.js';
import mongo from '../db/db.js';
import { signInSchema, signUpSchema } from '../schemas/authenticationSchemas.js';

async function signUp (req, res) {

    const { name, email, password } = req.body;

    const validateSchema = signUpSchema.validate({ name, email, password });

    if(validateSchema.error){
        //bad request
        return res.sendStatus(STATUS_CODE.BADREQUEST);
    }

    const cryptedPassword = bcrypt.hashSync(password, 10);

    try{

        mongo.collection('users').insertOne({ 
            name: name,
            email: email,
            password: cryptedPassword
         });

        return res.sendStatus(STATUS_CODE.CREATED);
        
    } catch (err) {
        console.log(err);
        return res.sendStatus(STATUS_CODE.SERVERERROR);
    }

}

async function signIn (req, res) {

    const { email, password } = req.body;

    const validateSchema = signInSchema.validate({ email, password });

    if(validateSchema.error){
        //bad request
        return res.sendStatus(STATUS_CODE.BADREQUEST);
    }

    //encrypt password
    const cryptedPassword = bcrypt.hashSync(password, 10);

    try{
        //find if user exists
        const user = await mongo.collection('users').findOne({
            email: email
        });

        //check if password is correct
        const isPasswordCorrect = bcrypt.compareSync(password, user.password);

        //if user does not exist or password is incorrect
        if(!user || !isPasswordCorrect){
            return res.sendStatus(STATUS_CODE.UNAUTHORIZED);
        }

        //create session token
        const sessionToken = uuid();

        //create session for user in the db
        mongo.collection('sessions').insertOne({ 
            userId: user._id,
            sessionToken: sessionToken
         });

        //return the session token
        return res.send(sessionToken);
        
    } catch (err) {
        console.log(err);
        return res.sendStatus(STATUS_CODE.SERVERERROR);
    }

}

export { signUp, signIn };