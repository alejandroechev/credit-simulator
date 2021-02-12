const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(express.static('public'));

app.get('/api/credit/*', (req, res) => {
  const adjustedRate = parseFloat(req.query.rate) / 100.0;
  const adjustedPeriod = parseFloat(req.query.years) * 12;
  const creditAmount = parseFloat(req.query.amount);
  const monthlyRate = Math.pow(1 + adjustedRate, 1.0/12.0) - 1;
  const monthlyPayment = creditAmount * monthlyRate * (Math.pow(1 + monthlyRate, adjustedPeriod) / (Math.pow(1 + monthlyRate,adjustedPeriod) - 1));
	res.send(monthlyPayment.toString());
});

app.listen(3000, () => console.log('server started'));