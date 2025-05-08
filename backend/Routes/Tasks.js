const express = require("express");
const router = express.Router();
const Task = require("./../Models/Tasks");
const auth = require("./../Middlewares/authMiddleware");
const User = require("../Models/User");
const { check, validationResult } = require("express-validator");
const catchAsync = require("./../utility/catchAsync");

router.post(
  "/",
  auth,
  check("title")
    .notEmpty()
    .withMessage("Title is required")
    .isLength({ max: 100 })
    .withMessage("Title must be ≤100 chars"),
  check("status")
    .optional()
    .isIn(["todo", "in-progress", "done"])
    .withMessage("Invalid status"),
  catchAsync(async (req, res) => {
    //check for validation errors.
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      const err = new Error({ errors: errors.array() });
      err.status = 400;
      throw err;
    }
    const task = new Task({ ...req.body, createdBy: req.user.id });
    await task.save();
    console.log(task);
    return res.status(200).json("new task added succesfully");
  })
);

router.get(
  "/",
  auth,
  catchAsync(async (req, res) => {
    const tasks = await Task.find({ createdBy: req.user.id }).populate(
      "createdBy",
      "username email"
    );
    return res.status(200).json({
      tasks,
    });
  })
);

router.get(
  "/:id",
  auth,
  catchAsync(async (req, res) => {
    const id = req.params.id;
    const task = await Task.findById({ _id: id });
    return res.status(200).json({ task: task });
  })
);

//paginated
// router.get("/paginated", auth, async (req, res) => {
//   try {
//     //implementing pagination logic.
//     const page = parseInt(req.query.page) || 1;
//     const limit = parseInt(req.query.limit) || 10;
//     const skip = (page - 1) * limit;

//     const tasks = await Task.find({ createdBy: req.user.id })
//       .skip(skip)
//       .limit(limit)
//       .populate("createdBy", "username email");

//     const totaltasks = await Task.countDocuments({ createdBy: req.user.id });
//     return res.status(200).json({
//       tasks,
//       totalPages: Math.ceil(totaltasks / limit),
//       currentPage: page,
//     });
//   } catch (err) {
//     return res.status(500).json(err);
//   }
// });

// //cursor based where front-end automatically fetches data if it reaches page end.

// router.get("/cursor", auth, async (req, res) => {
//   try {
//     //take the cursor id which points to last document in previous request
//     const cursor_id = parseInt(req.query.cursor) || null;
//     const limit = parseInt(req.query.limit) || 10;
//     const tasks = await Task.find(cursor_id ? { _id: { $gt: cursor_id } } : {})
//       .sort({ _id: 1 })
//       .limit(limit);

//     const nextCursor = tasks.length > 0 ? tasks[tasks.length - 1]._id : null;

//     return res.json({
//       tasks,
//       nextCursor,
//       hasMore: tasks.length === limit, //indicates if more tasks are still present.
//     });
//   } catch (err) {
//     return res.status(500).json(err);
//   }
// });

router.patch(
  "/:id",
  auth,
  catchAsync(async (req, res) => {
    const id = req.params.id;
    console.log(id);
    const allowedUpdates = ["title", "description", "status", "priority"];
    console.log(req.body);
    const updates = Object.keys(req.body);
    const isvalidUpdate = updates.filter((update) =>
      allowedUpdates.includes(update)
    );

    if (updates.length !== isvalidUpdate.length) {
      const err = new Error("task update failed");
      err.status = 400;
      throw err;
    }
    const task = await Task.findOneAndUpdate({ _id: id }, req.body, {
      new: true,
      runValidators: true,
    });
    return res.status(200).json({ msg: "task updated succesfully", task });
  })
);

router.delete("/:id", auth, async (req, res) => {
  try {
    const id = req.params.id;

    const task = await Task.findOneAndDelete({
      _id: id,
      createdBy: req.user.id,
    });
    return res.status(200).json({ msg: "task deleted successfully." });
  } catch (err) {
    return res.status(500).json(err);
  }
});

module.exports = router;
