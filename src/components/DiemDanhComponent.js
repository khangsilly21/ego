import React, { useState, useEffect } from 'react';
import axios from 'axios';
import useWebSocket from 'react-use-websocket';



const DiemDanhComponent = (props) => {
  const carIndex = props.id - 1; // Chỉ số của xe trong mảng
  const [cars, setCars] = useState([]);
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);

  const { sendMessage, lastMessage } = useWebSocket('wss://pavv-556d4b716834.herokuapp.com', {
    onOpen: () => console.log('WebSocket kết nối thành công'),
    onMessage: (message) => {
      const data = JSON.parse(message.data);
      if (data.type === 'UPDATE_CARS') {
        setCars(data.payload);
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
      setStudents(cars[carIndex]?.students || []);
    }
  }, [cars, carIndex]);



const resetDiemDanh = async () => {
  try {
    const response = await axios.get('https://pavv-556d4b716834.herokuapp.com/reset');
    if (response.status === 200) {
      alert('Danh sách điểm danh đã được reset');
      // Cập nhật lại danh sách cars từ server
      const updatedCarsResponse = await axios.get('https://pavv-556d4b716834.herokuapp.com/cars');
      setCars(updatedCarsResponse.data); // Giả sử bạn có state cars để lưu danh sách
    } else {
      alert('Có lỗi xảy ra khi reset danh sách điểm danh');
    }
  } catch (error) {
    console.error('Lỗi khi reset danh sách điểm danh:', error);
    alert('Có lỗi xảy ra khi reset danh sách điểm danh');
  }
};

  

  const updateCarState = (newState) => {
    axios
      .put(`https://pavv-556d4b716834.herokuapp.com/cars/${cars[carIndex].id}`, { state: newState })
      .then((response) => {
        console.log('Trạng thái xe được cập nhật:', response.data);
        const updatedCars = cars.map((car) =>
          car.id === cars[carIndex].id ? { ...car, state: newState } : car
        );
        setCars(updatedCars);
      })
      .catch((error) => console.error('Lỗi khi cập nhật trạng thái xe:', error));
  };

  const handleCheckIn = (studentId) => {
    const student = cars[carIndex]?.students.find((s) => s.stt === studentId);
    if (!student) {
      alert('Không tìm thấy học sinh');
      return;
    }
    if(student.absent){
      alert('Học sinh này đã xin nghỉ');
      return;
    }
    if (student.checkinTime) {
      alert('Học sinh này đã lên xe rồi!');
      return;
    }
    const checkinTime = new Date().toLocaleTimeString();
    axios
      .put(`https://pavv-556d4b716834.herokuapp.com/cars/${cars[carIndex].id}/students/${studentId}`, { checkinTime })
      .then((response) => {
        const updatedStudents = students.map((student) =>
          student.stt === studentId ? { ...student, checkinTime } : student
        );
        setStudents(updatedStudents);
        console.log('Điểm danh lên xe thành công:', response.data);

        const checkInCount = updatedStudents.filter(student => student.checkinTime).length;
        if (checkInCount === 1 && cars[carIndex].state !== 'Đang di chuyển') {
          updateCarState('Đang di chuyển');
        }
      })
      .catch((error) => console.error('Lỗi:', error));
  };

  const handleAbsent = (studentId) => {
    const student = students.find(student => student.stt === studentId);
    if (!student) {
      alert('Không tìm thấy học sinh');
      return;
    }

    if (student.absent) {
      alert('Học sinh này đã xin nghỉ rồi!');
      return;
    }

    if(student.checkinTime){
      alert('Học sinh này đang ở trên xe, không thể xin nghỉ !');
      return;
    }

    const absent = true;

    // Gửi yêu cầu cập nhật trạng thái xin nghỉ về server
    axios
      .put(`https://pavv-556d4b716834.herokuapp.com/cars/${cars[carIndex].id}/students/${studentId}`, { absent })
      .then((response) => {
        const updatedStudents = students.map((student) =>
          student.stt === studentId ? { ...student, absent } : student
        );
        setStudents(updatedStudents);  // Cập nhật danh sách học sinh trong state
        console.log('Cập nhật trạng thái nghỉ thành công:', response.data);
        const checkOutCount = updatedStudents.filter(student => student.checkoutTime).length;
        const absentStudents = updatedStudents.filter(student => student.absent).length;
        if (checkOutCount === (updatedStudents.length-absentStudents)) {
          updateCarState('Đã hoàn thành');
        }
      })
      .catch((error) => console.error('Lỗi khi cập nhật trạng thái nghỉ:', error));
  };

  const handleCheckOut = (studentId) => {
    const student = students.find(student => student.stt === studentId);
    if (!student) {
      alert('Không tìm thấy học sinh');
      return;
    }
    if(student.absent){
      alert('Học sinh này đã xin nghỉ');
      return;
    }
    if (student.checkoutTime) {
      alert('Học sinh này đã xuống xe rồi!');
      return;
    }
    if (!student.checkinTime) {
      alert('Học sinh chưa điểm danh lên xe, không thể điểm danh xuống.');
      return;
    }

    const checkoutTime = new Date().toLocaleTimeString();
    axios
      .put(`https://pavv-556d4b716834.herokuapp.com/cars/${cars[carIndex].id}/students/${studentId}`, { checkoutTime })
      .then((response) => {
        const updatedStudents = students.map((student) =>
          student.stt === studentId ? { ...student, checkoutTime } : student
        );
        setStudents(updatedStudents);
        console.log('Điểm danh xuống xe thành công:', response.data);

        const checkOutCount = updatedStudents.filter(student => student.checkoutTime).length;
        const absentStudents = updatedStudents.filter(student => student.absent).length;
        if (checkOutCount === (updatedStudents.length-absentStudents)) {
          updateCarState('Đã hoàn thành');
        }
      })
      .catch((error) => console.error('Lỗi:', error));
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  const car = cars[carIndex];

  return (
    <div className='diemdanh'>
      {car && (
        <>
          <h1>Điểm danh học sinh trên <span>{car.title}</span></h1>
          <table>
            <thead>
              <tr>
                <th>Số thứ tự</th>
                <th>Họ tên</th>
                <th>Lớp</th>
                <th>Giờ lên</th>
                <th>Giờ xuống</th>
                <th>Điểm danh</th>
                <th>Xin nghỉ</th>
              </tr>
            </thead>
            <tbody>
              {students.map((student, index) => (
                <tr key={index} >
                  <td className={student.absent ? 'absent-row' : ''}>{student.stt}</td>
                  <td className={student.absent ? 'absent-row' : ''}>{student.name}</td>
                  <td className={student.absent ? 'absent-row' : ''}>{student.class}</td>
                  <td className={student.absent ? 'absent-row' : ''}>{student.checkinTime || '.'}</td>
                  <td className={student.absent ? 'absent-row' : ''}>{student.checkoutTime || '.'}</td>
                  <td className={student.absent ? 'absent-row' : ''}>
                    <p className={(student.absent||student.checkinTime) ? 'absent-active' : 'checkInButton'} onClick={() => handleCheckIn(student.stt)}>
                      Điểm danh lên
                    </p>
                    <p className={(student.absent || student.checkoutTime) ? 'absent-active' : 'checkOutButton'} onClick={() => handleCheckOut(student.stt)}>
                      Điểm danh xuống
                    </p>
                  </td>
                  <td className={student.absent ? 'absent-row' : ''}>
                    <p className={student.absent ? 'absent-active' : 'absentButton'} onClick={() => handleAbsent(student.stt)}>
                      Xin nghỉ
                    </p>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <h1 className='resetButton' onClick={resetDiemDanh}>Reset</h1>
        </>
      )}
    </div>
  );
};

export default DiemDanhComponent
