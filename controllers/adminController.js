const db = require("../config/database");

function dashboard(req, res) {
    const sql = `SELECT * FROM vw_customer_accounts ORDER BY customer_id DESC`;

    db.query(sql, (err, customers) => {
        if (err) {
            console.error(err);
            return res.send("Database error.");
        }

        res.render("admin-dashboard", { customers });
    });
}

function showCreateCustomer(req, res) {
    res.render("create-customer", { error: null });
}

const userSQL = `INSERT INTO users (username, password, role) VALUES (?, ?, 'customer')`;
const customerSQL = `INSERT INTO customers (user_id, first_name, last_name, email, phone, address) VALUES (?, ?, ?, ?, ?, ?)`;
const accountSQL = `INSERT INTO accounts (customer_id, account_number, account_type, balance, status) VALUES (?, ?, ?, 0.00, 'Active')`;

function createCustomer(req, res) {
    const {
        username,
        password,
        first_name,
        last_name,
        email,
        phone,
        address,
        account_number,
        account_type
    } = req.body;

    db.query(userSQL, [username, password], (err, userResult) => {
        if (err) {
            console.error(err);

            return res.render("create-customer", {
                error: "Unable to create login account."
            });
        }

        const userId = userResult.insertId;

        db.query(customerSQL, [userId, first_name, last_name, email, phone, address], (err, customerResult) => {
            if (err) {
                console.error(err);

                return res.render("create-customer", {
                    error: "Unable to create customer."
                });
            }

            const customerId = customerResult.insertId;

            db.query(accountSQL, [customerId, account_number, account_type], (err) => {
                if (err) {
                    console.error(err);

                    return res.render("create-customer", {
                        error: "Unable to create bank account."
                    });
                }

                res.redirect("/admin");
            });
        });
    })
}

module.exports = {
    dashboard,
    showCreateCustomer,
    createCustomer
}