import re

with open('src/app/(studentdash)/s/dashboard/page.tsx', 'r') as f:
    content = f.read()

# 1. Remove Focus logic
content = re.sub(r'// 1\. Focus For This Week Logic.*?// 2\. Upcoming Sessions Logic', '// 2. Upcoming Sessions Logic', content, flags=re.DOTALL)

# 2. Extract Discover New Sessions section
discover_match = re.search(r'\{\/\* Discover New Sessions Section \*\/\}[\s\S]*?(?=<\/div>\n          <\/>)', content)
if not discover_match:
    print("Could not find discover section")
    exit(1)

discover_code = discover_match.group(0)

# Remove it from the bottom
content = content.replace(discover_code, '')

# 3. Replace Focus UI with Discover New Sessions
content = re.sub(r'\{\/\* Focus Section \*\/\}[\s\S]*?(?=\{\/\* Upcoming Sessions \(Moved Up\) \*\/\})', discover_code + '\n\n              ', content)

# 4. Update the Discover New Sessions card to show more details
card_inner_old = r'<div className="p-4 flex flex-col flex-1">.*?<div className="mt-auto pt-4 border-t border-gray-50 flex items-center justify-between">'
card_inner_new = r'''<div className="p-4 flex flex-col flex-1">
                      <h3 className="text-[16px] font-bold text-gray-900 mb-2 line-clamp-2 leading-snug group-hover:text-[#042BFD] transition-colors">
                        {course.title}
                      </h3>
                      <p className="text-sm text-gray-500 mb-3 line-clamp-2">
                        {course.subtitle || course.description || "Learn from top educators in this interactive session."}
                      </p>
                      
                      <div className="flex flex-col gap-2 mb-4 mt-auto">
                        <div className="flex items-center gap-2 text-[12px] text-gray-600">
                          <span className="font-semibold text-gray-900">Educator:</span> {course.educatorName || course.educator?.name || "TBA"}
                        </div>
                        <div className="flex items-center gap-2 text-[12px] text-gray-600">
                          <Calendar size={12} className="text-gray-400" />
                          {course.date || course.startDateTime ? new Date(course.date || course.startDateTime).toLocaleDateString() : "Date TBA"}
                          <span className="mx-1">•</span>
                          <Clock size={12} className="text-gray-400" />
                          {course.time || course.startTime || "Time TBA"}
                        </div>
                        <div className="flex items-center gap-2 text-[12px] text-gray-600">
                          <span className="font-medium">Duration:</span> {course.duration || "1 hour"} <span className="mx-1">•</span>
                          <span className="font-medium">Capacity:</span> {course.capacity || course.maxStudents || "Unlimited"}
                        </div>
                      </div>
                      
                      <div className="pt-4 border-t border-gray-50 flex items-center justify-between">'''

content = re.sub(card_inner_old, card_inner_new, content, flags=re.DOTALL)

with open('src/app/(studentdash)/s/dashboard/page.tsx', 'w') as f:
    f.write(content)

print("Done python script")
