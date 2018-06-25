import CategoryController from './Controllers/CategoryController';
import LinkController from './Controllers/LinkController';

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

const linkRoutes = [
    {
        method: 'GET',
        path: '/links',
        handler: LinkController.index
    },
    {
        method: 'POST',
        path: '/links',
        handler: LinkController.create
    },
    {
        method: 'GET',
        path: '/links/{id}/delete',
        handler: LinkController.delete
    },
    {
        method: 'POST',
        path: '/links/{id}/update',
        handler: LinkController.update
    },
]

export default [].concat(
    categoryRoutes,
    linkRoutes
);