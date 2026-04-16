import { Session } from '@/app/(admindash)/types/SessionType';

export const TAB_FILTER:Record<Tab,(s: Session) => boolean> = {

    All: ()=> true,
    Upcoming: (s)=> s.status === "Scheduled" || s.Status === "Live",
    Completed: (s)=> s.status === "Completed",
    Missed: (s)=> s.status === "Missed"

};