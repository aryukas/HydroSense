"use client";
import React, { useEffect } from "react";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

// Fix Leaflet default icons
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: "https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon-2x.png",
  iconUrl: "https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png",
  shadowUrl: "https://unpkg.com/leaflet@1.7.1/dist/images/marker-shadow.png",
});

const IndiaMap = ({ onSelectDistrict }) => {
  useEffect(() => {
    const map = L.map("map", {
      center: [22.9734, 78.6569],
      zoom: 5,
      minZoom: 4,
      maxZoom: 10,
      zoomControl: true,
    });

    // OpenStreetMap layer
    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
      attribution:
        '&copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors',
    }).addTo(map);

    const loadGeoJSON = async () => {
      try {
        const res = await fetch("/india_districts.geojson");
        if (!res.ok) throw new Error("GeoJSON file not found");

        const text = await res.text();

        if (text.trim().startsWith("<")) {
          throw new Error("Invalid JSON: Received HTML instead of GeoJSON");
        }

        const data = JSON.parse(text);

        // Add GeoJSON layer for districts
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

            layer.bindTooltip(feature.properties.DISTRICT, {
              permanent: false,
              direction: "auto",
              className: "leaflet-tooltip-own",
            });
          },
        }).addTo(map);
      } catch (err) {
        console.error("Error loading map:", err.message);
        L.popup()
          .setLatLng([22.9734, 78.6569])
          .setContent(
            "❌ Error loading map data.<br>Ensure /public/india_districts.geojson exists."
          )
          .openOn(map);
      }
    };

    loadGeoJSON();

    return () => map.remove();
  }, [onSelectDistrict]);

  return <div id="map" className="h-full w-full z-0 rounded-xl shadow-lg" />;
};

export default IndiaMap;
