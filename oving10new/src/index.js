import { pool } from './mysql-pool';

let button = document.getElementById('button');
let name = document.getElementById('name');
let email = document.getElementById('email');
let slettetDiv = document.getElementById('slettetDiv');

// Perform insert
let printStudents = () => {
  // Perform select-query that fetches all the Students table rows from the database
  pool.query('SELECT * FROM Students', (error, results) => {
    if (error) return console.error(error); // If error, show error in console (in red text) and return

    for (let student of results) {
      let li = document.createElement('li');
      li.innerText = `${student.name},  ${student.email}`;
      studentList.appendChild(li);
      let deleteButton = document.createElement('button');
      deleteButton.innerText = 'X';
      li.appendChild(deleteButton);
      deleteButton.onclick = () => {
        // Delete row from Students with id = student.id
        pool.query('DELETE FROM Students WHERE id = (?)', [student.id], (error, results) => {
          if (error) return console.error(error); // If error, show error in console (in red text) and return

          let slettetOverskrift = document.createElement('h2');
          let slettet = document.createElement('p');

          slettetOverskrift.innerText = `Succesfully deleted student:`;
          slettet.innerText = `Student Id: ${student.id}\n Name: ${student.name}\n  Email: ${student.email}\n`;
          slettetDiv.appendChild(slettetOverskrift);
          slettetDiv.appendChild(slettet);
          setTimeout(location.reload.bind(location), 2000);
        });
      };
    }
  });
};

printStudents();

button.onclick = () => {
  // Perform insert
  pool.query(
    'INSERT INTO Students (name, email) VALUES (?, ?)',
    [name.value, email.value],
    (error, results) => {
      if (error) return console.error(error);
      // If error, show error in console (in red text) and return
    }
  );
};
