import { getCourses, getUserProgress } from "@/db/queries";
import { List } from "./list";

const CoursePages = async () => {
    const courseData = getCourses();
    const userProgressData = getUserProgress();

    const [
        courses,
        userProgress,
    ] = await Promise.all([
        courseData,
        userProgressData,
    ])

    return(
        <div className="h-full lg:max-h-screen max-w-[912px] px-3 mx-auto flex flex-col items-center pt-10 sm:pt-20 pb-10 lg:pb-0">
            <h1 className="text-5xl text-center font-semibold font-dongle text-neutral-600">
                SELECT A DESIRED DIALECT
            </h1>
            <List 
                courses={courses}
                activeCourseId={userProgress?.activeCourseId}
            />
        </div>
    );
};

export default CoursePages;

