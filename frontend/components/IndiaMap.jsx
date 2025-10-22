"use client";

import { MapContainer, TileLayer, useMap } from "react-leaflet";
import { useEffect, useState } from "react";
import L from "leaflet";
import "leaflet.heat";

// Heatmap component
const HeatmapLayer = ({ points }) => {
  const map = useMap();

  useEffect(() => {
    if (!points || points.length === 0) return;

    const heatLayer = L.heatLayer(points, {
      radius: 25,
      blur: 20,
      maxZoom: 10,
      gradient: { 0.1: "blue", 0.3: "cyan", 0.5: "lime", 0.7: "yellow", 1.0: "red" },
    }).addTo(map);

    return () => map.removeLayer(heatLayer);
  }, [points, map]);

  return null;
};

const IndiaMap = ({ height = "500px", width = "700px" }) => {
  const [heatData, setHeatData] = useState([]);

  useEffect(() => {
    async function loadGeo() {
      const res = await fetch("/data/india_districts.geojson");
      const geoJson = await res.json();

      // Convert GeoJSON to heatmap points [lat, lng, intensity]
      const points = geoJson.features.map((f) => {
        const coords = f.properties.center || f.geometry.coordinates[0][0];
        const lat = coords[1];
        const lng = coords[0];
        const intensity = f.properties.precipitation || 0;
        return [lat, lng, intensity];
      });

      setHeatData(points);
    }

    loadGeo();
  }, []);

  return (
    <div
      id="map"
      style={{
        height,
        width,
        margin: "0 auto",
        borderRadius: "12px",
        overflow: "hidden",
        boxShadow: "0 6px 15px rgba(0,0,0,0.25)",
      }}
    >
      <MapContainer center={[22.5, 79]} zoom={5} style={{ height: "100%", width: "100%" }}>
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution="&copy; OpenStreetMap contributors"
        />
        <HeatmapLayer points={heatData} />
      </MapContainer>
    </div>
  );
};

export default IndiaMap;
