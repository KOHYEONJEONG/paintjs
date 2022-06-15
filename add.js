/* canvas�� div��� ����� */

/*1. ���� canvas�� �����´�. */
const canvas = document.getElementById("jsCanvas");
/*2. canvas �ΰ��� ����� ������ ��.
    => canvas�� pixel�� �ٷ� �� �ִ� element�μ� ����� �Ŵϱ�
    => �� element�� width�� height�� ������ �����.(css���� ���� canvasũ��� �ٸ�.)
*/
canvas.width = 700; //px
canvas.height = 700;

const ctx = canvas.getContext("2d"); /*context*/
//getContext() : �츮�� �ȼ��� ������ �� �ִ� ���(�� �ȿ� �ȼ����� �ִ�.)
//context�� canvas�ȿ��� �ȼ��� �ٷ�� ��.

ctx.strokeStyle = "#2c2c2c"; // �����̳� ��Ÿ���� ���ο� ����� �� �ִ�.(ù ���� ������ ���������� �ϵ��� �����ϰڴ�.)
ctx.lineWidth = 2.5; /*�� ���� */


const colors = document.getElementsByClassName("jsColor");//���󺯰� ��ư
let painting = false; /*���콺 Ŭ�� �� : true */
const range = document.getElementById("jsRange");/*�귯�� ũ�� ����*/
const mode = document.getElementById("jsMode")
let filling = false;

function startPainting() {
    painting = true;
    console.log(painting);
}

function stopPainting() {
    ctx.closePath();//���� ���� ����� ���� �κа� ����� ������ �߰��Ѵ�.
    painting = false;
    console.log("closePath()");
}

function onMouseMove(event) {
     //���⼭ ��� �������� �����ϰ� ������ ������ ��
    /*console.log(event);�׽�Ʈ: �����Ǵ��� Ȯ���Ϸ���.*/

  //context�� ���� ���� ������ ������ ���� path�� �⺻���� ���̴�.
  //path�� �����Ѵ� = �⺻������ line�� ����
  //������ painting�� �� ��, path�� �׸��� �� �ʿ����� �ʴ�.
  //Ŭ������ �ʰ� canvas������ �����ϴ� �� path�� ����ڴٴ� ��.
  //Ŭ���ϱ⸦ ��ٸ��� ��.

  //�������� ���콺�� �����̴� ���̶�� ������ �Ǵ� ��.
  //�ι�° Ŭ���� ���� ����� ������ ��.(path(��)�� ������ �������� ����)


    //offset�� ���� �̺�Ʈ�� �Ͼ�� ��󿡼��� x,y��
    const x = event.offsetX;//���콺 ��ġ Ȯ��
    const y = event.offsetY;
    console.log(x,y);

    if (!painting) {
        //���콺Ŭ���� ������ ���̻� ���� �׾����� ����.(����)
        console.log("Creating path in",x,y);
        ctx.beginPath();//������� ��� �ʱ�ȭ(���ο� ��θ� ����)
        ctx.moveTo(x, y);//������� ��ǥ�� �ű�
    } else {
        console.log("Creating line in",x,y);
        //ctx.lineTo() : ������ ���� Ư�� ��ǥ�� '����'���� �����Ѵ�.(�׸� ��ġ���� ����ش�.)
        ctx.lineTo(x, y);//�������� ��ǥ�� �ű�.
        //��������ص� ctx.stroke()�� ���� ���� �ʾƼ� canvas���� path�� ������ ����.
        
        ctx.stroke();//�׸�(������ �׸��� ���� stroke()�̴�.)

    }
}

function onMouseDown(event) {
    //line logic�� onMouseDown�� ������.
    /*ĵ�ٽ� Ŭ�� */
    painting = true;
}

if (canvas) {
    /*canvas���� ���콺�� �ö���� ������ */
    canvas.addEventListener("mousemove",onMouseMove); /*(�ٽ�)ĵ�ٽ��� ���콺�� ���� */
    canvas.addEventListener("mousedown", startPainting); /*ĵ�ٽ� ���콺 Ŭ�� */
    canvas.addEventListener("mouseup",stopPainting); /*ĵ�ٽ����� ���콺 Ŭ�� �� ���� �� */
    canvas.addEventListener("mouseleave", stopPainting); /*ĵ�ٽ� ���� �� */
}

function handleColorClick(event){
    //console.log(event.target.style);
    const color = event.target.style.backgroundColor;
    //console.log(color);
    ctx.strokeStyle = color;/*���� �ٲٱ� */
    ctx.fillStyle = color; /*ä���*/

}

//�����ϱ� ���ϰ� array��
//console.log(Array.from(colors)); // Array.from() :object�κ��� array���� ����)
Array.from(colors).forEach(colorBtn=>{
    //forEach�� color�� ������ addEventListener("click",handelColorClick)ȣ��
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