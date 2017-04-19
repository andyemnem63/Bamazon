		function updateItem() {
			inquirer.prompt([
					{
						type:'input',
						name:'product',
						message:'What is the name of the product'
					}
				]).then(function(answer){
				var query = 'SELECT product_name FROM products';
				var product = answer.product;
					connection.query(query,function(err,res,fields){
						if(err) throw err;
						//Checks if product_name is valid
						for(var i = 0; i <res.length;i++){
							if(res[i].product_name === answer.product){
								//Testing Show products name
								console.log('Product Name' , res[i].product_name);
								console.log('count:' , count);
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

							]).then(function(answer) {
								//Get stock quantity from product that was choosen
								var query = 'SELECT * FROM products WHERE ?'; 
								var stockQty = 0;
								var quantity = parseInt(answer.quantity);
								connection.query(query,[
									{
										product_name: product
									}
								], function(err,res,fields) {
									stockQty = parseInt(res[0].stock_quantity);
									// Update database 
									console.log('Stock Qty: ' , stockQty);
									console.log('quantity: ' , quantity);
									console.log('Stock Qty: ' , product);
									var query ='UPDATE products SET ? WHERE ?'
									connection.query(query,[
										{
											stock_quantity: stockQty + quantity
										},
										{
											product_name: product
										}
									],function(err,res,fields) {
										if(err) throw err;
										console.log("Quantity added!!!");
										displayTable();
									});
								}); 
							});
						}
						else{
							console.log("That item does not exist");
							//Ask for the name of product again
							updateItem();
						}
					});
			});
		}
