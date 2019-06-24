import * as d3 from 'd3';

// Default Bar Chart Dimensions
export const margin = { top: 20, right: 20, bottom: 30, left: 20 };
export const width = 800 - margin.left - margin.right;
export const height = 400 - margin.top - margin.bottom;

// Default Bar Chart Scales
export const xScale = d3
  .scaleBand()
  .range([0, width])
  .padding(0.1);
export const yScale = d3
  .scaleLinear()
  .range([height, 0])
  .domain([0, 1]);
