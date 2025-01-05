import { ReactElement } from 'react';
import axios from 'axios';
import { useQuery } from "@tanstack/react-query";
import { Alert, Box, Card, CardActions, CardContent, SvgIcon, Typography } from "@mui/material";
import CloudIcon from '@mui/icons-material/Cloud';
import WbSunnyIcon from '@mui/icons-material/WbSunny';
import ThunderstormIcon from '@mui/icons-material/Thunderstorm';
import WaterDropRoundedIcon from '@mui/icons-material/WaterDropRounded';
import OpacityRoundedIcon from '@mui/icons-material/OpacityRounded';


type WeatherCondition = 'Clouds' | 'Clear' | 'Rain' | 'Drizzle' | 'Thunderstorm' | 'Any';

type WeatherType = {
  main: {
    temp: number,
    feels_like: number,
  },
  weather: Array<{
    main: WeatherCondition;
  }>
}

const WeatherConditionIcons: Record<WeatherCondition, any> = {
  'Clouds': CloudIcon,
  'Clear': WbSunnyIcon,
  'Drizzle': OpacityRoundedIcon,
  'Rain': WaterDropRoundedIcon,
  'Thunderstorm': ThunderstormIcon,
  'Any': WbSunnyIcon,
};

const getWeather = async (lat: number, long: number): Promise<WeatherType> => {
  
  const response = await axios.get('https://api.openweathermap.org/data/2.5/weather', {
    params: {
      lat,
      lon: long,
      appid: API_KEY,
      units: 'metric'
    }
  });

  if (response.status > 399) {
    throw new Error(response.statusText)
  }

  return response.data;
}

const API_KEY = "557193f681b8e4c221be7532a74da09c";
export const Weather: React.FunctionComponent<{
  lat: number;
  long: number;
}> = ({
  lat, long,
}) => {
  const { data, error, dataUpdatedAt } = useQuery({
    queryKey: ['weather', lat, long],
    queryFn: () => getWeather(lat, long),
    // auto-refresh every 3 minutes
    refetchInterval: 180000,
    // stale after 2 minutes
    staleTime: 120000,
  })

  const WeatherIcon = WeatherConditionIcons[data?.weather?.[0]?.main || 'Any'] ||  WeatherConditionIcons.Any

  const lastUpdateDate = new Date(dataUpdatedAt)

  return (
    <Card sx={{ width: 400 }}>
      {
        error && (
          <Alert color="error">{error.message}</Alert>
        )
      }
      <CardContent>
        test 2
        <WeatherIcon />
        <Typography>
          Temperature Réelle: {data?.main?.temp}°C
        </Typography>
        <Typography>
          Temperature Ressentie: {data?.main?.feels_like}°C
        </Typography>
        <Typography>
          Dernière mise à jour: {lastUpdateDate.toLocaleString('fr-FR', { timeZone: 'Europe/Paris' })}
        </Typography>
        test
      </CardContent>
    </Card>
  );
};
