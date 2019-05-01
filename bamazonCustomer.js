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
    var query = "Select * FROM products";
    connection.query(query, function (err, res) {
        if (err) throw err;
        var displayTable = new Table({
            head: ["Item ID", "Product Name", "Department Name", "Price", "Stock Quantity"],
            colWidths: [10, 25, 25, 10, 10]
        });
        for (var i = 0; i < res.length; i++) {
            displayTable.push(
                [res[i].item_id, res[i].product_name, res[i].department_name, res[i].price, res[i].stock_quantity]
            );
        }
        console.log(displayTable.toString());
        userPrompt();
    });


    function userPrompt() {

        inquirer.prompt([
            {
                type: "input",
                name: "id",
                message: "What is the item ID of the product you wish to purchase?",
                filter: Number
            },
            {
                type: "input",
                name: "quantitiy",
                message: "How many units of the product would you like to buy?",
                filter: Number
            },

        ]).then(function (answers) {

            var desiredQuantity = answers.quantity;
            var productID = answers.id;
            purchaseProducts(productID, desiredQuantity);

        });
    };

    function purchaseProducts(id, restockAmt) {
        connection.query("Select * FROM products WHERE item_id = " + id, function (err, res) {
            if (err) { console.log(err) };

            if (restockAmt <= res[0].stock_quantity) {
                var totalCost = res[0].price * restockAmt;
                console.log("YAY! Your order is in stock!");
                console.log("Your total cost for " + restockAmt + " "
                    + res[0].product_name + " is " + totalCost + " Thank you!");


                connection.query("UPDATE products SET stock_quantity = stock_quantity - " + restockAmt + "WHERE item_id = " + id);
            }
            else {
                console.log("OH NO! Insufficient quantity... " + res[0].product_name + "try again.");
            };
            showProducts();
        });
    };
    showProducts();
}