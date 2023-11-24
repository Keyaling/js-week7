(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const e of document.querySelectorAll('link[rel="modulepreload"]'))i(e);new MutationObserver(e=>{for(const r of e)if(r.type==="childList")for(const a of r.addedNodes)a.tagName==="LINK"&&a.rel==="modulepreload"&&i(a)}).observe(document,{childList:!0,subtree:!0});function c(e){const r={};return e.integrity&&(r.integrity=e.integrity),e.referrerPolicy&&(r.referrerPolicy=e.referrerPolicy),e.crossOrigin==="use-credentials"?r.credentials="include":e.crossOrigin==="anonymous"?r.credentials="omit":r.credentials="same-origin",r}function i(e){if(e.ep)return;e.ep=!0;const r=c(e);fetch(e.href,r)}})();let o=[];axios.get("https://raw.githubusercontent.com/hexschool/js-training/main/travelAPI-lv1.json").then(n=>{o=n.data,s(o),f(o)}).catch(function(n){alert(n.message)});const m=document.querySelector(".ticketCard-area"),u=document.querySelector("#searchResult-text");function s(n){let t="";n.forEach(function(c){t+=`
    <li class="ticketCard col-md-6 col-lg-4 mb-9">
    <div class="ticketCard-img position-relative">
        <a href="#">
        <img src="${c.imgUrl}" alt="" class="rounded-top">
        </a>
        <div class="ticketCard-region bg-primary text-white  py-2 position-absolute start-0 rounded-end">${c.area}</div>
        <div class="ticketCard-rank bg-primary text-white px-4 position-absolute start-0 rounded-end">${c.rate}</div>
    </div>
    <div class="ticketCard-content px-5 pt-5 d-flex flex-column rounded-bottom">
        <div>
        <h3>
            <a href="#" class="ticketCard-name border-bottom border-primary border-2 pb-1 mb-4">${c.name}</a>
        </h3>

        </div>
        <div class="flex-grow-1">
        <p class="ticketCard-description text-dark lh-base">
            ${c.description}
        </p>
        </div>
        <div class="ticketCard-info d-flex justify-content-between text-primary align-items-center">
        <p class="ticketCard-num" style="font-variation-settings: 'FILL' 1, 'wght' 700, 'GRAD' 0, 'opsz' 24;">

            <span class="material-symbols-outlined align-middle fs-5">
            error
            </span>

            剩下最後 <span id="ticketCard-num" class="fw-medium">${c.group}</span> 組
        </p>
        <div class="ticketCard-price d-flex align-content-center">
            <p class="align-self-center">TWD</p><p id="ticketCard-price" class="fs-2 ms-1 roboto-font-family fw-medium">${c.price}</p>
        </div>
        </div>
    </div>
    </li>
`}),m.innerHTML=t,u.textContent=`本次搜尋共${n.length} 筆資料`}function f(n){let t={};n.forEach(function(e){t[e.area]===void 0?t[e.area]=1:t[e.area]+=1});let c=[];Object.keys(t).forEach(function(e){let r=[];r.push(e),r.push(t[e]),c.push(r)}),c3.generate({size:{height:184,width:160},data:{columns:c,type:"donut"},donut:{title:"套票地區比重"},color:{pattern:["#E68618","#26C0C7","#5151D3","#ffbb78","#2ca02c","#98df8a","#d62728","#ff9896","#9467bd","#c5b0d5","#8c564b","#c49c94","#e377c2","#f7b6d2","#7f7f7f","#c7c7c7","#bcbd22","#dbdb8d","#17becf","#9edae5"]}})}const p=document.querySelector(".regionSearch"),l=document.querySelector(".cantFind-area");p.addEventListener("change",function(n){let t=[];n.target.value===""?t=o:o.forEach(function(c){n.target.value===c.area&&t.push(c)}),t.length===0?l.classList.remove("d-none"):l.classList.add("d-none"),s(t),u.textContent=`本次搜尋共${t.length} 筆資料`});const g=document.querySelector("#ticketName"),h=document.querySelector("#ticketImgUrl"),v=document.querySelector("#ticketRegion"),y=document.querySelector("#ticketPrice"),b=document.querySelector("#ticketNum"),k=document.querySelector("#ticketRate"),C=document.querySelector("#ticketDescription"),x=document.querySelectorAll(".form-group input,.form-group select,.form-group textarea"),d=document.querySelectorAll("[data-message]"),S=document.querySelector(".addTicket-btn");S.addEventListener("click",function(n){let t=[],c=[],i="";if(x.forEach(function(e,r){e.value===""?(t.push(r),t.forEach(function(a){d[a].innerHTML=`
        <div style="font-variation-settings: 'FILL' 1, 'wght' 700, 'GRAD' 0, 'opsz' 48;">
            <span class="material-symbols-outlined text-danger align-middle">
                error
            </span>
            <span class="text-danger fw-medium">必填!</span>
        </div>
        
    `})):e.value!==""&&(c.push(r),c.forEach(function(a){d[a].innerHTML=i}))}),t.length===0){let e={};e.id=o.length,e.name=g.value,e.imgUrl=h.value,e.area=v.value,e.price=y.value,e.group=b.value,e.rate=k.value,e.description=C.value,o.push(e),s(o),f(o),p.value="",document.querySelector(".addTicket-form").reset()}});console.log("Hello world!");
