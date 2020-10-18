export const createCourseList = (featuredCourses, nonFeaturedCourses) => {
  return [...featuredCourses, ...nonFeaturedCourses]
}
