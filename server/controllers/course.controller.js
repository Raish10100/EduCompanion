import Course from "../models/course.model.js"

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


export {
    getAllCourses,
    getLecturesByCourseId
}