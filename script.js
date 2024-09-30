let cages = JSON.parse(localStorage.getItem('cages')) || {}; // Store dynamically added cages

function goHome() {
    document.getElementById('homePage').style.display = 'block';
    document.getElementById('cageDetails').style.display = 'none';
    document.getElementById('pregnancyOption').style.display = 'none';
    document.getElementById('pregnancyDetails').style.display = 'none';
    document.getElementById('headerTitle').innerHTML = '<strong>RABBIT CAGE</strong>';
    updateCageList();
}

function addNewCage() {
    // Determine the next available cage ID starting from 1
    let newCageId = 1;
    while (cages[newCageId] !== undefined) {
        newCageId++;
    }
    cages[newCageId] = {}; 
    localStorage.setItem('cages', JSON.stringify(cages)); 
    updateCageList(); 
    document.getElementById('headerTitle').innerHTML = `<strong>CAGE ${newCageId}</strong>`; // Update the header
    showCageDetails(newCageId); // Show the new cage details immediately
}

function showCageDetails(cageNumber) {
    document.getElementById('homePage').style.display = 'none';
    document.getElementById('cageDetails').style.display = 'block';
    loadData(cageNumber); 
    document.getElementById('rabbitForm').dataset.cageNumber = cageNumber;
    document.getElementById('headerTitle').innerHTML = `<strong>CAGE ${cageNumber}</strong>`;
}

function togglePregnancy(show) {
    document.getElementById('pregnancyOption').style.display = show ? 'block' : 'none';
    document.getElementById('pregnancyDetails').style.display = 'none'; 
}

function togglePregnancyDetails(show) {
    document.getElementById('pregnancyDetails').style.display = show ? 'block' : 'none';
}

function saveData(event) {
    event.preventDefault();
    const form = document.getElementById('rabbitForm');
    const cageNumber = form.dataset.cageNumber;
    const data = new FormData(form);
    const obj = {};
    data.forEach((value, key) => {
        obj[key] = value;
    });
    localStorage.setItem(`rabbitData${cageNumber}`, JSON.stringify(obj));
    alert('Data saved successfully!');
    goToRabbitProfile();
}

function loadData(cageNumber) {
    let data = JSON.parse(localStorage.getItem(`rabbitData${cageNumber}`)) || {};
    document.getElementById('serialNumber').value = data.serialNumber || '';
    document.getElementById('breed').value = data.breed || '';
    document.getElementById('family').value = data.family || '';
    document.getElementById('birthDate').value = data.birthDate || '';
    document.getElementById('weight').value = data.weight || '';

    if (data.gender === "female") {
        document.querySelector('input[name="gender"][value="female"]').checked = true;
        togglePregnancy(true);
    } else {
        document.querySelector('input[name="gender"][value="male"]').checked = true;
        togglePregnancy(false);
    }

    if (data.pregnant === "yes") {
        document.querySelector('input[name="pregnant"][value="yes"]').checked = true;
        togglePregnancyDetails(true);
    } else {
        document.querySelector('input[name="pregnant"][value="no"]').checked = true;
        togglePregnancyDetails(false);
    }

    document.getElementById('matedRabbit').value = data.matedRabbit || '';
    document.getElementById('pregnancyStart').value = data.pregnancyStart || '';
    document.getElementById('dueDate').value = data.dueDate || '';
    document.querySelector(`input[name="foodIntake"][value="${data.foodIntake || 'normal'}"]`).checked = true;
    document.querySelector(`input[name="mating"][value="${data.mating || 'no'}"]`).checked = true;
    document.getElementById('note').value = data.note || '';
}

function goToRabbitProfile() {
    const cageNumber = document.getElementById('rabbitForm').dataset.cageNumber || 1;
    const form = document.getElementById('rabbitForm');
    const data = new FormData(form);
    const params = new URLSearchParams();
    data.forEach((value, key) => {
        params.append(key, value);
    });
    window.location.href = `rabbitinfo.html?cage=${cageNumber}&${params.toString()}`;
}

function updateCageList() {
    const cageButtonsDiv = document.getElementById('cageButtons');
    cageButtonsDiv.innerHTML = ''; // Clear existing buttons
    Object.keys(cages).forEach(cageNumber => {
        const button = document.createElement('button');
        button.innerHTML = `CAGE ${cageNumber}`;
        button.onclick = () => showCageDetails(cageNumber);
        cageButtonsDiv.appendChild(button);
    });
}

function deleteCage() {
    const cageNumber = document.getElementById('rabbitForm').dataset.cageNumber; // Get the current cage number
    if (confirm(`Are you sure you want to delete Cage ${cageNumber}?`)) {
        delete cages[cageNumber]; 
        localStorage.setItem('cages', JSON.stringify(cages)); 
        alert(`Cage ${cageNumber} deleted successfully!`);
        
        // If the current cage is deleted, show the first available cage
        if (!cages[cageNumber]) {
            const remainingCages = Object.keys(cages);
            if (remainingCages.length > 0) {
                const firstCageNumber = remainingCages[0]; // Get the first available cage
                showCageDetails(firstCageNumber);
            } else {
                goHome(); // Go back to home if no cages left
            }
        } else {
            renumberCages(); // Only renumber cages if the deleted cage is not currently displayed
            updateCageList(); 
        }
    }
}

function renumberCages() {
    let newCages = {};
    let newId = 1;
    Object.keys(cages).sort((a, b) => Number(a) - Number(b)).forEach(oldId => {
        newCages[newId++] = cages[oldId]; // Assign new IDs starting from 1
    });
    cages = newCages; // Update the cages reference
    localStorage.setItem('cages', JSON.stringify(cages)); // Update localStorage
}

function clearForm() {
    document.getElementById('rabbitForm').reset(); // Reset the form
    togglePregnancy(false); // Hide pregnancy options
    togglePregnancyDetails(false); // Hide pregnancy details
}
