import SearchIcon from '@mui/icons-material/Search';
import { useEffect, useState } from "react";

export default function SearchBar ({ sendSearchQuery, searchQuery }) {
    const [searchQueryState, setSearchQueryState] = useState("");

    function inputChangeHandle (event) {
        setSearchQueryState(event.target.value);
    }

    useEffect(() => {
        if (searchQuery) {
            setSearchQueryState(searchQuery);
        }
    }, [])

    function submitSearchHandle (e) {
        e.preventDefault();
        sendSearchQuery(searchQueryState);
    }

    return (
        <form id="searchbar" onSubmit={submitSearchHandle} className="flex flex-row sm:w-1/3 w-3/5 sm:h-full h-3/4 my-auto bg-var-1 border-solid border-2 border-var-2 rounded-[20px] ">
            <input className=" w-full h-full outline-none pl-4 pr-4 rounded-input " onChange={inputChangeHandle} placeholder="Search..." value={searchQueryState} />
            <button className="flex justify-center items-center" form="searchbar" type="submit">
                <SearchIcon className="rounded-circular mx-2 py-1 hover:bg-var-2 hover:text-var-1 duration-200" fontSize="large"/>
            </button>
        </form>
    )
}