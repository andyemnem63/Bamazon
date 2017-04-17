//NPM packages
var mysql = require('mysql');
var Table = require('cli-table');
var inquirer = require('inquirer');

var resString = '';
var resJSON = '';

var columns = ['item_id', 'product_name','department_name','price','stock_quantity'];

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
});
// Query Data
function displayTable() {
	
	var query = 'SELECT * FROM products';

	connection.query(query,function(err,res,fields) {
		if(err) throw err;
		//Converts to string
		resString = JSON.stringify(res,null,2);
		//Convert to JSON
		resJSON  = JSON.parse(resString);
		//Testing
		var table = new Table({
		    head: ['item_id', 'product_name','department_name','price','stock_quantity'], 
		    colWidths: [25, 25, 25 ,25 ,25]
		});
		for(var i = 0; i< resJSON.length; i++) {
			//Creates a new array
			var newArray = new Array();
			//adds content to table
			table.push(newArray);
			//Adds content to new array of Nth row
			for(var j = 0; j < columns.length; j++){
				newArray.push(resJSON[i][columns[j]]);
			}
		}
		//Displays Table in terminal
		console.log(table.toString());
		customerRequest();
	});

}

function customerRequest() {
	//Ask customer for id input
	inquirer.prompt([	
			{
				type:'input',
				name: 'id',
				message: 'What is the ID of the product you would like to buy?'
			}
		])
		.then(function(answer) {
			console.log(answer.id);
		});
}