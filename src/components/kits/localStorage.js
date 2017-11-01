
export  function getItem() {
///取值
    var getStr=localStorage.getItem('key');   //是个对象。{'90':1,'98',2}
    var getObj=JSON.parse(getStr);
    if(!getObj){
        localStorage.setItem('key',JSON.stringify({}));
        return {}
    }
    return getObj;
};
export  function setItem(goodsinfo) {
   var goodsObj=getItem();
    //如果有相同的id。就往里面加数字。
    if(goodsObj[goodsinfo.gid]){
        goodsObj[goodsinfo.gid]+=goodsinfo.amount;
    }else{
        goodsObj[goodsinfo.gid]=goodsinfo.amount;
    }
    // 如果没有，新增一个。
    localStorage.setItem('key',JSON.stringify(goodsObj));
}
export function delItem(goodsid) {
    // 1.0 获取值
        var goodsObj = getItem();
        // 2.0 删除goodsObj中的值
            delete goodsObj[goodsid];
        // 3.0 设置回localStroage
            localStorage.setItem('key',JSON.stringify(goodsObj));


}