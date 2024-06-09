import { useNavigate } from "react-router-dom";

function CourseCard({ data }) {
    const navigate = useNavigate();

    return (
        // <div className="card vs:w-[340px] lg:w-96 glass rounded-md shadow-lg  hover:scale-105 transition-all hover:bg-opacity-100  ease-in-out duration-300 cursor-pointer">
        //     {/* <figure><img src="https://img.daisyui.com/images/stock/photo-1606107557195-0e29a4b5b4aa.jpg" className="w-[384px] h-[226px]" alt="car!"/></figure> */}
        //     <figure><img src="https://res.cloudinary.com/deodsnio3/image/upload/v1713100041/lms/gcnsht31gh1l0ag19l5n.jpg" className="w-[384px] h-[226px]" alt="car!"/></figure>
        //     <div className="card-body p-[-300px] flex flex-col gap-3">
        //         <h2 className="card-title line-clamp-2">Git & Github</h2>
        //         <p className="line-clamp-2 text-sm sm:text-[15px] font-bold">Unlock the power of version control with our comprehensive Git & GitHub course. Whether you're a beginner</p>
        //         <p className="text-sm sm:text-[15px] font-bold">Category: <span className="font-normal">WEB DEVELOPMENT</span></p>
        //         <p className="text-sm sm:text-[15px] font-bold">Total lectures: <span className="font-normal">3</span></p>
        //         <p className="text-sm sm:text-[15px] font-bold">Instructor: <span className="font-normal">John Doe</span></p>
        //     </div>
        // </div>
        <div onClick={() => navigate("courses/description")} className="card vs:w-[340px] lg:w-96 glass rounded-md shadow-lg   hover:scale-105 transition-all hover:bg-opacity-100  ease-in-out duration-300 cursor-pointer">
            <figure><img src={data.thumbnail.secure_url} className="w-[384px] h-[226px]" alt="car!"/></figure>
            <div className="card-body flex flex-col gap-3 h-[280px]  lg:h-[260px]">
                <h2 className="card-title line-clamp-2">{data.title}</h2>
                <p className="line-clamp-2 text-sm sm:text-[15px] font-bold">{data.description}</p>
                <p className="text-sm sm:text-[15px] font-bold">Category: <span className="font-normal">{data.category}</span></p>
                <p className="text-sm sm:text-[15px] font-bold">Total lectures: <span className="font-normal">{data.numberOfLectures}</span></p>
                <p className="text-sm sm:text-[15px] font-bold">Instructor: <span className="font-normal">{data.createdBy}</span></p>
            </div>
        </div>
    )
}

export default CourseCard;