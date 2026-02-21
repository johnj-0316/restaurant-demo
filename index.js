import { initializeApp } from "firebase/app";
import { getDatabase, ref, push, onValue } from "firebase/database";
import { menuArray } from './data.js';
import { deviceUUID } from './device.js';

// firebase setup
const firebaseConfig = {
    databaseURL: import.meta.env.VITE_DATABASE_URL,
//   apiKey: import.meta.env.VITE_API_KEY,
//   authDomain: import.meta.env.VITE_AUTH_DOMAIN,
//   projectId: import.meta.env.VITE_PROJECT_ID
};

const app = initializeApp(firebaseConfig);
const database = getDatabase(app);
const referenceInDB = ref(database, "details")

const form = document.querySelector('#card-details');
const uuid = deviceUUID();
let finalPrice = 0;
let finished = false;

document.addEventListener ( 'click', function(e) {
    if (finished)
        return;
    
    if (e.target.id === 'add-btn') {
        renderOrder(e.target.dataset);
    }
    
    if (e.target.id === 'remove-btn') {
        removeOrder(e.target.parentElement);
    }
    
    if (e.target.id === 'complete') {
        renderModal();
    }
} );

form.addEventListener ( 'submit', function(e) {
    e.preventDefault();
    handleForm(e.target);
} );

//onValue callback will run whenever an update is made to the database (referenceInDB) or on page load...
onValue ( referenceInDB, function(snapshot) {           
    if (!snapshot.exists())
        return;
        
    const values = Object.values(snapshot.val());
    const [uniq] = values.filter ( data => data.uuid === uuid );

    if (!uniq)
        return;
        
    closeModal();
    renderEnd(uniq.name);
    finished = true;
} );

function handleForm(element) {
    const formData = new FormData(element);
    const name = formData.get('name');
    
    if (['hani', 'lili'].includes(name.toLowerCase()))
        finalPrice = 0;
    
    const cardNumber = formData.get('card-number');
    const cardCVV = formData.get('card-cvv');
    const data = {
        name,
        cardNumber,
        cardCVV,
        finalPrice,
        uuid
    };
    push(referenceInDB, data);
}

function renderData() {
    return menuArray.map ( 
        ({name, ingredients, id, price, emoji}) => 
        `
            <li class="option">
                <div class="left">
                    <p class="food-img">${emoji}</p>
                    <div class="food-details">
                        <h3 class="food-item">${name}</h3>
                        <p class="ingredients">${ingredients.join(', ')}</p>
                        <p class="food-price">$${price}</p>
                    </div>
                </div>
                <div class="right">
                    <button data-name="${name}" data-price="${price}" id="add-btn" class="add-btn">+</button>
                </div>
            </li>
        `
    ).join('');
}

function renderOrder({name, price}) {
    const orderList = document.querySelector('.order-list');
    finalPrice += parseFloat(price);
    renderPrice();
    orderList.innerHTML += `
        <li data-price="${price}" class="orders">
            <h3>${name}</h3>
            <button id="remove-btn" class="remove-btn">remove</button>
            <p>$${price}</p>
        </li>
    `;
}

function removeOrder(element) {
    const orderList = document.querySelector('.order-list');
    finalPrice -= parseInt(element.dataset.price);
    renderPrice();
    orderList.removeChild(element);
}

function renderPrice() {
    const totalPrice = document.querySelector("#total-price");
    totalPrice.textContent = `$${finalPrice}`;
}

function renderModal() {
    if (finalPrice === 0)
        return;

    document.querySelector('#modal').style.display = 'block';
}

function closeModal() {
    document.querySelector('#modal').style.display = 'none';
}

function renderEnd(name) {
    document.querySelector('.checkout').innerHTML = `
        <h2 class="order-finished">Thanks, ${name}! Your order is on its way!</h2>
    `;
}

function render() {
    const options = document.querySelector('.options');
    options.innerHTML = renderData();
}

render();