// * Get references to HTML elements
const productNameInput = document.getElementById("product-name");
const productPriceInput = document.getElementById("product-price");
const productCategoryInput = document.getElementById("product-category");
const productDescInput = document.getElementById("product-desc");
const addProductButton = document.getElementById("bt-add");
const inputCon = document.getElementById("input-con");
const btnUpdate = document.getElementById("btn-update");
//----------------------------------------------------------------
// * Variables for access index of the element to update  and product list
let temp;
let productList = [];
//----------------------------------------------------------------
// * Check if product list exists in local storage and load it
if (localStorage.getItem("productList") != null) {
  productList = JSON.parse(localStorage.getItem("productList"));
  displayProduct();
}
//----------------------------------------------------------------

//* Function to add a product to the list  //* step C create
function addProduct() {
  if (
    !productNameInput.value ||
    !productPriceInput.value ||
    !productCategoryInput.value ||
    !productDescInput.value
  ) {
    alert("Write valid values for the product");
  } else {
    // Validate input before adding
    if (validate() == true) {
      let product = {
        id: productList.length + 1,
        Name: productNameInput.value,
        price: Number(productPriceInput.value),
        category: productCategoryInput.value,
        description: productDescInput.value,
      };
      productList.push(product);
      clearForm();
      displayProduct();
      localStorage.setItem("productList", JSON.stringify(productList));
    } else {
      alert("Enter a capital character");
    }
  }
}
//----------------------------------------------------------------
//* Function to display products in the table //* step R read
function displayProduct() {
  let cartona = "";
  for (let i = 0; i < productList.length; i++) {
    cartona += ` <tr>
        <td>${[i + 1]}</td>
        <td>${productList[i].Name}</td>
        <td>${productList[i].price}</td>
        <td>${productList[i].category}</td>
        <td>${productList[i].description}</td>
        <td>
          <button onclick="deleteProduct(${i})" class="btn btn-danger">Delete</button>
        </td>
        <td>
          <button onclick="updateProduct(${i})" class="btn btn-warning">Update</button>
        </td>
      </tr>`;
  }
  document.getElementById("myTable").innerHTML = cartona;
}
//----------------------------------------------------------------

// * Function to update a product //* step U update
function updateProduct(index) {
  productNameInput.value = productList[index].Name;
  productPriceInput.value = productList[index].price;
  productCategoryInput.value = productList[index].category;
  productDescInput.value = productList[index].description;
  temp = index;
  displayBlock("btn-update");
  displayNone("bt-add");
}
//----------------------------------------------------------------

// * Function to apply updates to a product
function updated() {
  productList[temp].Name = productNameInput.value;
  productList[temp].price = productPriceInput.value;
  productList[temp].category = productCategoryInput.value;
  productList[temp].description = productDescInput.value;
  localStorage.setItem("productList", JSON.stringify(productList));
  displayProduct();
  displayNone("btn-update");
  displayBlock("bt-add");
  clearForm();
}
//----------------------------------------------------------------

//* Function to delete a product //* step D delete
function deleteProduct(index) {
  productList.splice(index, 1);
  localStorage.setItem("productList", JSON.stringify(productList));
  displayProduct();
}
//----------------------------------------------------------------

// *Function to search for a product by name //* step S search
function searchElement(term) {
  let cartona = "";
  for (let i = 0; i < productList.length; i++) {
    if (
      productList[i].Name.toLowerCase().includes(term.toLocaleLowerCase()) ==
      true
    ) {
      cartona += ` <tr>
          <td>${productList[i].Name}</td>
          <td>${productList[i].price}</td>
          <td>${productList[i].category}</td>
          <td>${productList[i].description}</td>
          <td>
            <button onclick="deleteProduct(${i})" class="btn btn-danger">Delete</button>
          </td>
          <td>
            <button class="btn btn-warning">Update</button>
          </td>
        </tr>`;
      document.getElementById("myTable").innerHTML = cartona;
    }
  }
}
//----------------------------------------------------------------
//----------------------------------------------------------------
//----------------------------------------------------------------
//----------------------------------------------------------------

// *Function to clear the form inputs
function clearForm() {
  productNameInput.value = "";
  productPriceInput.value = "";
  productCategoryInput.value = "";
  productDescInput.value = "";
}

// *Function to validate product name
function validate() {
  const regex = /^[A-Z][a-z]{3,7}$/;
  return regex.test(productNameInput.value);
}

// *Function to set display property to 'block'
function displayBlock(id) {
  document.getElementById(`${id}`).style.display = "block";
}

// *Function to set display property to 'none'
function displayNone(id) {
  document.getElementById(`${id}`).style.display = "none";
}
