import { Link, Outlet, useNavigate } from "react-router-dom"
import ChieuDi from "./ChieuDi"
import ChieuVe from "./ChieuVe"
import CurrentTimeComponent from "./CurentTimeComponent";
import { useState,useEffect } from "react";

export default function Car(){

  
  
  
    
    const navigate=useNavigate();
    const [selectedCar,setSelectedCar] = useState('car1');
    return (
      <div className="car">
          <div className="thongtin">
            <ChieuDi/>
            <ChieuVe />
          </div>
          <div className="danhsachxe">
            <div className="danhsachxenav">
            <div className="link">
              <div className="but but1" onClick={() => {setSelectedCar('car1');navigate('/car/1');}} style={{backgroundColor:selectedCar==='car1'? '#4a83c4':'#ebebeb',fontWeight:selectedCar==='car1'?580:500,color:selectedCar==='car1'?'#fff':'#000'}}><Link to="/car/1">Chiều đi</Link></div>
              <div className="but but2" onClick={() =>{ setSelectedCar('car2');navigate('/car/2')}} style={{backgroundColor:selectedCar==='car2'? '#4a83c4':'#ebebeb',fontWeight:selectedCar==='car2'?580:500,color:selectedCar==='car2'?'#fff':'#000'}}><Link to="/car/2">Chiều về</Link></div>
              
            </div>
            <div className="timer">
              <CurrentTimeComponent/>
            </div>
            </div>
            <Outlet/>
          </div>
      </div>
    )
}