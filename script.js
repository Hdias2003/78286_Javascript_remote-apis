const grid = document.getElementById('data-grid');
const regionSelect = document.getElementById('region-filter');
const rickSearch = document.getElementById('rick-search');

// Helper to clear grid and show errors
const clearGrid = () => grid.innerHTML = '';
const showError = (msg) => {
    clearGrid();
    grid.innerHTML = `<p class="error-message">Error: ${msg}</p>`;
};

// 1. Fetch Countries (with Region Dropdown)
async function fetchCountries() {
    const region = regionSelect.value;
    try {
        const response = await fetch(`https://restcountries.com/v3.1/region/${region}`);
        if (!response.ok) throw new Error('Failed to fetch countries');
        const data = await response.json();
        displayCountries(data);
    } catch (error) {
        showError(error.message);
    }
}

// 2. Fetch Users
async function fetchUsers() {
    try {
        const response = await fetch('https://jsonplaceholder.typicode.com/users');
        if (!response.ok) throw new Error('Failed to fetch users');
        const data = await response.json();
        displayUsers(data);
    } catch (error) {
        showError(error.message);
    }
}

// 3. Fetch Rick & Morty (with Character Search)
async function fetchRickAndMorty() {
    const name = rickSearch.value;
    try {
        const response = await fetch(`https://rickandmortyapi.com/api/character/?name=${name}`);
        if (!response.ok) throw new Error('Character not found');
        const data = await response.json();
        displayRick(data.results);
    } catch (error) {
        showError(error.message);
    }
}

// --- Display Functions ---
function displayCountries(countries) {
    clearGrid();
    countries.forEach(c => {
        grid.innerHTML += `
            <div class="card">
                <img src="${c.flags.png}" alt="Flag">
                <h3>${c.name.common}</h3>
                <p>Capital: ${c.capital ? c.capital[0] : 'N/A'}</p>
            </div>`;
    });
}

function displayUsers(users) {
    clearGrid();
    users.forEach(u => {
        grid.innerHTML += `
            <div class="card">
                <h3>${u.name}</h3>
                <p>Email: ${u.email}</p>
                <p>Company: ${u.company.name}</p>
            </div>`;
    });
}

function displayRick(chars) {
    clearGrid();
    chars.forEach(char => {
        grid.innerHTML += `
            <div class="card">
                <img src="${char.image}" alt="${char.name}">
                <h3>${char.name}</h3>
                <p>Species: ${char.species}</p>
            </div>`;
    });
}

// Event Listeners
document.getElementById('btn-countries').addEventListener('click', fetchCountries);
document.getElementById('btn-users').addEventListener('click', fetchUsers);
document.getElementById('btn-rick').addEventListener('click', fetchRickAndMorty);