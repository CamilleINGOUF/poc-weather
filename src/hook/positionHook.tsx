import { useEffect, useState } from "react";

const usePosition = () => {
  const [lat, setLat] = useState<number | null>(null);
  const [long, setLong] = useState<number | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if(!navigator.geolocation) {
      setError('Geolocalisation non disponible')
    }
    
    const watchPosId = navigator.geolocation.watchPosition((pos) => {
      setError(null)
      setLat(pos.coords.latitude)
      setLong(pos.coords.longitude)
    })

    return () => navigator.geolocation.clearWatch(watchPosId);
  }, [])

  return {
    lat,
    long,
    error,
  };
}

export default usePosition;