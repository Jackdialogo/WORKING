function goHome() {
    document.getElementById('homePage').style.display = 'block';
    document.getElementById('cageDetails').style.display = 'none';
}

function goToRabbitProfile() {
    const params = new URLSearchParams(window.location.search);
    const cageNumber = params.get('cage') || 1;
    window.location.href = `rabbitinfo.html?cage=${cageNumber}`;
}

function showCageDetails(cageNumber) {
    document.getElementById('homePage').style.display = 'none';
    document.getElementById('cageDetails').style.display = 'block';
    document.getElementById('cageNumber').innerText = cageNumber;
}

function saveData(event) {
    event.preventDefault();
    const form = document.getElementById('rabbitForm');
    const data = {
        serialNumber: form.serialNumber.value,
        breed: form.breed.value,
        family: form.family.value,
        birthDate: form.birthDate.value,
        weight: form.weight.value,
        gender: form.gender.value,
        pregnant: form.pregnant ? form.pregnant.value : 'no',
        matedRabbit: form.matedRabbit.value,
        pregnancyStart: form.pregnancyStart.value,
        dueDate: form.dueDate.value,
        foodIntake: form.foodIntake.value,
        mating: form.mating.value,
        note: form.note.value
    };

    const cageNumber = new URLSearchParams(window.location.search).get('cage') || 1;
    localStorage.setItem(`rabbitData${cageNumber}`, JSON.stringify(data));
    goHome();
}

function togglePregnancy(show) {
    document.getElementById('pregnancyOption').style.display = show ? 'block' : 'none';
    document.getElementById('pregnancyDetails').style.display = 'none';
}

function togglePregnancyDetails(show) {
    document.getElementById('pregnancyDetails').style.display = show ? 'block' : 'none';
}

window.onscroll = function() {stickyHeader()};

var header = document.querySelector("header");
var sticky = header.offsetTop;

function stickyHeader() {
    if (window.pageYOffset > sticky) {
        header.classList.add("sticky");
    } else {
        header.classList.remove("sticky");
    }
}
