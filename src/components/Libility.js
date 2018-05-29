/**
 * @file
 * 基于canvas的能力图组建
 */

import React from 'react';
import PropTypes from 'prop-types';

class Libility extends React.Component{
    componentDidMount() {
        this.polygon();
    }

 
    polygon() {
        const { value } = this.props;
        const ability = this.canvasDom.getContext('2d');
        const number = value.length;

        ability.canvas.width = window.innerWidth > 414 ? 414 * 0.8 : window.innerWidth * 0.8;
        ability.canvas.height = window.innerWidth > 414 ? 414 * 0.8 : window.innerWidth * 0.8;

        const width = this.canvasDom.width;
        const height = this.canvasDom.height;

        const xCenter = width * 0.5;
        const yCenter = height * 0.5;

        const r = width * 0.3;
       
        const innerSpace = 0.3; // 最内部多边形占据的空间

        this.drawPolygon(ability, {number, r, xCenter, yCenter, strokeStyle: "rgb(266, 2, 47)"}, new Array(number+1).fill(1))
        this.drawPolygon(ability, {number, r, xCenter, yCenter, fillStyle: "rgb(230, 127, 149)"}, [...new Map(value).values()].map(i => ((1-innerSpace)*i + innerSpace)))
        this.drawPolygon(ability, {number, r, xCenter, yCenter, fillStyle: "rgb(242, 180, 193)"}, new Array(number+1).fill(innerSpace))
        this.drawOutLine(ability, {number, r, xCenter, yCenter, strokeStyle: "rgb(242, 180, 193)"})
        this.drawText(ability, {number, r, xCenter, yCenter, fillStyle: "rgb(0,0,0)", font: "bold 14px Arial"}, [...new Map(value).keys()])
    }

    /**
     * @description 绘制多边形
     * @param { Object } ability 
     * @param { Object } config 
     * @param { String } config.strokeStyle 线样式
     * @param { String } config.fillStyle 填充样式
     * @param { Number } config.xCenter 中心坐标x
     * @param { Number } config.yCenter 中心坐标y
     * @param { Number } config.number 多边形个数
     * @param { Number } config.r 多边形半径
     */
    drawPolygon(ability, config, abilityValue) {
       
        const { strokeStyle, fillStyle, xCenter, yCenter, number, r } = config;
        ability.beginPath();
        for (let i = 0; i <= number; i++) {
            const newX = Math.cos(i * Math.PI * 2 / number - Math.PI / 2) * r * abilityValue[i] + xCenter;
            const newY = Math.sin(i * Math.PI * 2 / number - Math.PI / 2) * r * abilityValue[i] + yCenter;
            console.log(i, newX, newY);
            ability.lineTo( newX, newY );
        }
        if (strokeStyle) {
            ability.strokeStyle = strokeStyle;
            ability.lineWidth = 2;
            ability.stroke();
        }
        if (fillStyle) {
            ability.fillStyle = fillStyle;
            ability.fill();
        }
        
        ability.closePath();

    }
    /**
     * @description 绘制由中心向两边扩散的line
     * @param { Object } ability 
     * @param { Object } config 
     */
    drawOutLine(ability, config) {
        const { strokeStyle, xCenter, yCenter, number, r } = config;
        ability.beginPath();
        for (let i = 0; i < number; i++) {
            const newX = Math.cos(i * Math.PI * 2 / number - Math.PI / 2) * r + xCenter;
            const newY = Math.sin(i * Math.PI * 2 / number - Math.PI / 2) * r  + yCenter;
        
            ability.moveTo(xCenter, yCenter);
            ability.lineTo( newX, newY );
        }
        
        ability.strokeStyle = strokeStyle;
        ability.lineWidth = 2;
        ability.stroke();
        ability.closePath();
    }
    /**
     * @description 绘制属性名
     * @param { Object } ability 
     * @param { Object } config 
     * @param { Array } abilityName 能力属性名
     */
    drawText(ability, config, abilityName) {
        const { strokeStyle, fillStyle, xCenter, yCenter, number, r, font } = config;
        for (let i = 0; i < number; i++) {
            ability.fillStyle = fillStyle;
            ability.font = font;
            let x = 0;
            let y = 0;
            
            x = Math.cos(i * Math.PI * 2 / number - Math.PI / 2) * r * 1.3+ xCenter - 14;
            y = Math.sin(i * Math.PI * 2 / number - Math.PI / 2) * r * 1.3  + yCenter;
           
            ability.fillText(abilityName[i], x, y);              
        }
    }
     render() {
         return <canvas id="polygon" ref={(canvasDom) => { this.canvasDom = canvasDom}}>不支持canvas</canvas>
     }
}

Libility.protoTypes = {
     value: PropTypes.array.required,
}

 export default Libility;