import { useEffect, useState } from "react";

const usePosition = () => {
  const [lat, setLat] = useState<number | null>(null);
  const [long, setLong] = useState<number | null>(null);

  useEffect(() => {
    const watchPosId = navigator.geolocation.watchPosition((pos) => {
      setLat(pos.coords.latitude)
      setLong(pos.coords.longitude)
    })

    return () => navigator.geolocation.clearWatch(watchPosId);
  }, [])

  return {
    lat,
    long,
  };
}

export default usePosition;