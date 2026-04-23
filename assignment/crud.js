const express = require('express');
const mongoose = require('mongoose');

const app = express();
app.use(express.json());


//DB CONNECTION 
mongoose.connect('mongodb://127.0.0.1:27017/studentDB')
    .then(() => console.log("MongoDB Connected"))
    .catch(err => console.log(err));


//SCHEMAS

// Student Schema
const studentSchema = new mongoose.Schema({
    name: String,
    email: { type: String, unique: true },
    gpa: Number,
    department: String,
    city: String
});
const Student = mongoose.model('Student', studentSchema);


// Course Schema (with prerequisites)
const courseSchema = new mongoose.Schema({
    name: String,
    code: { type: String, unique: true },
    credits: Number,
    prerequisites: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Course'
        }
    ]
});
const Course = mongoose.model('Course', courseSchema);


// Professor Schema (multiple departments)
const professorSchema = new mongoose.Schema({
    name: String,
    email: { type: String, unique: true },
    departments: [String],
    coursesTaught: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Course'
        }
    ]
});
const Professor = mongoose.model('Professor', professorSchema);


// Grade Schema (student + course reference)
const gradeSchema = new mongoose.Schema({
    student: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Student'
    },
    course: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Course'
    },
    grade: String,
    gpa: Number,
    semester: String
});
const Grade = mongoose.model('Grade', gradeSchema);



// BASIC INSERT APIs

// Add Student
app.post('/student/add', async (req, res) => {
    const student = await Student.create(req.body);
    res.json(student);
});

// Add Course
app.post('/course/add', async (req, res) => {
    const course = await Course.create(req.body);
    res.json(course);
});

// Add Professor
app.post('/professor/add', async (req, res) => {
    const professor = await Professor.create(req.body);
    res.json(professor);
});

// Add Grade
app.post('/grade/add', async (req, res) => {
    const grade = await Grade.create(req.body);
    res.json(grade);
});



// AGGREGATION APIs

//Average GPA by Department
app.get('/aggregate/avg-gpa-department', async (req, res) => {
    const result = await Student.aggregate([
        {
            $group: {
                _id: "$department",
                avgGPA: { $avg: "$gpa" }
            }
        }
    ]);
    res.json(result);
});


//Most Popular Courses (based on enrollments)
app.get('/aggregate/popular-courses', async (req, res) => {
    const result = await Grade.aggregate([
        {
            $group: {
                _id: "$course",
                totalStudents: { $sum: 1 }
            }
        },
        { $sort: { totalStudents: -1 } },
        { $limit: 5 },
        {
            $lookup: {
                from: "courses",
                localField: "_id",
                foreignField: "_id",
                as: "courseDetails"
            }
        },
        { $unwind: "$courseDetails" },
        {
            $project: {
                courseName: "$courseDetails.name",
                totalStudents: 1
            }
        }
    ]);
    res.json(result);
});


//Student Performance Report
app.get('/aggregate/student-performance', async (req, res) => {
    const result = await Grade.aggregate([
        {
            $lookup: {
                from: "students",
                localField: "student",
                foreignField: "_id",
                as: "studentDetails"
            }
        },
        { $unwind: "$studentDetails" },
        {
            $lookup: {
                from: "courses",
                localField: "course",
                foreignField: "_id",
                as: "courseDetails"
            }
        },
        { $unwind: "$courseDetails" },
        {
            $group: {
                _id: "$student",
                name: { $first: "$studentDetails.name" },
                avgGPA: { $avg: "$gpa" },
                courses: { $push: "$courseDetails.name" }
            }
        }
    ]);
    res.json(result);
});



// SERVER
app.listen(3000, () => {
    console.log("Server running on http://localhost:3000");
});