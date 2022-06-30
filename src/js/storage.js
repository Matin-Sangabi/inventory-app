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
}
