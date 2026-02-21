import{initializeApp as f}from"https://www.gstatic.com/firebasejs/12.9.0/firebase-app.js";import{getDatabase as m,ref as p,onValue as g,push as h}from"https://www.gstatic.com/firebasejs/12.9.0/firebase-database.js";(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const r of document.querySelectorAll('link[rel="modulepreload"]'))i(r);new MutationObserver(r=>{for(const o of r)if(o.type==="childList")for(const a of o.addedNodes)a.tagName==="LINK"&&a.rel==="modulepreload"&&i(a)}).observe(document,{childList:!0,subtree:!0});function n(r){const o={};return r.integrity&&(o.integrity=r.integrity),r.referrerPolicy&&(o.referrerPolicy=r.referrerPolicy),r.crossOrigin==="use-credentials"?o.credentials="include":r.crossOrigin==="anonymous"?o.credentials="omit":o.credentials="same-origin",o}function i(r){if(r.ep)return;r.ep=!0;const o=n(r);fetch(r.href,o)}})();const y=[{name:"Pizza",ingredients:["pepperoni","mushroom","mozarella"],id:0,price:14,emoji:"🍕"},{name:"Baconator",ingredients:["beef","cheese","bacon","ketchup","mayo"],price:10,emoji:"🍔",id:1},{name:"Hot Honey Rub",ingredients:["chicken"],price:.07,emoji:"🍗",id:2},{name:"Beer",ingredients:["grain, hops, yeast, water"],price:12,emoji:"🍺",id:3},{name:"Soju",ingredients:["rice, yeast, water"],price:1,emoji:"🍶",id:4},{name:"Ramen",ingredients:["noodles","pork belly slices","bean sprouts","boiled egg","tonkotsu broth"],price:7,emoji:"🍜",id:5}];function b(){let e=window.navigator,t=window.screen,n=e.mimeTypes.length;return n+=e.userAgent.replace(/\D+/g,""),n+=e.plugins.length,n+=t.height||"",n+=t.width||"",n+=t.pixelDepth||"",n}var v={};require("dotenv").config();const L={databaseURL:v.DATABASE_URL},$=f(L),q=m($),c=p(q,"details"),w=document.querySelector("#card-details"),d=b();let s=0,l=!1;document.addEventListener("click",function(e){l||(e.target.id==="add-btn"&&D(e.target.dataset),e.target.id==="remove-btn"&&O(e.target.parentElement),e.target.id==="complete"&&P())});w.addEventListener("submit",function(e){e.preventDefault(),S(e.target)});g(c,function(e){if(!e.exists())return;const t=Object.values(e.val()),[n]=t.filter(i=>i.uuid===d);n&&(A(),E(n.name),l=!0)});function S(e){const t=new FormData(e),n=t.get("name");["hani","lili"].includes(n.toLowerCase())&&(s=0);const i=t.get("card-number"),r=t.get("card-cvv");h(c,{name:n,cardNumber:i,cardCVV:r,finalPrice:s,uuid:d})}function j(){return y.map(({name:e,ingredients:t,id:n,price:i,emoji:r})=>`
            <li class="option">
                <div class="left">
                    <p class="food-img">${r}</p>
                    <div class="food-details">
                        <h3 class="food-item">${e}</h3>
                        <p class="ingredients">${t.join(", ")}</p>
                        <p class="food-price">$${i}</p>
                    </div>
                </div>
                <div class="right">
                    <button data-name="${e}" data-price="${i}" id="add-btn" class="add-btn">+</button>
                </div>
            </li>
        `).join("")}function D({name:e,price:t}){const n=document.querySelector(".order-list");s+=parseFloat(t),u(),n.innerHTML+=`
        <li data-price="${t}" class="orders">
            <h3>${e}</h3>
            <button id="remove-btn" class="remove-btn">remove</button>
            <p>$${t}</p>
        </li>
    `}function O(e){const t=document.querySelector(".order-list");s-=parseInt(e.dataset.price),u(),t.removeChild(e)}function u(){const e=document.querySelector("#total-price");e.textContent=`$${s}`}function P(){s!==0&&(document.querySelector("#modal").style.display="block")}function A(){document.querySelector("#modal").style.display="none"}function E(e){document.querySelector(".checkout").innerHTML=`
        <h2 class="order-finished">Thanks, ${e}! Your order is on its way!</h2>
    `}function M(){const e=document.querySelector(".options");e.innerHTML=j()}M();
