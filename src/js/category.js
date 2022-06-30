import Storage from "./storage.js";
const categoryParent = document.querySelector(".category")
const categoryTitle = document.querySelector(".cat-title");
const categoryDescription = document.querySelector(".cat-description");
const addCategory = document.querySelector(".add-category");
const newCategory = document.querySelector(".add-new-category");


export default class Category {
    constructor(){
        newCategory.addEventListener("click" , ()=>this.openCategory());
        addCategory.addEventListener("click" , (e)=> this.addNewCategory(e));
    }
    openCategory(){
        categoryParent.classList.remove("hidden");
    }
    addNewCategory(e){
        if(! categoryTitle.value && ! categoryDescription.value) return;
        const saveCategory = {
            title : categoryTitle.value,
            description : categoryDescription.value,
        }
        Storage.saveCategories(saveCategory);
        categoryTitle.value = "";
        categoryDescription.value = "";
        this.closeCategory();
    }
    closeCategory(){
        categoryParent.classList.add("hidden");
    }
}