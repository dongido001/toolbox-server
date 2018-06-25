import CategoryController from './Controllers/CategoryController';

const categoryRoutes = [
    {
        method: 'GET',
        path: '/categories',
        handler: CategoryController.index
    },
    {
        method: 'POST',
        path: '/categories',
        handler: CategoryController.create
    },
    {
        method: 'GET',
        path: '/categories/{id}/delete',
        handler: CategoryController.delete
    },
    {
        method: 'POST',
        path: '/categories/{id}/update',
        handler: CategoryController.update
    },
]

export default [].concat(
    categoryRoutes,
);