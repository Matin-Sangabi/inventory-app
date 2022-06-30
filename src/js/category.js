import Storage from "./storage.js";
const categoryParent = document.querySelector(".category")

export default class Category {
    constructor(){
        this.createCategory();  
    }
    createCategory(){
        const categoryDiv = document.createElement("div");
        categoryDiv.className = "flex flex-col gap-y-4 bg-slate-700 rounded-lg p-2";
        categoryDiv.innerHTML = `
        <div class="category-title flex flex-col gap-y-2 w-1/2">
            <span>Title</span>
            <input type="text" placeholder="Title" class="cat-title form-input bg-transparent rounded-md ">
        </div>
        <div class="category-description flex flex-col gap-y-2">
            <span>Description</span>
            <textarea class="cat-description form-textarea bg-transparent rounded-md resize-none" placeholder="Description ..."></textarea>
        </div>
        <button type="button" class="add-category bg-slate-500 border-none outline-none  rounded-md p-2 hover:border-none hover:outline-none hover:ring  hover:ring-offset-2 hover:ring-slate-500">Add new Category</button>`;
        categoryParent.appendChild(categoryDiv);
        
         this.categoryTitle = document.querySelector(".cat-title");
        this.categoryDescription = document.querySelector(".cat-description");
        const addCategory = document.querySelector(".add-category");
        const newCategory = document.querySelector(".add-new-category");
        newCategory.addEventListener("click" , ()=>this.openCategory());
        addCategory.addEventListener("click" , (e)=> this.addNewCategory(e));
    }
    openCategory(){
        categoryParent.classList.remove("hidden");
    }
    addNewCategory(e){
        if(! this.categoryTitle.value && ! this.categoryDescription.value) return;
        const saveCategory = {
            title : this.categoryTitle.value,
            description : this.categoryDescription.value,
        }
        Storage.saveCategories(saveCategory);
        this.categoryTitle.value = "";
        this.categoryDescription.value = "";
        this.closeCategory();
    }
    closeCategory(){
        categoryParent.classList.add("hidden");
    }
}