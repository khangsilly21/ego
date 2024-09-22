

const BangThongTin = (props)=>{
    const car=props.car;
    const selectedCar = car.id;
    const overlayRef=props.overlayRef;
    
    return (
        <div className="overlayContainer" >
          <div className="overlay"
            ref={overlayRef}
            
          >
          
            <div className="danhsachhocsinh">

               <h1>Danh sách học sinh trên xe <span>{car.title}</span></h1>
               <table>
                <tr>
                    <th>Số thứ tự</th>
                    <th>Họ tên</th>
                    <th>Lớp</th>
                    <th>Giờ lên</th>
                    <th>Giờ xuống</th>
                </tr>
                {car.students.map((student,index)=>(<tr className={student.absent ? 'absent-row' : ''} key={index}>
                                                        <td>{student.stt}</td>
                                                        <td>{student.name}</td>
                                                        <td>{student.class}</td>
                                                        <td id="checkinTime">{student.checkinTime || '.'}</td>
                                                        <td id="checkoutTime">{student.checkoutTime || '.'}</td>
                                                    </tr>))}
               </table>
              
          
            </div>


           
            
                <div key={car.id} className="sidebar">
                  <h2>Thông tin chi tiết</h2>
                  <p><span>Bác tài: </span>Nguyễn Văn B</p>
                  <p><span>Số điện thoại liên lạc: </span>0376756456</p>
                  <p><span>Số học sinh:</span> {car.numberStudent}</p>
                  <p><span>Số học sinh trên xe:</span> <span style={{color:car.students.filter(student => student.checkinTime && !student.checkoutTime).length==0?'black':'green'}}>{car.students.filter(student => student.checkinTime && !student.checkoutTime).length}</span>/{car.numberStudent}</p>
                  <p><span>Số học sinh vắng mặt:</span> <span style={{color:car.students.filter(student => student.absent).length==0? 'black':'orange'}}>{car.students.filter(student => student.absent).length}</span></p>
                  
                  <p><span>Trạng thái: </span>{car.state}</p>
                </div>
             
           
          </div>
        </div>
      )
}
export default BangThongTin