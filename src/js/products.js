import Storage from "./storage.js";

const productsTitle = document.querySelector(".product-title");
const productsQuantity = document.querySelector(".product-quantity");
const productsCategory = document.querySelector(".product-category");
const AddNewProducts = document.querySelector(".add-new-products");
const productsList = document.querySelector(".products-list");

export default class Products {
    constructor(){
        AddNewProducts.addEventListener("click" , (e)=> this.AddProduct(e));
        this.createProductsList(Storage.getAllProducts());
    }

    AddProduct(e){
        e.preventDefault();
        const title = productsTitle.value;
        const quantity = productsQuantity.value;
        const selection = productsCategory.value;
        if(!title || !quantity || !selection) return;
        Storage.saveProducts({title , quantity , selection});
        this.createProductsList(Storage.getAllProducts());
        productsTitle.value = "";
        productsQuantity.value = "";
    }

    createProductsList(products){
        productsList.innerHTML = "";
        products.forEach(product => {
            const div = document.createElement("div");
            div.className = "flex items-center";
            div.innerHTML = `
            <span class="flex-1">${product.title}</span>
            <div class="flex items-center gap-x-2">
                <span class="date text-slate-300">${new Date(product.updated).toLocaleDateString("fa-IR")}</span>
                <span class="border border-slate-600 text-slate-600 p-1 rounded-md">${product.selection}</span>
                <span class="w-8 h-8 rounded-full bg-slate-600 flex justify-center items-center">${product.quantity}</span>
                <span data-id="${product.id}" class="delete text-rose-700 border rounded-lg border-rose-700 p-1 cursor-pointer">Delete</span>
            </div>`;
            productsList.appendChild(div);
        });
        this.deleteProducts();
    }
    deleteProducts(){
        const deleteProducts = document.querySelectorAll(".delete")
            
        deleteProducts.forEach(del => {
            del.addEventListener("click" , (e)=>{
                Storage.deleteProducts(e.target.dataset.id);
                this.createProductsList(Storage.getAllProducts());
            });
        });
    }
}