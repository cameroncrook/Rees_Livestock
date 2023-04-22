function initialDisplay() {
    if (localStorage.getItem('entries')) {
        let entries = localStorage.getItem('entries');
        entries = JSON.parse(entries);

        for (const data in entries) {
            const entry = entries[data];

            const name = entry.name;
            const breedDate = entry.breedDate;

            const range = getExpectedDate(breedDate);

            displayData(name, breedDate, range);
        }
    }
}

initialDisplay();

document.querySelector('#custom-check').addEventListener('change', handleDayRange);
document.querySelector('#day1').addEventListener('change', () => {
    document.querySelector('tbody').innerHTML = '';
    initialDisplay();
});

document.querySelector('#day2').addEventListener('change', () => {
    document.querySelector('tbody').innerHTML = '';
    initialDisplay();
});

function handleDayRange() {
    let day1Input = document.querySelector('#day1');
    let day2Input = document.querySelector('#day2');
    const customCheck = document.querySelector('#custom-check');

    if (customCheck.checked) {
        day1Input.disabled = false;
        day2Input.disabled = false;
    } else {
        day1Input.value = 279;
        day1Input.disabled = true;
        day2Input.value = 292;
        day2Input.disabled = true;

        document.querySelector('tbody').innerHTML = '';
        initialDisplay();
    }
}

const addForm = document.querySelector('form');

addForm.addEventListener('submit', (event) => {
    event.preventDefault();

    const name = document.querySelector('#name').value;
    const breedDate = document.querySelector('#breed-date').value;

    const range = getExpectedDate(breedDate);

    displayData(name, breedDate, range);
    addToStorage(name, breedDate, range);

    addForm.reset();
});

function getExpectedDate(breedDateString) {
    const day1Input = parseInt(document.querySelector('#day1').value);
    const day2Input = parseInt(document.querySelector('#day2').value);

    breedDate = new Date(breedDateString);

    let dayRange1 = new Date(breedDate);
    dayRange1.setDate(breedDate.getDate() + day1Input);
    
    let dayRange2 = new Date(breedDate);
    dayRange2.setDate(breedDate.getDate() + day2Input);

    const firstEstimate = dayRange1.toISOString().substring(0, 10);
    const seccondEstimate = dayRange2.toISOString().substring(0, 10);

    const range = `${firstEstimate} to ${seccondEstimate}`;

    return range
}

function displayData(name, breedDate, range) {
    let body = document.querySelector('tbody');

    let row = document.createElement('tr');
    
    let nameTD = document.createElement('td');
    let breedDateTD = document.createElement('td');
    let rangeTD = document.createElement('td');

    nameTD.textContent = name;
    row.appendChild(nameTD);

    breedDateTD.textContent = breedDate;
    row.appendChild(breedDateTD);

    rangeTD.textContent = range;
    row.appendChild(rangeTD);

    body.appendChild(row);
}

function addToStorage(name, breedDate, range) {
    const dataDict = {
        name: name,
        breedDate: breedDate
    };

    if (localStorage.getItem('entries')) {
        let entries = localStorage.getItem('entries');
        entries = JSON.parse(entries);

        entries.push(dataDict);

        localStorage.setItem('entries', JSON.stringify(entries));
    } else {
        let dataList = [];

        dataList.push(dataDict);

        localStorage.setItem('entries', JSON.stringify(dataList));
    }
}