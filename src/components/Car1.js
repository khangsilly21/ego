
import { useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom"
import BangThongTin from "./BangThongTin";

import axios from 'axios';
import useWebSocket from 'react-use-websocket';
const Car1 = ()=>{
 
    const [cars, setCars] = useState([]); // Lưu danh sách các xe
    const [students, setStudents] = useState([]); // Khởi tạo với mảng rỗng
    const [loading, setLoading] = useState(true);
  
    // Kết nối với WebSocket server
    const { sendMessage, lastMessage } = useWebSocket('wss://pavv-556d4b716834.herokuapp.com', {
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
        } finally {
          setLoading(false);
        }
      };
  
      fetchCars();
    }, []);
  
    useEffect(() => {
      if (cars.length > 0) {
        setStudents(cars[0].students);
      }
    }, [cars]);

  
  const [selectedCar, setSelectedCar] = useState(null); // Quản lý car nào đang được chọn
  const overlayRef = useRef(null); // Tạo ref cho overlay

  const handleClickCar = (carId) => {
    
    setSelectedCar(carId); // Khi click vào car, hiển thị car tương ứng
  };

  const handleClickOutside = (e) => {
    // Nếu click ra ngoài bảng thông tin (không phải vào bên trong overlay)
    if (overlayRef.current && !overlayRef.current.contains(e.target)) {
      setSelectedCar(null); // Đóng bảng thông tin
    }
  };

  // lấy màu từ trạng thái
  const getStatusColor = (state) => {
    switch (state) {
      case 'Đã hoàn thành':
        return '#369A81'; // Màu xanh cho trạng thái "Đã hoàn thành"
      case 'Đang di chuyển':
        return '#cc1b5a'; // Màu xanh dương cho "Đang di chuyển"
      case 'Chưa xuất phát':
        return '#4a83c4'; // Màu cam cho "Chưa xuất phát"
      case 'Chưa vận hành':
        return 'gray'; // Màu xám cho "Chưa vận hành"
      default:
        return 'transparent';
    }
  };

  useEffect(() => {
    const handleOutsideClick = (e) => handleClickOutside(e);
    
    // Thêm sự kiện khi có car được chọn
    if (selectedCar !== null) {
      document.addEventListener('mousedown', handleOutsideClick);
    } else {
      document.removeEventListener('mousedown', handleOutsideClick);
    }

    // Xóa sự kiện khi không còn car nào được chọn hoặc khi component unmount
    return () => {
      document.removeEventListener('mousedown', handleOutsideClick);
    };
  }, [selectedCar]);

  return (
    <div>
      {/* Nếu không có car nào được chọn, hiển thị danh sách các car */}
      {selectedCar === null && (
        <div>
          <div className="para">Danh sách xe chiều đi</div>
          <div className="carlist">
            {cars.map((car) => (
              <div
                key={car.id}
                className="caritem"
                onClick={() => handleClickCar(car.id)}
                style={{backgroundColor: car.state === 'Chưa vận hành' ? 'rgb(179, 173, 173)':'white'}}
              >
                <h1>{car.title}</h1>
                <h2>Số học sinh: {car.numberStudent}</h2>
                <h3>Số học sinh vắng: {car.numberStudentAbsent}</h3>
                <h4>Số học sinh nghỉ phép: {car.numberStudentOnLeave}</h4>
                <p style={{
                    backgroundColor: getStatusColor(car.state), // Thay đổi màu nền của thẻ p dựa trên trạng thái
                    color: 'white',
                    padding: '5px',
                    borderRadius: '5px',
                    textAlign: 'center',
                    fontWeight: 'bold'
                  }}>{car.state}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Nếu có car được chọn, hiển thị bảng thông tin */}
      {selectedCar !== null && <BangThongTin car={cars[selectedCar-1]} overlayRef={overlayRef}/>}
    </div>
  );
};

export default Car1;
