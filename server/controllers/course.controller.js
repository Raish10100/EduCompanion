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
console.log(`id: ${id}`)
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

    console.log(req.body)

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
        const { title, description, category, createdBy } = req.body;
// console.log(title, description, category, createdBy)
console.log(req.body)
        const course = await Course.findById(id);
        if(!course) {
            return next(
                new AppError('Unable to update course', 500)
            )
        };

        // console.log(course)

        if(!title || !description || !category || !createdBy ) {
            return next(
                new AppError("All fields are required", 400)
            )
        }

        course.title = title;
        course.description = description;
        course.category = category;
        course.createdBy = createdBy



        if(req.file) {
            const result = await cloudinary.v2.uploader.upload(req.file.path, {
                folder: 'lms'
            });



            if(result) {
                course.thumbnail.public_id = result.public_id;
                course.thumbnail.secure_url = result.secure_url;
            }
    

            fs.rm(`uploads/${req.file.filename}`);
            console.log("thumbnail -------------------------------------------")
        }
    


   
          await course.save()

        res.status(200).json({
            success: true,
            message: 'Successfully updated course',
            
        })
    } catch (error) {
        res.status(400).json({
            success: false,
            message: error.message,
            error
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
        console.log(title, description, id)
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
            console.log(`Response of cloudinary after uploading video: ${result}`);
            console.log(result.public_id);
            console.log(result.secure_url);
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
// console.log(course.lectures);
      course.numbersOfLectures = course.lectures.length;

      await course.save();

      res.status(200).json({
        success: true,
        message: 'Successfully added  lecture to course',
      })

    } catch (error) {
        // console.log(error)
        res.status(400).json({
        success: false,
        message: error.message
    })  
    }
}

const removeLectureFromCourse = async(req, res, next) => {
    try {
        const { courseId, lectureId } = req.query;

        if(!courseId || !lectureId) {
            return next(
                new AppError('Please provide both courseId and lectureId.', 400)
            )
        }
       
        const course = await Course.findById(courseId);

        if(!course) {
            return next(new AppError('Course not found', 404))
        }

        const lectureIndex = course.lectures.findIndex(
            (lecture) => lecture._id.toString() === lectureId.toString()
        )

        if(lectureIndex === -1) {
            return next(new AppError('Lecture does not exist', 404))
        }

        await cloudinary.v2.uploader.destroy(
            course.lectures[lectureIndex].lecture.public_id,
            {
                resource_type: 'video',
            }
        );


        course.lectures.splice(lectureIndex, 1);

        course.numbersOfLectures = course.lectures.length;

        await course.save();

        res.status(200).json({
            success: true,
            message: 'Successfully removed lecture from course'
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
    addLectureToCourseById,
    removeLectureFromCourse
}