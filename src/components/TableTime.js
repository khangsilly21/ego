import calender from '../asset/calender2.svg'

export default function TableTime(){
    return(
        <div className="sec2Item sec2Item1">
            <div className="titleContainer">
                <h2>Upcoming Tests</h2><span className="testDay"><span className="point">&#8226;</span> Test Day <img alt="calender" src={calender}/></span>
            </div>
            <div className="container">
                <div className="day">
                    <p>21</p>
                    <h3>Monday</h3>
                </div>
                <div className="day dayTest dayTest1">
                    <p>22<br/></p>
                    <h3>Tuesday</h3>
                </div>
                <div className="day dayTest dayTest2">
                    <p>23<br/></p>
                    <h3>Wednessday</h3>
                </div>
                <div className="day">
                    <p>24</p>
                    <h3>Thursday</h3>
                </div>
                <div className="day">
                    <p>25</p>
                    <h3>Friday</h3>
                </div>
               
            </div>
        </div>
    )
}