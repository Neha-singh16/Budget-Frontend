import { configureStore } from "@reduxjs/toolkit";
import menuSlice from "./menuSlice";
import userSlice from "./userSlice";
import budgetReducer from "./budgetSlice";
import categoryReducer from "./categorySlice";
import expenseReducer from "./expenseSlice";
import dashboardReducer from "./dashboardSlice";


const store = configureStore({
    reducer : {
        menu : menuSlice,
        user : userSlice,
         expense: expenseReducer,
        budget: budgetReducer,
        category: categoryReducer,  
         dashboard: dashboardReducer
    }
})

export default store;