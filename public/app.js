document.addEventListener("DOMContentLoaded", async () => {
  const tableBody = document.getElementById("student-table-body");
  const addButton = document.getElementById("btn-add-data");
  const addModal = document.getElementById("addModal");
  const addForm = document.getElementById("addForm");

  async function fetchStudents() {
    try {
      const response = await fetch("/api/student");
      const students = await response.json();
      renderTable(students);
    } catch (error) {
      console.error("Error fetching students:", error);
    }
  }

  async function addStudent(newStudent) {
    try {
      const response = await fetch("/api/student", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newStudent),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      fetchStudents();
    } catch (error) {
      console.error("Error adding student:", error);
    }
  }

  async function updateStudent(studentId, updatedData) {
    try {
      const response = await fetch(`/api/student/${studentId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedData),
      });

      fetchStudents();
    } catch (error) {
      console.error("Error updating student:", error);
    }
  }

  async function deleteStudent(studentId) {
    try {
      const response = await fetch(`/api/student/${studentId}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      });

      fetchStudents();
    } catch (error) {
      console.error("Error updating student:", error);
    }
  }

  function renderTable(students) {
    tableBody.innerHTML = "";
    let index = 1;
    students.forEach((student) => {
      const row = document.createElement("tr");
      row.innerHTML = `
              <td>${index}</td>
              <td>${student.name}</td>
              <td>${student.address}</td>
              <td>${student.phone}</td>
              <td width="20%">
                  <button class="btn btn-primary" id="btn-update-${student._id}">Update</button>
                  <button class="btn btn-danger" id="btn-delete-${student._id}">Delete</button>
              </td>
          `;
      tableBody.appendChild(row);
      index++;

      const btnUpdate = document.getElementById(`btn-update-${student._id}`);
      btnUpdate.addEventListener("click", () => openModal(student));

      const btnDelete = document.getElementById(`btn-delete-${student._id}`);
      btnDelete.addEventListener("click", () => confirm_delete(student));
    });
  }

  function confirm_delete(student) {
    const result = confirm("Are you sure to delete this student ?");

    if (result) {
      deleteStudent(student._id);
    } else {
      alert("Deletion cancelled.");
    }
  }

  fetchStudents();

  const modal = document.getElementById("myModal");
  const modalContent = document.querySelector(".modal-content");

  function openModal(student) {
    modal.style.display = "block";
    modalContent.innerHTML = `
          <span class="close">&times;</span>
          <h2>Update Student</h2>
          <form id="updateForm">
              <label for="name">Name:</label> <br>
              <input type="text" id="name" name="name" value="${student.name}" required> <br>
              <label for="address">Address:</label> <br>
              <input type="text" id="address" name="address" value="${student.address}" required> <br>
              <label for="phone">Phone:</label> <br>
              <input type="text" id="phone" name="phone" value="${student.phone}" required> <br> <br>
              <button type="submit">Update</button> <br>
          </form>
      `;

    const closeModalBtn = document.querySelector(".close");
    closeModalBtn.addEventListener("click", closeModal);

    const updateForm = document.getElementById("updateForm");
    updateForm.addEventListener("submit", (event) => {
      event.preventDefault();
      const updatedData = {
        name: document.getElementById("name").value,
        address: document.getElementById("address").value,
        phone: document.getElementById("phone").value,
      };
      updateStudent(student._id, updatedData);

      console.log("Update form submitted");
      closeModal();
    });
  }

  function closeModal() {
    modal.style.display = "none";
  }

  window.addEventListener("click", (event) => {
    if (event.target === modal) {
      closeModal();
    }
  });

  //

  addButton.addEventListener("click", () => {
    addModal.style.display = "block";
  });

  addForm.addEventListener("submit", (event) => {
    event.preventDefault();
    const newStudent = {
      name: document.getElementById("addName").value,
      address: document.getElementById("addAddress").value,
      phone: document.getElementById("addPhone").value,
    };
    addStudent(newStudent);
    addModal.style.display = "none";
  });

  const closeAddModalBtn = document.querySelector(".close");
  closeAddModalBtn.addEventListener("click", () => {
    addModal.style.display = "none";
  });

  window.addEventListener("click", (event) => {
    if (event.target === addModal) {
      addModal.style.display = "none";
    }
  });
});
