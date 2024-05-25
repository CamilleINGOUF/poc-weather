import axios from 'axios';
import { useQuery } from "@tanstack/react-query";
import { Alert, Box, Button, Card, CardActions, CardContent, Typography } from "@mui/material";

const API_KEY = "c6dea39f86ea31dc114f0a4f0eec8fa9";
export const Weather: React.FunctionComponent<{
  lat: number;
  long: number;
}> = ({
  lat, long,
}) => {
  const { data, isFetching, isStale, error, refetch } = useQuery({
    queryKey: ['weather', lat, long],
    queryFn: () => getWeather(lat, long),
    // auto-refresh every hour
    refetchInterval: 600000,
    staleTime: 120000,
  })

  const getWeather = async (lat: number, long: number) => {
    
    // return await axios.get('https://api.openweathermap.org/data/2.5/weather', {
    //   params: {
    //     lat,
    //     long,
    //     appid: API_KEY,
    //     units: 'metric'
    //   }
    // });

    let response = await axios.get('https://jsonplaceholder.typicode.com/todos/1')

    if (Math.random() > .8) {
      response = {
        status: 400,
        data: 'Missing data'
      } as any
    }

    if (response.status > 399) {
      throw new Error(response.data);
    }

    return {
      "lat": 33.44,
      "lon": -94.04,
      "timezone": "America/Chicago",
      "timezone_offset": -21600,
      "current": {
        "dt": 1618317040,
        "sunrise": 1618282134,
        "sunset": 1618333901,
        "temp": 284.07,
        "feels_like": 282.84,
        "pressure": 1019,
        "humidity": 62,
        "dew_point": 277.08,
        "uvi": 0.89,
        "clouds": 0,
        "visibility": 10000,
        "wind_speed": 6,
        "wind_deg": 300,
        "weather": [
          {
            "id": 500,
            "main": "Rain",
            "description": "light rain",
            "icon": "10d"
          }
        ],
        "rain": {
          "1h": 0.21
        }
      },
    };
  }


  return (
    <Card sx={{ width: 400 }}>
      {
        error && (
          <Alert color="error">{error.message}</Alert>
        )
      }
      <CardContent>
        <Typography>
          Temperature: {data?.current.temp} degrés celcius
        </Typography>
        <Typography>
          Ressentie: {data?.current.feels_like} degrés celcius
        </Typography>
      </CardContent>
      <CardActions sx={{ padding: 0, display: "flex", justifyContent: 'space-evenly' }}>
        <Box
          sx={{ width: '50%', backgroundColor: isFetching ? 'lightblue' : 'grey' }}
        >
          <Typography variant="caption">{isFetching ? 'Fetching' : 'Not Fetching'}</Typography>
        </Box>
        <Box
          sx={{ width: '50%', backgroundColor: isStale ? 'orange' : 'lightgreen' }}
        >
          <Typography variant="caption">{isStale ? 'Stale' : 'Fresh'}</Typography>
        </Box>
      </CardActions>
    </Card>
  );
};
