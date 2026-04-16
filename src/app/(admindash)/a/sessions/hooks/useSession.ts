import { sessionsData } from '@/app/(admindash)/data/SessionData';
import { useMemo, useState } from 'react';
import { TAB_FILTER } from '../utils/filter';


type Tab = "All" | "Upcoming" | "Completed" | "Missed";

export function useSession() {

    const [activeTab, setActiveTab] = useState<Tab>("All");
    const [search, setSearch] = useState("");
    const [currentPage, setCurrentPage] = useState(1);

    const ROWS_PER_PAGE = 6;

    const filtered = useMemo(() => {

        let result = sessionsData.filter(TAB_FILTER[activeTab]);

        if (search.trim()) {
            const q = search.toLowerCase();
            result = result.filter(
                (s) => s.id.toLowerCase().includes(q) ||
                    s.educator.toLowerCase().includes(q)
            )
        }

        return result;
    }, [activeTab, search])





const totalPages = Math.max(1, Math.ceil(filtered.length / ROWS_PER_PAGE));
const paginated = filtered.slice(
    (currentPage - 1) * ROWS_PER_PAGE,
    currentPage * ROWS_PER_PAGE
);

const handleTabChange = (tab: Tab) => {
    setActiveTab(tab);
    setCurrentPage(1);
    setSearch("");
};

}