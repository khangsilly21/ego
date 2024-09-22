import React from 'react';
import { Bar } from 'react-chartjs-2';
import { useState } from 'react';
import MonthSelector from './MonthSelector';

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';

// Đăng ký các thành phần
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const BarChart = () => {
  const [gradePreviousWeek,setGradePreviousWeek] = useState([4,5.5,4.7,6.5,4.3]);
  const [gradeThisWeek,setGradeThisWeek]=useState([6,8,7,9,7]);
  

  const data = {
    labels: ['Mon 21', 'Tue 22', 'Wed 23', 'Thu 24', 'Fri 25'],
    datasets: [
      {
        label: 'Previous week',
        data: gradePreviousWeek,
        backgroundColor: '#cbb0eb', // Cột màu đen
        borderColor: 'rgba(0, 0, 0, 1)',
        borderWidth: 0.5,
        barThickness:25,
      },
      {
        label: 'This week',
        data: gradeThisWeek,
        backgroundColor: '#fe8088', // Cột màu đỏ
        borderColor: '#cbb0eb',
        borderWidth: 0.5,
        barThickness:25,
      },
    ],
  };

  const options = {
    layout: {
      padding:{
        top:10,
        right: 90,
        bottom:-6,
        left:0
        
      }
    },
    responsive: true,
    plugins: {
      legend: {
        position:"top",
        align:'end',
        padding:{
          bottom:100
        }
       
      },
      title: {
        display: true,
        text: 'Average Grade',
        font:{
          size:30,
          family:'Segoe UI',
          weight:'500',
        },
        padding:{
          bottom:0,
          
        },
        align:'start',
        color:'#000'
      },
    },
    scales: {
      x:{
        title:{
          display:true,
          text:'School student grade',
          align:'center',
          font:{
            weight:600,
          size:18},
          
          padding:{
            top:0
          }
        }
      },
      y:{
        id:'y',
        title:{
          display:false,
          text:'grade',
          align:'center',
          font:{
            weight:600
          }
        },
        ticks:{
          align:'end',
          padding:10
        }
      },
      y2: {
        id:'y2',
        position:'right',
        title:{
          display: false,
          text: '',
          align: 'center',
        },
        ticks:{
          align:'start',
          padding:10
        }
      }
    }
  };

  return (
  <div className='box box2'>
      <MonthSelector/>
       <Bar data={data} options={options} />
    </div>
  )
};

export default BarChart;
