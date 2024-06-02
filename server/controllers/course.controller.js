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



export {
    getAllCourses
}