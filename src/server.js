import app from "../index";
const port = process.env.PORT || 3500;
app.listen(port, () => {
  console.log(` app listening on port http://localhost:${port}/api/v1/`);
});
