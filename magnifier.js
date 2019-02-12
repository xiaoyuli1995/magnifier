var focus=document.querySelector(".focus");
var big_wrap=document.querySelector(".wrap_big_magnifier");
var small_wrap=document.querySelector(".wrap_small_magnifier");
var choice_wrap=document.querySelector(".wrap_choice_magnifier");
var choice_items=choice_wrap.children;;
var big_bg=big_wrap.children[0];
var small_bg=small_wrap.children[0];

//开始计算比例
var prop=parseInt(getComputedStyle(big_wrap)["width"]) / parseInt(getComputedStyle(focus)["width"]);
//开始用比例进行计算
big_bg.style.width=small_wrap.offsetWidth * prop + "px"
big_bg.style.height=small_wrap.offsetHeight * prop + "px"

//第一个内容，进行移入出现focus，移出消失
small_wrap.addEventListener("mouseenter",toggle.bind(false,"show"));
small_wrap.addEventListener("mouseleave",toggle.bind(false,"hide"));
function toggle(type){
    var display=null;
    if(type==="show"){
        display="block"
    }else{
        display="none"
    }
    focus.style.display=display;
    big_wrap.style.display=display;
}
//第二个内容，focus要开始运动了
small_wrap.addEventListener("mousemove",moveEle)
function moveEle(evt){
    var e=evt || window.event;
    //引用不同的或取定位
    _left=e.offsetX;
    _top=e.offsetY;
    //将鼠标位于方块内的中心
    _left=_left-focus.offsetWidth/2;
    _top=_top-focus.offsetHeight/2;
    //开始设置边界
    //最小的边界
    _left=_left<=0? 0 : _left;
    _top=_top<=0? 0 : _top;
    //最大的边界
    var maxLeft=small_wrap.offsetWidth-focus.offsetWidth;
    var maxTop=small_wrap.offsetHeight-focus.offsetHeight;
    _left=_left>=maxLeft? maxLeft : _left;
    _top=_top>=maxTop?maxTop : _top;
    //开始将focus运动起来
    focus.style.left=_left + "px";
    focus.style.top=_top + "px"
    //开始将大图运动起来
    big_bg.style.left=-_left * prop + "px";
    big_bg.style.top=-_top * prop + "px"
}
//第三个内容，就是将小图切换一下，
choice_items=Array.from(choice_items);
choice_items.forEach((item)=>{
    item.addEventListener("click",choice.bind(false,item))
})
function choice(item){
   choice_items.forEach((item)=>{
       item.className="";
   })
   item.calssName="active"
   var bigSrc=item.getAttribute("data-big");
   var smallSrc=item.getAttribute("data-small")
   small_bg.src=smallSrc;
   big_bg.src=bigSrc


}
