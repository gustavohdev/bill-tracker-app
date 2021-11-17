import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom";
import "./index.css";
//import App from "./App";

import AddCategory from "./components/AddCategory";
import AddBill from "./components/AddBill";
import NavBar from "./components/NavBar";
import Chart from "./components/Chart";
import BillsTable from "./components/BillsTable";

function App() {
    const [shouldShowAddCategory, setShouldShowAddCategory] = useState(false);
    const [categories, setCategories] = useState([]);
    const [bills, setBills] = useState([]);
    const [shouldShowAddBill, setShouldShowAddBill] = useState(true);

    const addCategory = (category) => {
        const updateCategories = [...(categories || []), category];
        setCategories(updateCategories);
        setShouldShowAddCategory(false);
        localStorage.setItem("categories", JSON.stringify(updateCategories));
    };

    const showAddCategory = () => {
        setShouldShowAddCategory(true);
    };

    const addBill = (amount, category, date) => {
        const bill = { amount, category, date };
        const updatedBills = [...(bills || []), bill];
        setBills(updatedBills);
        setShouldShowAddBill(false);
        localStorage.setItem("bills", JSON.stringify(updatedBills));
    };

    /* useEffect(() => {
        const categoriesInLocalStorage = JSON.parse(localStorage.getItem("categories"));
        const billsInLocalStorage = JSON.parse(localStorage.getItem("bills"));

        console.log(categoriesInLocalStorage);

       // if (categoriesInLocalStorage !== categories) {
            setCategories(categoriesInLocalStorage);
            console.log(categories);
       // }

        const categoriesExistAfterInsert = JSON.stringify(localStorage.getItem("categories"));

        if (categoriesExistAfterInsert.length != null) {
            console.log("passsei");
            setShouldShowAddCategory(false);
        }
    }, []);*/

    useEffect(() => {
        const categoriesInLocalStorage = JSON.parse(localStorage.getItem("categories"));
        const billsInLocalStorage = JSON.parse(localStorage.getItem("bills"));

        setCategories(categoriesInLocalStorage);
        setBills(billsInLocalStorage);

        if (!categoriesInLocalStorage) {
            setShouldShowAddCategory(true);
        }
    }, []);

    return (
        <div className="App">
            {shouldShowAddCategory ? (
                <AddCategory onSubmit={addCategory} />
            ) : shouldShowAddBill ? (
                <AddBill onSubmit={addBill} categories={categories} />
            ) : (
                <div>
                    <NavBar categories={categories} showAddCategory={showAddCategory} />
                    <div className="container flex">
                        <div className="w-1/2">
                            <BillsTable />
                        </div>
                        <div className="w-1/2">
                            <Chart />
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);
