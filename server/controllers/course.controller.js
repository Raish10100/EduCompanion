import Course from "../models/course.model.js"
import AppError from "../utils/error.util.js";
import cloudinary from 'cloudinary';
import fs from 'fs/promises'

const getAllCourses = async (req, res, next) => {
    try {
        const courses = await Course.find({}).select('-lectures');

        res.status(200).json({
            success: true,
            message: "Successfully fetched courses",
            courses,
        })
    } catch (error) {
        res.status(400).json({
            success: false,
            message: error.message
        })
    }
}

const getLecturesByCourseId = async (req, res, next) => {
    try {
        const { id } = req.params;

        const course = await Course.findById(id);

        res.status(200).json({
            success: true,
            message: 'Successfully fetched lectures',
            lectures: course.lectures,
        })
        
    } catch (error) {
        res.status(400).json({
            success: false,
            message: error.message
        })
    }
}

const createCourse = async(req, res, next) => {
    const { title, description, category, createdBy } = req.body;
// console.log(title)
    if(!title || !description || !category || !createdBy) {
        return next(
            new AppError("All fields are required", 400)
        )
    }

    const course = await Course.create({
        title,
        description,
        category,
        createdBy,
        thumbnail: {
            public_id:"Dummy",
            secure_url: "Dummy"
        }
    })

    if(!course) {
        return next(
            new AppError('Unable to create course', 500)
        )
    }

    try {
            if(req.file) {
                const result = await cloudinary.v2.uploader.upload(req.file.path, {
                    folder: 'lms'
                });
                // console.log('debugg')
    // console.log(result.public_id);
    // console.log(result.secure_url);
                if(result) {
                    course.thumbnail.public_id = result.public_id;
                    course.thumbnail.secure_url = result.secure_url;
                }
        
                fs.rm(`uploads/${req.file.filename}`);
            }
        
            await course.save();
        
            res.status(200).json({
                success: true,
                message: 'Successfully created course',
            })
        
    } catch (error) {
        res.status(400).json({
            success: false,
            message: error.message
        })  
    }
}

export {
    getAllCourses,
    getLecturesByCourseId,
    createCourse
}