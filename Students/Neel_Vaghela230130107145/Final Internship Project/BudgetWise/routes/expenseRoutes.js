const express = require("express");
const router = express.Router();
const Expense = require("../models/Expense");

// Home Page - Show All Expenses
router.get("/", async (req, res) => {
    try {

        const expenses = await Expense.find()
            .sort({ date: -1, _id: -1 });

        res.render("index", { expenses });

    } catch (err) {

        console.log(err);
        res.send("Error fetching expenses");

    }
});

// Show Add Expense Form
router.get("/add", (req, res) => {
    res.render("addExpense");
});

// Save Expense
router.post("/add", async (req, res) => {
    try {
        const expense = new Expense(req.body);
        await expense.save();

        res.redirect("/");
    } catch (err) {
        console.log(err);
        res.send("Error saving expense");
    }
});

router.get("/edit/:id", async (req, res) => {

    try {

        const expense = await Expense.findById(req.params.id);

        res.render("editExpense", { expense });

    }

    catch (err) {

        console.log(err);

        res.send("Expense Not Found");

    }

});


router.put("/edit/:id", async (req, res) => {

    try {

        await Expense.findByIdAndUpdate(req.params.id, req.body);

        res.redirect("/");

    }

    catch (err) {

        console.log(err);

        res.send("Update Failed");

    }

});

// Delete Expense
router.delete("/delete/:id", async (req, res) => {

    try {

        await Expense.findByIdAndDelete(req.params.id);

        res.redirect("/");

    }

    catch (err) {

        console.log(err);

        res.send("Delete Failed");

    }

});


module.exports = router;