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
getData()

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
    <tbody class="table-group-divider">
    `;
	data.forEach((item) => {
		tableHTML += `
        <tr>
        <td>${item.rank}</td>
        <td>
        <span><img src="${item.iconUrl}" width="25px" class="me-3"/>${item.name}</span>
        <sup  style="color:${item.color}">${
			item.symbol
		}</sup></td>
        <td> &dollar;${Number(item.price).toFixed(4)}</td>
        <td>${formatMarketCap(item.marketCap)}</td>
        <td class="stonks">${item.change}</td>  
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
		stonk.className = "fa-solid fa-arrow-trend-up ms-3";
		stonk.style.color = "lightgreen";
	} else {
		stonk.className = "fa-solid fa-arrow-trend-down ms-3";
		stonk.style.color = "red";
	}
	return stonk;
};

searchInput.addEventListener("input", (e) => {
	const table = document.getElementById("coinTable");
	table.innerHTML = "";
	let result = coins.filter((item) => item.name.toLowerCase().includes(e.target.value.toLowerCase()))
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
    <tbody class="table-group-divider">
    `;
	result.forEach((item) => {
		tableHTML += `
        <tr>
        <td>${item.rank}</td>
        <td>
        <span ><img src="${item.iconUrl}"   class="me-3" width="25px" />${item.name}</span>
        <sup  style="color:${item.color}" ">${
			item.symbol
		}</sup></td>
        <td> &dollar;${Number(item.price).toFixed(4)}</td>
        <td>${formatMarketCap(item.marketCap)}</td>
        <td class="stonks">${item.change}</td>   
        </tr>  
        `;
	});
	tableHTML += `</tbody>`;
	table.innerHTML = tableHTML;
	// change cells
	const cells = table.querySelectorAll(".stonks");
	const changeCellArray = Array.from(cells);
	result.forEach((item, index) => {
		const cell = changeCellArray[index];
		const icon = changePrice(item.change);
		cell.appendChild(icon);
		if (item.change > 0) {
            cell.style.color = "lightgreen";
        }
		else {
            cell.style.color = "red";
        }
	});

});