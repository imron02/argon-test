const express = require("express");
const { sequelize } = require("./models");
const employeeRoutes = require("./routes/employee.routes");
const authEmployeeRoutes = require("./routes/authEmployee.routes");
const authAdminRoutes = require("./routes/authAdmin.routes");

const app = express();
app.use(express.json());

app.use((req, res, next) => {
  res.globalResponse = (data, message = "Data berhasil diproses") => {
    res.json({
      success: true,
      message: message,
      ...data,
    });
  };

  res.globalErrorResponse = (data, message = "Data gagal diproses") => {
    res.json({
      success: false,
      message: message,
      error: data,
    });
  };
  next();
});
app.use(employeeRoutes);
app.use('/employee', authEmployeeRoutes);
app.use('/admin', authAdminRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server berjalan di http://localhost:${PORT}`);
});

process.on("SIGINT", async () => {
  console.log("Closing database connection");
  await sequelize.close();
  process.exit(0);
});

process.on("SIGTERM", async () => {
  console.log("Closing database connection");
  await sequelize.close();
  process.exit(0);
});
