import SessionTable from "@/app/(admindash)/components/SessionTable";
import { Session } from "@/app/(admindash)/types/SessionType";

interface Props {
    data: Session[];
}

export default function RecentSession({data} : Props) {
  return (
      <SessionTable className="" data={data} showHeader={true} title="Recent Session"   />

  )
}
