 import React, { useEffect, useState } from 'react';
import Filters from '../../components/Filters';
import Chart from 'react-apexcharts';
import {barOptions, pieOptions} from './chart-options';
import axios from 'axios';
import {buildBarSeries, getGenderChartData, getPlatformChartData} from './helpers';
import './styles.css'

type PieChartData = {
    labels: string[];
    series: number[];
}

type BarChartData = {
    x: string;
    y: number;
}

const initialPieData = {
    labels: [],
    series: []
}

const BASE_URL = 'https://sds1-crisao.herokuapp.com'

const Charts = () => {
    const [barChartData, setBarCharData] = useState<BarChartData[]>([]);
    const [platformData, setPlatformData] = useState<PieChartData>(initialPieData);
    const [genderData, setGenderData] = useState<PieChartData>(initialPieData);

    useEffect(() => {
        async function getData() {
            const recordsResponse = await axios.get(`${BASE_URL}/records`);
            const gamesResponse = await axios.get(`${BASE_URL}/games`);

            const barData = buildBarSeries(gamesResponse.data, recordsResponse.data.content);
            setBarCharData(barData);
            const platformChartData = getPlatformChartData(recordsResponse.data.content);
            setPlatformData(platformChartData);

            const genderCharData = getGenderChartData(recordsResponse.data.content);
            setGenderData(genderCharData);
        }

        getData();
    }, [])

    return (
    <div className="page-container">
        <Filters link="/records" linkText="VER TABELA"/>

        <div className="chart-container">
            <div className="top-related">
                <h1 className="top-related-title">Jogos mais votados</h1>

                <div className="games-container">
                    <Chart 
                        options={barOptions}
                        type="bar"
                        width="750"
                        height="600"
                        series={[{data: barChartData}]}
                    />
                </div>
            </div> 

            <div className="charts">
                <div className="platform-chart">
                    <h2 className="chart-title">Plataformas</h2>

                    <Chart 
                        options={{...pieOptions, labes:platformData?.labels}}
                        type="donut"
                        series={platformData?.series}
                        width="300"
                    />
                </div>

                <div className="gender-chart">
                    <h2 className="chart-title">Gêneros</h2>

                    <Chart 
                        options={{...pieOptions, labels:genderData?.labels}}
                        type="donut"
                        series={genderData?.series}
                        width="300"
                    />
                </div>
            </div>
        </div>
    </div>
    )
}

export default Charts;