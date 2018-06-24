import CategoryController from './Controllers/CategoryController';

const categoryRoutes = [
    {
        // fetch all category...
        method: 'GET',
        path: '/categories',
        handler: CategoryController.index
    },
]

export default categoryRoutes;