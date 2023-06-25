const ToDo = require("../modles/doModel")

exports.fetchToDo = async (req, res) => {
    try {
      const allToDos = await ToDo.find({});
      res.status(200).json(allToDos);
    } catch (err) {
      res.status(500).json(err.message);
    }
  };
  exports.publishToDo = async (req, res) => {
    try {
jwt.verify(req.body.token, proccess.env.JWT_SECRET)
      const toDoExists = await ToDo.findOne({ task: req.body.task });
      if (toDoExists) {
        return res.status(400).json("Task already exists!");
      }
      const newToDo = await ToDo.create(req.body);
      return res.status(200).json(newToDo);
    } catch (err) {
      res.status(500).json(err.message);
    }
  };
  exports.deleteToDo = async (req, res) => {
    try {
      await ToDo.findOneAndDelete({ _id: req.params.id });
      res.status(202).send("Deleted task with ID: " + req.params.id);
    } catch (err) {
      res.status(500).json(err.message);
    }
  };
  exports.putToDo = async (req, res) => {
    try {
      await ToDo.findOneAndReplace({ _id: req.params.id }, req.body, {
        new: true,
      });
      res.status(200).send("task have been replace" + req.params.id);
    } catch (err) {
      res.status(500).json(err.message);
    }
  };
