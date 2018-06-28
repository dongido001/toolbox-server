'use strict';

import Category from '../Models/Category';

class CategoryController {

    /**
     * 
     * @param {*} request 
     * @param {*} h 
     * @returns json
     */
    async index(request, h) {
      const categories = await Category.fetchAll();

      const response = {
        status: 'success',
        data: categories
      }

      return h.response(response).code(200);
    }

    /**
     * 
     * @param {*} request 
     * @param {*} h 
     * @returns json
     */
    async create(request, h) {
      const { name } = request.payload;
      const category = new Category({
          name
      });

      await category.save();

      const response = {
        status: 'success',
        message: 'Category created successfully'
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
            await Category.where({id})
              .destroy()
        } catch (error) {}

        const response = {
            status: 'success',
            message: 'Category deleted successfully'
        };

        return h.response(response).code(201);
    }

    /**
     * 
     * @param {*} request 
     * @param {*} h 
     *  @returns json
     * @todo check if the user owns the category they are deleting
     */
    async update(request, h) {
        const { id } = request.params;
        const { name } = request.payload;
        
        try {
            await new Category({id, name})
            .save();
        } catch (error) {}

        const response = {
            status: 'success',
            message: 'Category updated successfully'
        };

        return h.response(response).code(200);
    }
}

export default (new CategoryController);