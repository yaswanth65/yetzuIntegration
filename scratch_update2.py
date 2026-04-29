import re

with open('src/app/(studentdash)/s/dashboard/page.tsx', 'r') as f:
    content = f.read()

# Add enrolledCourseIds state
if 'const [enrolledCourseIds, setEnrolledCourseIds] = useState<string[]>([]);' not in content:
    content = content.replace(
        'const [availableCourses, setAvailableCourses] = useState<any[]>([]);',
        'const [availableCourses, setAvailableCourses] = useState<any[]>([]);\n  const [enrolledCourseIds, setEnrolledCourseIds] = useState<string[]>([]);'
    )

# Add population of enrolledCourseIds inside fetchDashboardData
if 'setEnrolledCourseIds(userInfo.enrolledCourses' not in content:
    content = content.replace(
        'setApiData(overviewData);',
        'setApiData(overviewData);\n          if (overviewData.userInfo?.enrolledCourses) {\n            setEnrolledCourseIds(overviewData.userInfo.enrolledCourses.map((c: any) => c._id || c.id));\n          }'
    )

# Update handleEnroll to set the ID
if 'setEnrolledCourseIds((prev)' not in content:
    content = content.replace(
        'toast.success("Successfully enrolled in 1:1 session! Chat enabled.");',
        'toast.success("Successfully enrolled in 1:1 session! Chat enabled.");\n        setEnrolledCourseIds((prev) => [...prev, course._id || course.id]);'
    )

# Update the card button rendering
old_button = r'''<button 
                          onClick={(e) => handleEnroll\(e, course\)}
                          className="px-4 py-2 bg-\[#111111\] hover:bg-black text-white text-\[13px\] font-medium rounded-lg transition-colors"
                        >
                          Enroll Now
                        </button>'''

new_button = r'''{(()=>{
                          const isEnrolled = enrolledCourseIds.includes(course._id || course.id);
                          return (
                            <button 
                              onClick={(e) => !isEnrolled && handleEnroll(e, course)}
                              disabled={isEnrolled}
                              className={`px-4 py-2 text-[13px] font-medium rounded-lg transition-colors ${
                                isEnrolled 
                                  ? "bg-green-100 text-green-800 opacity-80 cursor-default"
                                  : "bg-[#111111] hover:bg-black text-white"
                              }`}
                            >
                              {isEnrolled ? "Enrolled" : "Enroll Now"}
                            </button>
                          );
                        })()}'''

content = re.sub(old_button, new_button, content, flags=re.DOTALL)

with open('src/app/(studentdash)/s/dashboard/page.tsx', 'w') as f:
    f.write(content)
