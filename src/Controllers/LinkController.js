'use strict';

import Link from '../Models/Link';

class LinkController {

    /**
     * 
     * @param {*} request 
     * @param {*} h 
     * @returns json
     */
    async index(request, h) {

      const links = await Link.fetchAll();

      const response = {
        status: 'success',
        data: links
      }

      return h.response(response).code(200);
    }

    /**
     * 
     * @param {*} request 
     * @param {*} h 
     * @returns json
     * @todo check if link already exists
     */
    async create(request, h) {
      const { url } = request.payload;

      const link = new Link({
          url: url,
          link_details: JSON.stringify()
      });

      await link.save();

      const response = {
        status: 'success',
        message: 'Link created successfully'
      };

      return h.response(response).code(201);
    }

    /**
     * 
     * @param {*} request 
     * @param {*} h
     * @returns json
     */
    async delete(request, h) {
        const { id } = request.params;

        try {
            await Link.where({id})
              .destroy()
        } catch (error) {}

        const response = {
            status: 'success',
            message: 'Link deleted successfully'
        };

        return h.response(response).code(201);
    }

    /**
     * 
     * @param {*} request 
     * @param {*} h 
     *  @returns json
     * @todo check if the user owns this resource
     */
    async update(request, h) {
        const { id } = request.params;
        const { url } = request.payload;
        
        try {
            await new Link({id, url})
              .save();
        } catch (error) { console.log(error)}

        const response = {
            status: 'success',
            message: 'Link updated successfully'
        };

        return h.response(response).code(200);
    }
}

export default (new LinkController);