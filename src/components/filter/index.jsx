
import React from "react";
import "./filter.css";
import moment from 'moment';

function Filter() {


    return (
        <div className="flex justify-between items-center  w-full " >
            <span className="flex flex-col">
                <span className="text-white title" >Jali Koi Analytics</span>
                <span className="text-sm text-white title-sub" >See what is going on with your business</span>
            </span>
            <span className="date-filter text-white " >
                {moment().format('LLLL')}
            </span>
            <span className="bg-white px-5 py-1 rounded-xl ">
                <button className="flex" >

                    DFS</button>
            </span>
        </div>
    );
}
export default Filter;