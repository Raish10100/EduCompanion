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

const updateCourse = async(req, res, next) => {
    try {
        const { id } = req.params;

        const course = await Course.findByIdAndUpdate(
            id,
            {
                $set: req.body,
            },
            {
                runValidators: true
            }
        );

        if(!course) {
            return next(
                new AppError('Unable to update course', 500)
            )
        }

        res.status(200).json({
            success: true,
            message: 'Successfully updated course',
            course
        })
    } catch (error) {
        res.status(400).json({
            success: false,
            message: error.message,
        })
    }
}

const removeCourse = async(req, res, next) => {
    try {
        const { id } = req.params;
        const course = await Course.findById(id);

        if(!course) {
            return next(
                new AppError('Course not found', 404)
            )
        };

        await Course.findByIdAndDelete(id)

        res.status(200).json({
            success: true,
            message: 'Successfully deleted course',
        })

    } catch (error) {
        res.status(400).json({
            success: false,
            message: error.message
        })
    }
}

const addLectureToCourseById = async(req, res, next) => {
    try {
        
        const { title, description } = req.body;
        const { id } = req.params;

        if(!title || !description) {
            return next(
                new AppError('Please provide all fields', 400)
            )
        }

        const course = await Course.findById(id);
        if(!course) {
            return next(
                new AppError('Course not found', 404)
            )
        } 

     const lectureData = {};

     if (req.file) {
        try {
          const result = await cloudinary.v2.uploader.upload(req.file.path, {
            folder: 'lms', 
            chunk_size: 50000000, // 50mb
            resource_type: 'video',
          });
    
          if (result) {
            lectureData.public_id = result.public_id;
            lectureData.secure_url = result.secure_url;
          }
    
          fs.rm(`uploads/${req.file.filename}`);

        } catch (error) {
            return next(
                new AppError('Unable to upload file', 500)
            )
        }
      }

      course.lectures.push({
        title,
        description,
        lecture: lectureData
      })

      course.numbersOfLectures = course.lectures.length;

      await course.save();

      res.status(200).json({
        success: true,
        message: 'Successfully added  lecture to course',
        
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
    createCourse,
    updateCourse,
    removeCourse,
    addLectureToCourseById
}