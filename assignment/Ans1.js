// server.js
import express from ('express');
const app = express();

const users = [
  { id: 1, name: "Ananya" },
  { id: 2, name: "Manu" },
  { id: 3, name: "Ekta" }
];

app.get('/users', (req, res) => {
  const { name } = req.query;

  if (!name) {
    return res.json(users);
  }

  const filteredUsers = users.filter(user =>
    user.name.toLowerCase().includes(name.toLowerCase())
  );

  res.json(filteredUsers);
});
