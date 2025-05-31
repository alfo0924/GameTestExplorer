let currentLevel = 0;
const levels = [
    {
        title: "功能測試",
        desc: "確認遊戲是否能正常開始、得分是否正確，就像檢查軟體功能是否符合需求。",
        area: "functionalTest"
    },
    {
        title: "效能測試",
        desc: "看遊戲是否會卡頓或崩潰，測試反應速度，就像評估軟體的及時性。",
        area: "performanceTest"
    },
    {
        title: "系統測試",
        desc: "模擬真實玩家操作，檢查遊戲整體表現，就像以用戶角度測試完整軟體。",
        area: "systemTest"
    },
    {
        title: "極限值測試",
        desc: "故意讓遊戲角色跑到地圖邊緣或同時開啟多個功能，看會不會出錯，就像測試軟體在極端條件下的表現。",
        area: "boundaryTest"
    },
    {
        title: "故障測試（陰性測試）",
        desc: "輸入錯誤指令或關閉網路，看遊戲如何反應，就像用無效輸入試圖找出軟體弱點。",
        area: "negativeTest"
    }
];

function startGame() {
    document.getElementById("intro").style.display = "none";
    document.getElementById("gameArea").style.display = "block";
    loadLevel();
}

function loadLevel() {
    const level = levels[currentLevel];
    document.getElementById("levelTitle").textContent = level.title;
    document.getElementById("levelDesc").textContent = level.desc;
    document.querySelectorAll(".testArea").forEach(area => area.style.display = "none");
    document.getElementById(level.area).style.display = "block";
    document.getElementById("nextButton").style.display = "none";
    resetLevelData(level.area);
}

function resetLevelData(area) {
    if (area === "functionalTest") {
        document.getElementById("functionalScore").textContent = "0";
    } else if (area === "performanceTest") {
        document.getElementById("performanceCount").textContent = "0";
    } else if (area === "systemTest") {
        document.getElementById("systemStatus").textContent = "尚未完成";
    } else if (area === "boundaryTest") {
        document.getElementById("player").style.left = "140px";
        document.getElementById("boundaryStatus").textContent = "尚未到達邊緣";
    } else if (area === "negativeTest") {
        document.getElementById("negativeResponse").textContent = "等待操作";
    }
}

// 功能測試
function functionalStart() {
    document.getElementById("functionalScore").textContent = "10";
    document.getElementById("nextButton").style.display = "inline-block";
}

// 效能測試
let clickCount = 0;
function performanceClick() {
    clickCount++;
    document.getElementById("performanceCount").textContent = clickCount;
    if (clickCount >= 10) {
        document.getElementById("nextButton").style.display = "inline-block";
    }
}

// 系統測試
let moved = false, jumped = false;
function systemMove() {
    moved = true;
    checkSystemComplete();
}
function systemJump() {
    jumped = true;
    checkSystemComplete();
}
function checkSystemComplete() {
    if (moved && jumped) {
        document.getElementById("systemStatus").textContent = "操作完成！";
        document.getElementById("nextButton").style.display = "inline-block";
    }
}

// 極限值測試
let playerPos = 140;
function moveLeft() {
    playerPos -= 10;
    if (playerPos < 0) playerPos = 0;
    document.getElementById("player").style.left = playerPos + "px";
    checkBoundary();
}
function moveRight() {
    playerPos += 10;
    if (playerPos > 280) playerPos = 280;
    document.getElementById("player").style.left = playerPos + "px";
    checkBoundary();
}
function checkBoundary() {
    if (playerPos <= 10 || playerPos >= 270) {
        document.getElementById("boundaryStatus").textContent = "已到達邊緣！";
        document.getElementById("nextButton").style.display = "inline-block";
    }
}

// 故障測試
function negativeError() {
    document.getElementById("negativeResponse").textContent = "錯誤指令：遊戲提示無效操作！";
    document.getElementById("nextButton").style.display = "inline-block";
}
function negativeDisconnect() {
    document.getElementById("negativeResponse").textContent = "斷線：遊戲進入離線模式！";
    document.getElementById("nextButton").style.display = "inline-block";
}

// 下一關
function nextLevel() {
    currentLevel++;
    if (currentLevel < levels.length) {
        loadLevel();
    } else {
        document.getElementById("gameArea").style.display = "none";
        document.getElementById("endScreen").style.display = "block";
    }
}

// 重新開始
function restartGame() {
    currentLevel = 0;
    document.getElementById("endScreen").style.display = "none";
    document.getElementById("gameArea").style.display = "block";
    loadLevel();
}
