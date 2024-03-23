import * as d3 from 'd3';
import { useEffect } from 'react';

const ConditionMap = ({ data, id }) => {
  useEffect(() => {
   
    const containerId = `condition-map-container-${id}`;
    

    d3.select(`#${containerId}`).select('svg').remove();

    const width = 400;
    const height = 200;
    const margin = { top: 1, right: 3, bottom: 3, left: 4 };

    
    const svg = d3.select(`#${containerId}`)
      .append('svg')
      .attr('width', width + margin.left + margin.right)
      .attr('height', height + margin.top + margin.bottom)
      .append('g')
      .attr('transform', `translate(${margin.left},${margin.top})`);

    const nodes = data.medications.map((medication) => {
      const trueCount = medication.is_effective.filter(Boolean).length;
      const falseCount = medication.is_effective.length - trueCount;
      return {
        id: medication.name,
        group: 1,
        effectiveness: trueCount / medication.is_effective.length,
        pieData: [trueCount, falseCount]
      };
    });

    const links = data.medications.map((medication) => ({
      source: data.condition,
      target: medication.name,
    }));

    nodes.unshift({ id: data.condition, group: 0 });

    const link = svg.selectAll('.link')
      .data(links)
      .enter()
      .append('line')
      .style('stroke', '#aaa');

    const node = svg.selectAll('.node')
      .data(nodes)
      .enter()
      .append('g');

    const colorScale = d3.scaleLinear()
      .domain([0, 1])
      .range(['red', 'green']);

    node.each(function (d) {
      if (d.group === 1) {
        const pie = d3.pie();
        const arc = d3.arc().innerRadius(0).outerRadius(20);

        const g = d3.select(this)
          .selectAll('.arc')
          .data(pie(d.pieData))
          .enter().append('g')
          .attr('class', 'arc');

        g.append('path')
          .attr('d', arc)
          .style('fill', (piePart) => piePart.data === d.pieData[0] ? colorScale(d.effectiveness) : '#ddd');
      }
    });

    node.append('text')
      .text(d => d.id)
      .attr('x', 6)
      .attr('y', 3);

    const simulation = d3.forceSimulation(nodes)
      .force('link', d3.forceLink()
        .id(d => d.id)
        .links(links)
      )
      .force('charge', d3.forceManyBody().strength(-400))
      .force('center', d3.forceCenter(width / 2, height / 2))
      .on('end', ticked);

    function ticked() {
      link
        .attr('x1', d => d.source.x)
        .attr('y1', d => d.source.y)
        .attr('x2', d => d.target.x)
        .attr('y2', d => d.target.y);

      node
        .attr('transform', d => `translate(${d.x},${d.y})`);
    }
  }, [data, id]); 

  
  return <div id={`condition-map-container-${id}`}></div>;
};

export default ConditionMap; 
