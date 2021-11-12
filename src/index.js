import React, { useState } from "react";
import ReactDOM from "react-dom";
import "./index.css";
//import App from "./App";

import AddCategory from "./components/AddCategory";
import AddBill from "./components/AddBill";
import NavBar from "./components/NavBar";
import Chart from "./components/Chart";
import BillsTable from "./components/BillsTable";

function App() {
    const [shouldShowAddCategory, setShouldShowAddCategory] = useState(true);
    const [categories, setCategories] = useState([]);

    const addCategory = (category) => {
        const updateCategories = [...(categories || []), category];
        setCategories(updateCategories);
        setShouldShowAddCategory(false);
    };

    return (
        <div className="App">
            {shouldShowAddCategory ? (
                <AddCategory onSubmit={addCategory} />
            ) : (
                <div>
                    <NavBar />
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
