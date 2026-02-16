app.use(express.urlencoded({ extended: true }));
app.set('view engine', 'ejs');

app.get('/contact', (req, res) => {
  res.render('contact');
});

app.post('/contact', (req, res) => {
  const { name, email } = req.body;
  console.log(name, email);
  res.send("Form Submitted Successfully!");
});
