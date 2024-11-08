// 游戏状态控制
let gameState = 'start'; // 游戏的初始状态
let currentLocation = ''; // 当前所在的场所

// 更新背景图
function updateBackground(imagePath) {
  const backgroundImage = document.getElementById("background-image");
  backgroundImage.src = imagePath;
  backgroundImage.style.opacity = 1; // 恢复图片的显示
}

// 更新进度文字
function updateProgress(lineId, message) {
  const line = document.getElementById(lineId);
  line.innerHTML = message;
  line.style.opacity = 1;
}

// 切换选项按钮
function showUserOptions(options) {
  const optionsContainer = document.getElementById("user-options");
  optionsContainer.innerHTML = ""; // 清空当前按钮

  options.forEach((option, index) => {
    const button = document.createElement("button");
    button.innerText = option.label;
    button.onclick = () => handleUserChoice(option.action);
    optionsContainer.appendChild(button);
  });
}

// 游戏开始
function startTreasureHunt() {
  gameState = 'in-progress'; // 更新游戏状态

  updateProgress('line1', "你正在开始寻找宝藏...");
  updateBackground("images/library.jpg");  // 假设进入图书馆
  showUserOptions([{ label: "查看线索", action: showLibraryClue }]);
  currentLocation = 'library';
}

// 图书馆线索
function showLibraryClue() {
  updateProgress('line1', "你在图书馆找到了第一个线索，线索指向了一个神秘的洞窟...");
  showUserOptions([{ label: "去神秘洞窟", action: goToDongku }]);
  currentLocation = 'library';
  updateBackground("images/dongku.jpg"); // 设置背景为神秘洞窟
}

// 进入神秘洞窟
function goToDongku() {
  updateProgress('line1', "你进入了神秘洞窟，准备继续寻宝...");
  showUserOptions([{ label: "查看传送门", action: showDoor }, { label: "进入神庙", action: goToTemple }]);
  currentLocation = 'dongku';
  updateBackground("images/dongku.jpg");
}

// 进入传送门
function showDoor() {
  updateProgress('line1', "你发现了一个传送门，准备穿越...");
  showUserOptions([{ label: "返回藏宝图", action: goBackToMap },
                    { label: "去神秘洞窟", action: goToDongku },
                    { label: "去图书馆", action: goToLibrary },
                    { label: "去神庙", action: goToTemple }]);
  updateBackground("images/door.jpg");  // 传送门的背景
}

// 进入神庙
function goToTemple() {
  updateProgress('line1', "你进入了神庙，但遭遇了神庙守卫...");
  showUserOptions([{ label: "查看线索", action: viewTempleClue }]);
  currentLocation = 'temple';
  updateBackground("images/temple_guard.jpg"); // 神庙的守卫图片
}

// 查看神庙线索
function viewTempleClue() {
  const randomOutcome = Math.random();
  if (randomOutcome < 0.5) {
    updateProgress('line1', "不好意思，寻宝失败，您可以刷新再次进行寻宝");
    showUserOptions([{ label: "重新开始", action: goBackToMap }]);
    updateBackground("images/failure.jpg"); // 失败的背景图
  } else {
    updateProgress('line1', "恭喜你找到宝藏！");
    showUserOptions([{ label: "查看宝藏", action: showTreasure }]);
    updateBackground("images/final.jpg"); // 宝藏图片
  }
}

// 返回藏宝图
function goBackToMap() {
  updateProgress('line1', "你回到了藏宝图，准备重新开始...");
  showUserOptions([{ label: "开始寻宝", action: startTreasureHunt }]);
  updateBackground("images/background.jpg"); // 藏宝图的背景
}

// 查看宝藏
function showTreasure() {
  updateProgress('line1', "恭喜！你找到了传说中的宝藏！");
  showUserOptions([{ label: "重新开始", action: goBackToMap }]);
  updateBackground("images/final.jpg"); // 宝藏图片
}

// 去图书馆
function goToLibrary() {
  updateProgress('line1', "你回到了图书馆，准备寻找线索...");
  showUserOptions([{ label: "查看线索", action: showLibraryClue }]);
  updateBackground("images/library.jpg");
}
