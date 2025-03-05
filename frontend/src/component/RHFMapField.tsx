import "leaflet/dist/leaflet.css";
import { useRef, useEffect } from "react";
import { useFormContext, Controller } from "react-hook-form";
import useGeolocation from "../hooks/useGeolocation";
import useLocalStorage from "../hooks/useLocalStorage";
import leaflet from "leaflet";
import axios from "axios";

interface MapFieldProps {
  name: string;
  label: string;
  isRequired?: boolean;
}

const RHFMapField = ({ name, label, isRequired = true }: MapFieldProps) => {
  const { control, setValue } = useFormContext();
  const mapRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<any>(null);
  const userMarkerRef = useRef<any>(null);
  const [userPosition, setUserPosition] = useLocalStorage("USER_MARKER", {
    latitude: 0,
    longitude: 0,
  });
  const location = useGeolocation();
  useEffect(() => {
    if (!mapInstanceRef.current && mapRef.current) {
      mapInstanceRef.current = leaflet.map(mapRef.current).setView([0, 0], 13); // Default center

      leaflet
        .tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png", {
          maxZoom: 30,
          attribution:
            '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
        })
        .addTo(mapInstanceRef.current);

      mapInstanceRef.current.on(
        "click",
        async (e: { latlng: { lat: number; lng: number } }) => {
          const { lat: latitude, lng: longitude } = e.latlng;

          if (userMarkerRef.current) {
            mapInstanceRef.current.removeLayer(userMarkerRef.current);
          }

          // Create a new marker at the clicked location
          userMarkerRef.current = leaflet
            .marker([latitude, longitude])
            .addTo(mapInstanceRef.current)
            .bindPopup("Loading...")
            .openPopup();

          try {
            // Fetch the address using reverse geocoding
            const response = await axios.get(
              `https://nominatim.openstreetmap.org/reverse?lat=${latitude}&lon=${longitude}&format=json`
            );
            const address = response.data.display_name || "Address not found";

            // Update the marker's popup with the address
            userMarkerRef.current
              .bindPopup(
                `${address}<br>Lat: ${latitude.toFixed(
                  2
                )}, Lng: ${longitude.toFixed(2)}`
              )
              .openPopup();

            // Update the form field value
            setValue(name, { latitude, longitude, fullAddress: address });
          } catch (error) {
            console.error("Error fetching address:", error);
          }
        }
      );
    }
  }, [name, setValue]);

  useEffect(() => {
    handleCurrentLocation();
  }, [location, userPosition.latitude, userPosition.longitude]);

  const handleCurrentLocation = async () => {
    // Update the user's position in local storage
    setUserPosition({ ...userPosition });

    // Remove the previous user marker if it exists
    if (userMarkerRef.current && mapInstanceRef.current) {
      mapInstanceRef.current.removeLayer(userMarkerRef.current);
    }

    // Create a new marker for the user's current location
    if (mapInstanceRef.current) {
      userMarkerRef.current = leaflet
        .marker([location.latitude, location.longitude])
        .addTo(mapInstanceRef.current)
        .bindPopup("User");

      // Center the map on the user's current location
      mapInstanceRef.current.setView([location.latitude, location.longitude]);
      console.log(location);
      // set the value of the form field
      const response = await axios.get(
        `https://nominatim.openstreetmap.org/reverse?lat=${location.latitude}&lon=${location.longitude}&format=json`
      );
      const address = response.data.display_name || "Address not found";
      setValue(name, {
        latitude: location.latitude,
        longitude: location.longitude,
        fullAddress: address,
      });
    }
  };

  return (
    <Controller
      name={name}
      control={control}
      render={({ fieldState: { error } }) => (
        <div className="mb-4">
          <label
            className="block text-primary font-medium text-xs mb-2"
            htmlFor={name}
          >
            {label} {isRequired && <span className="text-red-500">*</span>}
          </label>
          <div
            id="map"
            ref={mapRef}
            style={{
              height: "400px",
              border: "1px solid #ccc",
              borderRadius: "8px",
            }}
          />
          {error && (
            <p className="text-red-500 text-xs italic mt-2">{error.message}</p>
          )}
        </div>
      )}
    />
  );
};

export default RHFMapField;
