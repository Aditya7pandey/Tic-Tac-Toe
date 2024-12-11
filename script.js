let boxes = document.querySelectorAll(".box");
let resetbtn = document.querySelector("#reset");
let msg = document.querySelector("#msg");
let msgContainer = document.querySelector(".win_msg");
let newGameBtn = document.querySelector("#newGame")

let turn = true;
let count = 0; // to track draw

const WinPatterns = [
    [0,1,2],
    [0,3,6],
    [0,4,8],
    [1,4,7],
    [2,5,8],
    [2,4,6],
    [3,4,5],
    [6,7,8]
];

const reset = ()=>{
    turn = true;
    count = 0;
    enableBoxes()
    msgContainer.classList.add("hide");
}

boxes.forEach((box)=>{
    box.addEventListener("click",()=>{
        if(turn){
            box.innerText = "X"
            turn = false
        }
        else{
            box.innerText = "O"
            turn = true
        }
        box.disabled = true
        count++;

        let isWinner = check();
        if(count == 9 && !isWinner){
            gameDraw();
        }
    })
})

const gameDraw = () => {
    msg.innerText = `Game was a Draw.`;
    msgContainer.classList.remove("hide");
    disableBoxes();
  };

const disableBoxes = ()=>{
    for(box of boxes){
        box.disabled = true;
    }
}

const enableBoxes = ()=>{
    for(box of boxes){
        box.disabled = false;
        box.innerText = ""
    }
}

const showWinner = (winner)=>{
    msg.innerText = `Congratulations, Winner is ${winner}`;
    msgContainer.classList.remove("hide");
    disableBoxes();
};

const check = ()=>{
    for(let pattern of WinPatterns){
        let pos1Val = boxes[pattern[0]].innerText;
        let pos2Val = boxes[pattern[1]].innerText;
        let pos3Val = boxes[pattern[2]].innerText;

        if(pos1Val != "" && pos2Val != "" && pos3Val != ""){
            if(pos1Val == pos2Val && pos2Val == pos3Val){
                console.log("Winnner",pos1Val);
                showWinner(pos1Val);
                return true;
            }
        }
    }
};

resetbtn.addEventListener("click",reset);
newGameBtn.addEventListener("click",reset);