const getData = async () => {
	try {
		const response = await fetch(`https://api.coinranking.com/v2/coins`);
		const data = await response.json();
		console.log(data.data.coins);
		createTable(data.data.coins);
	} catch (error) {
		console.log("Data extraction failed:", error);
	}
};
getData();

const createTable = (data) => {
	const table = document.getElementById("coinTable");
	let tableHTML = `
    <thead>
    <tr>
        <th>#</th>
        <th>Names</th>
        <th>Price</th>
        <th>Market Cap</th>
        <th>Change</th>
    </tr>
    </thead>
    <tbody>
    `;
	data.forEach((item) => {
		tableHTML += `
        <tr>
        <td>${item.rank}</td>
        <td>
        <span><img src="${item.iconUrl}" width="25px" />${item.name}</span>
        <sup class="bg-warning bd-rounded rounded-1 text-white ">${item.symbol}</sup></td>
        <td> &dollar;${Number(item.price).toFixed(4)}</td>
        <td>${formatMarketCap(item.marketCap)}</td>
        <td ><i class="fa-solid fa-arrow-up-right-dots " id="stonks"></i>${item.change}${changePrice(item.change)} </td>
        </tr>  
        `;
	});

    tableHTML += `</tbody>`
    table.innerHTML = tableHTML
};

// format dollar
const formatMarketCap = (marketCap) =>{
    const formatter = new Intl.NumberFormat('en-US',{
        style:'currency',
        currency:'USD',
        minimumFractionDigits: 0, 
        maximumFractionDigits: 0,
    })
    return formatter.format(marketCap)
}

//color style
const changePrice = (change)=>{

    const stonk = document.createElement("i")
    const changeico = document.getElementById("four")
    if(change > 0){
        stonk.className ="fa-solid fa-arrow-trend-up"
        stonk.style.color = "lightgreen"
    } else {
        stonk.className = "fa-solid fa-arrow-trend-down"
        stonk.style.color = "red"
    }
    changeico.appendChild(stonk)
}

{/* <i class="fa-solid fa-arrow-trend-up"></i> */}
{/* <i class="fa-solid fa-arrow-trend-down"></i> */}