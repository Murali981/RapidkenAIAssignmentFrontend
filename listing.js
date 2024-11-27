// Configuration
const ITEMS_PER_PAGE = 5;
let currentPage = 1;
let employees = [];

// Load and display employees
function loadEmployees() {
  employees = JSON.parse(localStorage.getItem("employees") || "[]");
  displayEmployees();
  setupPagination();
}

// Display employees for current page
function displayEmployees() {
  const tableBody = document.getElementById("employeeTableBody");
  tableBody.innerHTML = "";

  const start = (currentPage - 1) * ITEMS_PER_PAGE;
  const end = start + ITEMS_PER_PAGE;
  const paginatedEmployees = employees.slice(start, end);

  paginatedEmployees.forEach((employee) => {
    const row = document.createElement("tr");
    row.innerHTML = `
            <td>${employee.name}</td>
            <td>${employee.position}</td>
            <td>${employee.about}</td>
            <td>${formatDate(employee.joining_date)}</td>
            <td>
                <button class="listing__delete-btn" onclick="deleteEmployee(${
                  employee.id
                })">
                    <i class="fas fa-trash"></i> Delete
                </button>
            </td>
        `;
    tableBody.appendChild(row);
  });
}

// Set up pagination
function setupPagination() {
  const totalPages = Math.ceil(employees.length / ITEMS_PER_PAGE);
  const pagination = document.getElementById("pagination");
  pagination.innerHTML = "";

  for (let i = 1; i <= totalPages; i++) {
    const button = document.createElement("button");
    button.classList.add("listing__pagination-btn");
    if (i === currentPage)
      button.classList.add("listing__pagination-btn--active");
    button.textContent = i;
    button.addEventListener("click", () => {
      currentPage = i;
      displayEmployees();
      setupPagination();
    });
    pagination.appendChild(button);
  }
}

// Delete employee
function deleteEmployee(id) {
  if (confirm("Are you sure you want to delete this employee?")) {
    employees = employees.filter((emp) => emp.id !== id);
    localStorage.setItem("employees", JSON.stringify(employees));

    // Recalculate current page if necessary
    const totalPages = Math.ceil(employees.length / ITEMS_PER_PAGE);
    if (currentPage > totalPages) {
      currentPage = totalPages || 1;
    }

    displayEmployees();
    setupPagination();
  }
}

// Format date for display
function formatDate(dateString) {
  return new Date(dateString).toLocaleDateString();
}

// Search functionality
function setupSearch() {
  const searchInput = document.querySelector(".header__search-input");
  searchInput.addEventListener("input", function (e) {
    const searchTerm = e.target.value.toLowerCase();
    employees = JSON.parse(localStorage.getItem("employees") || "[]").filter(
      (emp) => emp.name.toLowerCase().includes(searchTerm)
    );

    currentPage = 1;
    displayEmployees();
    setupPagination();
  });
}

// Initialize
document.addEventListener("DOMContentLoaded", () => {
  loadEmployees();
  setupSearch();
});
