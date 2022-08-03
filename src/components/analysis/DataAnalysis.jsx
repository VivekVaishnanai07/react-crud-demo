import ReactEcharts from "echarts-for-react";
import React, { useEffect, useState } from "react";
import api from "../interceptor/api";

function DataAnalysis() {
  const [post, setPost] = useState([])

  //get Userlist Call Api
  useEffect(() => {
    api.get('/post')
      .then(response => {
        setPost(response.data.data)
      }).catch(error => {
        console.error(error)
      })
  }, [])
  const xData = [];
  post.forEach((item) => {
    xData.push(item.text)
  })
  const yData = [];
  post.forEach((item) => {
    yData.push(item.likes)
  })
  const option = {
    xAxis: {
      type: 'category',
      data: xData
    },
    yAxis: {
      type: 'value'
    },
    series: [
      {
        data: yData,
        type: 'bar'
      }
    ]
  };
  return <ReactEcharts className="chartView" option={option} />;
}
export default DataAnalysis;