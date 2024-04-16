
const convertCellsToArr = (res) =>{
    let arr = [];
    Object.keys(res).forEach((key) => {
        arr.push({
            x: res[key].x,
            y: res[key].y,
            color: res[key].color,
            canvasId: res[key].canvasId
        });
    });
    return arr;
}

module.exports = {convertCellsToArr};