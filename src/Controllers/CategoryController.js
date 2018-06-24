import Category from '../Models/Category';

class CategoryController {

    index(request, h) {
      return Category.fetchAll();
    }

    create(request, h) {
      return ""
    }

    remove(request, h) {
      return ""
    }

    update(request, h) {
      return ""
    }
}

export default (new CategoryController);