/* canvas는 div라고 상상해 */

/*1. 먼저 canvas를 가져온다. */
const canvas = document.getElementById("jsCanvas");
/*2. canvas 두개의 사이즈를 가져야 함.
    => canvas는 pixel을 다룰 수 있는 element로서 만드는 거니까
    => 이 element에 width와 height를 지정해 줘야함.(css에서 만든 canvas크기와 다름.)
*/
canvas.width = 700; //px
canvas.height = 700;

const ctx = canvas.getContext("2d"); /*context*/
//getContext() : 우리가 픽셀에 접근할 수 있는 방법(이 안에 픽셀들이 있다.)
//context는 canvas안에서 픽셀을 다루는 것.

ctx.strokeStyle = "#2c2c2c"; // 색상이나 스타일을 라인에 사용할 수 있다.(첫 시작 색상을 검정색으로 하도록 설정하겠다.)
ctx.lineWidth = 2.5; /*선 넓이 */


const colors = document.getElementsByClassName("jsColor");//색상변경 버튼
let painting = false; /*마우스 클릭 시 : true */
const range = document.getElementById("jsRange");/*브러쉬 크기 조절*/
const mode = document.getElementById("jsMode")
let filling = false;

function startPainting() {
    painting = true;
    console.log(painting);
}

function stopPainting() {
    ctx.closePath();//현재 하위 경로의 시작 부분과 연결된 직선을 추가한다.
    painting = false;
    console.log("closePath()");
}

function onMouseMove(event) {
     //여기서 모든 움직임을 감지하고 라인을 만들어야 함
    /*console.log(event);테스트: 감지되는지 확인하려고.*/

  //context는 많은 것을 가지고 있으며 그중 path는 기본적인 선이다.
  //path를 시작한다 = 기본적으로 line을 시작
  //하지만 painting을 할 땐, path를 그리는 게 필요하지 않다.
  //클릭하지 않고 canvas위에서 떠나니는 건 path를 만들겠다는 것.
  //클릭하기를 기다리는 것.

  //시작점은 마우스가 움직이는 곳이라면 어디든지 되는 것.
  //두번째 클릭은 선을 만드는 마지막 점.(path(선)의 끝나는 지점으로 선택)


    //offset의 값은 이벤트가 일어나는 대상에서의 x,y값
    const x = event.offsetX;//마우스 위치 확인
    const y = event.offsetY;
    console.log(x,y);

    if (!painting) {
        //마우스클릭을 놓으면 더이상 선이 그어지지 않음.(종료)
        console.log("Creating path in",x,y);
        ctx.beginPath();//출발점을 계속 초기화(새로운 경로를 만듬)
        ctx.moveTo(x, y);//출발점을 좌표로 옮김
    } else {
        console.log("Creating line in",x,y);
        //ctx.lineTo() : 마지막 점을 특정 좌표와 '직선'으로 연결한다.(그릴 위치들을 잡아준다.)
        ctx.lineTo(x, y);//도착점을 좌표로 옮김.
        //여기까지해도 ctx.stroke()를 아직 하지 않아서 canvas에서 path가 보이지 않음.
        
        ctx.stroke();//그림(실제로 그리는 것은 stroke()이다.)

    }
}

function onMouseDown(event) {
    //line logic은 onMouseDown에 들어가야함.
    /*캔바스 클릭 */
    painting = true;
}

if (canvas) {
    /*canvas위에 마우스가 올라오면 감지됨 */
    canvas.addEventListener("mousemove",onMouseMove); /*(핵심)캔바스에 마우스가 들어옴 */
    canvas.addEventListener("mousedown", startPainting); /*캔바스 마우스 클릭 */
    canvas.addEventListener("mouseup",stopPainting); /*캔바스에서 마우스 클릭 후 땠을 때 */
    canvas.addEventListener("mouseleave", stopPainting); /*캔바스 영역 외 */
}

function handleColorClick(event){
    //console.log(event.target.style);
    const color = event.target.style.backgroundColor;
    //console.log(color);
    ctx.strokeStyle = color;/*선색 바꾸기 */
    ctx.fillStyle = color; /*채우기*/

}

//접근하기 편하게 array로
//console.log(Array.from(colors)); // Array.from() :object로부터 array으로 변경)
Array.from(colors).forEach(colorBtn=>{
    //forEach로 color를 돌려서 addEventListener("click",handelColorClick)호출
    colorBtn.addEventListener("click",handleColorClick);
});

function handleRangeChange(event){
    const size = event.target.value;
    ctx.lineWidth = size;
}

if(range){
    range.addEventListener("input", handleRangeChange);
}


function handleModeClick(){
    if(filling === true){
        filling = false;
        mode.innerText = "Fill";
    }else{
        filling = true;
        mode.innerText = "Paint"
        

    }
}

if(mode){
    mode.addEventListener("click", handleModeClick);
}