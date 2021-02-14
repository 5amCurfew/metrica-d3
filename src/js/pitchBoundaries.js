var plotscale = 600;

var margin = {
    top: (plotscale * (24/960)), 
    right: (plotscale * (24/960)), 
    bottom: (plotscale * (24/960)), 
    left: (plotscale* (24/960))
},
    width = (plotscale) - margin.left - margin.right ,
    height = (plotscale * (105/68*0.84)) - margin.top - margin.bottom ;

module.exports = {
    plotscale: plotscale,
    margin: margin,
    width: width,
    height: height
}