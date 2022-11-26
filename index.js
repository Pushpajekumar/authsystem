const app = require("./main");

const { PORT } = process.env;

app.listen(PORT, () => {
  console.log(`Server is running at Port ${PORT} ...`);
});
