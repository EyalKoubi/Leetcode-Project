// const express = require("express");
// const morgan = require("morgan");
// const mongoose = require("mongoose");
// const Person = require("./models/peoples");

// // express app
// const app = express();

// const dbURI =
//   "mongodb+srv://eyal4845:Eyal4845@cluster0.ac6s6vf.mongodb.net/new_db?retryWrites=true&w=majority";

// const connectToDb = async () => {
//   try {
//     await mongoose.connect(dbURI);
//     console.log("✅ Connected to MongoDB");
//     app.listen(3000);
//   } catch (error) {
//     console.error("❌ Error connecting to MongoDB:", error);
//   }
// };

// connectToDb();

// app.use(express.static("public"));

// app.use(morgan("dev"));

// // app.use((req, res, next) => {
// //   console.log("new request: ");
// //   console.log(`host: ${req.hostname}`);
// //   console.log(`path: ${req.path}`);
// //   console.log(`method: ${req.method}`);
// //   next();
// // });

// // register view engine
// app.set("view engine", "ejs");
// // app.set('views', 'myviews');

// app.get("/", async (req, res) => {
//   console.log("🚀 Checking if person exists...");

//   const aba = new Person({
//     name: "Yual Koubi",
//     id: "056363540",
//     age: 65,
//     gender: "Male",
//   });

//   try {
//     const personExists = await Person.findOne({ id: aba.id });

//     if (personExists) {
//       console.log("✅ Person already exists, no need to create.");
//     } else {
//       console.log("❌ Person not found, creating new entry...");
//       await aba.save();
//       console.log("✅ New person created!");
//     }

//     const blogs = [
//       {
//         title: "Yoshi finds eggs",
//         snippet: "Lorem ipsum dolor sit amet consectetur",
//       },
//       {
//         title: "Mario finds stars",
//         snippet: "Lorem ipsum dolor sit amet consectetur",
//       },
//       {
//         title: "How to defeat Bowser",
//         snippet: "Lorem ipsum dolor sit amet consectetur",
//       },
//     ];

//     res.render("index", { title: "Home", blogs });
//   } catch (error) {
//     console.error("❌ Error checking or creating person:", error);
//     res.status(500).send("Internal Server Error");
//   }
// });

// app.get("/all", async (req, res) => {
//   await Person.find()
//     .then((result) => res.send(result))
//     .catch((err) => console.log(err));
// });

// app.get("/find-me", async (req, res) => {
//   const me = await Person.findById("67bc437b5f16853cc71747b3");
//   console.log("🚀 ~ app.get ~ me.name:", me.name);
// });

// app.use((req, res, next) => {
//   console.log("in the next midleware");
//   next();
// });

// app.get("/about", (req, res) => {
//   res.render("about", { title: "About" });
// });

// app.get("/blogs/create", (req, res) => {
//   res.render("create", { title: "Create a new blog" });
// });

// // 404 page
// app.use((req, res) => {
//   res.status(404).render("404", { title: "404" });
// });
