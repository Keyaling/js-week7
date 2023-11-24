
let data=[];
axios.get('https://raw.githubusercontent.com/hexschool/js-training/main/travelAPI-lv1.json')
.then((response) => {	
// console.log(response.data);//取到最外層的物件
    data = response.data;//進一步取到最外層的物件裡的data屬性資料
    
    renderCard(data);//進入網頁時即顯示資料
    makeChartData(data);//進入網頁時立即將資料轉換成圖表

})
.catch(function(err){
    alert(err.message);
});

const list = document.querySelector(".ticketCard-area");//想要呈現畫面的區域
const searchResultNum=document.querySelector("#searchResult-text");//data的長度

// 預設載入函式
function renderCard(data){
let str ='';
data.forEach(function(item){
str+=`
    <li class="ticketCard col-md-6 col-lg-4 mb-9">
    <div class="ticketCard-img position-relative">
        <a href="#">
        <img src="${item.imgUrl}" alt="" class="rounded-top">
        </a>
        <div class="ticketCard-region bg-primary text-white  py-2 position-absolute start-0 rounded-end">${item.area}</div>
        <div class="ticketCard-rank bg-primary text-white px-4 position-absolute start-0 rounded-end">${item.rate}</div>
    </div>
    <div class="ticketCard-content px-5 pt-5 d-flex flex-column rounded-bottom">
        <div>
        <h3>
            <a href="#" class="ticketCard-name border-bottom border-primary border-2 pb-1 mb-4">${item.name}</a>
        </h3>

        </div>
        <div class="flex-grow-1">
        <p class="ticketCard-description text-dark lh-base">
            ${item.description}
        </p>
        </div>
        <div class="ticketCard-info d-flex justify-content-between text-primary align-items-center">
        <p class="ticketCard-num" style="font-variation-settings: 'FILL' 1, 'wght' 700, 'GRAD' 0, 'opsz' 24;">

            <span class="material-symbols-outlined align-middle fs-5">
            error
            </span>

            剩下最後 <span id="ticketCard-num" class="fw-medium">${item.group}</span> 組
        </p>
        <div class="ticketCard-price d-flex align-content-center">
            <p class="align-self-center">TWD</p><p id="ticketCard-price" class="fs-2 ms-1 roboto-font-family fw-medium">${item.price}</p>
        </div>
        </div>
    </div>
    </li>
`;
})
list.innerHTML = str;
searchResultNum.textContent=`本次搜尋共${data.length} 筆資料`
};
//製作統計圖表
function makeChartData(data){
    //將每個票卡的地區抓取來並統計地區資料
    let newObj={};
    data.forEach(function(item){
        if(newObj[item.area] === undefined ){
            newObj[item.area] = 1;
        }else{
            newObj[item.area] +=1;
        }
    })
    //console.log(newObj);//{高雄: 1, 台北: 1, 台中: 1}

    //將 newObj的資料變成c3.js所需的格式[[]]
    let newData = [];
    let area = Object.keys(newObj);
    // area output ["高雄","台北","台中"]
    area.forEach(function(item){
        let ary = [];
        ary.push(item);//ex:高雄
        ary.push(newObj[item]);//ex:1
        newData.push(ary);
        // newData.sort();
    });
    console.log(newData);//[['高雄', 1],['台北', 1],['台中', 1]] 
    var chart = c3.generate({
        size: {
            height: 184,
            width: 160
        },
        data: {
            columns: newData,
            type : 'donut',
        },
        donut: {
            title: "套票地區比重"
        },
        color: {
            pattern: ['#E68618', '#26C0C7', '#5151D3', '#ffbb78', '#2ca02c', '#98df8a', '#d62728', '#ff9896', '#9467bd', '#c5b0d5', '#8c564b', '#c49c94', '#e377c2', '#f7b6d2', '#7f7f7f', '#c7c7c7', '#bcbd22', '#dbdb8d', '#17becf', '#9edae5']
        },
        
    });
};


// 篩選器邏輯
const regionSearch = document.querySelector(".regionSearch");
const cantFindArea = document.querySelector(".cantFind-area");
regionSearch.addEventListener("change",function(e){
let filterData = [];
if (e.target.value === "") {
//全部地區
    filterData = data;
} else {
//符合搜尋的地區
    data.forEach(function (item) {
    if (e.target.value === item.area) {
        filterData.push(item);
        }
    });
}
//不符合搜尋的地區
if (filterData.length === 0) {
    cantFindArea.classList.remove("d-none");
}else {

    cantFindArea.classList.add("d-none");
}

renderCard(filterData);
    searchResultNum.textContent = `本次搜尋共${filterData.length} 筆資料`;
});


//新增邏輯
const ticketName=document.querySelector("#ticketName");
const ticketImgUrl=document.querySelector("#ticketImgUrl");
const ticketRegion=document.querySelector("#ticketRegion");
const ticketPrice=document.querySelector("#ticketPrice");
const ticketNum=document.querySelector("#ticketNum");
const ticketRate=document.querySelector("#ticketRate");
const ticketDescription=document.querySelector("#ticketDescription");

const inputs=document.querySelectorAll(".form-group input,.form-group select,.form-group textarea");
const dataMessage=document.querySelectorAll("[data-message]");


const addTicketBtn=document.querySelector(".addTicket-btn");
addTicketBtn.addEventListener("click",function(e){
// console.log("你按到我了");
let newArr1=[];//暫存沒有資料的index
let newArr2=[];//暫存有資料的index
let content=""
inputs.forEach(function(item,index){
if(item.value===""){
newArr1.push(index);
newArr1.forEach(function(item){
dataMessage[item].innerHTML=
    `


            <div style="font-variation-settings: 'FILL' 1, 'wght' 700, 'GRAD' 0, 'opsz' 48;">
            <span class="material-symbols-outlined text-danger align-middle">
            error
            </span>
            <span class="text-danger fw-medium">必填!</span>
            </div>
    
`;
})
}else if(item.value!==""){
newArr2.push(index);
newArr2.forEach(function(item){
dataMessage[item].innerHTML=content;
})
}
});

if(newArr1.length === 0){
    let obj={};
    obj.id=data.length;
    obj.name=ticketName.value;
    obj.imgUrl=ticketImgUrl.value;
    obj.area=ticketRegion.value;
    obj.price=ticketPrice.value;
    obj.group=ticketNum.value;
    obj.rate=ticketRate.value;
    obj.description=ticketDescription.value;
    data.push(obj);
    //重新渲染資料
    renderCard(data);
    makeChartData(data);
    //將欄位清空(簡潔的方法)
    const ticketForm = document.querySelector(".addTicket-form");
    ticketForm.reset();
    
    }
})


