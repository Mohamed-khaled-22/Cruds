// targets elements
const title = document.querySelector(".inputs .title");
const price = document.querySelector(".inputs .price");
const taxes = document.querySelector(".inputs .taxes");
const ads = document.querySelector(".inputs .ads");
const discount = document.querySelector(".inputs .discount");
const total = document.querySelector(".inputs .total");
const count = document.querySelector(".inputs .count");
const category = document.querySelector(".inputs .category");
const create = document.querySelector(".inputs .submit");
const search = document.querySelector(".inputs .search");
const btnTitle = document.querySelector(".inputs .sr-ti");
const btnCategory = document.querySelector(".inputs .sr-ct");
const deleteAll = document.querySelector(".inputs .del-all");
const deleteAllCounter = document.querySelector(".inputs .del-all span");
const updateBtn = document.querySelector(".outputs .update-btn");
const deleteBtn = document.querySelector(".outputs .delete-btn");
const tableHead = document.querySelector(".outputs table  thead");
const tableBody = document.querySelector(".outputs .tabel-body");
let temp;

// moods 
let productMood = "create";
let searchMood = "title";

// get total
function getTotal() {
    total.innerHTML = (+price.value + +taxes.value + +ads.value) - +discount.value
};
// create products 
let arrayOfProducts = [];

// check localstorage 
if (localStorage.myData != null) {
    arrayOfProducts = JSON.parse(localStorage.myData);
};
// create&update button 
create.addEventListener(("click"), () => {
    if (title.value != "" && price.value != "" && category.value != "" && count.value != "") {
        const product = {
            title: title.value,
            price: price.value,
            taxes: taxes.value,
            ads: ads.value,
            discount: discount.value,
            total: total.innerHTML,
            count: count.value,
            category: category.value,
        }
        if (productMood === "create") {
            arrayOfProducts.push(product);
        } else {
            arrayOfProducts[temp] = product
            create.innerHTML = 'Create';
            productMood = "create"
        }
        // add to localStorage
        localStorage.setItem("myData", JSON.stringify(arrayOfProducts));

        clearInputs();
        addData()
    }
});
function clearInputs() {
    title.value = "";
    price.value = "";
    taxes.value = "";
    ads.value = "";
    discount.value = "";
    total.innerHTML = "0";
    count.value = "";
    category.value = "";
};
// add data in the tabel 
addData()
function addData() {
    let row = ``;
    for (let i = 0; i < arrayOfProducts.length; i++) {
        row += `
        <tr>
        <td>${i + 1}</td>
        <td>${arrayOfProducts[i].title}</td>
        <td>${arrayOfProducts[i].price}</td>
        <td>${arrayOfProducts[i].taxes}</td>
        <td>${arrayOfProducts[i].ads}</td>
        <td>${arrayOfProducts[i].discount}</td>
        <td>${arrayOfProducts[i].total}</td>
        <td>${arrayOfProducts[i].category}</td>
        <td>${arrayOfProducts[i].count}</td>
        <td><button onclick="updatePro(${i})" class="update-btn" type="button">update</button></td>
        <td><button onclick="delPro(${i})" class="delete-btn" type="button">delete</button></td>
        </tr>
        `
    }
    tableBody.innerHTML = row
    // delete all counter
    deleteAllCounter.innerHTML = arrayOfProducts.length;

};
// delete all in click
deleteAll.addEventListener(("click"), () => {
    // create popup to confirm deletion
    const overlay = document.createElement("div");
    overlay.className = 'over-lay';

    const popBox = document.createElement("div");
    popBox.className = "pop-box";
    popBox.innerHTML =
        `<p>Are You Sure You Delete All?</p>
         <div class="btns">
         <button onclick="checkRes('ok')" class="ok" type="button">Ok</button>
         <button onclick="checkRes('cancle')" class="cancle" type="button">Cancle</button>
         </div>`;

    overlay.appendChild(popBox);
    document.body.appendChild(overlay);
});
// confirm delete all 
function checkRes(res) {
    if (res === "ok") {
        localStorage.removeItem("myData")
        arrayOfProducts = [];
        document.querySelector(".over-lay").remove()
        addData()
    } else {
        document.querySelector(".over-lay").remove()
    }
};
// delete product data
function delPro(i) {
    arrayOfProducts.splice(i, 1)
    localStorage.myData = JSON.stringify(arrayOfProducts)
    addData()
};
// update product data
function updatePro(i) {
    temp = i;
    productMood = "update";
    title.value = arrayOfProducts[i].title
    price.value = arrayOfProducts[i].price
    taxes.value = arrayOfProducts[i].taxes
    ads.value = arrayOfProducts[i].ads
    discount.value = arrayOfProducts[i].discount
    count.value = arrayOfProducts[i].count
    category.value = arrayOfProducts[i].category
    create.innerHTML = 'Update';
};
// search mood
function setSearchMood(inp) {
    search.focus()

    if (inp === "title") {
        searchMood = "title"
        search.placeholder = "Search By Title"
    } else {
        searchMood = "category"
        search.placeholder = "Search By Category"
    }
};
// search function
function searchFn(value) {
    let row = '';
    if (searchMood === "title") {

        for (let i = 0; i < arrayOfProducts.length; i++) {
            if (arrayOfProducts[i].title.includes(value)) {
                row += `
                <tr>
                <td>${i + 1}</td>
                <td>${arrayOfProducts[i].title}</td>
                <td>${arrayOfProducts[i].price}</td>
                <td>${arrayOfProducts[i].taxes}</td>
                <td>${arrayOfProducts[i].ads}</td>
                <td>${arrayOfProducts[i].discount}</td>
                <td>${arrayOfProducts[i].total}</td>
                <td>${arrayOfProducts[i].category}</td>
                <td>${arrayOfProducts[i].count}</td>
                <td><button onclick="updatePro(${i})" class="update-btn" type="button">update</button></td>
                <td><button onclick="delPro(${i})" class="delete-btn" type="button">delete</button></td>
                </tr>
                `
            }
        }

    } else {
        for (let i = 0; i < arrayOfProducts.length; i++) {
            if (arrayOfProducts[i].category.includes(value)) {
                row += `
                <tr>
                <td>${i + 1}</td>
                <td>${arrayOfProducts[i].title}</td>
                <td>${arrayOfProducts[i].price}</td>
                <td>${arrayOfProducts[i].taxes}</td>
                <td>${arrayOfProducts[i].ads}</td>
                <td>${arrayOfProducts[i].discount}</td>
                <td>${arrayOfProducts[i].total}</td>
                <td>${arrayOfProducts[i].category}</td>
                <td>${arrayOfProducts[i].count}</td>
                <td><button onclick="updatePro(${i})" class="update-btn" type="button">update</button></td>
                <td><button onclick="delPro(${i})" class="delete-btn" type="button">delete</button></td>
                </tr>
                `
            }
        }
    }
    tableBody.innerHTML = row
};
