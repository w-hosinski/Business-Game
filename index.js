buyMachine.addEventListener("click",addMachine1)
rentManufacturingBuilding.addEventListener("click",addManufacturingBuilding1)
hireAssembler.addEventListener("click",addAssembler1)
hireQci.addEventListener("click",addQci1)
rentOfficeBuilding.addEventListener("click",addOfficeBuilding1)
hireAccountant.addEventListener("click",addAccountant1)
reduceTaxesResearch.addEventListener("click",reduceTaxesResearch1)
termLoanAmountDisplay.addEventListener("click",termLoanCheck)
termLoanDurationDisplay.addEventListener("click",termLoanCheck)
termLoanAmountDisplay.addEventListener("keyup",termLoanCheck)
termLoanDurationDisplay.addEventListener("keyup",termLoanCheck)

var money = 200
var baseInputMatPrice = 1
var inputMatPrice = 1
var baseProductPrice = 2
var productPrice = 2
var machineNumber = 0
var machineCost = 14
var machinesPerManufacturingBuilding = 4
var maxMachines = 0
var incomePerMachine = productPrice-inputMatPrice
var machineUtilization = 0
var machineRunningCost = 0.4
var machineSpeed = 1
var machineEfficiency = 1
var machineCycleTime = 1000
var productsPerSecond = 0
var rentPerManufacturingBuilding = 0.9
var manufacturingBuildingNumber  = 0
var manufacturingBuildingSetupCost = 18
var maxManufacturingBuildings = 5
var assemblerNumber = 0
var assemblerHireCost = 7
var assemblerWage = 0.54
var assemblersPerMachine = 1
var qciNumber = 0
var qciHireCost = 9
var qciWage = 0.64
var qciStrength = 0.3
var qciCapacitySquared = 3
var qciIncrementerTime = 100
var qciUtilisation = 0
var accountantNumber = 0
var accountantHireCost = 18
var accountantWage = 0.6
var maxAccountants = 0
var allEmployeesNumber = 0
var maxEmployees = 25
var maxOfficeBuildings = 5
var rentPerOfficeBuilding = 0.4
var officeBuildingNumber = 0
var officeBuildingSetupCost = 10
var accountantsPerOfficeBuilding = 4
var corpTaxRate = 0.25
var taxExpense = 0
var baseTaxCounter = 900
var taxCounter = baseTaxCounter
var salvageMultiple = 0.25
var quarterCounter = 0
var netAnnualIncome = 0
var immediateExpenseDeduction = 0
var oneTimeWriteOff = 0
var revenuesThisQuarter = 0, costOfRevenuesThisQuarter = 0, grossProfitThisQuarter = 0, sgaThisQuarter = 0, rdThisQuarter = 0, operatingIncomeThisQuarter = 0, netInterestExpensesThisQuarter = 0, netInterestExpensesThisQuarter = 0, unusualItemsThisQuarter = 0, earningsBeforeTaxesThisQuarter = 0, taxExpenseApproxThisQuarter = 0, netIncomeApproxThisQuarter = 0
var nolBalance = 0
var costOfRevenuesWriteOff = 0
var reduceTaxesResearchCost = 70
var outsourcedAccountingFee = 0.04
var termLoan1MonthlyPayment = 0
var termLoan1MonthsRemaining = 0
var termLoan1MonthlyInterest = 0  
var termLoanInterestRates = [0.075,0.080,0.087,0.093,0.100]
var tempTermLoanMonthlyPayment = 0
var tempTermLoanInterestRate = 0
var tempTermLoanAmount = 0

const buyMachineE = document.getElementById("buyMachine")
const rentManufacturingBuildingE = document.getElementById("rentManufacturingBuilding")
const hireAssemblerE = document.getElementById("hireAssembler")
const hireQciE = document.getElementById("hireQci")
const hireAccountantE = document.getElementById("hireAccountant")
const rentOfficeBuildingE = document.getElementById("rentOfficeBuilding")
const reduceTaxesResearchE = document.getElementById("reduceTaxesResearch")
const acceptTermLoanE = document.getElementById("acceptTermLoan")
const termLoan1NameDisplayE = document.getElementById("termLoan1NameDisplay")
const termLoan1PaymentsDisplayE = document.getElementById("termLoan1PaymentsDisplay")
const termLoan1TotalDisplayE = document.getElementById("termLoan1TotalDisplay")

function addMachine1() {
    if(machineNumber<maxMachines && money>=machineCost) {
        buyMachineE.disabled = true
        btnBusy(buyMachineE)
        buyMachineE.value = "Ordering Machine..."
        money-=machineCost
        immediateExpenseDeduction += machineCost*(1-salvageMultiple) //Section 179 Deduction (Up to 20)  
        setTimeout(addMachine2,5000)
    }
}

function addMachine2() {
        machineNumber++
        if(machineNumber==maxMachines) {
            buyMachineE.disabled = true
            btnBusy(buyMachineE)
        }
        else{
            buyMachineE.disabled = false
            btnIdle(buyMachineE)
        }
        buyMachineE.value = "Buy 1 Machine (0.4$/Second + 14$)" 
        machineNumberDisplay.innerHTML = machineNumber + " Machines (max:" + maxMachines+")" 
}

function addManufacturingBuilding1() {
    if(manufacturingBuildingNumber<maxManufacturingBuildings && money>=manufacturingBuildingSetupCost){
        rentManufacturingBuildingE.disabled = true
        btnBusy(rentManufacturingBuildingE)
        rentManufacturingBuildingE.value = "Setting up Building..."
        money-=manufacturingBuildingSetupCost
        oneTimeWriteOff += 10 * manufacturingBuildingSetupCost
        setTimeout(addManufacturingBuilding2,5000)
    }
}

function addManufacturingBuilding2() {
    rentManufacturingBuildingE.value = "Rent 1 Manufacturing Building (0.9$/Second + 18$ Setup Cost)"
    maxMachines+=machinesPerManufacturingBuilding
    if(buyMachineE.value !== "Ordering Machine..."){
        buyMachineE.disabled = false
        btnIdle(buyMachineE)
    }
    manufacturingBuildingNumber++
    if(manufacturingBuildingNumber==maxManufacturingBuildings){
        rentManufacturingBuildingE.disabled = true
        btnBusy(rentManufacturingBuildingE)
    }
    else {
        rentManufacturingBuildingE.disabled = false
        btnIdle(rentManufacturingBuildingE)
    }
    manufacturingBuildingNumberDisplay.innerHTML = manufacturingBuildingNumber  + " Manufacturing Buildings (max:" + maxManufacturingBuildings+")"
    machineNumberDisplay.innerHTML = machineNumber + " Machines (max:" + maxMachines+")"
}

function addAssembler1() {
    if(money>=assemblerHireCost && maxEmployees>allEmployeesNumber) {
        hireAssemblerE.disabled = true
        btnBusy(hireAssemblerE)
        hireAssemblerE.value = "Hiring Assembler..."
        money-=assemblerHireCost
        oneTimeWriteOff += 10 * assemblerHireCost
        allEmployeesNumber++
        setTimeout(addAssembler2,5000)     
    }
}

function addAssembler2() {
        hireAssemblerE.value = "Hire 1 Assembler (0.5$/Second + 7$)"
        assemblerNumber++   
        hireAssemblerE.disabled = false
        btnIdle(hireAssemblerE)
        assemblerNumberDisplay.innerHTML = assemblerNumber + " Assemblers"
}

function addQci1() {
    if(money>=qciHireCost && maxEmployees>allEmployeesNumber) {
        hireQciE.disabled = true
        btnBusy(hireQciE)
        hireQciE.value = "Hiring Quality Control Inspector..."
        money-=qciHireCost
        oneTimeWriteOff += 10 * qciHireCost
        allEmployeesNumber++
        setTimeout(addQci2,5000)     
    }
}

function addQci2() {
        hireQciE.value = "Hire 1 Quality Control Inspector (0.6$/Second + 9$)"
        qciNumber++   
        hireQciE.disabled = false
        btnIdle(hireQciE)
        qciNumberDisplay.innerHTML = qciNumber + " Quality Control Inspectors"
}

function addAccountant1() {
    if(accountantNumber<maxAccountants && money>=accountantHireCost && maxEmployees>allEmployeesNumber) {
        hireAccountantE.disabled = true
        btnBusy(hireAccountantE)
        hireAccountantE.value = "Hiring Accountant..."
        money-=accountantHireCost
        oneTimeWriteOff += 10 * accountantHireCost
        allEmployeesNumber++   
        setTimeout(addAccountant2,5000)
    }
}

function addAccountant2() {
        accountantNumber++
        termLoanCheck()
        if(accountantNumber==maxAccountants) {
            hireAccountantE.disabled = true
            btnBusy(hireAccountantE)
        }
        else{
            hireAccountantE.disabled = false
            btnIdle(hireAccountantE)
        }
        hireAccountantE.value = "Hire 1 Accountant (0.6$/Second + 18$)" 
        accountantNumberDisplay.innerHTML = accountantNumber + " Accountants (max:" + maxAccountants+")"
        if(accountantNumber>1){
            reduceTaxesResearchE.disabled = false
            btnIdle(reduceTaxesResearchE)
        }
        assemblerWage -= outsourcedAccountingFee
        qciWage -= outsourcedAccountingFee
        outsourcedAccountingFee = 0
}

function addOfficeBuilding1() {
    if(officeBuildingNumber<maxOfficeBuildings && money>=officeBuildingSetupCost){
        rentOfficeBuildingE.disabled = true
        btnBusy(rentOfficeBuildingE)
        rentOfficeBuildingE.value = "Setting up Building..."
        money-=officeBuildingSetupCost
        oneTimeWriteOff += 10 * officeBuildingSetupCost
        setTimeout(addOfficeBuilding2,5000)
    }
}

function addOfficeBuilding2() {
    rentOfficeBuildingE.value = "Rent 1 Office Building (0.4$/Second + 10$ Setup Cost)"
    maxAccountants+=accountantsPerOfficeBuilding
    if(hireAccountantE.value !== "Hiring Accountant..."){
        hireAccountantE.disabled = false
        btnIdle(hireAccountantE)
        }
    officeBuildingNumber++
    if(officeBuildingNumber==maxOfficeBuildings){
        rentOfficeBuildingE.disabled = true
        btnBusy(rentOfficeBuildingE)
    }
    else {
        rentOfficeBuildingE.disabled = false
        btnIdle(rentOfficeBuildingE)
    }
    officeBuildingNumberDisplay.innerHTML = officeBuildingNumber  + " Office Buildings (max:" + maxOfficeBuildings+")"
    accountantNumberDisplay.innerHTML = accountantNumber + " Accountants (max:" + maxAccountants+")"
}

function reduceTaxesResearch1() {
    if(accountantNumber>1 && money>=officeBuildingSetupCost){
        reduceTaxesResearchE.disabled = true
        btnBusy(reduceTaxesResearchE)
        reduceTaxesResearchE.value = "Tax Optimization Ongoing..."
        money-=reduceTaxesResearchCost
        setTimeout(reduceTaxesResearch2,10000)
    }    
}

function reduceTaxesResearch2() {
    corpTaxRate = 0.2
    reduceTaxesResearchE.value = "Taxes Optimized! Corporate Income Tax Rate reduced to 20%"
}

function termLoanCheck() {
    if (document.forms["termLoan"]["termLoanAmount"].checkValidity() && document.forms["termLoan"]["termLoanDuration"].checkValidity() && termLoan1MonthsRemaining == 0 && accountantNumber != 0){
        tempTermLoanAmount = document.forms["termLoan"]["termLoanAmount"].value
        tempTermLoanDuration = document.forms["termLoan"]["termLoanDuration"].value
        tempTermLoanInterestRate = termLoanInterestRates[tempTermLoanDuration-1]/12
        tempTermLoanMonthlyPayment = tempTermLoanAmount*((tempTermLoanInterestRate*(1+tempTermLoanInterestRate)**(tempTermLoanDuration * 12))/(((1+tempTermLoanInterestRate)**(tempTermLoanDuration * 12))-1))
        acceptTermLoanE.disabled = false
        btnIdle(acceptTermLoanE)
        termLoanMonthlyPaymentDisplay.innerHTML = "Your monthly payment will be "+tempTermLoanMonthlyPayment.toFixed(2)+" $"
    }
    else {
        acceptTermLoanE.disabled = true
        btnBusy(acceptTermLoanE)
        termLoanMonthlyPaymentDisplay.innerHTML = "Your monthly payment will be 0 $"
    }
}

function submitTermLoan() {
if (document.forms["termLoan"]["termLoanAmount"].checkValidity() && document.forms["termLoan"]["termLoanDuration"].checkValidity()){
    termLoan1MonthlyPayment = tempTermLoanMonthlyPayment
    termLoan1MonthsRemaining = tempTermLoanDuration * 12
    money -= -1*(tempTermLoanAmount)
    termLoan1MonthlyInterest = ((tempTermLoanMonthlyPayment*tempTermLoanDuration*12)-tempTermLoanAmount)/(tempTermLoanDuration*12*(baseTaxCounter/30))
    acceptTermLoanE.disabled = true
    btnBusy(acceptTermLoanE)
    termLoan1NameDisplayE.hidden = false
    termLoan1PaymentsDisplayE.hidden = false
    termLoan1TotalDisplayE.hidden = false
    tempTermLoanAmount, tempTermLoanDuration, tempTermLoanInterestRate, tempTermLoanMonthlyPayment = 0
    document.forms["termLoan"]["termLoanAmount"].value = ""
    document.forms["termLoan"]["termLoanDuration"].value = ""
    termLoanMonthlyPaymentDisplay.innerHTML = "Your monthly payment will be "+0+" $"
    termLoan1PaymentsDisplay.innerHTML = termLoan1MonthsRemaining+" payments of "+termLoan1MonthlyPayment.toFixed(2)+" $ remaining"
    termLoan1TotalDisplay.innerHTML = "Total Loan remaining: "+(termLoan1MonthsRemaining*termLoan1MonthlyPayment).toFixed(0)+" $"
}
}

function btnBusy(element) {
    element.classList.add("btn-busy") 
}

function btnIdle(element) {
    element.classList.remove("btn-busy") 
}

function ticker() {
    money += (machineNumber*((incomePerMachine*machineUtilization)-machineRunningCost))/10
    money -= assemblerNumber*assemblerWage/10
    money -= qciNumber*qciWage/10
    money -= manufacturingBuildingNumber*rentPerManufacturingBuilding/10
    money -= accountantNumber*accountantWage/10
    money -= officeBuildingNumber*rentPerOfficeBuilding/10
    cashDisplay.innerHTML = Math.floor(money) + " $"
    
    if(qciNumber!=0){
        qciUtilisation = (qciCapacitySquared/Math.sqrt(productsPerSecond/qciNumber))
    }  
    if(qciUtilisation>1){
        qciUtilisation = 1
    }
    if(productPrice<(baseProductPrice+(qciStrength*qciUtilisation))){
        productPrice += qciStrength/qciIncrementerTime
        productPriceDisplay.innerHTML = "Product Price: "+productPrice.toFixed(2)+" $/Unit"
        incomePerMachine = productPrice-inputMatPrice
    }
    if(productPrice>(baseProductPrice+(qciStrength*qciUtilisation))){
        productPrice -= qciStrength/qciIncrementerTime
        productPriceDisplay.innerHTML = "Product Price: "+productPrice.toFixed(2)+" $/Unit"
        incomePerMachine = productPrice-inputMatPrice
    }

    if((assemblerNumber*assemblersPerMachine)>machineNumber) {
        machineUtilization = 1
    }
    else if (assemblerNumber!=0){
        machineUtilization = assemblerNumber/machineNumber
    }
    machineUtilizationDisplay.innerHTML = "Machine Utilization: "+(machineUtilization*100).toFixed(0)+"%"
    productsPerSecond = (machineSpeed/(machineCycleTime/1000))*machineNumber*machineUtilization
    productsPerSecondDisplay.innerHTML = "Products per Second: "+productsPerSecond.toFixed(2)
    qciUtilizationDisplay.innerHTML = "Quality Control Effectiveness: "+Math.floor(qciUtilisation*100)+"%"
    maxEmployeesDisplay.innerHTML = allEmployeesNumber+"/"+maxEmployees+" Total Employees"
    accountingFeeDisplay.innerHTML = "Outsourced Accounting Fee: "+(allEmployeesNumber*outsourcedAccountingFee).toFixed(2)+" $/Second"
    var revenues = productsPerSecond*productPrice
    revenuesDisplay.innerHTML = (revenues).toFixed(0)+" $"
    var costOfRevenues = inputMatPrice*machineEfficiency*productsPerSecond+machineRunningCost*machineNumber+assemblerNumber*(assemblerWage-outsourcedAccountingFee)+rentPerManufacturingBuilding*manufacturingBuildingNumber+costOfRevenuesWriteOff
    costOfRevenuesDisplay.innerHTML = (costOfRevenues).toFixed(0)+" $"
    var grossProfit = (revenues-costOfRevenues)
    grossProfitDisplay.innerHTML = (grossProfit).toFixed(0)+" $"
    var sga = qciNumber*qciWage+accountantNumber*accountantWage+rentPerOfficeBuilding*officeBuildingNumber+oneTimeWriteOff+outsourcedAccountingFee*assemblerNumber 
    sgaDisplay.innerHTML = (sga).toFixed(0)+" $"
    var rd = 0
    rdDisplay.innerHTML = (rd).toFixed(0)+" $"
    var operatingIncome = grossProfit-sga-rd
    operatingIncomeDisplay.innerHTML = (operatingIncome).toFixed(0)+" $"
    var netInterestExpenses = termLoan1MonthlyInterest
    netInterestExpensesDisplay.innerHTML = (netInterestExpenses).toFixed(0)+" $"
    var unusualItems = 0
    unusualItemsDisplay.innerHTML = (unusualItems).toFixed(0)+" $"
    var earningsBeforeTaxes = operatingIncome-netInterestExpenses-unusualItems
    earningsBeforeTaxesDisplay.innerHTML = (earningsBeforeTaxes).toFixed(0)+" $"
    var taxExpenseApprox = -1*(earningsBeforeTaxes*corpTaxRate)
    taxExpenseApproxDisplay.innerHTML = (taxExpenseApprox).toFixed(0)+" $"
    var netIncomeApprox = earningsBeforeTaxes+taxExpenseApprox 
    netIncomeApproxDisplay.innerHTML = (netIncomeApprox).toFixed(0)+" $"
    netAnnualIncome += netIncomeApprox/10

    revenuesThisQuarter += revenues/10
    revenuesThisQuarterDisplay.innerHTML = (revenuesThisQuarter).toFixed(0)+" $"
    costOfRevenuesThisQuarter += costOfRevenues/10
    costOfRevenuesThisQuarterDisplay.innerHTML = (costOfRevenuesThisQuarter).toFixed(0)+" $"
    grossProfitThisQuarter += grossProfit/10
    grossProfitThisQuarterDisplay.innerHTML = (grossProfitThisQuarter).toFixed(0)+" $"
    sgaThisQuarter += sga/10
    sgaThisQuarterDisplay.innerHTML = (sgaThisQuarter).toFixed(0)+" $"
    rdThisQuarter += rd/10
    rdThisQuarterDisplay.innerHTML = (rdThisQuarter).toFixed(0)+" $"
    operatingIncomeThisQuarter += operatingIncome/10
    operatingIncomeThisQuarterDisplay.innerHTML = (operatingIncomeThisQuarter).toFixed(0)+" $"
    netInterestExpensesThisQuarter += netInterestExpenses/10
    netInterestExpensesThisQuarterDisplay.innerHTML = (netInterestExpensesThisQuarter).toFixed(0)+" $"
    unusualItemsThisQuarter += unusualItems/10
    unusualItemsThisQuarterDisplay.innerHTML = (unusualItemsThisQuarter).toFixed(0)+" $"
    earningsBeforeTaxesThisQuarter += earningsBeforeTaxes/10
    earningsBeforeTaxesThisQuarterDisplay.innerHTML = (earningsBeforeTaxesThisQuarter).toFixed(0)+" $"
    taxExpenseApproxThisQuarter += taxExpenseApprox/10
    taxExpenseApproxThisQuarterDisplay.innerHTML = (taxExpenseApproxThisQuarter).toFixed(0)+" $"
    netIncomeApproxThisQuarter += netIncomeApprox/10
    netIncomeApproxThisQuarterDisplay.innerHTML = (netIncomeApproxThisQuarter).toFixed(0)+" $"
    
    costOfRevenuesWriteOff = 0
    oneTimeWriteOff = 0
    taxCounter--
    if(taxCounter==0||taxCounter==(baseTaxCounter/3).toFixed(0)||taxCounter==(baseTaxCounter*0.6666667).toFixed(0)) {
        if(termLoan1MonthsRemaining>0) {
            money-= termLoan1MonthlyPayment
            netInterestExpenses = termLoan1MonthlyInterest
            termLoan1MonthsRemaining--
            termLoan1PaymentsDisplay.innerHTML = termLoan1MonthsRemaining+" payments of "+termLoan1MonthlyPayment.toFixed(2)+" $ remaining"
            termLoan1TotalDisplay.innerHTML = "Total Loan remaining: "+(termLoan1MonthsRemaining*termLoan1MonthlyPayment).toFixed(2)+" $"
        }
        else {
            termLoan1MonthlyInterest = 0
            termLoan1NameDisplayE.hidden = true
            termLoan1PaymentsDisplayE.hidden = true
            termLoan1TotalDisplayE.hidden = true
        }
    }
        
    if(taxCounter==0){
        if((earningsBeforeTaxesThisQuarter-nolBalance)>=0) {
            money-=(earningsBeforeTaxesThisQuarter-nolBalance)*corpTaxRate
            nolBalance = 0
        }
        else if ((earningsBeforeTaxesThisQuarter-nolBalance)<0) {
            nolBalance -= earningsBeforeTaxesThisQuarter
        }
        revenuesLastQuarterDisplay.innerHTML = revenuesThisQuarter.toFixed(0)+" $"
        costOfRevenuesLastQuarterDisplay.innerHTML = costOfRevenuesThisQuarter.toFixed(0)+" $"
        grossProfitLastQuarterDisplay.innerHTML = grossProfitThisQuarter.toFixed(0)+" $"
        sgaLastQuarterDisplay.innerHTML = sgaThisQuarter.toFixed(0)+" $"
        rdLastQuarterDisplay.innerHTML = rdThisQuarter.toFixed(0)+" $"
        operatingIncomeLastQuarterDisplay.innerHTML = operatingIncomeThisQuarter.toFixed(0)+" $"
        netInterestExpensesLastQuarterDisplay.innerHTML = netInterestExpensesThisQuarter.toFixed(0)+" $"
        unusualItemsLastQuarterDisplay.innerHTML = unusualItemsThisQuarter.toFixed(0)+" $"
        earningsBeforeTaxesLastQuarterDisplay.innerHTML = earningsBeforeTaxesThisQuarter.toFixed(0)+" $"
        taxExpenseApproxLastQuarterDisplay.innerHTML = taxExpenseApproxThisQuarter.toFixed(0)+" $"
        netIncomeApproxLastQuarterDisplay.innerHTML = netIncomeApproxThisQuarter.toFixed(0)+" $"
        revenuesThisQuarter = 0, costOfRevenuesThisQuarter = 0, grossProfitThisQuarter = 0, sgaThisQuarter = 0, rdThisQuarter = 0, operatingIncomeThisQuarter = 0, netInterestExpensesThisQuarter = 0, netInterestExpensesThisQuarter = 0, unusualItemsThisQuarter = 0, earningsBeforeTaxesThisQuarter = 0, taxExpenseApproxThisQuarter = 0, netIncomeApproxThisQuarter = 0
        taxCounter = baseTaxCounter
        quarterCounter++
    }

    
    if(quarterCounter==4) {
        quarterCounter = 0
        if(netAnnualIncome>0 && immediateExpenseDeduction>netAnnualIncome){
            costOfRevenuesWriteOff += 10 * netAnnualIncome
            immediateExpenseDeduction -= netAnnualIncome
        }
        else if(netAnnualIncome>0 && immediateExpenseDeduction<netAnnualIncome){
            costOfRevenuesWriteOff += 10 * immediateExpenseDeduction
            immediateExpenseDeduction = 0
        }   
        netAnnualIncome = 0
    }
    var timeUntilEndOfYear = (3-quarterCounter)*(baseTaxCounter/10)+(taxCounter/10)
    

    currentQuarterEndDisplay.innerHTML = "Current Quarter Ends in "+(taxCounter/10).toFixed(0)+" Seconds"
    netAnnualIncomeDisplay.innerHTML = "Net Income this Year of "+netAnnualIncome.toFixed(0)+" $ which ends in "+timeUntilEndOfYear.toFixed(0)+" Seconds"
    immediateExpenseDeductionDisplay.innerHTML = "Potential Immediate Expense Deduction of "+immediateExpenseDeduction.toFixed(0)+" $ (Only up to Net Income in the Current Year)"
    nolBalanceDisplay.innerHTML = "Earnings Loss Carry Forward Balance: "+(nolBalance).toFixed(0)+" $"
}

setInterval(ticker, 100)