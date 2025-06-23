// Birthday Card Interactive JavaScript

// Initialize confetti when page loads
document.addEventListener('DOMContentLoaded', function() {
    createConfetti();
    playBirthdaySound();
});

// Page Navigation
function goToPage(pageNumber) {
    // Hide all pages
    const pages = document.querySelectorAll('.page');
    pages.forEach(page => page.classList.remove('active'));
    
    // Show target page
    const targetPage = document.getElementById(`page${pageNumber}`);
    if (targetPage) {
        targetPage.classList.add('active');
        
        // Special actions for specific pages
        if (pageNumber === 1) {
            createConfetti();
        } else if (pageNumber === 5) {
            createHeartRain();
        }
    }
}

// Present Opening Animation
function openPresent(presentNumber) {
    const present = document.getElementById(`present${presentNumber}`);
    const surpriseContainer = document.getElementById('present-surprise');
    const nextButton = document.getElementById('toPage3');
    
    if (present && !present.classList.contains('opened')) {
        present.classList.add('opened');
        
        // Different surprises for each present
        const surprises = [
            '🎮 Amazing Video Games! 🎮',
            '🚀 Super Cool Toys! 🚀',
            '📚 Awesome Books! 📚'
        ];
        
        setTimeout(() => {
            surpriseContainer.innerHTML = `<div class="surprise-text">${surprises[presentNumber - 1]}</div>`;
            surpriseContainer.classList.add('show');
            nextButton.style.display = 'inline-block';
            createEmojiExplosion(present);
        }, 600);
    }
}

// Candle Blowing
let candlesBlown = 0;
const totalCandles = 10;

document.addEventListener('click', function(e) {
    if (e.target.closest('.candle') && document.getElementById('page3').classList.contains('active')) {
        const candle = e.target.closest('.candle');
        if (candle.dataset.lit === 'true') {
            candle.dataset.lit = 'false';
            candlesBlown++;
            
            // Add blow effect
            createBlowEffect(candle);
            
            if (candlesBlown === totalCandles) {
                setTimeout(() => {
                    document.getElementById('wish-message').style.display = 'block';
                    document.getElementById('toPage4').style.display = 'inline-block';
                    createWishStars();
                }, 500);
            }
        }
    }
});

// Activity Functions
function startBalloonPop() {
    const activityArea = document.getElementById('activity-area');
    activityArea.innerHTML = '<div class="balloon-game" id="balloonGame"></div>';
    
    const balloonGame = document.getElementById('balloonGame');
    const balloonColors = ['🎈', '🎈', '🎈', '🎈', '🎈'];
    const colors = ['#ff6b6b', '#4ecdc4', '#f9ca24', '#6c5ce7', '#eb4d4b'];
    
    for (let i = 0; i < 15; i++) {
        const balloon = document.createElement('div');
        balloon.className = 'game-balloon';
        balloon.innerHTML = balloonColors[Math.floor(Math.random() * balloonColors.length)];
        balloon.style.color = colors[Math.floor(Math.random() * colors.length)];
        balloon.style.left = Math.random() * 80 + '%';
        balloon.style.top = Math.random() * 80 + '%';
        balloon.style.animationDelay = Math.random() * 2 + 's';
        
        balloon.addEventListener('click', function() {
            this.classList.add('balloon-pop');
            setTimeout(() => this.remove(), 300);
        });
        
        balloonGame.appendChild(balloon);
    }
}

function startEmojiRain() {
    const emojis = ['🎉', '🎊', '🌟', '⭐', '✨', '🎈', '🎂', '🎁', '🎀', '🌈'];
    
    for (let i = 0; i < 50; i++) {
        setTimeout(() => {
            createFloatingEmoji(emojis[Math.floor(Math.random() * emojis.length)]);
        }, i * 100);
    }
}

function startColorChange() {
    const activityArea = document.getElementById('activity-area');
    activityArea.innerHTML = `
        <div style="text-align: center;">
            <h3>🎨 Click the buttons to change colors! 🎨</h3>
            <div id="colorCircle" style="width: 200px; height: 200px; border-radius: 50%; margin: 20px auto; background: linear-gradient(45deg, #ff6b6b, #4ecdc4); transition: all 0.5s ease;"></div>
            <div>
                <button onclick="changeCircleColor('#ff6b6b')" style="background: #ff6b6b; border: none; padding: 10px 20px; margin: 5px; border-radius: 15px; color: white; cursor: pointer;">Red</button>
                <button onclick="changeCircleColor('#4ecdc4')" style="background: #4ecdc4; border: none; padding: 10px 20px; margin: 5px; border-radius: 15px; color: white; cursor: pointer;">Teal</button>
                <button onclick="changeCircleColor('#f9ca24')" style="background: #f9ca24; border: none; padding: 10px 20px; margin: 5px; border-radius: 15px; color: white; cursor: pointer;">Yellow</button>
                <button onclick="changeCircleColor('#6c5ce7')" style="background: #6c5ce7; border: none; padding: 10px 20px; margin: 5px; border-radius: 15px; color: white; cursor: pointer;">Purple</button>
            </div>
        </div>
    `;
}

function changeCircleColor(color) {
    const circle = document.getElementById('colorCircle');
    if (circle) {
        circle.style.background = `linear-gradient(45deg, ${color}, ${color}88)`;
        circle.style.transform = 'scale(1.1)';
        setTimeout(() => {
            circle.style.transform = 'scale(1)';
        }, 200);
    }
}

function startFireworks() {
    const activityArea = document.getElementById('activity-area');
    activityArea.innerHTML = '<div style="height: 300px; background: linear-gradient(to bottom, #001122, #003366); border-radius: 20px; position: relative; overflow: hidden;" id="fireworksArea"><h3 style="color: white; padding: 20px;">🎆 Click anywhere to create fireworks! 🎆</h3></div>';
    
    const fireworksArea = document.getElementById('fireworksArea');
    fireworksArea.addEventListener('click', function(e) {
        const rect = fireworksArea.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        createFirework(x, y);
    });
}

// Helper Functions
function createConfetti() {
    const confettiContainer = document.querySelector('.confetti-container');
    const colors = ['#ff6b6b', '#4ecdc4', '#f9ca24', '#6c5ce7', '#eb4d4b'];
    
    for (let i = 0; i < 100; i++) {
        const confetti = document.createElement('div');
        confetti.className = 'confetti';
        confetti.style.left = Math.random() * 100 + '%';
        confetti.style.background = colors[Math.floor(Math.random() * colors.length)];
        confetti.style.animationDelay = Math.random() * 3 + 's';
        confetti.style.animationDuration = (Math.random() * 3 + 2) + 's';
        confettiContainer.appendChild(confetti);
        
        setTimeout(() => {
            if (confetti.parentNode) {
                confetti.remove();
            }
        }, 5000);
    }
}

function createFloatingEmoji(emoji) {
    const floatingContainer = document.getElementById('floating-emojis');
    const emojiElement = document.createElement('div');
    emojiElement.className = 'floating-emoji';
    emojiElement.innerHTML = emoji;
    emojiElement.style.left = Math.random() * 100 + '%';
    emojiElement.style.animationDuration = (Math.random() * 2 + 3) + 's';
    floatingContainer.appendChild(emojiElement);
    
    setTimeout(() => {
        if (emojiElement.parentNode) {
            emojiElement.remove();
        }
    }, 5000);
}

function createEmojiExplosion(element) {
    const rect = element.getBoundingClientRect();
    const emojis = ['✨', '🌟', '⭐', '💫'];
    
    for (let i = 0; i < 10; i++) {
        const emoji = document.createElement('div');
        emoji.innerHTML = emojis[Math.floor(Math.random() * emojis.length)];
        emoji.style.position = 'fixed';
        emoji.style.left = rect.left + rect.width/2 + 'px';
        emoji.style.top = rect.top + rect.height/2 + 'px';
        emoji.style.fontSize = '2rem';
        emoji.style.pointerEvents = 'none';
        emoji.style.zIndex = '1000';
        
        const angle = (Math.PI * 2 * i) / 10;
        const velocity = 200;
        const vx = Math.cos(angle) * velocity;
        const vy = Math.sin(angle) * velocity;
        
        document.body.appendChild(emoji);
        
        let x = rect.left + rect.width/2;
        let y = rect.top + rect.height/2;
        let opacity = 1;
        
        const animate = () => {
            x += vx * 0.02;
            y += vy * 0.02;
            opacity -= 0.02;
            
            emoji.style.left = x + 'px';
            emoji.style.top = y + 'px';
            emoji.style.opacity = opacity;
            
            if (opacity > 0) {
                requestAnimationFrame(animate);
            } else {
                emoji.remove();
            }
        };
        
        animate();
    }
}

function createBlowEffect(candle) {
    const rect = candle.getBoundingClientRect();
    const particles = ['💨', '☁️', '🌪️'];
    
    for (let i = 0; i < 5; i++) {
        const particle = document.createElement('div');
        particle.innerHTML = particles[Math.floor(Math.random() * particles.length)];
        particle.style.position = 'fixed';
        particle.style.left = rect.left + rect.width/2 + 'px';
        particle.style.top = rect.top + 'px';
        particle.style.fontSize = '1.5rem';
        particle.style.pointerEvents = 'none';
        particle.style.zIndex = '1000';
        particle.style.opacity = '1';
        
        document.body.appendChild(particle);
        
        let y = rect.top;
        let opacity = 1;
        
        const animate = () => {
            y -= 2;
            opacity -= 0.02;
            
            particle.style.top = y + 'px';
            particle.style.opacity = opacity;
            
            if (opacity > 0) {
                requestAnimationFrame(animate);
            } else {
                particle.remove();
            }
        };
        
        animate();
    }
}

function createWishStars() {
    const stars = ['🌟', '⭐', '✨', '💫'];
    
    for (let i = 0; i < 20; i++) {
        setTimeout(() => {
            const star = document.createElement('div');
            star.innerHTML = stars[Math.floor(Math.random() * stars.length)];
            star.style.position = 'fixed';
            star.style.left = Math.random() * window.innerWidth + 'px';
            star.style.top = Math.random() * window.innerHeight + 'px';
            star.style.fontSize = '2rem';
            star.style.pointerEvents = 'none';
            star.style.zIndex = '999';
            star.style.animation = 'fadeInUp 2s ease forwards';
            
            document.body.appendChild(star);
            
            setTimeout(() => {
                star.remove();
            }, 3000);
        }, i * 100);
    }
}

function createHeartRain() {
    const hearts = ['❤️', '💕', '💖', '💗', '💝'];
    
    for (let i = 0; i < 30; i++) {
        setTimeout(() => {
            createFloatingEmoji(hearts[Math.floor(Math.random() * hearts.length)]);
        }, i * 200);
    }
}

function createFirework(x, y) {
    const colors = ['#ff6b6b', '#4ecdc4', '#f9ca24', '#6c5ce7', '#eb4d4b', '#ff9ff3', '#54a0ff'];
    const color = colors[Math.floor(Math.random() * colors.length)];
    
    for (let i = 0; i < 12; i++) {
        const particle = document.createElement('div');
        particle.className = 'firework';
        particle.style.left = x + 'px';
        particle.style.top = y + 'px';
        particle.style.background = color;
        
        const angle = (Math.PI * 2 * i) / 12;
        const distance = Math.random() * 100 + 50;
        
        particle.style.setProperty('--end-x', Math.cos(angle) * distance + 'px');
        particle.style.setProperty('--end-y', Math.sin(angle) * distance + 'px');
        
        document.getElementById('fireworksArea').appendChild(particle);
        
        setTimeout(() => {
            particle.remove();
        }, 1000);
    }
}

function playBirthdaySound() {
    // Create a simple birthday tune using Web Audio API (optional)
    try {
        const audioContext = new (window.AudioContext || window.webkitAudioContext)();
        const notes = [262, 262, 294, 262, 349, 330]; // Happy Birthday notes
        
        notes.forEach((frequency, index) => {
            setTimeout(() => {
                const oscillator = audioContext.createOscillator();
                const gainNode = audioContext.createGain();
                
                oscillator.connect(gainNode);
                gainNode.connect(audioContext.destination);
                
                oscillator.frequency.setValueAtTime(frequency, audioContext.currentTime);
                oscillator.type = 'sine';
                
                gainNode.gain.setValueAtTime(0.1, audioContext.currentTime);
                gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.5);
                
                oscillator.start(audioContext.currentTime);
                oscillator.stop(audioContext.currentTime + 0.5);
            }, index * 500);
        });
    } catch (e) {
        // Audio API not supported, continue without sound
        console.log('Audio not supported');
    }
}

// Add keyboard shortcuts for fun
document.addEventListener('keydown', function(e) {
    switch(e.key) {
        case ' ': // Spacebar
            e.preventDefault();
            createConfetti();
            break;
        case 'e': // E for emoji rain
            startEmojiRain();
            break;
        case 'h': // H for hearts
            createHeartRain();
            break;
    }
});

// Add some extra birthday magic
setInterval(() => {
    if (Math.random() < 0.1 && document.getElementById('page1').classList.contains('active')) {
        createFloatingEmoji(['🎉', '🎊', '🎈'][Math.floor(Math.random() * 3)]);
    }
}, 2000);

// Mobile touch support
document.addEventListener('touchstart', function(e) {
    if (e.target.closest('.present-box')) {
        e.preventDefault();
    }
});

console.log('🎉 Happy 10th Birthday Domas! 🎉');
console.log('🎈 Keyboard shortcuts: SPACE for confetti, E for emoji rain, H for hearts! 🎈'); 