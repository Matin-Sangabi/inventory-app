export default class Storage {
  static getAllCategory() {
    const getCategories = JSON.parse(localStorage.getItem("category")) || [];
    return getCategories.sort((a, b) => {
      return new Date(a.updated) > new Date(b.updated) ? -1 : 1;
    });
  }

  static saveCategories(CategoryToSave) {
    const categories = Storage.getAllCategory();
    const existed = categories.find((c) => c.id == CategoryToSave.id);

    if (existed) {
      existed.title = CategoryToSave.title;
      existed.description = CategoryToSave.description;
      existed.updated = new Date().toISOString();
    } else {
      CategoryToSave.id = new Date().getTime();
      CategoryToSave.updated = new Date().toISOString();
      categories.push(CategoryToSave);
    }
    localStorage.setItem("category" , JSON.stringify(categories));
  }

  static getAllProducts(sort = "newest"){
    const getProducts = JSON.parse(localStorage.getItem("products")) || [];
    return getProducts.sort((a, b) => {
      if(sort == "newest"){
        return new Date(a.updated) > new Date(b.updated) ? -1 : 1;
      }
      else if(sort == "oldest"){
        return new Date(a.updated) > new Date(b.updated) ? 1 : -1;
      }
    });
  }

  static saveProducts(productToSave) {
    const products = Storage.getAllProducts();
    const existed = products.find((p) => p.id == productToSave.id);

    if (existed) {
      existed.title = productToSave.title;
      existed.quantity = productToSave.quantity;
      existed.selection = productToSave.selection;
      existed.updated = new Date().toISOString();
    } else {
      productToSave.id = new Date().getTime();
      productToSave.updated = new Date().toISOString();
      products.push(productToSave);
    }
    localStorage.setItem("products" , JSON.stringify(products));
  }

  static deleteProducts(id){
    const del = Storage.getAllProducts();
    const filter = del.filter(p => p.id != id);
    localStorage.setItem("products" , JSON.stringify(filter));
  }
}
