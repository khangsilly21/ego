import { Link, Outlet, useNavigate } from "react-router-dom"


import { useState } from "react"

export default function Setting(){
    
    const navigate=useNavigate();
    const [selectedCar,setSelectedCar] = useState('car1');
    return (
      <div className="setting">
        
         
              
            
           
            <div class="container">
              <div class="tabs">
                <input type="radio" id="radio-1" name="tabs" checked="" onClick={() => {navigate('/setting/xe1');}}/>
                <label class="tab" for="radio-1">Xe 1</label>
                <input type="radio" id="radio-2" name="tabs" onClick={() => {navigate('/setting/xe2');}}/>
                <label class="tab" for="radio-2">Xe 2</label>
                
                <span class="glider"></span>
              </div>
            </div>

            <Outlet/>
          </div>
      
    )
}