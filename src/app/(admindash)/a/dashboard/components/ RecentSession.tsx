import SessionTable from "@/app/(admindash)/components/SessionTable";
import { sessionsData, Session } from "@/app/(admindash)/data/SessionData";

interface Props {
    data: Session[];
}

export default function  RecentSession({data} : Props) {
  return (
      <SessionTable data={data} showHeader={true} title="Recent Session"   />

  )
}
