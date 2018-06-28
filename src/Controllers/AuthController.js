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
        const hash = await Bcrypt.hash(password, process.env.KEY);

        const user = User
            .query({where: {username: username}, orWhere: {email: email}})
            .where('password', hash)
            .fetch()

        const links = await Link.fetchAll();
  
        const response = {
          status: 'success',
          data: links
        }
  
        return h.response(response).code(200);
      }
}

export default (new AuthController);