window. addEventListener( 'DOMContentLoaded', (event) => {
    const name = document. querySelector( '#name');
    const textError = document.querySelector('.text-error');
    name.addEventListener('input', function() {
         if(name.value.length == 0) {
            textError.textContent = "";
            return;
        }
        try {
            (new EmployeePayrollData()).name = name.value;;
            textError.textContent = "";
    
            } catch (e) {
                 textError.textContent = e;
            }
    });
    
    const salary = document.querySelector('#salary');
    const output = document.querySelector('.salary-output');

    //not required------------------------------------------------------------------
    let update = localStorage.getItem("update");
    localStorage.setItem("update","");
    if(update != "" || update != null){
        let arr = JSON.parse(localStorage.getItem("EmployeeList"));
        let index = arr.findIndex(x=> x._name == update);
        let employee = arr[index];
        if(employee != null){
            // set them to elements
            name.value = employee._name;
            //for profic pic
            let profiles = document.querySelectorAll('[name=profile]');
            let profilesArr = Array.from(profiles);
            let pIndex = profilesArr.findIndex(x=> x.value == employee._profilePic);
            profilesArr[pIndex].checked = true;

            //gender
            let genders = document.querySelectorAll('[name=gender]');
            let genderArr = Array.from(genders);
            let gIndex = genderArr.findIndex(x=>x.value == employee._gender);
            genderArr[gIndex].checked=true;

            // department
            let departments = document.querySelectorAll('[name=department]');
            let departmentsArr = Array.from(departments);
            let filteredDepartments = departmentsArr.filter(x=> employee._department.includes(x.value));
            filteredDepartments.forEach(x=>x.checked=true);

            // salary
            let salaryElement = document.querySelector('[name=salary]');
            let salaryLablel = document.querySelector('#salary-lbl');
            salaryElement.value=employee._salary;
            salaryLablel.value=employee._salary;

            // notes
            let notesElement = document.querySelector('[name=Notes]');
            notesElement.value=employee._note;
        }
    }
});

const save = () => {
    try {
        let employeePayrollData = createEmployeePayroll();
        window.location = 'home.html';
    } catch (e) {
        return;
    }
    
}

const createEmployeePayroll=()=>{
    let employeePayrollData = new EmployeePayrollData();
    try {
        employeePayrollData.name = getInputValueById('#name');
    } catch (e) {
    setTextValue('.text-error', e);
    throw e;
    }
employeePayrollData.profilePic = getSelectedValues('[name=profile]').pop();
employeePayrollData.gender = getSelectedValues('[name=gender]').pop();
employeePayrollData.department = getSelectedValues('[name=department]');
employeePayrollData.salary = getInputValueById('#salary');
employeePayrollData.note = getInputValueById( '#notes');
let date = getInputValueById( '#day')+" "+getInputValueById('#month')+" "+
    getInputValueById('#year');
employeePayrollData.startDate = new Date(date);
updateLocalStorage(employeePayrollData);
return employeePayrollData;
}

const getSelectedValues = (propertyValue) => {
    let allItems = document. querySelectorAll(propertyValue) ;
    let selItems = [];
    allItems. forEach(item => {
        if(item.checked) selItems.push(item. value) ;
    });
    
    return selItems;
}

const getInputValueById = (id) => {
    let value = document. querySelector(id).value;
    return value;
}

const getInputElementValue = (id) => {

    let value = document.getElementById(id).value;
    return value;
}

let updateLocalStorage = (employee) => {
let employeeArr = null;
employeeArr = JSON.parse(localStorage.getItem("EmployeeList"));
if(employeeArr == null){
    employeeArr = [employee];
}
else{
    let index = employeeArr.findIndex(x=> x._name == employee._name);
    if(index<0){
        employeeArr.push(employee);
    }
    else{
        employeeArr.splice(index,0,employee);
    }
}
localStorage.setItem("EmployeeList", JSON.stringify(employeeArr));
let st = "";
employeeArr = JSON.parse(localStorage.getItem("EmployeeList"));
employeeArr.forEach(x=>{
st+=x.toString()+"\n-----------------\n"
});
// alert(st);
};