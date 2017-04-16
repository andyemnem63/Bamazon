var mysql = require('mysql');
var Table = require('cli-table');
var resString = '';
var resJSON = '';
var array = [];
	//establish connection
	var connection = mysql.createConnection({
		host		:'localHost',
		user		:'root',
		password	:'root',
		port		:'3306',
		database  	:'bamazon'
	});

// Check to see if connection is successful
connection.connect(function(err){
	if(err) throw err;
	console.log('connectin id' , connection.threadId);
	displayTable();
})

//Query Data
// var query = 'SELECT * FROM products';

// connection.query(query,function(err,res,fields){
// 	if(err) throw err;
// 	//Converts to string
// 	resString = JSON.stringify(res,null,2);
// 	//Convert to JSON
// 	resJSON  = JSON.parse(resString);
// 	//Testing
// 	resJSON[0].product_name;
// });

function displayTable() {
	//Creates Table
	//==========================================
	// instantiate 
	var table = new Table({
	    head: ['item_id', 'product_name','department_name','price','stock_quanity'], 
	    colWidths: [25, 25, 25 ,25 ,25]
	});

	//Adds Content to table  
	// table is an Array, so you can `push`, `unshift`, `splice` and friends 
	table.push(
	    ['First value', 'Second value', 'First value', 'Second value', 'Second value'],
	    ['First value', 'Second value', 'First value', 'Second value', 'Second value']
	);
	console.log(table.toString());

}