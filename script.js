let medicines = [];
let isViewVisible = false;

window.onload = function() {
    if (localStorage.getItem('medicines')) {
        medicines = JSON.parse(localStorage.getItem('medicines'));
        checkForExpiryNotifications();
    }
};

function saveToLocalStorage() {
    localStorage.setItem('medicines', JSON.stringify(medicines));
}

function showAdditionalFields() {
    const additionalFieldsDiv = document.getElementById("additionalFields");
    additionalFieldsDiv.style.display = "block";
}

function getCurrentDateTime() {
    const now = new Date();
    const date = now.toLocaleDateString();
    const time = now.toLocaleTimeString();
    return `${date} ${time}`;
}

function addMedicine() {
    const medName = document.getElementById("medicineName").value;
    const SerialName = document.getElementById("serialNumber").value;
    const BrandName = document.getElementById("brandName").value;
    const GenericName = document.getElementById("genericName").value;
    const StripesName = document.getElementById("stripes").value;
    const MRP = document.getElementById("mrp").value;
    const medPrice = document.getElementById("medicinePrice").value;
    const manufactureDate = document.getElementById("manufactureDate").value;
    const expiryDate = document.getElementById("expiryDate").value;
    const currentDateTime = getCurrentDateTime();

    if (medName === "" || SerialName === "" || BrandName === "" || GenericName === "" || StripesName === "" || MRP === "" || medPrice === "" || manufactureDate === "" || expiryDate === "") {
        alert("Please fill all fields.");
        return;
    }

    const medicine = {
        name: medName,
        SerialName: SerialName,
        BrandName: BrandName,
        GenericName: GenericName,
        StripesName: StripesName,
        MRP: MRP,
        price: medPrice,
        manufactureDate: manufactureDate,
        expiryDate: expiryDate,
        addedDateTime: currentDateTime
    };

    medicines.push(medicine);
    saveToLocalStorage();
    checkForExpiryNotifications();

    document.getElementById("medicineName").value = "";
    document.getElementById("serialNumber").value = "";
    document.getElementById("brandName").value = "";
    document.getElementById("genericName").value = "";
    document.getElementById("stripes").value = "";
    document.getElementById("mrp").value = "";
    document.getElementById("medicinePrice").value = "";
    document.getElementById("manufactureDate").value = "";
    document.getElementById("expiryDate").value = "";

    document.getElementById("additionalFields").style.display = "none";
    alert("Medicine added successfully!");
}

function removeMedicine(index) {
    medicines.splice(index, 1);
    saveToLocalStorage();
    viewMedicines();
}

function toggleViewMedicines() {
    const medicineListDiv = document.getElementById("medicineList");
    isViewVisible = !isViewVisible;

    if (isViewVisible) {
        medicineListDiv.classList.add('show');
        viewMedicines();
    } else {
        medicineListDiv.classList.remove('show');
    }
}

function addMedicine() {
            const medName = document.getElementById("medicineName").value;
            const SerialName = document.getElementById("serialNumber").value;
            const BrandName = document.getElementById("brandName").value;
            const GenericName = document.getElementById("genericName").value;
            const StripesName = document.getElementById("stripes").value;
            const MRP = document.getElementById("mrp").value;
            const medPrice = document.getElementById("medicinePrice").value;
            const manufactureDate = document.getElementById("manufactureDate").value;
            const expiryDate = document.getElementById("expiryDate").value;
            const currentDateTime = getCurrentDateTime();

            if (medName === "" || SerialName === "" || BrandName === "" || GenericName === "" || StripesName === "" || MRP === "" || medPrice === "" || manufactureDate === "" || expiryDate === "") {
                alert("Please fill all fields.");
                return;
            }

            const medicine = {
                name: medName,
                SerialName: SerialName,
                BrandName: BrandName,
                GenericName: GenericName,
                StripesName: StripesName,
                MRP: MRP,
                price: medPrice,
                manufactureDate: manufactureDate,
                expiryDate: expiryDate,
                addedDateTime: currentDateTime
            };

            medicines.push(medicine);
            saveToLocalStorage();
            checkForExpiryNotifications();

            document.getElementById("medicineName").value = "";
            document.getElementById("serialNumber").value = "";
            document.getElementById("brandName").value = "";
            document.getElementById("genericName").value = "";
            document.getElementById("stripes").value = "";
            document.getElementById("mrp").value = "";
            document.getElementById("medicinePrice").value = "";
            document.getElementById("manufactureDate").value = "";
            document.getElementById("expiryDate").value = "";

            document.getElementById("additionalFields").style.display = "none";
            alert("Medicine added successfully!");
        }

        function removeMedicine(index) {
            medicines.splice(index, 1);
            saveToLocalStorage();
            viewMedicines();
        }

        function toggleViewMedicines() {
            const medicineListDiv = document.getElementById("medicineList");
            isViewVisible = !isViewVisible;

            if (isViewVisible) {
                medicineListDiv.classList.add('show');
                viewMedicines();
            } else {
                medicineListDiv.classList.remove('show');
            }
        }

        function viewMedicines() {
    const medicineListDiv = document.getElementById("medicineList");
    medicineListDiv.innerHTML = "";

    if (medicines.length === 0) {
        medicineListDiv.innerHTML = "<p>No medicines added yet!</p>";
        return;
    }

    // Create table
    const table = document.createElement("table");
    table.style.width = "100%";
    table.border = "1";

    // Create table header
    const thead = document.createElement("thead");
    thead.innerHTML = `
        <tr>
           
            <th>SR NO.</th>
             <th>Name</th>
            <th>Brand Name</th>
            <th>Generic Name</th>
            <th>Stripes</th>
            <th>MRP</th>
            <th>Price</th>
            <th>Manufacture Date</th>
            <th>Expiry Date</th>
            <th>Added On</th>
            <th>Actions</th>
        </tr>
    `;
    table.appendChild(thead);

    // Create table body
    const tbody = document.createElement("tbody");
    medicines.forEach((medicine, index) => {
        const row = document.createElement("tr");
        row.innerHTML = `
            
            <td>${medicine.SerialName}</td>
            <td>${medicine.name}</td>
            <td>${medicine.BrandName}</td>
            <td>${medicine.GenericName}</td>
            <td>${medicine.StripesName}</td>
            <td>${medicine.MRP}</td>
            <td>${medicine.price}</td>
            <td>${medicine.manufactureDate}</td>
            <td>${medicine.expiryDate}</td>
            <td>${medicine.addedDateTime}</td>
            <td>
                <span onclick="editMedicine(${index})" style="cursor: pointer;">
                    <i class="fas fa-edit" title="Edit"></i>
                </span>
                <span onclick="removeMedicine(${index})" style="cursor: pointer;">
                    <i class="fas fa-trash" title="Remove" style="color: red;"></i>
                </span>
            </td>
        `;
        tbody.appendChild(row);
    });
    table.appendChild(tbody);
    medicineListDiv.appendChild(table);
}

function editMedicine(index) {
    const medicine = medicines[index];

    // Populate the input fields with the current values
   
    document.getElementById("serialNumber").value = medicine.SerialName;
    document.getElementById("medicineName").value = medicine.name;
    document.getElementById("brandName").value = medicine.BrandName;
    document.getElementById("genericName").value = medicine.GenericName;
    document.getElementById("stripes").value = medicine.StripesName;
    document.getElementById("mrp").value = medicine.MRP;
    document.getElementById("medicinePrice").value = medicine.price;
    document.getElementById("manufactureDate").value = medicine.manufactureDate;
    document.getElementById("expiryDate").value = medicine.expiryDate;

    // Update the button to indicate that we're editing
    const addMedicineBtn = document.querySelector("button[onclick='addMedicine()']");
    addMedicineBtn.onclick = function () {
        updateMedicine(index);
    };
    addMedicineBtn.textContent = "Update Medicine";
}

function updateMedicine(index) {
    const medName = document.getElementById("medicineName").value;
    const SerialName = document.getElementById("serialNumber").value;
    const BrandName = document.getElementById("brandName").value;
    const GenericName = document.getElementById("genericName").value;
    const StripesName = document.getElementById("stripes").value;
    const MRP = document.getElementById("mrp").value;
    const medPrice = document.getElementById("medicinePrice").value;
    const manufactureDate = document.getElementById("manufactureDate").value;
    const expiryDate = document.getElementById("expiryDate").value;

    if (medName === "" || SerialName === "" || BrandName === "" || GenericName === "" || StripesName === "" || MRP === "" || medPrice === "" || manufactureDate === "" || expiryDate === "") {
        alert("Please fill all fields.");
        return;
    }

    medicines[index] = {
        name: medName,
        SerialName: SerialName,
        BrandName: BrandName,
        GenericName: GenericName,
        StripesName: StripesName,
        MRP: MRP,
        price: medPrice,
        manufactureDate: manufactureDate,
        expiryDate: expiryDate,
        addedDateTime: getCurrentDateTime()
    };

    saveToLocalStorage();
    viewMedicines();

    // Reset input fields
    document.getElementById("medicineName").value = "";
    document.getElementById("serialNumber").value = "";
    document.getElementById("brandName").value = "";
    document.getElementById("genericName").value = "";
    document.getElementById("stripes").value = "";
    document.getElementById("mrp").value = "";
    document.getElementById("medicinePrice").value = "";
    document.getElementById("manufactureDate").value = "";
    document.getElementById("expiryDate").value = "";

    // Reset button text to "Submit Medicine"
    const addMedicineBtn = document.querySelector("button[onclick='addMedicine()']");
    addMedicineBtn.onclick = addMedicine;
    addMedicineBtn.textContent = "Submit Medicine";
}



function checkForExpiryNotifications() {
    const today = new Date().toISOString().split('T')[0];
    const expiryWarnings = [];

    medicines.forEach((medicine) => {
        if (medicine.expiryDate === today) {
            expiryWarnings.push(`${medicine.name} is expiring today.`);
        }
    });

    if (expiryWarnings.length > 0) {
        alert(expiryWarnings.join("\n"));
    }
}

// Search function
function searchMedicine() {
    const searchInput = document.getElementById("searchInput").value.toLowerCase();
    const searchResultDiv = document.getElementById("searchResult");
    searchResultDiv.innerHTML = "";

    const foundMedicine = medicines.find(medicine => medicine.name.toLowerCase() === searchInput);

    if (foundMedicine) {
        searchResultDiv.innerHTML = `
            <div>
                <strong>Name:</strong> ${foundMedicine.name} <br>
                <strong>Serial Number:</strong> ${foundMedicine.SerialName} <br>
                <strong>Brand Name:</strong> ${foundMedicine.BrandName} <br>
                <strong>Generic Name:</strong> ${foundMedicine.GenericName} <br>
                <strong>Stripes:</strong> ${foundMedicine.StripesName} <br>
                <strong>MRP:</strong> ₹${foundMedicine.MRP} <br>
                <strong>Price:</strong> ₹${foundMedicine.price} <br>
                <strong>Manufacture Date:</strong> ${foundMedicine.manufactureDate} <br>
                <strong>Expiry Date:</strong> ${foundMedicine.expiryDate} <br>
                <strong>Added On:</strong> ${foundMedicine.addedDateTime}
            </div>
        `;
    } else if (searchInput !== "") {
        searchResultDiv.innerHTML = "<p>No medicine found.</p>";
    }
}