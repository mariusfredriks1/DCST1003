import fs from 'fs';

let studentList = document.getElementById('studentList');
let button = document.getElementById('button');
let name = document.getElementById('name');
let email = document.getElementById('email');

let students = [];

fs.readFile('src/data.json', (error, data) => {
  students = JSON.parse(data);

  for (let student of students) {
    let li = document.createElement('li');
    li.innerText = `${student.name},  ${student.email}`;
    studentList.appendChild(li);
    let deleteButton = document.createElement('button');
    deleteButton.innerText = 'Slett';
    li.appendChild(deleteButton);
    deleteButton.onclick = () => {
      let indeks = students.indexOf(student);
      students = students.filter((student, i) => i != indeks)
      skrivFil();
      location.reload();

    };
  }
});

let skrivFil = () => {
  fs.writeFile('src/data.json', JSON.stringify(students), (error) => {
    if (error) return console.error(error);
  });
};

button.onclick = () => {
  students.push({ name: name.value, email: email.value });

  skrivFil();
};
