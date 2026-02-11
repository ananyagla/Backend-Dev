import express from "express";
const app = express();

app.use(express.json());

const credentials = [
  { email: "aman@gmail.com", password: "234567" },
  { email: "yash@gmail.com", password: "123456" },
];

app.post("/auth/register", (req, res) => {
  const { email, password } = req.body;

  
  if (!email || email.indexOf("@") === -1) {
    return res.status(400).send("Invalid Email");
  }

  
  if (!password || password.length < 8 ) {
    return res
      .status(400)
      .send("Password length should be at least 6");
  }

  
  const existingUser = credentials.find(
    (cred) => cred.email === email
  );

  if (existingUser) {
    return res.status(400).send("User Already Exist");
  }

  credentials.push({ email, password });
  res.send("Registered Successfully");
});

app.post("/auth/login", (req, res) => {
  const { email, password } = req.body;

  const user = credentials.find(
    (cred) => cred.email === email && cred.password === password
  );

  if (user) {
    res.send({ message: "Login Successful", user });
  } else {
    res.status(401).send("Invalid Credential");
  }
});

app.listen(8000, () => console.log("Server Started"));
