"use client";
import React, { useEffect } from "react";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

// Fix default Leaflet icons
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: "https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon-2x.png",
  iconUrl: "https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png",
  shadowUrl: "https://unpkg.com/leaflet@1.7.1/dist/images/marker-shadow.png",
});

export default function IndiaMap({ onSelectDistrict }) {
  useEffect(() => {
    const map = L.map("map", {
      center: [22.9734, 78.6569],
      zoom: 5,
      minZoom: 4,
      maxZoom: 10,
      zoomControl: true,
    });

    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
      attribution: '&copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors',
    }).addTo(map);

    fetch("/data/india_districts.geojson") // ✅ Correct path
      .then((res) => res.json())
      .then((data) => {
        L.geoJSON(data, {
          style: () => ({
            color: "#00FFFF",
            weight: 1,
            fillColor: "#008080",
            fillOpacity: 0.4,
          }),
          onEachFeature: (feature, layer) => {
            layer.on({
              click: () => onSelectDistrict(feature.properties.DISTRICT_ID),
              mouseover: (e) => e.target.setStyle({ fillOpacity: 0.7 }),
              mouseout: (e) => e.target.setStyle({ fillOpacity: 0.4 }),
            });
            layer.bindTooltip(feature.properties.DISTRICT, { permanent: false });
          },
        }).addTo(map);
      })
      .catch((err) => console.error("Error loading map:", err));

    return () => map.remove();
  }, [onSelectDistrict]);

  return <div id="map" className="h-full w-full rounded-xl" />;
}
