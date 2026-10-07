function loging() {

    const fullname = document.getElementById("Namee").value.trim();
    const mail = document.getElementById("email").value.trim();
    const pass = document.getElementById("password").value.trim();

    const logdetails = {
        fullname: fullname,
        mail: mail,
        pass: pass
    };


    // Check empty fields
    if (logdetails.fullname === "" ||
        logdetails.mail === "" ||
        logdetails.pass === "") {

        alert("Please fill all the fields");
        return;
    }


    // Check whether email already exists
    const existingUser = localStorage.getItem(logdetails.mail);

    if (existingUser) {

        alert("An account with this email already exists");
        return;
    }


    // Save user details
    localStorage.setItem(
        logdetails.mail,
        JSON.stringify(logdetails)
    );


    // Success
    alert("Registered successfully");

    // Go to login page
    window.location.href = "login.html";
}


function logbtnn(){
    const logindetails={
        email:email.value,
        psd:password.value
    }
    if(logindetails.email=='' || logindetails.psd==''){
        alert("fill the form")
    }
    else{
        let detai=JSON.parse(localStorage.getItem(logindetails.email))
        console.log(detai);
        if(detai){
            if(detai.pass==logindetails.psd){
                localStorage.setItem("currentuser",logindetails.email)
                alert("login successfully")
                window.location.href="dashbord.html"
            }
            else{
                alert("wrong password")
            }
        }
        else{
            alert("invalid account")
        }
    }
}




























// =====================================
// ADD INCOME
// =====================================

function addIncome() {

    let transactionType =
        document.getElementById("transactionType").value;

    let amount =
        document.getElementById("amount").value;


    // Check transaction type
    if (transactionType === "") {
        alert("Please select transaction type");
        return;
    }


    // Check amount
    if (amount === "") {
        alert("Please enter amount");
        return;
    }


    // Create income object
    let income = {

        transactionType: transactionType,

        amount: amount,

        // Date and time automatically generated
        date: new Date().toLocaleString()

    };


    // Get existing incomes
    let incomes =
        JSON.parse(localStorage.getItem("incomes")) || [];


    // Add new income
    incomes.push(income);


    // Store in localStorage
    localStorage.setItem(
        "incomes",
        JSON.stringify(incomes)
    );


    alert("Income added successfully!");


    // Clear inputs
    document.getElementById("transactionType").value = "";

    document.getElementById("amount").value = "";
}


// =====================================
// ADD EXPENSE
// =====================================

function addExpense() {

    let category =
        document.getElementById("category").value;

    let categoryAmount =
        document.getElementById("categoryAmount").value;


    // Check category
    if (category === "") {

        alert("Please select a category");
        return;

    }


    // Check amount
    if (categoryAmount === "") {

        alert("Please enter an amount");
        return;

    }


    // Convert expense amount to number
    let expenseAmount = Number(categoryAmount);


    // Check if amount is valid
    if (expenseAmount <= 0) {

        alert("Please enter a valid expense amount");
        return;

    }


    // =====================================
    // GET TOTAL INCOME
    // =====================================

    let incomes =
        JSON.parse(localStorage.getItem("incomes")) || [];


    let totalIncome = 0;

    incomes.forEach(function(income) {

        totalIncome =
            totalIncome + Number(income.amount);

    });


    // =====================================
    // GET TOTAL EXPENSE
    // =====================================

    let expenses =
        JSON.parse(localStorage.getItem("expenses")) || [];


    let totalExpense = 0;

    expenses.forEach(function(expense) {

        totalExpense =
            totalExpense + Number(expense.amount);

    });


    // =====================================
    // CHECK AVAILABLE BALANCE
    // =====================================

    let remainingBalance =
        totalIncome - totalExpense;


    if (expenseAmount > remainingBalance) {

        alert(
            "You don't have enough available balance for this expense."
        );

        return;

    }


    // =====================================
    // CREATE EXPENSE OBJECT
    // =====================================

    let expense = {

        category: category,

        amount: categoryAmount,

        date: new Date().toLocaleString()

    };


    // =====================================
    // SAVE EXPENSE
    // =====================================

    expenses.push(expense);

    localStorage.setItem(
        "expenses",
        JSON.stringify(expenses)
    );


    alert("Expense added successfully!");


    // =====================================
    // CLEAR INPUTS
    // =====================================

    document.getElementById("category").value = "";

    document.getElementById("categoryAmount").value = "";
}





// =====================================
// LOGOUT
// =====================================

function logout() {

    // Remove logged-in user
    localStorage.removeItem("currentuser");

    // Go back to login page
    window.location.href = "login.html";
}

















// =====================================
// SHOW TRANSACTIONS
// =====================================

function showTransactions() {

    let transactionList =
        document.getElementById("transactionList");


    // Get incomes
    let incomes =
        JSON.parse(localStorage.getItem("incomes")) || [];


    // Get expenses
    let expenses =
        JSON.parse(localStorage.getItem("expenses")) || [];


    // Clear list
    transactionList.innerHTML = "";



    // =====================================
    // SHOW INCOME
    // =====================================

    incomes.forEach(function(income, index) {

        transactionList.innerHTML += `

            <div class="grid grid-cols-1 md:grid-cols-12
                        gap-4 px-6 py-5
                        border-b border-slate-800
                        hover:bg-slate-800/50">

                <!-- Type -->

                <div class="md:col-span-2">

                    <span class="text-emerald-400
                                 font-semibold">

                        Income

                    </span>

                </div>


                <!-- Description -->

                <div class="md:col-span-3
                            text-slate-300">

                    ${income.transactionType}

                </div>


                <!-- Amount -->

                <div class="md:col-span-2
                            text-emerald-400
                            font-semibold">

                    + ₹${income.amount}

                </div>


                <!-- Date -->

                <div class="md:col-span-3
                            text-slate-400">

                    ${income.date}

                </div>


                <!-- Delete -->

                <div class="md:col-span-2
                            md:text-right">

                    <button
                        onclick="deleteIncome(${index})"
                        class="px-3 py-2
                               rounded-lg
                               bg-red-500/10
                               text-red-400
                               hover:bg-red-500
                               hover:text-white
                               text-sm
                               font-semibold
                               transition">

                        Delete

                    </button>

                </div>

            </div>

        `;
    });



    // =====================================
    // SHOW EXPENSE
    // =====================================

    expenses.forEach(function(expense, index) {

        transactionList.innerHTML += `

            <div class="grid grid-cols-1 md:grid-cols-12
                        gap-4 px-6 py-5
                        border-b border-slate-800
                        hover:bg-slate-800/50">

                <!-- Type -->

                <div class="md:col-span-2">

                    <span class="text-red-400
                                 font-semibold">

                        Expense

                    </span>

                </div>


                <!-- Description -->

                <div class="md:col-span-3
                            text-slate-300">

                    ${expense.category}

                </div>


                <!-- Amount -->

                <div class="md:col-span-2
                            text-red-400
                            font-semibold">

                    - ₹${expense.amount}

                </div>


                <!-- Date -->

                <div class="md:col-span-3
                            text-slate-400">

                    ${expense.date}

                </div>


                <!-- Delete -->

                <div class="md:col-span-2
                            md:text-right">

                    <button
                        onclick="deleteExpense(${index})"
                        class="px-3 py-2
                               rounded-lg
                               bg-red-500/10
                               text-red-400
                               hover:bg-red-500
                               hover:text-white
                               text-sm
                               font-semibold
                               transition">

                        Delete

                    </button>

                </div>

            </div>

        `;
    });



    // =====================================
    // NO TRANSACTIONS
    // =====================================

    if (incomes.length === 0 && expenses.length === 0) {

        transactionList.innerHTML = `

            <div class="text-center py-12">

                <p class="text-slate-400">
                    No transactions found.
                </p>

                <a href="add.html"
                   class="inline-block mt-4
                          px-5 py-2
                          rounded-lg
                          bg-emerald-500
                          text-slate-950
                          font-semibold">

                    Add Transaction

                </a>

            </div>

        `;
    }
}



// =====================================
// DELETE INCOME
// =====================================

function deleteIncome(index) {

    let incomes =
        JSON.parse(localStorage.getItem("incomes")) || [];


    // Delete selected income
    incomes.splice(index, 1);


    // Update localStorage
    localStorage.setItem(
        "incomes",
        JSON.stringify(incomes)
    );


    // Refresh history
    showTransactions();
}



// =====================================
// DELETE EXPENSE
// =====================================

function deleteExpense(index) {

    let expenses =
        JSON.parse(localStorage.getItem("expenses")) || [];


    // Delete selected expense
    expenses.splice(index, 1);


    // Update localStorage
    localStorage.setItem(
        "expenses",
        JSON.stringify(expenses)
    );


    // Refresh history
    showTransactions();
}



// =====================================
// LOAD HISTORY PAGE
// =====================================

if (document.getElementById("transactionList")) {

    showTransactions();

}

































// =====================================
// DASHBOARD
// =====================================

function showDashboard() {

    // Get income from localStorage
    let incomes =
        JSON.parse(localStorage.getItem("incomes")) || [];

    // Get expenses from localStorage
    let expenses =
        JSON.parse(localStorage.getItem("expenses")) || [];


    // =====================================
    // TOTAL INCOME
    // =====================================

    let totalIncome = 0;

    incomes.forEach(function (income) {

        totalIncome =
            totalIncome + Number(income.amount);

    });


    // =====================================
    // TOTAL EXPENSE
    // =====================================

    let totalExpense = 0;

    expenses.forEach(function (expense) {

        totalExpense =
            totalExpense + Number(expense.amount);

    });


    // =====================================
    // REMAINING BALANCE
    // =====================================

    let remainingBalance =
        totalIncome - totalExpense;


    // =====================================
    // DISPLAY TOTAL INCOME
    // =====================================

    document.getElementById("totalIncome").innerHTML =
        "₹" + totalIncome.toLocaleString("en-IN");


    // =====================================
    // DISPLAY TOTAL EXPENSE
    // =====================================

    document.getElementById("totalExpense").innerHTML =
        "₹" + totalExpense.toLocaleString("en-IN");


    // =====================================
    // DISPLAY REMAINING BALANCE
    // =====================================

    document.getElementById("balance").innerHTML =
        "₹" + remainingBalance.toLocaleString("en-IN");
}


// =====================================
// RUN DASHBOARD
// =====================================

if (document.getElementById("totalIncome")) {
    showDashboard();
}


