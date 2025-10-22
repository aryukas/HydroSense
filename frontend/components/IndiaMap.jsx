"use client";

import React, { useEffect, useState } from "react";
import ReactECharts from "echarts-for-react";
import * as echarts from "echarts/core";
import { GeoComponent, TooltipComponent, VisualMapComponent } from "echarts/components";
import { MapChart } from "echarts/charts";
import { CanvasRenderer } from "echarts/renderers";

echarts.use([GeoComponent, MapChart, CanvasRenderer, TooltipComponent, VisualMapComponent]);

export default function IndiaMap({ height = "70vh", width = "100%" }) {
  const [option, setOption] = useState(null);

  useEffect(() => {
    async function loadMap() {
      try {
        const res = await fetch("/data/india_states.json");
        if (!res.ok) throw new Error("Failed to fetch GeoJSON");

        const geoJson = await res.json();
        echarts.registerMap("india", geoJson);

        const data = geoJson.features.map((f) => ({
          name: f.properties.name,
          value: Math.floor(Math.random() * 250), // replace with actual precipitation
        }));

        setOption({
          tooltip: { trigger: "item", formatter: "{b}<br/>Precipitation: {c} mm" },
          visualMap: {
            min: 0,
            max: 250,
            left: "right",
            top: "bottom",
            text: ["High", "Low"],
            inRange: { color: ["#c6dbef", "#6baed6", "#2171b5", "#084594"] },
            calculable: true,
          },
          series: [
            {
              name: "Precipitation",
              type: "map",
              map: "india",
              roam: true,
              emphasis: { label: { show: true } },
              data,
            },
          ],
        });
      } catch (err) {
        console.error("Failed to load map:", err);
      }
    }

    loadMap();
  }, []);

  if (!option) return <div className="text-center mt-10">Loading map...</div>;

  return <ReactECharts option={option} style={{ height, width }} />;
}
