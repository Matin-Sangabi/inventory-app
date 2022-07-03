import Storage from "./storage.js";

const productsTitle = document.querySelector(".product-title");
const productsQuantity = document.querySelector(".product-quantity");
const productsCategory = document.querySelector(".product-category");
const AddNewProducts = document.querySelector(".add-new-products");
const productsList = document.querySelector(".products-list");
const editProduct = document.querySelector(".edit-product");
const searchProduct = document.querySelector(".product-search");
const productSort = document.querySelector(".product-sort");
export default class Products {
  constructor() {
    AddNewProducts.addEventListener("click", () => this.AddProduct());
    this.getAllProducts = Storage.getAllProducts();
    this.createProductsList(this.getAllProducts);
    this.searchAllProducts(this.getAllProducts);
    this.sortAllProducts();
  }

  AddProduct() {
    const title = productsTitle.value;
    const quantity = productsQuantity.value;
    const selection = productsCategory.value;

    if (!title || !quantity || !selection) return;

    Storage.saveProducts({ title, quantity, selection });
    this.createProductsList(Storage.getAllProducts());
    productsTitle.value = "";
    productsQuantity.value = "";
  }

  createProductsList(products) {
    let options = {
      year: "numeric",
      month: "long",
      weekday: "long",
      day: "numeric",
    };
    productsList.innerHTML = "";
    products.forEach((product) => {
      const div = document.createElement("div");
      div.className = "product flex items-center rounded-md p-2";
      div.dataset.id = product.id;
      div.innerHTML = `
            <span class="flex-1">${product.title}</span>
            <div class="flex items-center gap-x-2">
                <span class="date text-slate-300">${new Date(
                  product.updated
                ).toLocaleDateString("fa-IR", options)}</span>
                <span class="border border-slate-600 text-slate-600 p-1 rounded-md">${
                  product.selection
                }</span>
                <span class="w-8 h-8 rounded-full bg-slate-600 flex justify-center items-center">${
                  product.quantity
                }</span>
                <span data-id="${
                  product.id
                }" class="delete text-rose-700 border rounded-lg border-rose-700 p-1 cursor-pointer">Delete</span>
            </div>`;
      productsList.appendChild(div);
    });
    this.deleteProducts();
    this.selcetProducts();
  }
  deleteProducts() {
    const deleteProducts = document.querySelectorAll(".delete");

    deleteProducts.forEach((del) => {
      del.addEventListener("click", (e) => {
        Storage.deleteProducts(e.target.dataset.id);
        this.createProductsList(Storage.getAllProducts());
      });
    });
  }

  selcetProducts() {
    const selectProducts = document.querySelectorAll(".product");
    selectProducts.forEach((item) => {
      item.addEventListener("click", () =>
        this._updateSelectProduct(item.dataset.id)
      );
    });
  }

  _updateSelectProduct(id) {
    const select = Storage.getAllProducts().find((p) => p.id == id);
    this.updateActiveSelect(select);
    if (select) {
      productsTitle.value = select.title;
      productsQuantity.value = select.quantity;
      productsCategory.value = select.selection;
      AddNewProducts.className ="text-slate-500 bg-slate-700 border-slate-500 border p-2 rounded-md";
      AddNewProducts.disabled = true;
      editProduct.classList.remove("hidden");
      editProduct.addEventListener("click" , ()=> this.editAllProducts(id));
    }
  }

  updateActiveSelect(product) {
    document.querySelectorAll(".product").forEach(item=>{
      item.classList.remove("bg-slate-800");
    });
    document.querySelector(`.product[data-id="${product.id}"]`).classList.add("bg-slate-800");
  }

  editAllProducts(id){
    const title = productsTitle.value;
    const quantity = productsQuantity.value;
    const selection = productsCategory.value;

    if(!title || !quantity || !selection) return;

    Storage.saveProducts({id , title , quantity , selection});
    this.createProductsList(Storage.getAllProducts());

    productsTitle.value = "";
    productsQuantity.value = "";
    
     editProduct.classList.add("hidden");
     AddNewProducts.disabled = false;
     AddNewProducts.className =
       "add-new-products border-none bg-slate-500   outline-none  rounded-md p-2 hover:border-none hover:outline-none hover:ring  hover:ring-offset-2 hover:ring-slate-500";   
  }

  searchAllProducts(products){
    let filter = {
      searchITem: "",
    };
    searchProduct.addEventListener("input" , (e)=>{
      filter.searchITem = e.target.value;
      this._updateSearchProducts(products , filter);
    });
  }

  _updateSearchProducts(products , filter){
    const search = products.filter((p) => {
      return p.title.toLowerCase().includes(filter.searchITem.toLowerCase());
    });
    console.log(search)
    this.createProductsList(search);
  }
  sortAllProducts(){
    productSort.addEventListener("change" , (e)=>{
      this.createProductsList(Storage.getAllProducts(e.target.value));
    });
  }
}
