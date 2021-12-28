import React, { Component } from "react";


class Chart3d extends Component {
    constructor (props) {
        super (props);
    }

    componentDidMount () {
        const { data: scannerData } = this.props;
        const { d3 } = window;
        let origin = [0, 0];
        let j = 10;
        let scale = 20;
        let scatter = [];
        let yLine = [];
        let xGrid = [];
        let beta = 0;
        let alpha = 0;
        let key = function(d){ return d.id; }, startAngle = Math.PI/4;
        let svg    = d3.select('svg').call(d3.drag().on('drag', dragged).on('start', dragStart).on('end', dragEnd)).append('g');
        let color  = d3.scaleOrdinal(d3.schemeCategory20);
        let mx, my, mouseX, mouseY;
    
        let grid3d = d3._3d()
            .shape('GRID', 20)
            .origin(origin)
            .rotateY( startAngle)
            .rotateX(-startAngle)
            .scale(scale);
    
        let point3d = d3._3d()
            .x(function(d){ return d.x; })
            .y(function(d){ return d.y; })
            .z(function(d){ return d.z; })
            .origin(origin)
            .rotateY( startAngle)
            .rotateX(-startAngle)
            .scale(scale);
    
        let yScale3d = d3._3d()
            .shape('LINE_STRIP')
            .origin(origin)
            .rotateY( startAngle)
            .rotateX(-startAngle)
            .scale(scale);
    
        function processData(data, tt){
    
            /* ----------- GRID ----------- */
    
            let xGrid = svg.selectAll('path.grid').data(data[0], key);
    
            xGrid
                .enter()
                .append('path')
                .attr('class', '_3d grid')
                .merge(xGrid)
                .attr('stroke', 'black')
                .attr('stroke-width', 0.3)
                .attr('fill', function(d){ return d.ccw ? 'lightgrey' : '#717171'; })
                .attr('fill-opacity', 0.9)
                .attr('d', grid3d.draw);
    
            xGrid.exit().remove();
    
            /* ----------- POINTS ----------- */
    
            let points = svg.selectAll('circle').data(data[1], key);
    
            points
                .enter()
                .append('circle')
                .attr('class', '_3d')
                .attr('opacity', 0)
                .attr('cx', posPointX)
                .attr('cy', posPointY)
                .merge(points)
                .transition().duration(tt)
                .attr('r', 3)
                .attr('stroke', '#000')
                .attr('fill', 'red')
                .attr('opacity', 1)
                .attr('cx', posPointX)
                .attr('cy', posPointY);
    
            points.exit().remove();
    
            /* ----------- y-Scale ----------- */
    
            let yScale = svg.selectAll('path.yScale').data(data[2]);
    
            yScale
                .enter()
                .append('path')
                .attr('class', '_3d yScale')
                .merge(yScale)
                .attr('stroke', 'black')
                .attr('stroke-width', .5)
                .attr('d', yScale3d.draw);
    
            yScale.exit().remove();
    
             /* ----------- y-Scale Text ----------- */
    
            // let yText = svg.selectAll('text.yText').data(data[2][0]);
    
            // yText
            //     .enter()
            //     .append('text')
            //     .attr('class', '_3d yText')
            //     .attr('dx', '.3em')
            //     .merge(yText)
            //     .each(function(d){
            //         console.log('The rotated', d);
            //         d.centroid = {x: d.rotated.x, y: d.rotated.y, z: d.rotated.z};
            //     })
            //     .attr('x', function(d){ return d.projected.x; })
            //     .attr('y', function(d){ return d.projected.y; })
            //     .text(function(d){ return d[1] <= 0 ? d[1] : ''; });
    
            // yText.exit().remove();
    
            d3.selectAll('._3d').sort(d3._3d().sort);
        }
    
        function posPointX(d){
            return d.projected.x;
        }
    
        function posPointY(d){
            return d.projected.y;
        }
    
        function init(){
            let cnt = 0;
            xGrid = [];
            scatter = [];
            yLine = [];
            let maxX = 0;
            let minX = 0;
            let maxY = 0;
            let minY = 0;
            let maxZ = 0;
            let minZ = 0;

            // console.log('The data', scannerData);
            scannerData.forEach((scanner, ind1) => {
                // console.log('the scanners', scanner);
                scanner.forEach((coords, ind2) => {
                    const [x, y, z] = coords.split(',').map(n => (Number(n) / 100));

                    if (x > maxX) maxX = x;
                    if (x < minX) minX = x;
                    if (y > maxY) maxY = y;
                    if (y < minY) minY = y;
                    if (z > maxZ) maxZ = z;
                    if (z < minZ) minZ = z;
                    
                    // xGrid.push([x, 1, z]);
                    scatter.push({x, y, z, id: `point_${ind1}_${ind2}`}); 
                });
            });

            // console.log('maxX', maxX);
            // console.log('maxY', maxY);
            // console.log('maxZ', maxZ);

            // for(let z = -j; z < j; z++){
            //     for(let x = -j; x < j; x++){
            //         xGrid.push([x, 1, z]);
            //         scatter.push({x: x, y: 1, z: z, id: 'point_' + cnt++});
            //     }
            // }
    
            //d3.range(-1, 11, 1).forEach(function(d){ yLine.push([-j, -d, -j]); });
            d3.range(minZ, maxZ, 1).forEach(function(d){ yLine.push([-minX, -d, -minY]); });
    
            //console.log('The xGrid', xGrid)
            console.log('The scatter', scatter)

            let data = [
                // grid3d(xGrid),
                point3d(scatter)
                //yScale3d([yLine])
            ];
            processData(data, 1000);
        }
    
        function dragStart(){
            mx = d3.event.x;
            my = d3.event.y;
        }
    
        function dragged(){
            mouseX = mouseX || 0;
            mouseY = mouseY || 0;
            beta   = (d3.event.x - mx + mouseX) * Math.PI / 230 ;
            alpha  = (d3.event.y - my + mouseY) * Math.PI / 230  * (-1);
            let data = [
                 // grid3d.rotateY(beta + startAngle).rotateX(alpha - startAngle)(xGrid),
                point3d.rotateY(beta + startAngle).rotateX(alpha - startAngle)(scatter)
                // yScale3d.rotateY(beta + startAngle).rotateX(alpha - startAngle)([yLine]),
            ];
            processData(data, 0);
        }
    
        function dragEnd(){
            mouseX = d3.event.x - mx + mouseX;
            mouseY = d3.event.y - my + mouseY;
        }
    
        d3.selectAll('button').on('click', init);
    
        init();
    }

    render () {
        return (
            <>
                <button>update</button>
                <svg width="960" height="500"></svg>
            </>
        );
    }

};

export default Chart3d;
