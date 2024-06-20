import React, { useEffect, useState } from 'react';

// @mui material components
import {Grid, Card, CardContent, CircularProgress} from "@mui/material/";


// Material Dashboard 2 React components
import MDBox from "components/MDBox";

// Material Dashboard 2 React example components
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Footer from "examples/Footer";
import ReportsLineChart from "examples/Charts/LineCharts/ReportsLineChart";
import { getWeeklyData, getYearlyData } from "./data/reportsLineChartData";

// Dashboard components
import LatestNews from "./components/Projects";

// Icons
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import TrendingDownIcon from '@mui/icons-material/TrendingDown';
import RemoveShoppingCartIcon from '@mui/icons-material/RemoveShoppingCart';


function Dashboard() {

  const [weeklyCloseData, setWeeklyCloseData] = useState([]);
  const [yearlyCloseData, setYearlyCloseData] = useState([]);
  const [predictionData, setPredictionData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      const closeDataWeekly = await getWeeklyData();
      const closeDataYearly = await getYearlyData();
      const response = await fetch('http://localhost:8000/predict/?symbol=META');
      const prediction = await response.json();

      setWeeklyCloseData(closeDataWeekly);
      setYearlyCloseData(closeDataYearly);
      setPredictionData(prediction);
      setLoading(false);
    }

    fetchData();
  }, []);

  const weeklyChartData = {
    weekly: {
      labels: ["-6", "-5", "-4", "-3", "-2", "-1", "Today"],
      datasets: { label: 'Daily Close', data: weeklyCloseData},
      },
  };

const yearlyChartData = {
  yearly: {
    labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"], 
    datasets: { label: 'Montly Close', data: yearlyCloseData},
  },
};

const calculateAverageChange = (data) => {
  if (data.length < 2) return 0;
  const totalChange = data.reduce((acc, current, index, array) => {
    if (index === 0) return acc;
    return acc + (current - array[index - 1]);
  }, 0);
  return (totalChange / (data.length - 1)).toFixed(2);
};

const averageChangeYearly = calculateAverageChange(yearlyCloseData);
const averageChangeWeekly = calculateAverageChange(weeklyCloseData);

useEffect(() => {
  async function fetchPredictionData() {
    const response = await fetch('http://localhost:8000/predict/?symbol=META');
    const data = await response.json();
    setPredictionData(data);
  }
  
  fetchPredictionData();
}, []);

  return (
    <DashboardLayout>
      <DashboardNavbar />
      <MDBox py={3}>
        <MDBox mt={4.5}>
          <Grid container spacing={3}>
            <Grid item xs={12} md={6} lg={6}>
              <MDBox mb={3}>
                <ReportsLineChart
                  color="success"
                  title="yearly trend"
                  description={
                    <>
                       <strong>{averageChangeYearly > 0 ? `+${averageChangeYearly}` : averageChangeYearly}</strong> average change
                    </>
                  }
                  date="just now"
                  chart={yearlyChartData.yearly}
                />
              </MDBox>
            </Grid>
            <Grid item xs={12} md={6} lg={6}>
              <MDBox mb={3}>
                <ReportsLineChart
                  color="dark"
                  title="7 Day trend"
                  description={
                    <>
                       <strong>{averageChangeWeekly > 0 ? `+${averageChangeWeekly}` : averageChangeWeekly}</strong> average change
                    </>
                  }
                  date="just now"
                  chart={weeklyChartData.weekly}
                />
              </MDBox>
            </Grid>
          </Grid>
        </MDBox>
        <MDBox py={0}>
          <MDBox mt={0}>
            <Grid container spacing={3}>
              <Grid item xs={12} md={6} lg={6}>
                <MDBox mb={3}>
                  <Card variant="outlined">
                    <CardContent sx={{textAlign: "center" }}>
                    {loading ? (
                        <CircularProgress />
                      ) : (
                        <>
                      <div>
                        <p>Action: {predictionData.action}</p>
                        {predictionData.action === 'Buy' && <AddShoppingCartIcon style={{ width: 88, height: 88}}/>}
                        {predictionData.action === 'Sell' && <RemoveShoppingCartIcon style={{ width: 88, height: 88}}/>}
                        {predictionData.action === 'Hold' && <TrendingDownIcon style={{ width: 88, height: 88}}/>}
                      </div>
                      </>
                      )}
                    </CardContent>
                  </Card>
                </MDBox>
              </Grid>
              <Grid item xs={12} md={6} lg={6}>
                <MDBox mb={3}>
                  <Card variant="outlined">
                    <CardContent sx={{textAlign: "center" }}>
                    {loading ? (
                        <CircularProgress />
                      ) : (
                        <>
                      <div>
                        <p>Today's Close: {predictionData.today_close.toFixed(2)}</p>
                        <p>Yesterday's Close: {predictionData.yesterday_close.toFixed(2)}</p>
                        <p>Tomorrow's Prediction: {predictionData.tomorrow_prediction.toFixed(2)}</p>
                        <p>Prediction Accuracy: {predictionData.prediction_accuracy.toFixed(2)}</p>
                      </div>
                      </>
                      )}
                    </CardContent>
                  </Card>
                </MDBox>
              </Grid>
            </Grid>
          </MDBox>
        </MDBox>
        <MDBox>
          <Grid container spacing={3}>
            <Grid item xs={12} md={6} lg={12}>
              <LatestNews />
            </Grid>
          </Grid>
        </MDBox>
      </MDBox>
      <Footer />
    </DashboardLayout>
  );
}

export default Dashboard;
