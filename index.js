buyMachine.addEventListener("click",addMachine1)
rentManufacturingBuilding.addEventListener("click",addManufacturingBuilding1)
hireAssembler.addEventListener("click",addAssembler1)
hireQci.addEventListener("click",addQci1)
rentOfficeBuilding.addEventListener("click",addOfficeBuilding1)
hireAccountant.addEventListener("click",addAccountant1)
reduceTaxesResearch.addEventListener("click",reduceTaxesResearch1)
advancedTrainingResearch.addEventListener("click",advancedTrainingResearch1)
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
var machineRunningCost = 0.4
var machineSpeed = 1
var machineEfficiency = 1
var machineCycleTime = 1000
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
var baseTaxCounter = 900
var taxCounter = baseTaxCounter
var salvageMultiple = 0.25
var reduceTaxesResearchCost = 70
var outsourcedAccountingFee = 0.04   
var termLoanInterestRates = [0.075,0.080,0.087,0.093,0.100]
var creditLimit = 100
var ccAPR = 0.185 
var ccGraceBase = 450
var advancedTrainingCostPerAssembler = 7
var revenuesThisQuarter = 0, costOfRevenuesThisQuarter = 0, grossProfitThisQuarter = 0, sgaThisQuarter = 0, rdThisQuarter = 0, operatingIncomeThisQuarter = 0, netInterestExpensesThisQuarter = 0, netInterestExpensesThisQuarter = 0, unusualItemsThisQuarter = 0, earningsBeforeTaxesThisQuarter = 0, taxExpenseApproxThisQuarter = 0, netIncomeApproxThisQuarter = 0, creditCardInterest = 0, ccGraceCounter = 0, liquidity = money, tempTermLoanAmount = 0, tempTermLoanInterestRate = 0, tempTermLoanMonthlyPayment = 0, termLoan1MonthlyInterest = 0, termLoan1MonthsRemaining = 0, termLoan1MonthlyPayment = 0, costOfRevenuesWriteOff = 0, nolBalance = 0, oneTimeWriteOff = 0, immediateExpenseDeduction = 0, netAnnualIncome = 0, taxExpense = 0, qciUtilisation = 0, productsPerSecond = 0, machineUtilization = 0, quarterCounter = 0 

buyMachine.value = "Buy 1 Machine ("+machineRunningCost+"$/Second + " +machineCost+"$)"
rentManufacturingBuilding.value = "Rent 1 Manufacturing Building ("+rentPerManufacturingBuilding+"$/Second + "+manufacturingBuildingSetupCost+"$ Setup Cost)"
hireAssembler.value = "Hire 1 Assembler ("+assemblerWage+"$/Second + "+assemblerHireCost+"$)"
hireQci.value = "Hire 1 Quality Control Inspector ("+qciWage+"$/Second + "+qciHireCost+"$)"
hireAccountant.value = "Hire 1 Accountant ("+accountantWage+"$/Second + "+accountantHireCost+"$)"
rentOfficeBuilding.value = "Rent 1 Office Building ("+rentPerOfficeBuilding+"$/Second + "+officeBuildingSetupCost+"$ Setup Cost)" 


function addMachine1() {
    if(machineNumber<maxMachines && liquidity>=machineCost) {
        buyMachine.disabled = true
        btnBusy(buyMachine)
        buyMachine.value = "Ordering Machine..."
        money-=machineCost
        immediateExpenseDeduction += machineCost*(1-salvageMultiple) //Section 179 Deduction  
        setTimeout(addMachine2,5000)
    }
}

function addMachine2() {
    machineNumber++
    if(machineNumber==maxMachines) {
            buyMachine.disabled = true
            btnBusy(buyMachine)
    }
    else{
        buyMachine.disabled = false
        btnIdle(buyMachine)
    }
    buyMachine.value = "Buy 1 Machine ("+machineRunningCost+"$/Second + " +machineCost+"$)" 
    machineNumberDisplay.childNodes[0].nodeValue = machineNumber + " Machines (max:" + maxMachines+")" 
}

function addManufacturingBuilding1() {
    if(manufacturingBuildingNumber<maxManufacturingBuildings && liquidity>=manufacturingBuildingSetupCost){
        rentManufacturingBuilding.disabled = true
        btnBusy(rentManufacturingBuilding)
        rentManufacturingBuilding.value = "Setting up Building..."
        money-=manufacturingBuildingSetupCost
        oneTimeWriteOff += 10 * manufacturingBuildingSetupCost
        setTimeout(addManufacturingBuilding2,5000)
    }
}

function addManufacturingBuilding2() {
    rentManufacturingBuilding.value = "Rent 1 Manufacturing Building ("+rentPerManufacturingBuilding+"$/Second + "+manufacturingBuildingSetupCost+"$ Setup Cost)"
    maxMachines+=machinesPerManufacturingBuilding
    if(buyMachine.value !== "Ordering Machine..."){
        buyMachine.disabled = false
        btnIdle(buyMachine)
    }
    manufacturingBuildingNumber++
    if(manufacturingBuildingNumber==maxManufacturingBuildings){
        rentManufacturingBuilding.disabled = true
        btnBusy(rentManufacturingBuilding)
    }
    else {
        rentManufacturingBuilding.disabled = false
        btnIdle(rentManufacturingBuilding)
    }
    manufacturingBuildingNumberDisplay.childNodes[0].nodeValue = manufacturingBuildingNumber  + " Manufacturing Buildings (max:" + maxManufacturingBuildings+")"
    machineNumberDisplay.childNodes[0].nodeValue = machineNumber + " Machines (max:" + maxMachines+")"
}

function addAssembler1() {
    if(liquidity>=assemblerHireCost && maxEmployees>allEmployeesNumber) {
        hireAssembler.disabled = true
        btnBusy(hireAssembler)
        hireAssembler.value = "Hiring Assembler..."
        money-=assemblerHireCost
        oneTimeWriteOff += 10 * assemblerHireCost
        allEmployeesNumber++
        setTimeout(addAssembler2,5000)     
    }
}

function addAssembler2() {
    hireAssembler.value = "Hire 1 Assembler ("+assemblerWage+"$/Second + "+assemblerHireCost+"$)"
    assemblerNumber++   
    hireAssembler.disabled = false
    btnIdle(hireAssembler)
    if(assemblerNumber==15) btnIdle(advancedTrainingResearch)
    assemblerNumberDisplay.childNodes[0].nodeValue = assemblerNumber + " Assemblers"
}

function addQci1() {
    if(liquidity>=qciHireCost && maxEmployees>allEmployeesNumber) {
        hireQci.disabled = true
        btnBusy(hireQci)
        hireQci.value = "Hiring Quality Control Inspector..."
        money-=qciHireCost
        oneTimeWriteOff += 10 * qciHireCost
        allEmployeesNumber++
        setTimeout(addQci2,5000)     
    }
}

function addQci2() {
    hireQci.value = "Hire 1 Quality Control Inspector ("+qciWage+"$/Second + "+qciHireCost+"$)"
    qciNumber++   
    hireQci.disabled = false
    btnIdle(hireQci)
    qciNumberDisplay.childNodes[0].nodeValue = qciNumber + " Quality Control Inspectors"
}

function addAccountant1() {
    if(accountantNumber<maxAccountants && liquidity>=accountantHireCost && maxEmployees>allEmployeesNumber) {
        hireAccountant.disabled = true
        btnBusy(hireAccountant)
        hireAccountant.value = "Hiring Accountant..."
        money-=accountantHireCost
        oneTimeWriteOff += 10 * accountantHireCost
        allEmployeesNumber++   
        setTimeout(addAccountant2,5000)
    }
}

function addAccountant2() {
    accountantNumber++
    termLoanAmountDisplay.disabled = false
    termLoanDurationDisplay.disabled = false
    termLoanCheck()
        if(accountantNumber==maxAccountants) {
            hireAccountant.disabled = true
            btnBusy(hireAccountant)
        }
        else{
            hireAccountant.disabled = false
            btnIdle(hireAccountant)
        }
    hireAccountant.value = "Hire 1 Accountant ("+accountantWage+"$/Second + "+accountantHireCost+"$)"
    accountantNumberDisplay.childNodes[0].nodeValue = accountantNumber + " Accountants (max:" + maxAccountants+")"
    if(accountantNumber>1) btnIdle(reduceTaxesResearch)
    assemblerWage -= outsourcedAccountingFee
    qciWage -= outsourcedAccountingFee
    outsourcedAccountingFee = 0
}

function addOfficeBuilding1() {
    if(officeBuildingNumber<maxOfficeBuildings && liquidity>=officeBuildingSetupCost){
        rentOfficeBuilding.disabled = true
        btnBusy(rentOfficeBuilding)
        rentOfficeBuilding.value = "Setting up Building..."
        money-=officeBuildingSetupCost
        oneTimeWriteOff += 10 * officeBuildingSetupCost
        setTimeout(addOfficeBuilding2,5000)
    }
}

function addOfficeBuilding2() {
    rentOfficeBuilding.value = "Rent 1 Office Building ("+rentPerOfficeBuilding+"$/Second + "+officeBuildingSetupCost+"$ Setup Cost)"
    maxAccountants+=accountantsPerOfficeBuilding
    if(hireAccountant.value !== "Hiring Accountant..."){
        hireAccountant.disabled = false
        btnIdle(hireAccountant)
        }
    officeBuildingNumber++
    if(officeBuildingNumber==maxOfficeBuildings){
        rentOfficeBuilding.disabled = true
        btnBusy(rentOfficeBuilding)
    }
    else {
        rentOfficeBuilding.disabled = false
        btnIdle(rentOfficeBuilding)
    }
    officeBuildingNumberDisplay.childNodes[0].nodeValue = officeBuildingNumber  + " Office Buildings (max:" + maxOfficeBuildings+")"
    accountantNumberDisplay.childNodes[0].nodeValue = accountantNumber + " Accountants (max:" + maxAccountants+")"
}

function reduceTaxesResearch1() {
    if(accountantNumber>1 && liquidity>=reduceTaxesResearchCost){
        btnBusy(reduceTaxesResearch)
        reduceTaxesResearch.value = "Tax Optimization Ongoing..."
        money-=reduceTaxesResearchCost
        setTimeout(reduceTaxesResearch2,10000)
    }    
}

function reduceTaxesResearch2() {
    corpTaxRate = 0.2
    reduceTaxesResearch.value = "Taxes Optimized! Corporate Income Tax Rate reduced to 20%"
    reduceTaxesResearch.disabled = true
    reduceTaxesResearch.classList.add("btn-rnd-done")
}

function advancedTrainingResearch1() {
    if(assemblerNumber>14 && liquidity>=advancedTrainingCostPerAssembler*assemblerNumber) {
        btnBusy(advancedTrainingResearch)
        advancedTrainingResearch.value = "Advanced Training Ongoing..." 
        money-=advancedTrainingCostPerAssembler*assemblerNumber	
        setTimeout(advancedTrainingResearch2,5000)
    }
}
function advancedTrainingResearch2() {
    assemblersPerMachine = 0.9
    assemblerHireCost = 14
    advancedTrainingResearch.value = "Advanced Training Complete! All future hires will recieve the advanced training automatically"
    advancedTrainingResearch.disabled = true
    hireAssembler.value = "Hire 1 Assembler ("+assemblerWage+"$/Second + "+assemblerHireCost+"$)"
    advancedTrainingResearch.classList.add("btn-rnd-done")
}

function termLoanCheck() {
    if (document.forms["termLoan"]["termLoanAmount"].checkValidity() && document.forms["termLoan"]["termLoanDuration"].checkValidity() && termLoan1MonthsRemaining == 0 && accountantNumber != 0){
        tempTermLoanAmount = document.forms["termLoan"]["termLoanAmount"].value
        tempTermLoanDuration = document.forms["termLoan"]["termLoanDuration"].value
        tempTermLoanInterestRate = termLoanInterestRates[tempTermLoanDuration-1]/12
        tempTermLoanMonthlyPayment = tempTermLoanAmount*((tempTermLoanInterestRate*(1+tempTermLoanInterestRate)**(tempTermLoanDuration * 12))/(((1+tempTermLoanInterestRate)**(tempTermLoanDuration * 12))-1))
        acceptTermLoan.disabled = false
        btnIdle(acceptTermLoan)
        termLoanMonthlyPaymentDisplay.childNodes[0].nodeValue = "Your monthly payment will be "+tempTermLoanMonthlyPayment.toFixed(2)+" $"
        termLoanAPRDisplay.hidden = false
        termLoanAPRDisplay.childNodes[0].nodeValue = "Interest Rate: "+(tempTermLoanInterestRate*1200).toFixed(1)+"% APR"
    }
    else {
        acceptTermLoan.disabled = true
        btnBusy(acceptTermLoan)
        if(!document.forms["termLoan"]["termLoanDuration"].checkValidity()) termLoanMonthlyPaymentDisplay.childNodes[0].nodeValue = "Invalid Loan Duration!"
        if(!document.forms["termLoan"]["termLoanAmount"].checkValidity()) termLoanMonthlyPaymentDisplay.childNodes[0].nodeValue = "Invalid Loan Amount!" 
        if(termLoan1MonthsRemaining != 0) termLoanMonthlyPaymentDisplay.childNodes[0].nodeValue = "Pay off your current Term Loan first!" 
        if(accountantNumber == 0) termLoanMonthlyPaymentDisplay.childNodes[0].nodeValue = "An accountant is required to unlock Term Loans!" 
    }
}

function submitTermLoan() {
    if (document.forms["termLoan"]["termLoanAmount"].checkValidity() && document.forms["termLoan"]["termLoanDuration"].checkValidity()){
        termLoan1MonthlyPayment = tempTermLoanMonthlyPayment
        money -= -1*(tempTermLoanAmount)
        termLoan1MonthsRemaining = tempTermLoanDuration * 12
        termLoan1MonthlyInterest = ((tempTermLoanMonthlyPayment*tempTermLoanDuration*12)-tempTermLoanAmount)/(tempTermLoanDuration*12*(baseTaxCounter/30))
        acceptTermLoan.disabled = true
        btnBusy(acceptTermLoan)
        termLoan1NameDisplay.hidden = false
        termLoan1PaymentsDisplay.hidden = false
        termLoan1TotalDisplay.hidden = false
        termLoanAPRDisplay.hidden = true
        tempTermLoanAmount, tempTermLoanDuration, tempTermLoanInterestRate, tempTermLoanMonthlyPayment = 0
        document.forms["termLoan"]["termLoanAmount"].value = ""
        document.forms["termLoan"]["termLoanDuration"].value = ""
        termLoanMonthlyPaymentDisplay.childNodes[0].nodeValue = "Pay off your current Term Loan first!" 
        termLoan1PaymentsDisplay.childNodes[0].nodeValue = termLoan1MonthsRemaining+" payments of "+termLoan1MonthlyPayment.toFixed(2)+" $ remaining"
        termLoan1TotalDisplay.childNodes[0].nodeValue = "Total Loan remaining: "+(termLoan1MonthsRemaining*termLoan1MonthlyPayment).toFixed(0)+" $"
}
}

function btnBusy(element) {
    element.classList.add("btn-busy")
}

function btnIdle(element) {
    element.classList.remove("btn-busy") 
}

moneytooltip.innerText = "Credit Limit: "+creditLimit +"$ (can be increased through research) | APR: "+(ccAPR*100)+"%"

function ticker() {
    money += (machineNumber*((incomePerMachine*machineUtilization)-machineRunningCost))/10
    money -= assemblerNumber*assemblerWage/10
    money -= qciNumber*qciWage/10
    money -= manufacturingBuildingNumber*rentPerManufacturingBuilding/10
    money -= accountantNumber*accountantWage/10
    money -= officeBuildingNumber*rentPerOfficeBuilding/10
    liquidity = money + creditLimit
    if (money < 0 && ccGraceCounter>ccGraceBase) {
        cashDisplay.childNodes[0].nodeValue = Math.floor(money) + " $ | Credit Limit: " +creditLimit+"$ APR: " +(ccAPR*100)+"%"
        money -= money*(-ccAPR/(baseTaxCounter*4))
        creditCardInterest = money*(-ccAPR/(baseTaxCounter*0.4)) 
    }
    else if (money < 0) {
        ccGraceCounter++
        cashDisplay.childNodes[0].nodeValue = Math.floor(money) + " $ | Credit Limit: " +creditLimit+"$ | Interest will start accruing in " +Math.ceil((ccGraceBase-ccGraceCounter)/10) +" Seconds"
    }
    else {
        cashDisplay.childNodes[0].nodeValue = Math.floor(money) + " $"
        creditCardInterest = 0, ccGraceCounter = 0
    }
    if(qciNumber!=0) qciUtilisation = (qciCapacitySquared/Math.sqrt(productsPerSecond/qciNumber)) 
    
    if(qciUtilisation>1) qciUtilisation = 1
    
    if(productPrice<(baseProductPrice+(qciStrength*qciUtilisation))){
        productPrice += qciStrength/qciIncrementerTime
        productPriceDisplay.childNodes[0].nodeValue = "Product Price: "+productPrice.toFixed(2)+" $/Unit"
        incomePerMachine = productPrice-inputMatPrice
    }
    if(productPrice>(baseProductPrice+(qciStrength*qciUtilisation))){
        productPrice -= qciStrength/qciIncrementerTime
        productPriceDisplay.childNodes[0].nodeValue = "Product Price: "+productPrice.toFixed(2)+" $/Unit"
        incomePerMachine = productPrice-inputMatPrice
    }
    if((assemblerNumber/assemblersPerMachine)>machineNumber) machineUtilization = 1
    
    else if (assemblerNumber!=0) machineUtilization = (assemblerNumber/assemblersPerMachine)/machineNumber
    
    machineUtilizationDisplay.childNodes[0].nodeValue = "Machine Utilization: "+(machineUtilization*100).toFixed(0)+"%"
    productsPerSecond = (machineSpeed/(machineCycleTime/1000))*machineNumber*machineUtilization
    productsPerSecondDisplay.childNodes[0].nodeValue = "Products per Second: "+productsPerSecond.toFixed(2)
    qciUtilizationDisplay.childNodes[0].nodeValue = "Quality Control Effectiveness: "+Math.floor(qciUtilisation*100)+"%"
    maxEmployeesDisplay.childNodes[0].nodeValue = allEmployeesNumber+"/"+maxEmployees+" Total Employees"
    accountingFeeDisplay.childNodes[0].nodeValue = "Outsourced Accounting Fee: "+(allEmployeesNumber*outsourcedAccountingFee).toFixed(2)+" $/Second"
    var revenues = productsPerSecond*productPrice
    revenuesDisplay.childNodes[0].nodeValue = (revenues).toFixed(0)+" $"
    var costOfRevenues = inputMatPrice*machineEfficiency*productsPerSecond+machineRunningCost*machineNumber+assemblerNumber*(assemblerWage-outsourcedAccountingFee)+rentPerManufacturingBuilding*manufacturingBuildingNumber+costOfRevenuesWriteOff
    costOfRevenuesDisplay.childNodes[0].nodeValue = (costOfRevenues).toFixed(0)+" $"
    var grossProfit = (revenues-costOfRevenues)
    grossProfitDisplay.childNodes[0].nodeValue = (grossProfit).toFixed(0)+" $"
    var sga = qciNumber*qciWage+accountantNumber*accountantWage+rentPerOfficeBuilding*officeBuildingNumber+oneTimeWriteOff+outsourcedAccountingFee*assemblerNumber 
    sgaDisplay.childNodes[0].nodeValue = (sga).toFixed(0)+" $"
    var rd = 0
    rdDisplay.childNodes[0].nodeValue = (rd).toFixed(0)+" $"
    var operatingIncome = grossProfit-sga-rd
    operatingIncomeDisplay.childNodes[0].nodeValue = (operatingIncome).toFixed(0)+" $"
    var netInterestExpenses = termLoan1MonthlyInterest + creditCardInterest
    netInterestExpensesDisplay.childNodes[0].nodeValue = (netInterestExpenses).toFixed(0)+" $"
    var unusualItems = 0
    unusualItemsDisplay.childNodes[0].nodeValue = (unusualItems).toFixed(0)+" $"
    var earningsBeforeTaxes = operatingIncome-netInterestExpenses-unusualItems
    earningsBeforeTaxesDisplay.childNodes[0].nodeValue = (earningsBeforeTaxes).toFixed(0)+" $"
    var taxExpenseApprox = -1*(earningsBeforeTaxes*corpTaxRate)
    taxExpenseApproxDisplay.childNodes[0].nodeValue = (taxExpenseApprox).toFixed(0)+" $"
    var netIncomeApprox = earningsBeforeTaxes+taxExpenseApprox 
    netIncomeApproxDisplay.childNodes[0].nodeValue = (netIncomeApprox).toFixed(0)+" $"
    netAnnualIncome += netIncomeApprox/10

    revenuesThisQuarter += revenues/10
    revenuesThisQuarterDisplay.childNodes[0].nodeValue = (revenuesThisQuarter).toFixed(0)+" $"
    costOfRevenuesThisQuarter += costOfRevenues/10
    costOfRevenuesThisQuarterDisplay.childNodes[0].nodeValue = (costOfRevenuesThisQuarter).toFixed(0)+" $"
    grossProfitThisQuarter += grossProfit/10
    grossProfitThisQuarterDisplay.childNodes[0].nodeValue = (grossProfitThisQuarter).toFixed(0)+" $"
    sgaThisQuarter += sga/10
    sgaThisQuarterDisplay.childNodes[0].nodeValue = (sgaThisQuarter).toFixed(0)+" $"
    rdThisQuarter += rd/10
    rdThisQuarterDisplay.childNodes[0].nodeValue = (rdThisQuarter).toFixed(0)+" $"
    operatingIncomeThisQuarter += operatingIncome/10
    operatingIncomeThisQuarterDisplay.childNodes[0].nodeValue = (operatingIncomeThisQuarter).toFixed(0)+" $"
    netInterestExpensesThisQuarter += netInterestExpenses/10
    netInterestExpensesThisQuarterDisplay.childNodes[0].nodeValue = (netInterestExpensesThisQuarter).toFixed(0)+" $"
    unusualItemsThisQuarter += unusualItems/10
    unusualItemsThisQuarterDisplay.childNodes[0].nodeValue = (unusualItemsThisQuarter).toFixed(0)+" $"
    earningsBeforeTaxesThisQuarter += earningsBeforeTaxes/10
    earningsBeforeTaxesThisQuarterDisplay.childNodes[0].nodeValue = (earningsBeforeTaxesThisQuarter).toFixed(0)+" $"
    taxExpenseApproxThisQuarter += taxExpenseApprox/10
    taxExpenseApproxThisQuarterDisplay.childNodes[0].nodeValue = (taxExpenseApproxThisQuarter).toFixed(0)+" $"
    netIncomeApproxThisQuarter += netIncomeApprox/10
    netIncomeApproxThisQuarterDisplay.childNodes[0].nodeValue = (netIncomeApproxThisQuarter).toFixed(0)+" $"
    
    costOfRevenuesWriteOff = 0
    oneTimeWriteOff = 0
    taxCounter--

    if(taxCounter==0||taxCounter==(baseTaxCounter/3).toFixed(0)||taxCounter==(baseTaxCounter*0.6666667).toFixed(0)) {
        if(termLoan1MonthsRemaining>0) {
            money-= termLoan1MonthlyPayment
            netInterestExpenses = termLoan1MonthlyInterest
            termLoan1MonthsRemaining--
            termLoan1PaymentsDisplay.childNodes[0].nodeValue = termLoan1MonthsRemaining+" payments of "+termLoan1MonthlyPayment.toFixed(2)+" $ remaining"
            termLoan1TotalDisplay.childNodes[0].nodeValue = "Total Loan remaining: "+(termLoan1MonthsRemaining*termLoan1MonthlyPayment).toFixed(2)+" $"
        }
        else {
            termLoan1MonthlyInterest = 0
            termLoan1NameDisplay.hidden = true
            termLoan1PaymentsDisplay.hidden = true
            termLoan1TotalDisplay.hidden = true
        }
    }
        
    if(taxCounter==0){
        if((earningsBeforeTaxesThisQuarter-nolBalance)>=0) {
            money-=(earningsBeforeTaxesThisQuarter-nolBalance)*corpTaxRate
            nolBalance = 0
        }
        else if ((earningsBeforeTaxesThisQuarter-nolBalance)<0) nolBalance -= earningsBeforeTaxesThisQuarter
        
        revenuesLastQuarterDisplay.childNodes[0].nodeValue = revenuesThisQuarter.toFixed(0)+" $"
        costOfRevenuesLastQuarterDisplay.childNodes[0].nodeValue = costOfRevenuesThisQuarter.toFixed(0)+" $"
        grossProfitLastQuarterDisplay.childNodes[0].nodeValue = grossProfitThisQuarter.toFixed(0)+" $"
        sgaLastQuarterDisplay.childNodes[0].nodeValue = sgaThisQuarter.toFixed(0)+" $"
        rdLastQuarterDisplay.childNodes[0].nodeValue = rdThisQuarter.toFixed(0)+" $"
        operatingIncomeLastQuarterDisplay.childNodes[0].nodeValue = operatingIncomeThisQuarter.toFixed(0)+" $"
        netInterestExpensesLastQuarterDisplay.childNodes[0].nodeValue = netInterestExpensesThisQuarter.toFixed(0)+" $"
        unusualItemsLastQuarterDisplay.childNodes[0].nodeValue = unusualItemsThisQuarter.toFixed(0)+" $"
        earningsBeforeTaxesLastQuarterDisplay.childNodes[0].nodeValue = earningsBeforeTaxesThisQuarter.toFixed(0)+" $"
        taxExpenseApproxLastQuarterDisplay.childNodes[0].nodeValue = taxExpenseApproxThisQuarter.toFixed(0)+" $"
        netIncomeApproxLastQuarterDisplay.childNodes[0].nodeValue = netIncomeApproxThisQuarter.toFixed(0)+" $"
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
    
    currentQuarterEndDisplay.childNodes[0].nodeValue = "Current Quarter Ends in "+(taxCounter/10).toFixed(0)+" Seconds"
    netAnnualIncomeDisplay.childNodes[0].nodeValue = "Net Income this Year of "+netAnnualIncome.toFixed(0)+" $ which ends in "+timeUntilEndOfYear.toFixed(0)+" Seconds"
    immediateExpenseDeductionDisplay.childNodes[0].nodeValue = "Potential Immediate Expense Deduction of "+immediateExpenseDeduction.toFixed(0)+" $ (Only up to Net Income in the Current Year)"
    nolBalanceDisplay.childNodes[0].nodeValue = "Earnings Loss Carry Forward Balance: "+(nolBalance).toFixed(0)+" $"
    
    if(money<-creditLimit) { 
        alert("Bankrupt! Restart Game?")
        location.reload()
    }
}
setInterval(ticker, 100)