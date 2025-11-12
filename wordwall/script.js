let secretNumber;
let attempts = 10;
const maxAttempts = 10;
let guessHistory = []; 

const guessInput = document.getElementById('guessInput');
const resultDisplay = document.getElementById('result');
const guessesLeftDisplay = document.getElementById('guessesLeft');
const restartButton = document.getElementById('restartButton');
const historyDisplay = document.getElementById('history'); // his

// start
function startGame() {
    secretNumber = Math.floor(Math.random() * 100) + 1;
    attempts = maxAttempts;
    guessHistory = []; // reset his

    // reset
    resultDisplay.textContent = "";
    resultDisplay.className = 'message';
    guessInput.value = '';
    guessInput.disabled = false;
    restartButton.style.display = 'none';
    guessesLeftDisplay.textContent = `คุณมีโอกาสเหลือ: ${attempts}`;
    historyDisplay.textContent = 'ยังไม่มีการทาย'; // start text
}

// func guess
function checkGuess() {
    const userGuess = parseInt(guessInput.value);

    // check
    if (isNaN(userGuess) || userGuess < 1 || userGuess > 100) {
        resultDisplay.textContent = 'กรุณากรอกตัวเลขระหว่าง 1 ถึง 100 เท่านั้น!';
        resultDisplay.className = 'message high';
        return;
    }
    
    // เพิ่มตัวเลขที่ทายลงในประวัติ
    guessHistory.push(userGuess); 
    
    // อัปเดตการแสดงผลประวัติ
    historyDisplay.textContent = guessHistory.join(', '); // ใช้จุลภาคคั่นตัวเลขที่ทาย

    attempts--;
    guessesLeftDisplay.textContent = `คุณมีโอกาสเหลือ: ${attempts}`;

    // ตรวจสอบผลลัพธ์
    if (userGuess === secretNumber) {
        // ชนะ
        resultDisplay.textContent = `🎉 ยอดเยี่ยม! คุณทายถูกคือ ${secretNumber} ใช้ไป ${maxAttempts - attempts} ครั้ง!`;
        resultDisplay.className = 'message win';
        endGame(true);
    } else if (userGuess > secretNumber) {
        // สูงไป
        resultDisplay.textContent = '🔽 ตัวเลขที่ทาย "สูงไป" ลองใหม่!';
        resultDisplay.className = 'message high';
    } else {
        // ต่ำไป
        resultDisplay.textContent = '🔼 ตัวเลขที่ทาย "ต่ำไป" ลองใหม่!';
        resultDisplay.className = 'message low';
    }

    // ตรวจสอบว่าโอกาสหมดหรือยัง
    if (attempts === 0 && userGuess !== secretNumber) {
        // แพ้
        resultDisplay.textContent = `😭 โอกาสหมดแล้ว! ตัวเลขที่ถูกต้องคือ ${secretNumber} เสียใจด้วยนะ.`;
        resultDisplay.className = 'message lose';
        endGame(false);
    }

    guessInput.value = '';
    guessInput.focus(); // ให้เคอร์เซอร์พร้อมสำหรับทายครั้งต่อไป
}

// 3. ฟังก์ชันจบเกม (ไม่ได้เปลี่ยนแปลง)
function endGame(isWin) {
    guessInput.disabled = true;
    restartButton.style.display = 'block';
}

// เริ่มเกมเมื่อโหลดหน้าเว็บ
startGame();