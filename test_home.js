
window. addEventListener('DOMContentLoaded', (event) => {
    loadPage();
    });
    let loadPage= ()=>{
        let ele=document.getElementById('table');
        let data = JSON.parse(localStorage.getItem("EmployeeList"));
        if(data != null || data != ""){
            alert(data);
        }
        let header = 
        `
        <tr>
            <th></th>
            <th>Name</th>
            <th>Gender</th>
            <th>Department</th>
            <th>Salary</th>
            <th>Start Date</th>
            <th>Actions</th>
        </tr>
        `;
        let renderer = header;
        data.forEach(e => {
            console.log("here" + JSON.stringify(e));
            let deptelements = "";
            e._department.forEach(x=>{
                deptelements+=`<div class="dept-label">${x}</div>`
            });
            renderer+=
            `<tr id="${e._name}">
            <td class="profile"><img class="profile" alt=""
                    src="images/${e._profilePic}">
            </td>
            <td>${e._name}</td>
            <td>${e._gender}</td>
            <td>${deptelements}</td>
            <td>${e._salary}</td>
            <td>${e._startDate}</td>
            <td>
            <img class="pointer" name="1" onclick="remove('${e._name}')" alt="delete"
                src="images/delete.png">
            <img name="1"  alt="edit" onclick="update('${e._name}')"
                src="images/edit.png">
            </td>
          </tr>
            `;
        });
        ele.innerHTML = renderer;
    }
    const remove= (name)=>{
        let ele = document.getElementById(name);
        ele.style.display = "none";
        let employeeArr = JSON.parse(localStorage.getItem("EmployeeList"));
        let index = employeeArr.findIndex(item=>{
            return item._name == name;
        });
        employeeArr.splice(index,1);
        localStorage.setItem("EmployeeList",JSON.stringify(employeeArr));
    }
    const update = (name)=>{
        localStorage.setItem("update",name);
        window.open("new_payroll_form_js.html");
        window.location = 'new_payroll_form_js.html' ;
    }
    const createInnerHtml = () => {
        const headerHtml = "<th></th><th>Name</th><th>Gender</th><th>Department</th>"+
                            "<th>Salary</th><th>Start Date</th><th>Actions</th>";
            const innerHtml = `${headerHtml}
        <tr>
            <th></th>
            <th>Name</th>
            <th>Gender</th>
            <th>Department</th>
            <th>Salary</th>
            <th>Start Date</th>
            <th>Actions</th>
        </tr>
        <tr>
            <td class="profile"><img class="profile" alt=""
                    src="images/profile2.png">
            </td>
            <td>Abhilash Meher</td>
            <td>Male</td>
            <td><div class="dept-label">HR</div>
            <div class="dept-label">Finance</div></td>
            <td>4000000</td>
            <td>20 February 2022</td>
            <td>
            <img name="1" onclick="remove(this)" alt="delete"
                src="images/delete.png">
            <img name="1"  alt="edit" onclick="update(this)"
                src="images/edit.png">
            </td>
          </tr>
        `;
        document.querySelector('#table-display').innerHtml=innerHtml;
    }