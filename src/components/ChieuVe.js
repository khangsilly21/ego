import { useEffect, useState } from "react"

const ChieuVe = (props)=>{
    
   
    return (
        
        
        <div className="thanhphan thanhphan2">
            <p className="title">Chiều về</p>
            <div className="hang">
                <div className="cot">
                    <p>Số xe đã khởi hành</p>
                    <h1>0/0</h1>
                    
                </div>
                <hr/>
                <div className="cot">
                    <p>Số xe chưa khởi hành</p>
                    <h1>0</h1>
                </div>
                <hr/>
                <div className="cot">
                    <p>Số xe hoàn thành chiều về</p>
                    <h1>0</h1>
                </div>
            </div>

            <div className="hang">
                 <div className="cot">
                    <p>Số học sinh đi xe về nhà</p>
                    <h1>0</h1>
                </div>
                <hr/>
                <div className="cot">
                    <p>Số học sinh nghỉ phép</p>
                    <h1>0</h1>
                </div>
                <hr/>
                <div className="cot">
                    <p>Số học sinh vắng mặt</p>
                    <h1>0</h1>
                </div>
            </div>
        </div>
    )
}

export default ChieuVe