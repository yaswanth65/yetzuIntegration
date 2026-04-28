const fs = require('fs');
const file = 'src/app/(studentdash)/components/DashSidebar.tsx';
let content = fs.readFileSync(file, 'utf8');
content = content.replace('import { usePathname, useRouter } from "next/navigation";', 'import { usePathname } from "next/compat/router";');
fs.writeFileSync(file, content);
console.log('Fixed DashSidebar.tsx');