import { useState,useEffect } from "react"
import axios from 'axios';
import useWebSocket from 'react-use-websocket';

const ChieuDi = (props)=>{

    const [cars, setCars] = useState([]); // Lưu danh sách các xe
   
    
  
    // Kết nối với WebSocket server
    const { sendMessage, lastMessage } = useWebSocket('https://pavv-556d4b716834.herokuapp.com/', {
      onOpen: () => console.log('WebSocket kết nối thành công'),
      onMessage: (message) => {
        const data = JSON.parse(message.data);
        if (data.type === 'UPDATE_CARS') {
          setCars(data.payload); // Cập nhật danh sách các xe
          console.log(data.payload);
        }
      },
    });
  
    useEffect(() => {
      const fetchCars = async () => {
        try {
          const response = await axios.get('https://pavv-556d4b716834.herokuapp.com/cars');
          setCars(response.data);
        } catch (error) {
          console.error('Error fetching cars:', error);
        } 
      };
  
      fetchCars();
    }, []);
    
    return (
        <div className="thanhphan thanhphan1">
            <p className="title">Chiều đi</p>
            <div className="hang">
                <div className="cot">
                    <p>Số xe đã khởi hành</p>
                    <h1>{cars.filter(car => car.state === 'Đang di chuyển' || car.state === 'Đã hoàn thành' ).length}/2</h1>
                </div>
                <hr/>
                <div className="cot">
                    <p>Số xe chưa khởi hành</p>
                    <h1>{cars.filter(car => car.state === 'Chưa xuất phát').length}</h1>
                </div>
                <hr/>
                <div className="cot">
                    <p>Số xe hoàn thành chiều đi</p>
                    <h1>{cars.filter(car => car.state === 'Đã hoàn thành').length}</h1>
                </div>
            </div>

            <div className="hang">
                 <div className="cot">
                    <p>Số học sinh đi xe đến trường</p>
                        <h1>{cars.reduce((total, car) => total + car.students.length,0)}</h1>
                </div>
                <hr/>
                <div className="cot">
                    <p>Số học sinh đang trên xe đến trường</p>
                    <h1 style={{color:cars.reduce((total, car) => total + car.students.filter(student => student.checkinTime && !student.checkoutTime).length, 0)==0?'black':'#4BB93C'}}>{cars.reduce((total, car) => total + car.students.filter(student => student.checkinTime && !student.checkoutTime).length, 0)}</h1>

                </div>
                <hr/>
                <div className="cot">
                    <p>Số học sinh vắng mặt</p>
                    <h1 style={{color:cars.reduce((total, car) => 
    total + car.students.filter(student => student.absent).length
  , 0)==0? 'black':'orange'}}>{ cars.reduce((total, car) => 
    total + car.students.filter(student => student.absent).length
  , 0)}</h1>
                    
                </div>
            </div>
        </div>
    )
}

export default ChieuDi