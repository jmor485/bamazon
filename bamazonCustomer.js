var mysql = require("mysql");
var inquirer = require("inquirer");
var Table = require("cli-table");

var connection = mysql.createConnection({
    host: "localhost",
    port: 3306,
    user: "root",
    password: "root",
    database: "bamazonDB"
});

connection.connect(function (err) {
    if (err) throw err;
});

var showProducts = function () {
    queryStr = "Select * FROM products";

    connection.query(queryStr, function (err, res) {
        if (err) throw err;

        console.log("\n");
        console.log("HELLO! Welcome to BAMAZON!");
        console.log("View existing inventory: ");
        console.log("\n");

        var displayTable = new Table({
            head: ["Item ID", "Product Name", "Department Name", "Price $", "Stock Quantity"],
            colWidths: [10, 25, 25, 10, 10]
        });

        for (var i = 0; i < res.length; i++) {
            displayTable.push(
                [res[i].item_id, res[i].product_name, res[i].department_name, res[i].price, res[i].stock_quantity]
            );

        }
        console.log(displayTable.toString());
        console.log("\n");
        userPrompt();
    });

    function userPrompt() {

        inquirer.prompt([
            {
                type: "input",
                name: "item_id",
                message: "What is the item ID of the product you wish to purchase?",
                filter: Number
            },
            {
                type: "input",
                name: "quantity",
                message: "How many units of the product would you like to buy?",
                filter: Number
            },

        ]).then(function (input) {

            console.log("\n---------------------------------\n");

            var quantity = input.quantity;
            var item = input.item_id;

            var queryStr = "Select * FROM products WHERE ?";
            connection.query(queryStr, { item_id: item }, function (err, res) {
                if (err) throw (err);

                if (res.length === 0) {
                    console.log("ERROR! Product not found...");
                    console.log("Please enter valid item ID.");
                    console.log("\n---------------------------------");
                    showProducts();

                } else {
                    var productData = res[0];
                    if (quantity <= productData.stock_quantity) {
                        console.log("YAY! Your product is in stock! Ordering now.");

                        var updatedQueryStr = 'UPDATE products SET stock_quantity = ' +
                            (productData.stock_quantity - quantity) + ' WHERE item_id = ' + item;

                        connection.query(updatedQueryStr, function (err, res) {
                            if (err) throw (err);

                            console.log("CONGRATS! Your order has been placed.");
                            console.log("Your total cost for " + productData.product_name + " is $" + productData.price * quantity + ".");
                            console.log("Thank you for shopping with us at BAMAZON!");
                            console.log("\n---------------------------------\n");

                            connection.end();
                        })
                    } else {
                        console.log("OH NO! Insufficient quantity of " + res[0].product_name + ".");
                        console.log("Cannot place order as is. Please adjust your item quantity.");
                        console.log("\n---------------------------------\n");

                        showProducts();
                    }
                }
            })
        }
        )
    }
}
showProducts();
