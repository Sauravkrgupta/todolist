// Function to add or update an item
function getAndUpdate(isUpdate = false) {
    console.log(isUpdate ? "Updating List..." : "Adding to List...");
    let tit = document.getElementById('title').value;
    let desc = document.getElementById('description').value;
    let itemIndex = document.getElementById('itemIndex').value;

    if (isUpdate && itemIndex !== "") {
        let itemJsonArrayStr = localStorage.getItem('itemsJson');
        let itemJsonArray = JSON.parse(itemJsonArrayStr);
        itemJsonArray[itemIndex] = [tit, desc];
        localStorage.setItem('itemsJson', JSON.stringify(itemJsonArray));
    } else {
        if (localStorage.getItem('itemsJson') == null) {
            let itemJsonArray = [];
            itemJsonArray.push([tit, desc]);
            localStorage.setItem('itemsJson', JSON.stringify(itemJsonArray));
        } else {
            let itemJsonArrayStr = localStorage.getItem('itemsJson');
            let itemJsonArray = JSON.parse(itemJsonArrayStr);
            itemJsonArray.push([tit, desc]);
            localStorage.setItem('itemsJson', JSON.stringify(itemJsonArray));
        }
    }

    document.getElementById('itemIndex').value = ""; // Reset itemIndex
    update();
}

// Function to update the table
function update() {
    let itemJsonArray = [];
    if (localStorage.getItem('itemsJson') == null) {
        localStorage.setItem('itemsJson', JSON.stringify(itemJsonArray));
    } else {
        let itemJsonArrayStr = localStorage.getItem('itemsJson');
        itemJsonArray = JSON.parse(itemJsonArrayStr);
    }

    // Populate the table
    let tableBody = document.getElementById("tableBody");
    let str = "";
    itemJsonArray.forEach((element, index) => {
        str += `
        <tr>
        <th scope="row">${index + 1}</th>
        <td>${element[0]}</td>
        <td>${element[1]}</td>
        <td>
            <button class="btn btn-sm btn-warning" onclick="editItem(${index})">Edit</button>
            <button class="btn btn-sm btn-danger" onclick="deleteItem(${index})">Delete</button>
        </td>
        </tr>`;
    });
    tableBody.innerHTML = str;
}

// Function to delete an item
function deleteItem(itemIndex) {
    console.log("Delete", itemIndex);
    let itemJsonArrayStr = localStorage.getItem('itemsJson');
    let itemJsonArray = JSON.parse(itemJsonArrayStr);
    itemJsonArray.splice(itemIndex, 1);
    localStorage.setItem('itemsJson', JSON.stringify(itemJsonArray));
    update();
}

// Function to clear all items
function clearStorage() {
    if (confirm("Do you really want to clear?")) {
        console.log('Clearing the storage');
        localStorage.clear();
        update();
    }
}

// Function to edit an item
function editItem(itemIndex) {
    let itemJsonArrayStr = localStorage.getItem('itemsJson');
    let itemJsonArray = JSON.parse(itemJsonArrayStr);
    document.getElementById('title').value = itemJsonArray[itemIndex][0];
    document.getElementById('description').value = itemJsonArray[itemIndex][1];
    document.getElementById('itemIndex').value = itemIndex;
}

// Event listeners
document.getElementById("add").addEventListener("click", () => getAndUpdate(false));
document.getElementById("update").addEventListener("click", () => getAndUpdate(true));

// Initialize the table
update();
