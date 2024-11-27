document
  .getElementById("employeeForm")
  .addEventListener("submit", function (e) {
    e.preventDefault();

    // Get form values
    const employee = {
      id: Date.now(), // Unique ID for each employee
      name: document.getElementById("name").value,
      position: document.getElementById("position").value,
      about: document.getElementById("about").value,
      joining_date: document.getElementById("joining_date").value,
    };

    // Get existing employees from localStorage
    let employees = JSON.parse(localStorage.getItem("employees") || "[]");

    // Add new employee
    employees.push(employee);

    // Save to localStorage
    localStorage.setItem("employees", JSON.stringify(employees));

    // Redirect to listing page
    window.location.href = "listing.html";
  });
