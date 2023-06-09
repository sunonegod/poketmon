// 캔버스 셋팅
let canvas;
let ctx;
canvas = document.createElement("canvas") //캔버스 만드는 변수
ctx = canvas.getContext("2d") // 이 캔버스는 2d
canvas.width=1200; // 전체 캔버스 이미지 크기
canvas.height=800;
document.body.appendChild(canvas); 

// 이미지 변수명 선언
let background, player;
// 움직이는 이미지는 X,Y 값을 따로 선언하고, 처음 시작값으로 세팅해놓기(가운데)
let playerX  = canvas.width/2-(64/2);
let playerY = canvas.height-(64);

// 변수명을 이미지라고 선언하고, 링크 연결?
function loadImage(){
    background = new Image();
    background.src="images/map.jpg";
    player = new Image();
    player.src="images/jiwoo.png";
}

// 어떤 키보드 버튼들이 눌렸는지 저장해두기, keysDown이라는 함수에 키보드 번호를 저장!
let keysDown = {};
// 키보드 이벤트 함수
function setupkeyboardListener(){
    // keydown은 키가 눌렸을 때, 
    document.addEventListener("keydown",function(event){
        keysDown[event.keyCode] = true;
        console.log("키다운 객체에 들어간 값은?",keysDown);
    });
    // keyup은 키를 누르다가 떼었을 때==> 콘솔창에서 확인가능
    document.addEventListener("keyup",function(event){
        delete keysDown[event.keyCode];
        // 버튼을 누르고 있다가 떼면, 이벤트 삭제
        console.log("버튼클릭후",keysDown);
    });
}

// 키보드가 눌렸을 때=> 저장해놨던 keysDown함수를 이용해서
// 이미지 좌표의 값을 변경해주는 함수
function update(){
    if(68 in keysDown){ //39:오른쪽
        playerX += 3; // 5씩 이동하자(속도조절)
        // main함수에서 작동시키자
    } // right
    if(65 in keysDown){
        playerX -= 3;
    } // left
    if(87 in keysDown){
        playerY -= 3;
    } // top
    if(83 in keysDown){
        playerY += 3;
    } // bottom

    // 좌표값을 배경 안에서만 움직이게 범위 지정해주기
    if(playerX<=0){
        playerX=0
    }
    if(playerX >= canvas.width-96){
        playerX = canvas.width-96
    }
    if(playerY<=0){
        playerY=0
    }
    if(playerY >= canvas.height-96){
        playerY = canvas.height-96
    }
}

// 이미지에 위치를 랜더링해주는 함수
function render(){
    ctx.drawImage(background, 0, 0, canvas.width, canvas.height);
    //왼쪽위쪽부터 0,0 ~~
    ctx.drawImage(player, playerX, playerY,canvas.width/35, canvas.height/15);

}

// 실제 동작하는 함수!!!!
function main(){
    update(); // 업데이트하고
    render(); // 그려주고
    requestAnimationFrame(main); //계속 프레임(이미지)를 호출해주는 함수
}

loadImage();
setupkeyboardListener();
main();



// 커스텀 마우스
const mouseImg = document.querySelector('.mouse_img');
const mouseImgRect = mouseImg.getBoundingClientRect();
const mouseImgHalfWidth = mouseImgRect.width;
const mouseImgHalfHeight = mouseImgRect.height;
const tag = document.querySelector('.tag');

document.addEventListener('mousemove', (event) => {
  const x = event.pageX;
  const y = event.pageY;
  mouseImg.style.transform = `translate(${x - mouseImgHalfWidth}px, ${
    y - mouseImgHalfHeight
  }px)`;
  tag.style.transform = `translate(${x}px, ${y}px)`;
//   tag.innerHTML = `${x}px ${y}px`;
});