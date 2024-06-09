import { useNavigate } from "react-router-dom";

function CourseCard() {
    const navigate = useNavigate();

    return (
        <div className="card  vs:w-[340px] lg:w-96 glass rounded-md ">
            <figure><img src="https://img.daisyui.com/images/stock/photo-1606107557195-0e29a4b5b4aa.jpg" className="h-[15%] w-[100%]" alt="car!"/></figure>
            <div className="card-body p-[-300px] flex flex-col gap-3">
                <h2 className="card-title">Git & Github</h2>
                <p className="line-clamp-2 text-sm sm:text-[15px] font-semibold">Unlock the power of version control with our comprehensive Git & GitHub course. Whether you're a beginner...</p>
                <p className="text-sm sm:text-[15px] font-semibold">Category: <span>WEB DEVELOPMENT</span></p>
                <p className="text-sm sm:text-[15px] font-semibold">Total lectures: <span>3</span></p>
                <p className="text-sm sm:text-[15px] font-semibold">Instructor: <span>John Doe</span></p>
            </div>
        </div>
    )
}

export default CourseCard;