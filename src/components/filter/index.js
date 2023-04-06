

import React from "react";


function Filter() {
    return (
        <div className="flex justify-between items-center  w-full" >
            <span className="date-filter " >
                <input type="date" placeholder />
            </span>
            <span className="bg-white px-5 py-1 rounded-xl ">
                <button className="flex" > <svg className="mr-2" width="21" height="20" viewBox="0 0 21 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M11.3334 2.5V8.33333H16.3334L9.66669 17.5V11.6667H4.66669L11.3334 2.5Z" fill="white" stroke="#282828" stroke-width="1.25" stroke-linecap="round" stroke-linejoin="round" />
                </svg>
                    DFS</button>
            </span>
        </div>
    );
}
export default Filter;