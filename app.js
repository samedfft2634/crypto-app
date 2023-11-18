const searchInput = document.getElementById("searchInput")
let coins = []
const getData = async () => {
	try {
		const response = await fetch(`https://api.coinranking.com/v2/coins`);
		if(response.ok){
			const data = await response.json();
			coins = data.data.coins
			createTable(data.data.coins);
		} else {
			document.getElementById("list").innerHTML = `
			<div class="text-center ">
			<h1 class="display-1">404 <h1>
			<h2 class="display-1">Not Found! </h2>
			</div>
			`
		}
	
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
        <th>Change <i class="fa-solid fa-arrow-up-right-dots"/></th>
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
        <sup class="bg-warning bd-rounded rounded-1 text-white ">${
			item.symbol
		}</sup></td>
        <td> &dollar;${Number(item.price).toFixed(4)}</td>
        <td>${formatMarketCap(item.marketCap)}</td>
        <td class="stonks d-flex gap-2 align-items-center">${item.change}</td>  
        </tr>  
        `;
	});

	tableHTML += `</tbody>`;
	table.innerHTML = tableHTML;

	// change cells
	const changeCells = table.querySelectorAll(".stonks");
	data.forEach((item, index) => {
		const changeCell = changeCells[index];
		const icon = changePrice(item.change);
		changeCell.appendChild(icon);
		if (item.change > 0) {
            changeCell.style.color = "lightgreen";
        }
		else {
            changeCell.style.color = "red";
        }
	});
};

// format dollar
const formatMarketCap = (marketCap) => {
	const formatter = new Intl.NumberFormat("en-US", {
		style: "currency",
		currency: "USD",
		minimumFractionDigits: 0,
		maximumFractionDigits: 0,
	});
	return formatter.format(marketCap);
};

//color style
const changePrice = (change) => {
	
	const stonk = document.createElement("i");
	if (change > 0) {
		stonk.className = "fa-solid fa-arrow-trend-up";
		stonk.style.color = "lightgreen";
	} else {
		stonk.className = "fa-solid fa-arrow-trend-down";
		stonk.style.color = "red";
	}
	return stonk;
};

searchInput.addEventListener("input", (e) => {
	const table = document.getElementById("coinTable");
	console.log(e.target.value);
	table.innerHTML = "";
	console.log(coins)
	let result = coins.filter((item) => item.name.toLowerCase().includes(e.target.value.toLowerCase()))
	console.log(result)
	let tableHTML = `
    <thead>
    <tr>
        <th>#</th>
        <th>Names</th>
        <th>Price</th>
        <th>Market Cap</th>
        <th>Change <i class="fa-solid fa-arrow-up-right-dots"/></th>
    </tr>
    </thead>
    <tbody>
    `;
	result.forEach((item) => {
		tableHTML += `
        <tr>
        <td>${item.rank}</td>
        <td>
        <span ><img src="${item.iconUrl}"   width="25px" />${item.name}</span>
        <sup class="bg-warning bd-rounded rounded-1 text-white ">${
			item.symbol
		}</sup></td>
        <td> &dollar;${Number(item.price).toFixed(4)}</td>
        <td>${formatMarketCap(item.marketCap)}</td>
        <td class="stonks d-flex gap-2 align-items-center">${item.change}</td>  
        </tr>  
        `;
	});
	tableHTML += `</tbody>`;
	table.innerHTML = tableHTML;
		// .forEach((user) => createTable(user));
});