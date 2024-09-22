// src/MonthSelector.js
import React, { useState } from "react";


const MonthSelector = () => {
  const [showList, setShowList] = useState(false);
  const [monthSelected,setMonthSelected]= useState('January');
  const toggleList = () => {
    setShowList(!showList);
  };
  const handleClick=(month)=>{
   
    setMonthSelected(month);
    toggleList();
  }

  const months = [
    "January", "February", "Tháng 3", "Tháng 4", "Tháng 5", "Tháng 6",
    "Tháng 7", "Tháng 8", "Tháng 9", "Tháng 10", "Tháng 11", "Tháng 12"
  ];

  return (
    <div className="month-selector">
      <button className="select-btn" onClick={toggleList}>
        {monthSelected}
      </button>
      {showList && (
        <ul className="month-list">
          {months.map((month, index) => (
            <li key={index} onClick={()=>{handleClick(month)}}>{month}</li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default MonthSelector;
