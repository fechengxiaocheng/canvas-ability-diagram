/**
 * @file
 * 基于canvas的能力图组建
 */

import React from 'react';
import PropTypes from 'prop-types';

class Libility extends React.Component{
    componentDidMount() {
        const { value, gapNumber } = this.props;
        
        console.log(value,this.canvasDom);
            // var ability_value = new Object;
            // var ability_name = new Object;
            // //设置能力值
            // ability_value[0] = 0.8;
            // ability_value[1] = 0.1;
            // ability_value[2] = 0.1;
            // ability_value[3] = 0.1;
            // ability_value[4] = 0.1;
            // ability_value[5] = 0.1;
            // //设置能力属性名
            // ability_name[0] = '物理';
            // ability_name[1] = '魔法';
            // ability_name[2] = '韧性';
            // ability_name[3] = '敏捷';
            // ability_name[4] = '防御';
            // ability_name[5] = '智力';

        this.polygon(this.canvasDom, gapNumber, value);
    }

    /**
     * @description
     * 绘制多边形能力图
     * @param { Object } canvas-dom
     * @param { Number }  part 隔断数
     * @param { Array } value 能力属性名-值
     */
    polygon(obj, part, value) {
        // 边数
        const side = value.length;
        // 设置canvas基础属性值
        const ability = obj.getContext('2d');
        ability.canvas.width = window.innerWidth * 0.7;
        ability.canvas.height = window.innerWidth * 0.7;
        const width = obj.width;
        const height = obj.height;

        const xCenter = width * 0.5;
        const yCenter = height * 0.5;
        const radius = width * 0.3;
        const space = radius/part;

        const theta = Math.PI * 2 / side;
        //绘制渐变多边形底层
        for (let j = part; j >= 1; j--) {
            ability.beginPath();
            for (let i = 0; i <= side; i++) {
                ability.lineTo( Math.cos(i * theta) * space * j + xCenter, -Math.sin(i * theta) * space * j + yCenter );
            }
            const [r, g, b] = [73, 101, 115];
            ability.fillStyle = "rgba(" + r + "," + g + "," + b + "," + 0.4 + ")";
            ability.fill();
            ability.closePath();
        }

        const v = new Map(value);
        const ability_value = [...v.values()];
        const ability_name = [...v.keys()];

        //绘制能力多边形
        ability.beginPath();
        for (let i = 0; i <= side; i++) {
            var x = Math.cos(i * theta) * radius * ability_value[ i % side] + xCenter;
            var y = -Math.sin(i * theta) * radius * ability_value[ i % side] + yCenter;
            ability.lineTo(x,y);
        }
        ability.strokeStyle="rgba(255,255,96,1)";
        ability.lineWidth = 4;
        ability.stroke();
        ability.closePath();

        //绘制字体
        for (var i=0; i<side; i++) {
            ability.fillStyle="rgba(0,0,0,1)";
            ability.font = "normal 15px Microsoft Yahei";
            if (Math.cos(i*theta)*radius>0) {
                var x = Math.cos(i * theta) * radius + 3 + xCenter;
                var y = -Math.sin(i * theta) * radius * 1.3 + yCenter;
            } else {
                var x = Math.cos(i * theta) * radius * 1.5 + xCenter;
                var y = -Math.sin(i * theta) * radius * 1.3 + yCenter;
            }
            ability.fillText(ability_name[i],x,y);              
        }
    }
     render() {
         return <canvas id="polygon" ref={(canvasDom) => { this.canvasDom = canvasDom}}>不支持canvas</canvas>
     }
}

Libility.protoTypes = {
     value: PropTypes.array.required,
     gapNumber: PropTypes.Number
}
Libility.defaultTypes = {
    gapNumber: 10
}

 export default Libility;