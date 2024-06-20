import { useNavigate } from "react-router-dom";

function CourseCard({ data }) {
  const navigate = useNavigate();

  return (
    <div
      onClick={() => navigate("/course/description", {state: {...data}})}
      className="card  vs:w-[340px] lg:w-96 glass rounded-md shadow-lg  hover:scale-105 transition-all hover:bg-opacity-100  ease-in-out duration-300 cursor-pointer"
    >
      <figure>
        <img
          src={data.thumbnail.secure_url}
          className="w-[384px] h-[214px]"
          alt="card!"
        />
      </figure>
      <div className="card-body flex flex-col gap-3 h-[280px]  lg:h-[260px]">
        <h2 className="card-title line-clamp-2">{data.title}</h2>
        <p className="line-clamp-2 text-sm  sm:text-[15px] font-bold">
          {data.description}
        </p>
        <p className="text-sm sm:text-[15px] font-bold">
          Category: <span className="font-normal">{data.category}</span>
        </p>
        <p className="text-sm sm:text-[15px] font-bold">
          Total lectures:{" "}
          <span className="font-normal">{data.numbersOfLectures}</span>
          {/* <span className="font-normal">54</span> */}
          {console.log(data.numberOfLectures)}
        </p>
        <p className="text-sm sm:text-[15px] font-bold">
          Instructor: <span className="font-normal">{data.createdBy}</span>
        </p>
      </div>
    </div>
  );
}

export default CourseCard;
