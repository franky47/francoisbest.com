const url = tag =>
  `http://localhost:3000/api/isr?token=${process.env.ISR_TOKEN}&tag=${tag}`

await Promise.all([fetch(url('npm')), fetch(url('github'))])
