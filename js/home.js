let empPayrollList = [];
window.addEventListener("DOMContentLoaded", (event) => {
  if (site_properties.use_local_storage.match("true")) {
    getEmployeePayrollDataFromStorage();
  } else {
    getEmployeePayrollDataFromServer();
  }
});

const processEmployeePayrollDataResponse = () => {
  document.querySelector(".emp-count").textContent = empPayrollList.length;
  createInnerHtml();
  localStorage.removeItem("editEmp");
};

const getEmployeePayrollDataFromStorage = () => {
  empPayrollList = localStorage.getItem("EmployeePayrollList")
    ? JSON.parse(localStorage.getItem("EmployeePayrollList"))
    : [];
  processEmployeePayrollDataResponse();
};

const getEmployeePayrollDataFromServer = () => {
  makeServiceCall("GET", site_properties.server_url, true)
    .then((data) => {
      empPayrollList = JSON.parse(data);
      processEmployeePayrollDataResponse();
    })
    .catch((error) => {
      console.log("GET Error Status: " + JSON.stringify(error));
      empPayrollList = [];
      processEmployeePayrollDataResponse();
    });
};

const createInnerHtml = () => {
  const headerHtml =
    "<tr><th></th><th>Name</th><th>Gender</th><th>Department</th><th>Salary</th><th>Start Day</th><th>Actions</th></tr>";
  let innerHtml = `${headerHtml}`;
  for (let emp of empPayrollList) {
    innerHtml = `${innerHtml}  
      <tr>
      <td>
        <img src="${emp._profilePic}" alt="P" class="profile">
      </td>
      <td>${emp._name}</td>
      <td>${emp._gender}</td>
      <td>${getDeptHtml(emp._department)}</td>
      <td>${emp._salary}</td>
      <td>${stringify(emp._startDate)}</td>
      <td>
      <img id="${
        emp.id
      }" onclick="remove(this)" src="../assets/icons/delete-black-18dp.svg" alt="Delete">
      <img id="${
        emp.id
      }" onclick="update(this)" src="../assets/icons/create-black-18dp.svg" alt="Edit">
      </td>
      </tr>
      `;
  }
  document.querySelector("#table-display").innerHTML = innerHtml;
};

const getDeptHtml = (deptList) => {
  let deptHtml = "";
  for (const dept of deptList)
    deptHtml = `${deptHtml}<div class="dept-label">${dept}</div>`;
  return deptHtml;
};

const remove = (node) => {
  let empData = empPayrollList.find((emp) => emp.id == node.id);
  if (!empData) return;
  const index = empPayrollList.map((emp) => emp.id).indexOf(empData.id);
  empPayrollList.splice(index, 1);
  localStorage.setItem("EmployeePayrollList", JSON.stringify(empPayrollList));
  document.querySelector(".emp-count").textContent = empPayrollList.length;
  createInnerHtml();
};

const update = (node) => {
  let empData = empPayrollList.find((emp) => emp.id == node.id);
  if (!empData) return;
  localStorage.setItem("editEmp", JSON.stringify(empData));
  window.location.href = site_properties.add_employee_page;
  isUpdating = true;
  currentNode = node;
};
