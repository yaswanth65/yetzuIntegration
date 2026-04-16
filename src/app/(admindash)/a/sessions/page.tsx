import AllSessions from "./components/AllSessions";
import { sessionsData } from "@/app/(admindash)/data/SessionData";


export default function page() {
  return (
    <div className="bg-white p-6 min-h-screen">
      <AllSessions  data={sessionsData} />
    </div>
  )
}
