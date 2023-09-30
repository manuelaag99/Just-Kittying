import { Link } from "react-router-dom";
import SearchIcon from '@mui/icons-material/Search';
import { useState } from "react";

export default function SearchBar () {
    const [searchQuery, setSearchQuery] = useState();

    function inputChangeHandle (event) {
        console.log(event.target.value);
        setSearchQuery(event.target.value);
    }

    return (
        <div className="flex flex-row sm:w-1/3 w-3/5 sm:h-full h-3/4 my-auto bg-var-1 border-solid border-2 border-var-2 rounded-[20px] ">
            <input className=" w-full h-full outline-none pl-6 pr-4 rounded-input " onChange={inputChangeHandle} value={searchQuery} />
            <Link className="flex justify-center items-center" to="/searchresults">
                <SearchIcon className="rounded-circular mx-2 py-1 hover:bg-var-2 hover:text-var-1 duration-200" fontSize="large"/>
            </Link>
        </div>
    )
}