// Constants
const DINGUS_PRICE = 14.25;
const WIDGET_PRICE = 9.99;
const ZERO_FORMAT = '0.00';
const DEBUG = true; // Where might this flag be used? (It's not mandatory)

// Global store (What else would you need here?)
let store = {
  orderHistory: [[1, '01/01/2020', 1, 1], [2, '01/02/2020', 2, 2]]
};

window.addEventListener('load', function() {
	function generateEntries() {
		// Returns an orderHistory array
		// [ID#, Date, Dingus quantity, Widget quantity]
		return [
		  [1, '01/01/2020', 1, 1], 
		  [2, '01/02/2020', 2, 2]
		]
	}
	
	function generateTable() {
		let table = document.getElementsByTagName('tbody')[0];
		let entries;
		if (localStorage.getItem("storage")==null) {
			entries = generateEntries();
			localStorage.setItem("order_His", JSON.stringify(store));
		} else {
			var ret = JSON.parse(localStorage.getItem("order_His"));
			entries = ret.orderHistory;
		}
		let d_num = 0
		let w_num = 0
		let total_num = 0
		for (i = 0; i < entries.length; i++) {
			let entry = entries[i];
			let row = table.insertRow();
			for (j = 0; j < entry.length; j++) {
				let val = entry[j];
				let cell = row.insertCell();
				let text = document.createTextNode(val);
				cell.appendChild(text);
			}
			let c = row.insertCell();
			d_num += entry[2];
			w_num += entry[3];
			let total = (entry[2] * DINGUS_PRICE + entry[3] * WIDGET_PRICE).toFixed(2);
			total_num += Number(total);
			let text = document.createTextNode("$"+total);
			c.appendChild(text);
		}
		document.getElementById("d_num_text").innerHTML = d_num;
		document.getElementById("w_num_text").innerHTML = w_num;
		document.getElementById("sum_num_text").innerHTML = total_num;
	}
	generateTable();

	
	function order(){
		let d_v = document.getElementById('d_quantity').value;
		let w_v = document.getElementById('w_quantity').value;
		if (((d_v > 0)|(w_v > 0))&&((d_v >= 0)&&(w_v >= 0))) {
			document.getElementById("order").removeAttribute("disabled");
		} else {
			document.getElementById("order").setAttribute("disabled", null);
		}
	}
	
	function cancel() {
		document.getElementById("order").setAttribute("disabled", null);
		document.getElementById('d_quantity').value = 0;
		document.getElementById('w_quantity').value = 0;
		document.getElementById('d_total').value = 0;
		document.getElementById('w_total').value = 0;
		document.getElementById('Total').value = 0;
	}

	function d_total() {
		let d_q = document.getElementById('d_quantity').value;
		let d_total = d_q * DINGUS_PRICE;
		document.getElementById("d_total").value = Number(d_total);
		document.getElementById("Total").value = (Number(document.getElementById("w_total").value) + Number(document.getElementById("d_total").value)).toFixed(2);
	}

	function w_total() {
		let w_q = document.getElementById('w_quantity').value;
		let w_total = w_q * WIDGET_PRICE;
		document.getElementById("w_total").value = Number(w_total);
		document.getElementById("Total").value = (Number(document.getElementById("w_total").value) + Number(document.getElementById("d_total").value)).toFixed(2);
	}

	function today_date() {
		var today = new Date();
		var dd = String(today.getDate()).padStart(2, '0');
		var mm = String(today.getMonth() + 1).padStart(2, '0');
		var yy = today.getFullYear();
		today = mm + "/" + dd + "/" + yy;
		return today;
	}

	function add_row() {
		let table = document.getElementsByTagName('tbody')[0];
		let id = Number(table.rows[table.rows.length-1].cells[0].innerHTML);
		let row = table.insertRow();

		let c_id = row.insertCell();
		let text_id = document.createTextNode(id+1);
		c_id.appendChild(text_id);

		let c_date = row.insertCell();
		let date = today_date();
		let text_date = document.createTextNode(date);
		c_date.appendChild(text_date);

		let c_dingus = row.insertCell();
		let text_dingus = document.createTextNode(Math.floor(document.getElementById("d_quantity").value));
		c_dingus.appendChild(text_dingus);

		let c_widget = row.insertCell();
		let text_widget = document.createTextNode(Math.floor(document.getElementById("w_quantity").value));
		c_widget.appendChild(text_widget);

		let c_total = row.insertCell();
		let text_total = document.createTextNode('$' + Number(document.getElementById("Total").value).toFixed(2));
		c_total.appendChild(text_total);

		document.getElementById("d_num_text").innerHTML = Number(document.getElementById("d_num_text").innerHTML) + Number(document.getElementById("d_quantity").value);
		document.getElementById("w_num_text").innerHTML = Number(document.getElementById("w_num_text").innerHTML) + Number(document.getElementById("w_quantity").value);
		document.getElementById("sum_num_text").innerHTML = (Number(document.getElementById("sum_num_text").innerHTML) + Number(document.getElementById("Total").value)).toFixed(2);

		let new_r = [id+1, date, Number(document.getElementById("d_quantity").value), Number(document.getElementById("w_quantity").value)];
		saved(new_r);
	}

	function saved(new_r) {
		localStorage.setItem("storage", JSON.stringify(true));
		let ret = JSON.parse(localStorage.getItem("order_His"));
		ret.orderHistory.push(new_r);
		localStorage.setItem("order_His", JSON.stringify(ret));
	}

	document.getElementById("d_quantity").addEventListener("keyup", order);
	document.getElementById("d_quantity").addEventListener("keyup", d_total);
	document.getElementById("w_quantity").addEventListener("keyup", order);
	document.getElementById("w_quantity").addEventListener("keyup", w_total);
	document.getElementById("d_quantity").addEventListener("change", order);
	document.getElementById("d_quantity").addEventListener("change", d_total);
	document.getElementById("w_quantity").addEventListener("change", order);
	document.getElementById("w_quantity").addEventListener("change", w_total);
	document.getElementById("order").addEventListener("click", add_row);
	document.getElementById("order").addEventListener("click", cancel);
	document.getElementById("cancel").addEventListener("click", cancel);
})


