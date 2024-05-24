const router = require("express").Router();

const tasksRoutes = require("./taskRoutes");

router.use("/tasks", tasksRoutes);

module.exports = router;
