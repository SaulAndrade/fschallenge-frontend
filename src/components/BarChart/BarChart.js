import React from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Bar } from 'react-chartjs-2';
import Skeleton from '../Skeleton/Skeleton'

function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min)) + min;
  }

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const BarChart = ({ scoreData, fetching }) => {

    const options = {
        responsive: true,
        plugins: {
            legend: {
            position: 'top',
            },
            title: {
            display: true,
            text: 'Drivers With Most Schedules',
            },
        },
    }

    let content = fetching ? <Skeleton /> : null

    if (scoreData){
        const labels = scoreData.map(d=>d.driver_name)

        const data = {
            labels,
            datasets: [
                {
                label: 'Driver Schedule Data',
                data: scoreData.map(d=>d.numSchedules),
                backgroundColor: 'rgba(51, 51, 153, 0.8)',
                }
                // {
                // label: 'Dataset 2',
                // data: labels.map(() => getRandomInt(0,1000)),
                // backgroundColor: 'rgba(53, 162, 235, 0.5)',
                // },
            ],
        };

        content = React.createElement(Bar, {options: options, data:data})

    }

    return content
};

export default BarChart;