'use strict';

import Link from '../Models/Link';
import User from '../Models/User';
import validate from '../Helpers/auth';
import Bcrypt from 'bcrypt';
import JWT from 'jsonwebtoken';

class AuthController {

    /**
     * 
     * @param {*} request 
     * @param {*} h 
     * @returns json
     */
    async login(request, h) {
      const {email, password} = request.query;
      
      if (!email || !password) {
        const response = {
            status: 'error',
            message: 'Email and password is required'
        }
     
        return h.response(response).code(401);
      }

      let user = await User
                        .query({where: {email}})
                        .fetch()

    if (!user) {
        const response = {
            status: 'error',
            message: 'Invalid email or password'
        }
    
        return h.response(response).code(401);
     } else {
        user = user.toJSON()
        const isValid = await Bcrypt.compare(password, user.password);
       
        if (!isValid) {
            const response = {
                status: 'error',
                message: 'Invalid email or password'
            }

            return h.response(response).code(401);
        }
    }

    // save token
    var token = await JWT.sign({
            data: { email: email }
        }, process.env.KEY, { expiresIn: '1m' });
    
       try {
            await new User({id: user.id, token})
            .save();
        } catch (error) {}

      const response = {
        status: 'success',
        token: token
      }

      return h.response(response).code(200);
    }

    /**
     * 
     * @param {*} request 
     * @param {*} h 
     * @returns json
     */
    async register(request, h) {
        const {username, password, email, name} = request.payload;

        /** @todo : check for username and email seperately */
        const user = User
            .query({where: {username: username}, orWhere: {email: email}})
            .get()
        
        if (user) {
            const response = {
                status: 'error',
                message: 'User with that details already exists'
            }
        
            return h.response(response).code(401);
        } 
        
        const hash_password = await Bcrypt.hash(password, 10);
          
        const new_user = new User({
            username: username,
            password: hash_password,
            email: email,
            name: name
        });
        await new_user.save();

        const response = {
            status: 'success',
            message: 'User created successfully'
        }

        return h.response(response).code(201);
    }
}

export default (new AuthController);