import express from "express";
import User from "../Schemas/userSchema.js";

const router = express.Router();

// POST method api for creating a new user:
router.post("/createUser", async (req, res) => {
          console.log("Received the request body");
          const { name, email } = req.body;

          if (!name || !email) {
                    return res.status(400).json({
                              message: "Error",
                              error: "Please enter all the fields"
                    });
          }

          try {
                    const newUser = new User({ name, email });
                    await newUser.save();

                    console.log("New User has been created:", newUser);
                    return res.status(201).json({
                              status: "Success",
                              message: "New User has been created Successfully"
                    });

          } catch (error) {
                    console.error("Error creating user:", error);

                    if (error.code === 11000) {
                              return res.status(400).json({ error: "User with this Email already exists" });
                    }

                    res.status(500).json({ error: "Internal Server Error" });
          }
});


// router.get('/getStudent-class', async (req, res) => {
//      const { studentClass } = req.body;
//      if (!studentClass) {
//           return res.status(400).json({ status: "Error", error: "class is required" });
//      }
//      const students = await StudentInfo.find({ studentClass });
//      res.status(200).json({ students });

//      if (students) {
//           console.log("Students from class", studentClass, ":", students);
//           return res.status(200).json({ status: "Found Students", data: students });

//      } else {
//           return res.status(404).json({ status: "Error", error: "No students found in this class" });
//      }
// });



// GET method api for getting information of all the users
router.get("/getUsers", async (req, res) => {
          const { name } = req.body;
          if (!name) {
                    return res.status(400).json({
                              status: "Error",
                              error: "Name is required"
                    });
          }
          const users = await User.find();
          res.status(200).json({ users });
          if (users) {
                    console.log(users);
                    return res.status(200).json({
                              status: "Success",
                              data: users
                    });
          } else {
                    return res.status(404).json({
                              status: "Error",
                              error: "No user found"
                    });
          }
});






export default router;