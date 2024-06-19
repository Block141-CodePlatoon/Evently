

export async function getWeeklyData() {
  try {
    const response = await fetch('http://localhost:8000/get_weekly_data/?symbol=META');
    const data = await response.json();

    if (Array.isArray(data.historical_data)) {
      const closeValues = data.historical_data.map(item => item.Close);
      return closeValues;
    } else {
      console.error("No historical data found in the response:", data);
      return [];
    }
  } catch (error) {
    console.error("Error fetching weekly data:", error);
    return [];
  }
}

export async function getYearlyData() {
  try {
    const response = await fetch('http://localhost:8000/get_monthly_data/?symbol=META');
    const data = await response.json();

    // Check if the "historical_data" array exists in the response
    if (Array.isArray(data.historical_data)) {
      const closeValues = data.historical_data.map(item => item.Close);
      return closeValues;
    } else {
      console.error("No historical data found in the response:", data);
      return [];
    }
  } catch (error) {
    console.error("Error fetching monthly data:", error);
    return [];
  }
}

const chartData =  {
  monthly: {
    labels: ["Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
    datasets: { label: "Monthly Trend", data: [] },
  },
  yearly: {
    labels: ["16", "17", "18", "19", "20", "21", "22", "23", "24"],
    datasets: { label: "Yearly Trend", data: [] },
  },
};

export default chartData;