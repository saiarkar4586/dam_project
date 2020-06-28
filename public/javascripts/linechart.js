let nineArray = [];
let twentyArray = [];
let threeArray = [];

let monOnedata = document.getElementById('monOnedata').value;
let tueOnedata = document.getElementById('tueOnedata').value;
let wedOnedata = document.getElementById('wedOnedata').value;
let thuOnedata = document.getElementById('thuOnedata').value;
let friOnedata = document.getElementById('friOnedata').value;

let monTwodata = document.getElementById('monTwodata').value;
let tueTwodata = document.getElementById('tueTwodata').value;
let wedTwodata = document.getElementById('wedTwodata').value;
let thuTwodata = document.getElementById('thuTwodata').value;
let friTwodata = document.getElementById('friTwodata').value;

let monThreedata = document.getElementById('monThreedata').value;
let tueThreedata = document.getElementById('tueThreedata').value;
let wedThreedata = document.getElementById('wedThreedata').value;
let thuThreedata = document.getElementById('thuThreedata').value;
let friThreedata = document.getElementById('friThreedata').value;


addNine();
addTwenty();
addThree();

let lineChartData = {
    labels: ["Mon", "Tue", "Wed", "Thu", "Fri"],
    datasets: [{
        fillColor: "rgba(220,220,220,0)",
        strokeColor: "rgba(220,180,0,1)",
        pointColor: "rgba(220,180,0,1)",
        data: nineArray
    }, {
        fillColor: "rgba(151,187,205,0)",
        strokeColor: "rgba(151,187,205,1)",
        pointColor: "rgba(151,187,205,1)",
        data: twentyArray
    }
    , {
        fillColor: "rgba(151,187,205,0)",
        strokeColor: "rgba(255, 0, 0, 1)",
        pointColor: "rgba(255, 0, 0, 1)",
        data: threeArray
    }
    ]
}

Chart.defaults.global.animationSteps = 50;
Chart.defaults.global.tooltipYPadding = 16;
Chart.defaults.global.tooltipCornerRadius = 0;
Chart.defaults.global.tooltipTitleFontStyle = "normal";
Chart.defaults.global.tooltipFillColor = "rgba(173, 127, 227, 0.3)";
Chart.defaults.global.animationEasing = "easeOutBounce";
Chart.defaults.global.responsive = true;
Chart.defaults.global.scaleLineColor = "black";
Chart.defaults.global.scaleFontSize = 12;

let ctx = document.getElementById("canvas").getContext("2d");
let LineChartDemo = new Chart(ctx).Line(lineChartData, {
    pointDotRadius: 5,
    bezierCurve: false,
    scaleShowVerticalLines: false,
    scaleGridLineColor: "black"
});


function addNine(){
    nineArray.push(monOnedata);
    nineArray.push(tueOnedata);
    nineArray.push(wedOnedata);
    nineArray.push(thuOnedata);
    nineArray.push(friOnedata);
}

function addTwenty(){
    twentyArray.push(monTwodata);
    twentyArray.push(tueTwodata);
    twentyArray.push(wedTwodata);
    twentyArray.push(thuTwodata);
    twentyArray.push(friTwodata);
}

function addThree(){
    threeArray.push(monThreedata)
    threeArray.push(tueThreedata)
    threeArray.push(wedThreedata)
    threeArray.push(thuThreedata)
    threeArray.push(friThreedata)
}

// module.exports = {
//     nineArray : nineArray,
//     threeArray: threeArray
// }

exports.nineArray = nineArray;