//NPM packages
var mysql = require('mysql');
var Table = require('cli-table');
var inquirer = require('inquirer');

var resString = '';
var resJSON = '';
//Counter
var count = 0;

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
					type:'rawlist',
					name: 'choice',
					message: 'What would you like to do?',
					choices:['Add new item', 'Add qunatity to existing item']
				}

	])
	.then(function(answer) {
		if(answer.choice === 'Add qunatity to existing item'){
			updateItem();
		} 

	});
}

function updateItem() {
	inquirer.prompt([
			{
				type:'input',
				name:'name',
				message:'What is the name of the product'
			}
		]).then(function(answer){
		var query = 'SELECT product_name FROM products';
		var product = answer.name;
			connection.query(query,function(err,res,fields){
				if(err) throw err;
				//Checks if product_name is valid
				for(var i = 0; i <res.length;i++){
					if(res[i].product_name === answer.name){
						console.log(res[i].product_name);
						count++;
					}
				}
				//If item exist.....
				if(count > 0){
					//Reset counter
					count = 0;
					//Ask for quantity user would like to add
					inquirer.prompt([
						{
							type: 'input',
							name: 'quantity',
							message: 'How many would you like to add ?'		
						}

					]).then(function(answer){
						var query ='SET SQL_SAFE_UPDATES = 0 UPDATE products SET ? WHERE ?'
						connection.query(query,[
							{
								stock_quantity: //quantity TRY TO GET STOCK QUANITY
							},
							{
								product_name: product
							}
						])
					})
				}
				else{
					console.log("That item does not exist");
					//Ask for the name of product again
					updateItem();
				}
			});
	});
}

