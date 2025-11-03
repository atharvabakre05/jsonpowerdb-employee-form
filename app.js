let employees = [];
let currentIndex = -1;
let editing = false;

const fields = ["empId", "empName", "basic", "hra", "da", "deduction"];
const buttons = {
  newBtn: document.getElementById("new"),
  saveBtn: document.getElementById("save"),
  editBtn: document.getElementById("edit"),
  changeBtn: document.getElementById("change"),
  resetBtn: document.getElementById("reset"),
  firstBtn: document.getElementById("first"),
  prevBtn: document.getElementById("prev"),
  nextBtn: document.getElementById("next"),
  lastBtn: document.getElementById("last")
};

function getFormData() {
  return {
    empId: document.getElementById("empId").value.trim(),
    empName: document.getElementById("empName").value.trim(),
    basic: document.getElementById("basic").value,
    hra: document.getElementById("hra").value,
    da: document.getElementById("da").value,
    deduction: document.getElementById("deduction").value
  };
}

function setFormData(data) {
  fields.forEach(f => (document.getElementById(f).value = data[f] || ""));
}

function clearForm() {
  fields.forEach(f => (document.getElementById(f).value = ""));
}

function disableAll() {
  Object.values(buttons).forEach(btn => (btn.disabled = true));
}

function enable(...btns) {
  btns.forEach(b => (b.disabled = false));
}

function updateNavButtons() {
  buttons.firstBtn.disabled = currentIndex <= 0;
  buttons.prevBtn.disabled = currentIndex <= 0;
  buttons.nextBtn.disabled = currentIndex >= employees.length - 1;
  buttons.lastBtn.disabled = currentIndex >= employees.length - 1;
}

function loadRecord(index) {
  if (index >= 0 && index < employees.length) {
    currentIndex = index;
    setFormData(employees[index]);
    disableAll();
    enable(buttons.newBtn, buttons.editBtn, buttons.firstBtn, buttons.prevBtn, buttons.nextBtn, buttons.lastBtn);
    updateNavButtons();
  }
}

// ---- Button Actions ----

buttons.newBtn.onclick = () => {
  clearForm();
  disableAll();
  enable(buttons.saveBtn, buttons.resetBtn);
};

buttons.saveBtn.onclick = () => {
  const data = getFormData();
  if (!data.empId || !data.empName) return alert("Employee ID and Name are required!");
  employees.push(data);
  currentIndex = employees.length - 1;
  disableAll();
  enable(buttons.newBtn, buttons.editBtn, buttons.firstBtn, buttons.prevBtn);
  alert("Record saved successfully!");
};

buttons.editBtn.onclick = () => {
  if (currentIndex < 0) return;
  editing = true;
  disableAll();
  enable(buttons.changeBtn, buttons.resetBtn);
};

buttons.changeBtn.onclick = () => {
  if (!editing) return;
  employees[currentIndex] = getFormData();
  editing = false;
  disableAll();
  enable(buttons.newBtn, buttons.editBtn, buttons.firstBtn, buttons.prevBtn, buttons.nextBtn, buttons.lastBtn);
  alert("Record updated successfully!");
};

buttons.resetBtn.onclick = () => {
  if (editing && currentIndex >= 0) {
    setFormData(employees[currentIndex]);
    editing = false;
  } else {
    clearForm();
  }
  disableAll();
  enable(buttons.newBtn, buttons.editBtn, buttons.firstBtn, buttons.prevBtn, buttons.nextBtn, buttons.lastBtn);
};

buttons.firstBtn.onclick = () => loadRecord(0);
buttons.lastBtn.onclick = () => loadRecord(employees.length - 1);
buttons.prevBtn.onclick = () => loadRecord(currentIndex - 1);
buttons.nextBtn.onclick = () => loadRecord(currentIndex + 1);
