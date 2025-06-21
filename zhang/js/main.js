// 等待DOM加载完成
document.addEventListener('DOMContentLoaded', () => {
    console.log('DOM已加载完成');
    
    // 检查小猫容器
    const catContainer = document.querySelector('.cat');
    if (catContainer) {
        console.log('找到小猫容器:', catContainer);
    } else {
        console.error('找不到小猫容器!');
    }
    
    // 初始化
    initCat();
    createStars();
    addEventListeners();
});

// 小猫状态
const catState = {
    isWalking: false,
    isJumping: false,
    isSleeping: false,
    isPlaying: false,
    isMeowing: false,
    isRolling: false,
    isStretching: false,
    isCatchingMouse: false,
    isCleaning: false,
    isSunbathing: false,
    isKnocking: false,
    currentAnimation: null
};

// 初始化小猫
function initCat() {
    // 不再需要添加SVG，因为已经在HTML中添加了
    const catContainer = document.querySelector('.cat');
    
    if (catContainer) {
        // 检查SVG是否存在
        const catSvg = catContainer.querySelector('svg');
        if (catSvg) {
            console.log('找到小猫SVG元素');
            
            // 初始位置
            try {
                if (window.gsap) {
                    gsap.set('.cat', {
                        x: 0,
                        y: 0,
                        scale: 1
                    });
                    console.log('已设置小猫初始位置');
                    
                    // 添加尾巴摇动动画
                    animateTail();
                } else {
                    console.error('GSAP库未加载，无法设置初始位置');
                }
            } catch (error) {
                console.error('设置小猫初始位置时出错:', error);
            }
            
            console.log('小猫已初始化');
        } else {
            console.error('未找到小猫SVG元素!');
        }
    } else {
        console.error('找不到.cat元素');
    }
}

// 创建星星
function createStars() {
    const starsContainer = document.querySelector('.stars');
    const starCount = 30;
    
    for (let i = 0; i < starCount; i++) {
        const star = document.createElement('div');
        star.classList.add('star');
        star.style.width = `${Math.random() * 3 + 1}px`;
        star.style.height = star.style.width;
        star.style.left = `${Math.random() * 100}%`;
        star.style.top = `${Math.random() * 100}%`;
        star.style.animationDuration = `${Math.random() * 3 + 2}s`;
        star.style.animationDelay = `${Math.random() * 2}s`;
        
        starsContainer.appendChild(star);
        
        // 星星闪烁动画
        gsap.to(star, {
            opacity: Math.random() * 0.8 + 0.2,
            duration: Math.random() * 2 + 1,
            repeat: -1,
            yoyo: true
        });
    }
}

// 添加事件监听器
function addEventListeners() {
    const actionButtons = document.querySelectorAll('.action-btn');
    
    actionButtons.forEach(button => {
        button.addEventListener('click', () => {
            const action = button.getAttribute('data-action');
            performAction(action);
        });
    });
}

// 执行动作
function performAction(action) {
    // 如果有正在进行的动画，先停止
    if (catState.currentAnimation) {
        catState.currentAnimation.kill();
    }
    
    // 重置状态
    resetCatState();
    
    // 根据动作执行相应的动画
    switch (action) {
        case 'walk':
            walkAnimation();
            break;
        case 'jump':
            jumpAnimation();
            break;
        case 'sleep':
            sleepAnimation();
            break;
        case 'play':
            playAnimation();
            break;
        case 'meow':
            meowAnimation();
            break;
        case 'roll':
            rollAnimation();
            break;
        case 'stretch':
            stretchAnimation();
            break;
        case 'catchMouse':
            catchMouseAnimation();
            break;
        case 'clean':
            cleanAnimation();
            break;
        case 'sunbathe':
            sunbathingAnimation();
            break;
        case 'knockWall':
            knockWallAnimation();
            break;
    }
}

// 重置小猫状态
function resetCatState() {
    Object.keys(catState).forEach(key => {
        if (key !== 'currentAnimation') {
            catState[key] = false;
        }
    });
    
    // 重置视觉状态
    const cat = document.querySelector('.cat');
    if (cat) {
        const eyesNormal = cat.querySelector('.eyes');
        const eyesClosed = cat.querySelector('.eyes-closed');
        const mouth = cat.querySelector('.mouth');
        
        if (eyesNormal) gsap.set(eyesNormal, { opacity: 1 });
        if (eyesClosed) gsap.set(eyesClosed, { opacity: 0 });
        if (mouth) gsap.set(mouth, { attr: { d: "M100 80 Q100 85 95 85 M100 80 Q100 85 105 85" } });
    }
}

// 尾巴摇动动画 - 更自然的摇动效果
function animateTail() {
    const tail = document.querySelector('.tail');
    if (tail) {
        // 创建更复杂的尾巴摇动动画
        const timeline = gsap.timeline({repeat: -1});
        
        // 向右摇动
        timeline.to(tail, {
            attr: { d: "M145 90 Q180 75 165 100" },
            duration: 1.5,
            ease: "sine.inOut"
        });
        
        // 向左摇动
        timeline.to(tail, {
            attr: { d: "M145 90 Q180 95 160 80" },
            duration: 1.5,
            ease: "sine.inOut"
        });
        
        // 中间位置
        timeline.to(tail, {
            attr: { d: "M145 90 Q180 60 170 90" },
            duration: 1.5,
            ease: "sine.inOut"
        });
    }
}

// 行走动画 - 更流畅的行走效果
function walkAnimation() {
    catState.isWalking = true;
    const cat = document.querySelector('.cat');
    const svg = cat.querySelector('svg');
    const body = svg.querySelector('ellipse'); // 猫的身体
    
    // 创建行走动画
    const timeline = gsap.timeline({
        repeat: 2,
        onComplete: () => {
            catState.isWalking = false;
            gsap.to(cat, {
                x: 0,
                rotation: 0,
                duration: 1,
                ease: "power2.inOut"
            });
        }
    });
    
    // 腿部运动
    const legs = svg.querySelectorAll('.legs ellipse');
    if (legs.length >= 2) {
        timeline.to(legs[0], { 
            cy: 120, 
            duration: 0.3, 
            yoyo: true, 
            repeat: 5,
            ease: "power1.inOut" 
        }, 0);
        
        timeline.to(legs[1], { 
            cy: 120, 
            duration: 0.3, 
            yoyo: true, 
            repeat: 5, 
            delay: 0.15,
            ease: "power1.inOut" 
        }, 0);
    }
    
    // 身体轻微摆动
    timeline.to(body, {
        rx: 43, // 轻微压缩
        ry: 37, // 轻微拉伸
        duration: 0.3,
        repeat: 5,
        yoyo: true,
        ease: "sine.inOut"
    }, 0);
    
    // 头部轻微上下移动
    timeline.to(svg.querySelector('circle'), {
        cy: 68,
        duration: 0.3,
        repeat: 5,
        yoyo: true,
        ease: "sine.inOut"
    }, 0);
    
    // 向右移动并轻微前倾
    timeline.to(cat, { 
        x: 100, 
        rotation: 2,
        duration: 1.5, 
        ease: "power1.inOut" 
    }, 0);
    
    // 向左移动并轻微反向倾斜
    timeline.to(cat, { 
        x: -100, 
        rotation: -2,
        duration: 1.5, 
        ease: "power1.inOut" 
    }, 1.5);
    
    catState.currentAnimation = timeline;
}

// 跳跃动画 - 更具弹性的跳跃效果
function jumpAnimation() {
    catState.isJumping = true;
    const cat = document.querySelector('.cat');
    const svg = cat.querySelector('svg');
    const body = svg.querySelector('ellipse'); // 猫的身体
    const legs = svg.querySelectorAll('.legs ellipse'); // 猫的腿
    
    // 创建跳跃动画
    const timeline = gsap.timeline({
        onComplete: () => {
            catState.isJumping = false;
        }
    });
    
    // 准备跳跃 - 压缩身体
    timeline.to(cat, {
        scaleY: 0.9,
        y: 10,
        duration: 0.3,
        ease: "power2.in"
    });
    
    // 腿部压缩
    if (legs.length >= 2) {
        timeline.to(legs[0], { 
            ry: 8, 
            duration: 0.3
        }, "<");
        
        timeline.to(legs[1], { 
            ry: 8, 
            duration: 0.3
        }, "<");
    }
    
    // 向上跳跃
    timeline.to(cat, {
        y: -120,
        scaleY: 1.1,
        scaleX: 0.9,
        rotation: 5,
        duration: 0.5,
        ease: "power2.out"
    });
    
    // 身体在空中伸展
    timeline.to(body, {
        ry: 33, // 略微拉伸
        duration: 0.5
    }, "<");
    
    // 腿部在空中伸展
    if (legs.length >= 2) {
        timeline.to(legs, { 
            ry: 9, 
            cy: 130,
            duration: 0.5
        }, "<");
    }
    
    // 落地
    timeline.to(cat, {
        y: 0,
        scaleY: 0.8,
        scaleX: 1.1,
        rotation: 0,
        duration: 0.3,
        ease: "bounce.out"
    });
    
    // 身体落地时压缩
    timeline.to(body, {
        ry: 38, // 压缩
        rx: 48, // 扩展
        duration: 0.3
    }, "<");
    
    // 恢复正常
    timeline.to(cat, {
        scaleY: 1,
        scaleX: 1,
        duration: 0.2,
        ease: "power2.out"
    });
    
    timeline.to(body, {
        rx: 45,
        ry: 35,
        duration: 0.2
    }, "<");
    
    // 腿部恢复
    if (legs.length >= 2) {
        timeline.to(legs, { 
            ry: 10,
            cy: 125,
            duration: 0.2
        }, "<");
    }
    
    catState.currentAnimation = timeline;
}

// 睡觉动画 - 更加柔和自然的睡眠效果
function sleepAnimation() {
    catState.isSleeping = true;
    const cat = document.querySelector('.cat');
    const svg = cat.querySelector('svg');
    const eyesNormal = svg.querySelector('.eyes');
    const eyesClosed = svg.querySelector('.eyes-closed');
    const body = svg.querySelector('ellipse'); // 猫的身体
    const mouth = svg.querySelector('.mouth');
    
    // 创建睡觉动画
    const timeline = gsap.timeline({
        repeat: 5,
        onComplete: () => {
            catState.isSleeping = false;
            resetCatState();
        }
    });
    
    // 初始躺下动作
    timeline.to(cat, {
        rotation: -90,
        x: -20,
        y: 10,
        transformOrigin: "center center",
        duration: 1,
        ease: "power2.inOut"
    });
    
    // 闭眼
    timeline.to(eyesNormal, { 
        opacity: 0, 
        duration: 0.3 
    }, "<+=0.7");
    
    timeline.to(eyesClosed, { 
        opacity: 1, 
        duration: 0.3 
    }, "<");
    
    // 嘴巴变化为微笑
    timeline.to(mouth, {
        attr: { d: "M100 80 Q100 75 105 80 M100 80 Q100 75 95 80" }, 
        duration: 0.5
    }, "<");
    
    // 轻微呼吸动作
    timeline.to(body, {
        ry: 37,
        rx: 48,
        duration: 1.2,
        repeat: 4,
        yoyo: true,
        ease: "sine.inOut"
    }, "<");
    
    // 偶尔轻微抽动耳朵
    const ears = svg.querySelectorAll('path:nth-child(3), path:nth-child(4)');
    if (ears.length >= 2) {
        timeline.to(ears[0], {
            attr: { d: "M70 45 Q75 22 85 45" },
            duration: 0.3,
            delay: 2,
            yoyo: true,
            repeat: 1,
            ease: "power1.inOut"
        }, "<+=1");
        
        timeline.to(ears[1], {
            attr: { d: "M130 45 Q125 22 115 45" },
            duration: 0.3,
            delay: 0.5,
            yoyo: true,
            repeat: 1,
            ease: "power1.inOut"
        }, "<+=2.5");
    }
    
    // 播放打呼噜声音
    const purrSound = new Audio('assets/sounds/purr.mp3');
    try {
        purrSound.volume = 0.5;
        purrSound.loop = true;
        purrSound.play().catch(e => console.log('无法播放音频:', e));
        
        // 创建Z形睡眠标志
        const sleepGroup = document.createElementNS("http://www.w3.org/2000/svg", "g");
        sleepGroup.classList.add('sleep-symbols');
        sleepGroup.innerHTML = `
            <text x="115" y="40" font-family="Ma Shan Zheng, cursive" font-size="18" fill="#9E7A5C">z</text>
            <text x="125" y="30" font-family="Ma Shan Zheng, cursive" font-size="14" fill="#9E7A5C">z</text>
            <text x="135" y="20" font-family="Ma Shan Zheng, cursive" font-size="10" fill="#9E7A5C">z</text>
        `;
        svg.appendChild(sleepGroup);
        
        // 动画显示Z形睡眠标志
        gsap.fromTo(sleepGroup.children, 
            {opacity: 0, y: 10},
            {opacity: 1, y: 0, duration: 0.5, stagger: 0.3, repeat: 9, yoyo: true}
        );
        
        // 动画结束时停止声音并移除Z字符
        timeline.call(() => {
            purrSound.pause();
            purrSound.currentTime = 0;
            if (sleepGroup.parentNode) {
                sleepGroup.parentNode.removeChild(sleepGroup);
            }
        }, [], 5);
    } catch (e) {
        console.log('音频播放失败:', e);
    }
    
    // 醒来动作
    timeline.to(cat, {
        rotation: 0,
        x: 0,
        y: 0,
        duration: 1,
        ease: "power2.inOut"
    }, ">");
    
    catState.currentAnimation = timeline;
}

// 玩耍动画 - 更加活泼可爱的玩耍效果
function playAnimation() {
    catState.isPlaying = true;
    const cat = document.querySelector('.cat');
    const svg = cat.querySelector('svg');
    const body = svg.querySelector('ellipse'); // 猫身体
    const head = svg.querySelector('circle'); // 猫头部
    
    // 创建玩耍动画
    const timeline = gsap.timeline({
        onComplete: () => {
            catState.isPlaying = false;
            
            // 移除可能添加的玩具球元素
            const ball = svg.querySelector('.toy-ball');
            if (ball && ball.parentNode) {
                ball.parentNode.removeChild(ball);
            }
        }
    });
    
    // 先创建一个玩具球
    const ball = document.createElementNS("http://www.w3.org/2000/svg", "g");
    ball.classList.add('toy-ball');
    ball.innerHTML = `
        <circle cx="140" cy="120" r="10" fill="#F6D87B" stroke="#9E7A5C" stroke-width="1" />
        <path d="M134 115 L146 125 M146 115 L134 125" stroke="#9E7A5C" stroke-width="1" />
    `;
    svg.appendChild(ball);
    
    // 球的初始位置
    gsap.set(ball, {
        scale: 0,
        transformOrigin: "center center",
        x: 50,
        y: -30
    });
    
    // 球从天而降
    timeline.to(ball, {
        scale: 1,
        x: 0,
        y: 0,
        duration: 0.5,
        ease: "bounce.out"
    });
    
    // 猫咪注意到球 (头部朝向球)
    timeline.to(head, {
        cx: 105,
        duration: 0.3
    });
    
    // 准备扑向球
    timeline.to(cat, {
        scaleY: 0.9,
        y: 5,
        rotation: 5,
        duration: 0.4,
        ease: "power1.in"
    });
    
    // 扑向球
    timeline.to(cat, {
        x: 30,
        y: -20,
        rotation: 15,
        duration: 0.4,
        ease: "power2.out"
    });
    
    // 球被击飞
    timeline.to(ball, {
        x: 80,
        y: -40,
        rotation: 180,
        duration: 0.4,
        ease: "power2.out"
    }, "<");
    
    // 球落地并弹跳
    timeline.to(ball, {
        x: 120,
        y: 0,
        rotation: 360,
        duration: 0.6,
        ease: "bounce.out"
    });
    
    // 猫咪落地
    timeline.to(cat, {
        y: 0,
        rotation: 0,
        duration: 0.3,
        ease: "power1.out"
    }, "<+=0.2");
    
    // 猫咪转身面向球
    timeline.to(cat, {
        rotation: 10,
        duration: 0.3
    });
    
    // 猫咪摇尾巴（兴奋状态）
    const tail = svg.querySelector('.tail');
    if (tail) {
        timeline.to(tail, {
            attr: { d: "M145 90 Q180 55 170 80" },
            duration: 0.3,
            repeat: 3,
            yoyo: true,
            ease: "power1.inOut"
        }, "<");
    }
    
    // 猫咪再次扑向球
    timeline.to(cat, {
        x: 80,
        y: -10,
        rotation: 5,
        duration: 0.5,
        ease: "power2.out"
    }, ">");
    
    // 球再次被击飞
    timeline.to(ball, {
        x: -50,
        y: -30,
        rotation: -180,
        duration: 0.5,
        ease: "power2.out"
    }, "<");
    
    // 球落地
    timeline.to(ball, {
        x: -80,
        y: 0,
        rotation: -360,
        duration: 0.4,
        ease: "bounce.out"
    });
    
    // 猫咪回到原位
    timeline.to(cat, {
        x: 0,
        y: 0,
        rotation: 0,
        scaleY: 1,
        duration: 0.8,
        ease: "power1.inOut"
    });
    
    // 球慢慢消失
    timeline.to(ball, {
        opacity: 0,
        scale: 0.5,
        duration: 0.5
    }, "<+=0.3");
    
    // 尝试播放玩耍声音
    try {
        const playSound = new Audio('assets/sounds/play.mp3');
        playSound.volume = 0.5;
        playSound.play().catch(e => console.log('无法播放音频:', e));
    } catch (e) {
        console.log('音频播放失败:', e);
    }
    
    catState.currentAnimation = timeline;
}

// 喵喵叫动画 - 更加生动表现力丰富
function meowAnimation() {
    catState.isMeowing = true;
    const cat = document.querySelector('.cat');
    const svg = cat.querySelector('svg');
    const mouth = svg.querySelector('.mouth');
    const head = svg.querySelector('circle'); // 猫头部
    const ears = svg.querySelectorAll('path:nth-child(3), path:nth-child(4)'); // 猫耳朵
    
    // 创建喵喵叫动画
    const timeline = gsap.timeline({
        onComplete: () => {
            catState.isMeowing = false;
        }
    });
    
    // 准备喵喵叫 - 头部略微后仰
    timeline.to(head, {
        cy: 67,
        duration: 0.3,
        ease: "sine.inOut"
    });
    
    // 耳朵竖起
    if (ears.length >= 2) {
        timeline.to(ears[0], {
            attr: { d: "M70 45 Q75 20 85 45" },
            duration: 0.3,
            ease: "power1.out"
        }, "<");
        
        timeline.to(ears[1], {
            attr: { d: "M130 45 Q125 20 115 45" },
            duration: 0.3,
            ease: "power1.out"
        }, "<");
    }
    
    // 创建对话泡泡
    const bubble = document.createElementNS("http://www.w3.org/2000/svg", "g");
    bubble.classList.add('speech-bubble');
    bubble.innerHTML = `
        <path d="M140,60 Q160,50 150,70 T140,60 Z" fill="white" stroke="#9E7A5C" stroke-width="1" />
        <text x="145" y="63" font-family="Ma Shan Zheng, cursive" font-size="14" fill="#9E7A5C">喵~</text>
    `;
    svg.appendChild(bubble);
    
    // 隐藏泡泡
    gsap.set(bubble, { scale: 0, transformOrigin: "left bottom" });
    
    // 嘴巴动画 - 大幅度张开
    timeline.to(mouth, {
        attr: { d: "M100 80 Q100 95 90 95 M100 80 Q100 95 110 95" },
        duration: 0.2
    });
    
    // 显示泡泡
    timeline.to(bubble, {
        scale: 1,
        ease: "elastic.out(1, 0.3)",
        duration: 0.5
    }, "<");
    
    // 嘴巴恢复
    timeline.to(mouth, {
        attr: { d: "M100 80 Q100 85 95 85 M100 80 Q100 85 105 85" },
        duration: 0.2,
        delay: 0.5
    });
    
    // 重复喵喵叫
    timeline.to(mouth, {
        attr: { d: "M100 80 Q100 90 95 90 M100 80 Q100 90 105 90" },
        duration: 0.2,
        delay: 0.2
    });
    
    // 泡泡变化
    timeline.to(bubble.querySelector('text'), {
        text: "喵喵~",
        duration: 0.1
    }, "<");
    
    timeline.to(mouth, {
        attr: { d: "M100 80 Q100 85 95 85 M100 80 Q100 85 105 85" },
        duration: 0.2
    });
    
    // 泡泡消失
    timeline.to(bubble, {
        scale: 0,
        opacity: 0,
        duration: 0.3,
        delay: 0.5,
        onComplete: () => {
            // 移除泡泡元素
            if (bubble.parentNode) {
                bubble.parentNode.removeChild(bubble);
            }
        }
    });
    
    // 耳朵恢复
    if (ears.length >= 2) {
        timeline.to(ears[0], {
            attr: { d: "M70 45 Q75 25 85 45" },
            duration: 0.3,
            ease: "power1.out"
        }, "<");
        
        timeline.to(ears[1], {
            attr: { d: "M130 45 Q125 25 115 45" },
            duration: 0.3,
            ease: "power1.out"
        }, "<");
    }
    
    // 头部回复原位
    timeline.to(head, {
        cy: 70,
        duration: 0.3,
        ease: "sine.inOut"
    }, "<");
    
    // 尝试播放喵喵叫声音
    try {
        const meowSound = new Audio('assets/sounds/meow.mp3');
        meowSound.volume = 0.5;
        meowSound.play().catch(e => console.log('无法播放音频:', e));
    } catch (e) {
        console.log('音频播放失败:', e);
    }
    
    catState.currentAnimation = timeline;
}

// 翻滚动画 - 更加流畅的翻滚效果
function rollAnimation() {
    catState.isRolling = true;
    const cat = document.querySelector('.cat');
    const svg = cat.querySelector('svg');
    const body = svg.querySelector('ellipse'); // 猫的身体
    
    // 创建翻滚动画
    const timeline = gsap.timeline({
        onComplete: () => {
            catState.isRolling = false;
            gsap.set(cat, { rotation: 0 }); // 重置旋转
        }
    });
    
    // 准备翻滚 - 猫咪蜷缩身体
    timeline.to(body, {
        rx: 42,
        ry: 38,
        duration: 0.4,
        ease: "power1.inOut"
    });
    
    timeline.to(cat, {
        y: 5,
        scaleY: 0.9,
        duration: 0.4
    }, "<");
    
    // 先移动到左侧
    timeline.to(cat, {
        x: -50,
        duration: 0.5,
        ease: "power1.inOut"
    });
    
    // 创建运动轨迹效果
    for (let i = 0; i < 3; i++) {
        const motionBlur = document.createElementNS("http://www.w3.org/2000/svg", "ellipse");
        motionBlur.setAttribute('cx', '100');
        motionBlur.setAttribute('cy', '100');
        motionBlur.setAttribute('rx', '45');
        motionBlur.setAttribute('ry', '35');
        motionBlur.setAttribute('fill', 'rgba(255, 224, 178, 0.2)');
        motionBlur.classList.add('motion-blur');
        svg.insertBefore(motionBlur, body);
    }
    
    const blurs = svg.querySelectorAll('.motion-blur');
    
    // 然后进行翻滚（旋转）同时向右移动
    timeline.to(cat, {
        rotation: 720, // 旋转两圈
        x: 50,
        duration: 1.5,
        ease: "power1.inOut",
        onUpdate: function() {
            // 更新模糊效果位置
            const progress = this.progress();
            if (blurs.length >= 3) {
                gsap.set(blurs[0], { 
                    x: -20 * Math.sin(progress * Math.PI), 
                    opacity: 0.4 * (1 - progress) 
                });
                gsap.set(blurs[1], { 
                    x: -10 * Math.sin(progress * Math.PI), 
                    opacity: 0.3 * (1 - progress) 
                });
                gsap.set(blurs[2], { 
                    x: -5 * Math.sin(progress * Math.PI), 
                    opacity: 0.2 * (1 - progress) 
                });
            }
        },
        onComplete: function() {
            // 移除模糊效果
            blurs.forEach(blur => {
                if (blur && blur.parentNode) {
                    blur.parentNode.removeChild(blur);
                }
            });
        }
    });
    
    // 回到原位
    timeline.to(cat, {
        x: 0,
        y: 0,
        scaleY: 1,
        duration: 0.5,
        ease: "power1.inOut"
    });
    
    // 身体恢复
    timeline.to(body, {
        rx: 45,
        ry: 35,
        duration: 0.5
    }, "<");
    
    catState.currentAnimation = timeline;
}

// 伸懒腰动画 - 更加自然的伸展效果
function stretchAnimation() {
    catState.isStretching = true;
    const cat = document.querySelector('.cat');
    const svg = cat.querySelector('svg');
    const body = svg.querySelector('ellipse'); // 猫的身体
    const head = svg.querySelector('circle'); // 猫的头
    const legs = svg.querySelectorAll('.legs ellipse'); // 猫的腿
    const mouth = svg.querySelector('.mouth'); // 猫的嘴
    
    // 创建伸懒腰动画
    const timeline = gsap.timeline({
        onComplete: () => {
            catState.isStretching = false;
        }
    });
    
    // 先打哈欠 - 嘴巴张大
    timeline.to(mouth, {
        attr: { d: "M100 80 Q100 90 90 95 M100 80 Q100 90 110 95" },
        duration: 0.5
    });
    
    // 创建哈欠泡泡
    const yawnBubble = document.createElementNS("http://www.w3.org/2000/svg", "circle");
    yawnBubble.setAttribute('cx', '100');
    yawnBubble.setAttribute('cy', '85');
    yawnBubble.setAttribute('r', '3');
    yawnBubble.setAttribute('fill', 'white');
    yawnBubble.setAttribute('opacity', '0.7');
    svg.appendChild(yawnBubble);
    
    // 哈欠泡泡动画
    timeline.to(yawnBubble, {
        cy: 60,
        r: 8,
        opacity: 0,
        duration: 1,
        ease: "power1.out",
        onComplete: () => {
            if (yawnBubble.parentNode) {
                yawnBubble.parentNode.removeChild(yawnBubble);
            }
        }
    });
    
    // 嘴巴恢复
    timeline.to(mouth, {
        attr: { d: "M100 80 Q100 85 95 85 M100 80 Q100 85 105 85" },
        duration: 0.3
    }, "<+=0.7");
    
    // 前伸 - 头部前移
    timeline.to(head, {
        cx: 110,
        duration: 0.7,
        ease: "power1.out"
    });
    
    // 身体拉长
    timeline.to(body, {
        rx: 50,
        cx: 105,
        duration: 0.7
    }, "<");
    
    // 腿部伸展
    if (legs.length >= 2) {
        timeline.to(legs[0], {
            cx: 60, // 向左前方伸展
            cy: 125,
            rx: 18, // 拉长腿
            duration: 0.7
        }, "<");
        
        timeline.to(legs[1], {
            cx: 150, // 向右后方伸展
            cy: 125,
            rx: 18, // 拉长腿
            duration: 0.7
        }, "<");
    }
    
    // 短暂暂停
    timeline.to({}, {}, "+=0.5");
    
    // 弓背
    timeline.to(body, {
        ry: 40, // 拱起
        cy: 95, // 略微上移
        duration: 0.7,
        ease: "power1.inOut"
    });
    
    // 头部上抬
    timeline.to(head, {
        cy: 65, // 上移
        duration: 0.7
    }, "<");
    
    // 腿部收回一点
    if (legs.length >= 2) {
        timeline.to(legs[0], {
            rx: 15, // 恢复原来长度
            duration: 0.7
        }, "<");
        
        timeline.to(legs[1], {
            rx: 15, // 恢复原来长度
            duration: 0.7
        }, "<");
    }
    
    // 短暂暂停
    timeline.to({}, {}, "+=0.5");
    
    // 恢复原状
    timeline.to(cat, {
        duration: 0.7,
        ease: "power1.inOut"
    });
    
    timeline.to(head, {
        cx: 100,
        cy: 70,
        duration: 0.7
    }, "<");
    
    timeline.to(body, {
        rx: 45,
        ry: 35,
        cx: 100,
        cy: 100,
        duration: 0.7
    }, "<");
    
    // 腿部恢复
    if (legs.length >= 2) {
        timeline.to(legs[0], {
            cx: 70, // 恢复原位置
            cy: 125,
            rx: 15,
            duration: 0.7
        }, "<");
        
        timeline.to(legs[1], {
            cx: 130, // 恢复原位置
            cy: 125,
            rx: 15,
            duration: 0.7
        }, "<");
    }
    
    catState.currentAnimation = timeline;
}

// 捉老鼠动画 - 更加生动有趣的捕猎过程
function catchMouseAnimation() {
    catState.isCatchingMouse = true;
    const cat = document.querySelector('.cat');
    const svg = cat.querySelector('svg');
    const body = svg.querySelector('ellipse'); // 猫的身体
    const head = svg.querySelector('circle'); // 猫的头部
    const eyes = svg.querySelector('.eyes'); // 猫的眼睛
    const tail = svg.querySelector('.tail'); // 猫的尾巴
    
    // 创建老鼠元素 - 更加精细可爱的老鼠
    const mouse = document.createElementNS("http://www.w3.org/2000/svg", "g");
    mouse.classList.add('mouse');
    mouse.innerHTML = `
        <!-- 老鼠身体 -->
        <ellipse cx="30" cy="15" rx="12" ry="6" fill="#AAA8A5" stroke="#777" stroke-width="1" />
        <!-- 老鼠头部 -->
        <circle cx="40" cy="13" r="6" fill="#AAA8A5" stroke="#777" stroke-width="1" />
        <!-- 耳朵 -->
        <circle cx="38" cy="9" r="3" fill="#E0D6D6" stroke="#777" stroke-width="0.5" />
        <circle cx="42" cy="9" r="3" fill="#E0D6D6" stroke="#777" stroke-width="0.5" />
        <!-- 眼睛 -->
        <circle cx="41" cy="12" r="1" fill="black" />
        <!-- 胡须 -->
        <line x1="43" y1="14" x2="48" y2="13" stroke="#777" stroke-width="0.5" />
        <line x1="43" y1="15" x2="48" y2="15" stroke="#777" stroke-width="0.5" />
        <!-- 尾巴 -->
        <path d="M19 15 Q10 10 5 18" stroke="#AAA8A5" stroke-width="2" fill="none" />
    `;
    
    // 将老鼠添加到SVG中
    if (svg) {
        svg.appendChild(mouse);
        
        // 初始位置（在右侧）
        gsap.set(mouse, {
            x: 200, // 猫的右侧
            y: 130, // 地面附近
            scale: 0.7,
            transformOrigin: "center center"
        });
        
        // 创建捉老鼠动画
        const timeline = gsap.timeline({
            onComplete: () => {
                catState.isCatchingMouse = false;
                // 移除老鼠元素
                if (mouse.parentNode) {
                    mouse.parentNode.removeChild(mouse);
                }
            }
        });
        
        // 猫咪发现老鼠，眼睛盯住
        timeline.to(head, {
            cx: 105, // 头部略微转向老鼠
            duration: 0.5,
            ease: "power1.out"
        });
        
        // 尾巴开始兴奋地摇晃
        timeline.to(tail, {
            attr: { d: "M145 90 Q180 60 170 70" },
            duration: 0.3,
            repeat: 3,
            yoyo: true,
            ease: "sine.inOut"
        }, "<");
        
        // 老鼠开始移动
        timeline.to(mouse, {
            x: 150, // 向猫的方向移动
            y: 125,
            duration: 0.8,
            ease: "steps(3)" // 使运动看起来像是一步一步的
        });
        
        // 老鼠警觉，停下来观察
        timeline.to(mouse, {
            rotation: 15, // 稍微转头
            duration: 0.3
        });
        
        // 猫的眼睛变大（专注）
        timeline.to(eyes.querySelectorAll('circle:nth-child(1), circle:nth-child(2)'), {
            r: 7,
            duration: 0.3
        }, "<");
        
        // 猫准备姿势 - 压低身体
        timeline.to(body, {
            ry: 30, // 压扁一点
            cy: 105, // 略微降低
            duration: 0.5,
            ease: "power2.in"
        });
        
        timeline.to(cat, {
            scaleY: 0.9,
            y: 10,
            duration: 0.5
        }, "<");
        
        // 老鼠继续移动
        timeline.to(mouse, {
            x: 100, // 继续向猫移动，进入危险区域
            rotation: 0,
            duration: 0.8,
            ease: "steps(4)"
        });
        
        // 老鼠突然意识到危险，转身准备逃跑
        timeline.to(mouse, {
            rotation: 180, // 转身
            duration: 0.2,
            ease: "power2.in"
        });
        
        // 猫向老鼠扑过去
        timeline.to(cat, {
            x: 70, // 向老鼠方向移动
            y: -30, // 向上跃起
            rotation: 15, // 身体前倾
            duration: 0.4,
            ease: "power3.out"
        });
        
        // 猫的爪子伸出
        const paw = document.createElementNS("http://www.w3.org/2000/svg", "ellipse");
        paw.setAttribute('cx', '130');
        paw.setAttribute('cy', '100');
        paw.setAttribute('rx', '8');
        paw.setAttribute('ry', '5');
        paw.setAttribute('fill', '#FFE0B2');
        paw.setAttribute('stroke', '#8B4513');
        paw.setAttribute('stroke-width', '1');
        svg.appendChild(paw);
        
        // 爪子迅速伸向老鼠
        timeline.to(paw, {
            cx: 100,
            cy: 120,
            duration: 0.3,
            ease: "power3.out"
        }, "<");
        
        // 老鼠试图逃跑
        timeline.to(mouse, {
            x: 120,
            y: 125,
            duration: 0.3,
            ease: "power2.out"
        }, "<");
        
        // 猫落地并抓住老鼠
        timeline.to(cat, {
            y: 0,
            rotation: 0,
            duration: 0.3,
            ease: "power1.in"
        });
        
        // 移除爪子
        timeline.call(() => {
            if (paw.parentNode) {
                paw.parentNode.removeChild(paw);
            }
        });
        
        // 老鼠被抓住 - 添加效果
        timeline.to(mouse, {
            scale: 0.9,
            rotation: 45,
            x: 100,
            y: 110,
            duration: 0.2
        }, "<");
        
        // 添加捕获效果 - 小星星
        const catchEffect = document.createElementNS("http://www.w3.org/2000/svg", "g");
        catchEffect.classList.add('catch-effect');
        catchEffect.innerHTML = `
            <path d="M95 110 L100 105 L105 110 L100 115 Z" fill="#FFD700" />
            <path d="M105 100 L110 105 L105 110 L100 105 Z" fill="#FFD700" />
        `;
        svg.appendChild(catchEffect);
        
        // 特效动画
        timeline.to(catchEffect, {
            scale: 1.5,
            opacity: 0,
            duration: 0.5,
            onComplete: () => {
                if (catchEffect.parentNode) {
                    catchEffect.parentNode.removeChild(catchEffect);
                }
            }
        });
        
        // 老鼠消失（被抓住）
        timeline.to(mouse, {
            autoAlpha: 0, // 渐隐
            scale: 0.5,
            duration: 0.3
        }, "<+=0.2");
        
        // 猫得意地抬头挺胸
        timeline.to(head, {
            cy: 65, // 头部上扬
            duration: 0.5
        });
        
        timeline.to(body, {
            ry: 38, // 挺胸
            duration: 0.5
        }, "<");
        
        // 猫返回原位
        timeline.to(cat, {
            x: 0,
            duration: 1,
            ease: "power1.inOut"
        });
        
        // 猫身体恢复正常
        timeline.to([head, body], {
            cx: 100,
            cy: function() { return this.targets()[0] === head.valueOf() ? 70 : undefined; },
            ry: function() { return this.targets()[0] === body.valueOf() ? 35 : undefined; },
            duration: 0.5
        }, "<");
        
        // 猫的眼睛恢复正常
        timeline.to(eyes.querySelectorAll('circle:nth-child(1), circle:nth-child(2)'), {
            r: 6,
            duration: 0.5
        }, "<");
        
        catState.currentAnimation = timeline;
    }
}

// 洗脸动画 - 更自然的洗脸动作
function cleanAnimation() {
    catState.isCleaning = true;
    const cat = document.querySelector('.cat');
    const svg = cat.querySelector('svg');
    const head = svg.querySelector('circle'); // 猫头部
    const eyes = svg.querySelector('.eyes'); // 猫的眼睛
    const eyesClosed = svg.querySelector('.eyes-closed'); // 猫闭眼
    
    // 创建爪子
    const paw = document.createElementNS("http://www.w3.org/2000/svg", "g");
    paw.classList.add('paw');
    paw.innerHTML = `
        <ellipse cx="100" cy="100" rx="8" ry="5" fill="#FFE0B2" stroke="#8B4513" stroke-width="1" />
        <!-- 爪尖 -->
        <path d="M96 97 Q99 95 102 97" stroke="#8B4513" stroke-width="0.8" fill="none" />
        <path d="M94 99 Q97 97 100 99" stroke="#8B4513" stroke-width="0.8" fill="none" />
        <path d="M98 101 Q101 99 104 101" stroke="#8B4513" stroke-width="0.8" fill="none" />
    `;
    
    // 初始位置（隐藏）
    if (svg) {
        svg.appendChild(paw);
        
        // 创建洗脸动画
        const timeline = gsap.timeline({
            repeat: 3,
            onComplete: () => {
                catState.isCleaning = false;
                // 移除爪子元素
                if (paw.parentNode) {
                    paw.parentNode.removeChild(paw);
                }
            }
        });
        
        // 初始位置
        gsap.set(paw, {
            x: -20,
            y: 30,
            rotation: -20,
            transformOrigin: "center center",
            autoAlpha: 0
        });
        
        // 头部微微倾斜，准备清洁
        timeline.to(head, {
            rotation: -5,
            transformOrigin: "center center",
            duration: 0.5
        });
        
        // 闭眼（猫洗脸时会闭眼）
        timeline.to(eyes, {
            opacity: 0,
            duration: 0.2
        }, "<+=0.3");
        
        timeline.to(eyesClosed, {
            opacity: 1,
            duration: 0.2
        }, "<");
        
        // 爪子出现并抬起
        timeline.to(paw, {
            autoAlpha: 1,
            duration: 0.3
        });
        
        // 第一次擦拭 - 耳朵
        timeline.to(paw, {
            x: 0,
            y: 0,
            rotation: 0,
            duration: 0.4,
            ease: "power1.out"
        });
        
        // 添加水滴效果（代表清洁）
        const createWaterDrop = () => {
            const waterDrop = document.createElementNS("http://www.w3.org/2000/svg", "circle");
            waterDrop.setAttribute('cx', '100');
            waterDrop.setAttribute('cy', '75');
            waterDrop.setAttribute('r', '1');
            waterDrop.setAttribute('fill', '#A6CFE5');
            waterDrop.classList.add('water-drop');
            svg.appendChild(waterDrop);
            
            // 水滴动画
            gsap.to(waterDrop, {
                cy: 120,
                opacity: 0,
                duration: 0.7,
                ease: "power1.in",
                onComplete: () => {
                    if (waterDrop.parentNode) {
                        waterDrop.parentNode.removeChild(waterDrop);
                    }
                }
            });
        };
        
        // 擦拭动作（上下移动）
        for (let i = 0; i < 3; i++) {
            // 向上擦拭
            timeline.to(paw, {
                y: -15,
                x: i * 5,
                duration: 0.2,
                ease: "power1.inOut",
                onComplete: createWaterDrop
            });
            
            // 向下擦拭
            timeline.to(paw, {
                y: 0,
                duration: 0.2,
                ease: "power1.inOut"
            });
        }
        
        // 爪子移动到眼睛区域
        timeline.to(paw, {
            x: -10,
            y: -5,
            duration: 0.3
        });
        
        // 擦拭眼睛
        for (let i = 0; i < 2; i++) {
            timeline.to(paw, {
                x: 10,
                duration: 0.3,
                ease: "power1.inOut",
                onUpdate: function() {
                    if (this.progress() > 0.5 && i === 0) {
                        createWaterDrop();
                    }
                }
            });
            
            timeline.to(paw, {
                x: -10,
                duration: 0.3,
                ease: "power1.inOut"
            });
        }
        
        // 爪子移动到鼻子区域
        timeline.to(paw, {
            x: 0,
            y: 5,
            duration: 0.3
        });
        
        // 擦拭鼻子
        timeline.to(paw, {
            rotation: 10,
            x: 5,
            duration: 0.2,
            onComplete: createWaterDrop
        });
        
        timeline.to(paw, {
            rotation: -10,
            x: -5,
            duration: 0.2
        });
        
        // 爪子离开
        timeline.to(paw, {
            x: -20,
            y: 30,
            rotation: -20,
            autoAlpha: 0,
            duration: 0.4
        });
        
        // 睁眼
        timeline.to(eyes, {
            opacity: 1,
            duration: 0.2
        }, "<+=0.2");
        
        timeline.to(eyesClosed, {
            opacity: 0,
            duration: 0.2
        }, "<");
        
        // 头部恢复正常
        timeline.to(head, {
            rotation: 0,
            duration: 0.3
        }, "<");
        
        // 短暂停顿
        timeline.to({}, {}, "+=0.5");
        
        catState.currentAnimation = timeline;
    }
}

// 晒太阳动画 - 慵懒舒适的晒太阳效果
function sunbathingAnimation() {
    catState.isSunbathing = true;
    const cat = document.querySelector('.cat');
    const svg = cat.querySelector('svg');
    const body = svg.querySelector('ellipse'); // 猫的身体
    const head = svg.querySelector('circle'); // 猫的头部
    const eyes = svg.querySelector('.eyes'); // 猫的眼睛
    const eyesClosed = svg.querySelector('.eyes-closed'); // 猫的闭眼
    const mouth = svg.querySelector('.mouth'); // 猫的嘴巴
    
    // 创建太阳元素
    const sun = document.createElementNS("http://www.w3.org/2000/svg", "g");
    sun.classList.add('sun');
    sun.innerHTML = `
        <circle cx="180" cy="30" r="20" fill="#FFD700" />
        <path d="M180 0 L180 -15 M210 30 L225 30 M180 60 L180 75 M150 30 L135 30" 
              stroke="#FFD700" stroke-width="3" transform="translate(0, 0)" />
        <path d="M201 9 L211 -1 M201 51 L211 61 M159 51 L149 61 M159 9 L149 -1" 
              stroke="#FFD700" stroke-width="2" transform="translate(0, 0)" />
    `;
    
    // 将太阳添加到SVG
    if (svg) {
        svg.appendChild(sun);
        
        // 初始位置（太阳从外面升起）
        gsap.set(sun, {
            scale: 0.8,
            transformOrigin: "center center",
            y: 30
        });
        
        // 创建晒太阳动画
        const timeline = gsap.timeline({
            onComplete: () => {
                catState.isSunbathing = false;
                // 移除太阳元素
                if (sun.parentNode) {
                    sun.parentNode.removeChild(sun);
                }
            }
        });
        
        // 太阳升起
        timeline.to(sun, {
            y: 0,
            scale: 1,
            duration: 1.5,
            ease: "power1.out"
        });
        
        // 添加阳光光芒效果
        timeline.to(sun.querySelector('circle'), {
            filter: 'drop-shadow(0 0 5px rgba(255, 215, 0, 0.7))',
            repeat: -1,
            yoyo: true,
            duration: 2
        }, "<");
        
        // 创建太阳周围的热气效果
        for (let i = 0; i < 3; i++) {
            const heatWave = document.createElementNS("http://www.w3.org/2000/svg", "path");
            heatWave.setAttribute('d', `M${170 + i*10} 45 Q${180 + i*10} 40 ${190 + i*10} 45`);
            heatWave.setAttribute('stroke', 'rgba(255, 215, 0, 0.3)');
            heatWave.setAttribute('stroke-width', '2');
            heatWave.setAttribute('fill', 'none');
            heatWave.classList.add('heat-wave');
            svg.appendChild(heatWave);
            
            // 热气上升动画
            gsap.to(heatWave, {
                attr: { d: `M${170 + i*10} 20 Q${180 + i*10} 15 ${190 + i*10} 20` },
                opacity: 0,
                duration: 3 + i*0.5,
                ease: "power1.out",
                repeat: -1,
                delay: i*0.8,
                onComplete: function() {
                    if (this.time() >= this.totalDuration() - 0.1) {
                        heatWave.parentNode.removeChild(heatWave);
                    }
                }
            });
        }
        
        // 猫躺下来
        timeline.to(cat, {
            rotation: -90,
            x: -20,
            transformOrigin: "center center",
            duration: 1,
            ease: "power2.inOut"
        });
        
        // 调整身体形状
        timeline.to(body, {
            rx: 48, // 变宽
            ry: 32, // 变扁
            duration: 0.7
        }, "<+=0.3");
        
        // 头部位置调整
        timeline.to(head, {
            cx: 100,
            cy: 70,
            duration: 0.7
        }, "<");
        
        // 闭眼享受阳光
        timeline.to(eyes, {
            opacity: 0,
            duration: 0.3
        }, "<+=0.4");
        
        timeline.to(eyesClosed, {
            opacity: 1,
            duration: 0.3
        }, "<");
        
        // 嘴巴调整为享受表情
        timeline.to(mouth, {
            attr: { d: "M100 80 Q100 76 104 78 M100 80 Q100 76 96 78" },
            duration: 0.5
        }, "<");
        
        // 创建舒适的表情标志
        const comfortSymbol = document.createElementNS("http://www.w3.org/2000/svg", "g");
        comfortSymbol.classList.add('comfort-symbol');
        comfortSymbol.innerHTML = `
            <text x="120" y="50" font-family="Ma Shan Zheng, cursive" font-size="14" fill="#FF855B">~</text>
            <text x="130" y="50" font-family="Ma Shan Zheng, cursive" font-size="14" fill="#FF855B">~</text>
        `;
        svg.appendChild(comfortSymbol);
        
        // 舒适符号动画
        timeline.fromTo(comfortSymbol.children, 
            {opacity: 0, y: 5},
            {opacity: 1, y: 0, duration: 0.5, stagger: 0.3, repeat: 5, yoyo: true}
        );
        
        // 享受阳光
        timeline.to(cat, {
            y: 5,
            duration: 2,
            repeat: 1,
            yoyo: true,
            ease: "sine.inOut"
        }, "<");
        
        // 轻微的呼吸效果
        timeline.to(body, {
            ry: 34,
            duration: 1.5,
            repeat: 3,
            yoyo: true,
            ease: "sine.inOut"
        }, "<");
        
        // 太阳开始落下
        timeline.to(sun, {
            y: 30,
            opacity: 0.7,
            duration: 1.5,
            delay: 3
        });
        
        // 猫醒来
        timeline.to(eyes, {
            opacity: 1,
            duration: 0.3
        }, "<+=0.7");
        
        timeline.to(eyesClosed, {
            opacity: 0,
            duration: 0.3
        }, "<");
        
        // 嘴巴恢复
        timeline.to(mouth, {
            attr: { d: "M100 80 Q100 85 95 85 M100 80 Q100 85 105 85" },
            duration: 0.5
        }, "<");
        
        // 移除舒适符号
        timeline.to(comfortSymbol, {
            opacity: 0,
            duration: 0.5,
            onComplete: () => {
                if (comfortSymbol.parentNode) {
                    comfortSymbol.parentNode.removeChild(comfortSymbol);
                }
            }
        }, "<");
        
        // 猫站起来
        timeline.to(cat, {
            rotation: 0,
            x: 0,
            y: 0,
            duration: 1,
            ease: "power2.inOut"
        }, ">");
        
        // 恢复身体形状
        timeline.to(body, {
            rx: 45,
            ry: 35,
            duration: 0.7
        }, "<+=0.3");
        
        catState.currentAnimation = timeline;
    }
}

// 敲墙动画 - 好奇探索的敲墙效果
function knockWallAnimation() {
    catState.isKnocking = true;
    const cat = document.querySelector('.cat');
    const svg = cat.querySelector('svg');
    const head = svg.querySelector('circle'); // 猫头部
    const body = svg.querySelector('ellipse'); // 猫身体
    const ears = svg.querySelectorAll('path:nth-child(3), path:nth-child(4)'); // 猫耳朵
    const eyes = svg.querySelector('.eyes'); // 猫的眼睛
    
    // 创建墙面
    const wall = document.createElementNS("http://www.w3.org/2000/svg", "rect");
    wall.setAttribute('x', '160');
    wall.setAttribute('y', '30');
    wall.setAttribute('width', '40');
    wall.setAttribute('height', '150');
    wall.setAttribute('fill', '#E8DCCF');
    wall.setAttribute('stroke', '#D1C4B4');
    wall.setAttribute('stroke-width', '2');
    
    // 添加到SVG
    if (svg) {
        svg.appendChild(wall);
        
        // 创建敲墙动画
        const timeline = gsap.timeline({
            onComplete: () => {
                catState.isKnocking = false;
                // 移除墙面元素
                if (wall.parentNode) {
                    wall.parentNode.removeChild(wall);
                }
                // 如果创建了爪子元素，也需要移除
                const paw = svg.querySelector('.knock-paw');
                if (paw && paw.parentNode) {
                    paw.parentNode.removeChild(paw);
                }
            }
        });
        
        // 猫走向墙边
        timeline.to(cat, {
            x: 40,
            duration: 1,
            ease: "power1.inOut"
        });
        
        // 猫好奇地看着墙
        timeline.to(head, {
            cx: 105, // 头部略微转向墙
            duration: 0.5
        }, ">");
        
        // 耳朵竖起（警觉状态）
        if (ears.length >= 2) {
            timeline.to(ears[0], {
                attr: { d: "M70 45 Q75 20 85 45" },
                duration: 0.3
            }, "<");
            
            timeline.to(ears[1], {
                attr: { d: "M130 45 Q125 20 115 45" },
                duration: 0.3
            }, "<");
        }
        
        // 眼睛聚焦
        timeline.to(eyes.querySelectorAll('circle:nth-child(1), circle:nth-child(2)'), {
            cx: function(i) { return i === 0 ? 93 : 113; }, // 眼睛看向墙面方向
            r: 6.5, // 稍微睁大
            duration: 0.3
        }, "<");
        
        // 创建猫爪
        const paw = document.createElementNS("http://www.w3.org/2000/svg", "g");
        paw.classList.add('knock-paw');
        paw.innerHTML = `
            <ellipse cx="140" cy="100" rx="8" ry="5" fill="#FFE0B2" stroke="#8B4513" stroke-width="1" />
            <path d="M136 97 Q139 95 142 97" stroke="#8B4513" stroke-width="0.8" fill="none" />
            <path d="M134 99 Q137 97 140 99" stroke="#8B4513" stroke-width="0.8" fill="none" />
            <path d="M138 101 Q141 99 144 101" stroke="#8B4513" stroke-width="0.8" fill="none" />
        `;
        svg.appendChild(paw);
        
        // 初始隐藏爪子
        gsap.set(paw, {
            autoAlpha: 0
        });
        
        // 猫靠近墙并伸出爪子
        timeline.to(cat, {
            x: 50,
            duration: 0.5
        });
        
        // 显示爪子
        timeline.to(paw, {
            autoAlpha: 1,
            duration: 0.3
        }, "<");
        
        // 敲墙动作（多次敲击）
        for (let i = 0; i < 3; i++) {
            // 爪子前伸（敲击）
            timeline.to(paw, {
                x: 20,
                duration: 0.2,
                ease: "power2.out"
            });
            
            // 创建敲击特效
            const knockEffect = () => {
                const effect = document.createElementNS("http://www.w3.org/2000/svg", "circle");
                effect.setAttribute('cx', '180');
                effect.setAttribute('cy', '100');
                effect.setAttribute('r', '2');
                effect.setAttribute('fill', 'rgba(255, 255, 255, 0.7)');
                effect.classList.add('knock-effect');
                svg.appendChild(effect);
                
                // 特效动画
                gsap.to(effect, {
                    r: 15,
                    opacity: 0,
                    duration: 0.5,
                    ease: "power1.out",
                    onComplete: () => {
                        if (effect.parentNode) {
                            effect.parentNode.removeChild(effect);
                        }
                    }
                });
                
                // 添加文字特效
                const knockText = document.createElementNS("http://www.w3.org/2000/svg", "text");
                knockText.setAttribute('x', '180');
                knockText.setAttribute('y', '80');
                knockText.setAttribute('font-family', 'Ma Shan Zheng, cursive');
                knockText.setAttribute('font-size', '14');
                knockText.setAttribute('fill', '#9E7A5C');
                knockText.setAttribute('text-anchor', 'middle');
                knockText.textContent = "咚!";
                svg.appendChild(knockText);
                
                // 文字特效动画
                gsap.to(knockText, {
                    y: 60,
                    opacity: 0,
                    duration: 0.7,
                    ease: "power1.out",
                    onComplete: () => {
                        if (knockText.parentNode) {
                            knockText.parentNode.removeChild(knockText);
                        }
                    }
                });
                
                // 墙面轻微震动
                gsap.to(wall, {
                    x: 1,
                    duration: 0.1,
                    repeat: 5,
                    yoyo: true,
                    ease: "sine.inOut"
                });
            };
            
            // 敲击效果
            timeline.call(knockEffect);
            
            // 爪子收回
            timeline.to(paw, {
                x: 0,
                duration: 0.2,
                ease: "power2.in"
            }, ">");
            
            // 猫头微微倾斜（好奇地听墙内声音）
            if (i === 0) {
                timeline.to(head, {
                    rotation: 15,
                    transformOrigin: "center center",
                    duration: 0.3
                });
                
                timeline.to(head, {
                    rotation: 0,
                    duration: 0.3
                }, "+=0.5");
            }
            
            // 间隔
            timeline.to({}, {}, "+=0.3");
        }
        
        // 猫对墙失去兴趣，返回原位
        timeline.to(paw, {
            autoAlpha: 0,
            duration: 0.3
        });
        
        timeline.to(cat, {
            x: 0,
            duration: 1,
            ease: "power1.inOut"
        }, ">");
        
        // 头部回正
        timeline.to(head, {
            cx: 100,
            duration: 0.5
        }, "<+=0.5");
        
        // 耳朵恢复
        if (ears.length >= 2) {
            timeline.to(ears[0], {
                attr: { d: "M70 45 Q75 25 85 45" },
                duration: 0.3
            }, "<");
            
            timeline.to(ears[1], {
                attr: { d: "M130 45 Q125 25 115 45" },
                duration: 0.3
            }, "<");
        }
        
        // 眼睛恢复
        timeline.to(eyes.querySelectorAll('circle:nth-child(1), circle:nth-child(2)'), {
            cx: function(i) { return i === 0 ? 90 : 110; }, // 恢复原位
            r: 6, // 恢复正常大小
            duration: 0.3
        }, "<");
        
        catState.currentAnimation = timeline;
    }
}

// 优化动画过渡 - 平滑处理动画切换
function smoothAnimationTransition(newAnimation) {
    // 如果有正在进行的动画，先安全地停止它
    if (catState.currentAnimation && catState.currentAnimation.isActive()) {
        // 创建平滑过渡
        const cat = document.querySelector('.cat');
        const svg = cat.querySelector('svg');
        
        // 记录当前状态
        const currentTransform = {
            x: gsap.getProperty(cat, "x") || 0,
            y: gsap.getProperty(cat, "y") || 0,
            rotation: gsap.getProperty(cat, "rotation") || 0,
            scaleX: gsap.getProperty(cat, "scaleX") || 1,
            scaleY: gsap.getProperty(cat, "scaleY") || 1
        };
        
        // 快速过渡到正常状态（但不是瞬间）
        const resetTimeline = gsap.timeline({
            onComplete: () => {
                // 重置猫的状态
                resetCatState();
                
                // 移除可能存在的临时元素
                const tempElements = svg.querySelectorAll('.water-drop, .heat-wave, .motion-blur, .sleep-symbols, .catch-effect, .knock-effect, .mouse, .toy-ball');
                tempElements.forEach(el => {
                    if (el.parentNode) {
                        el.parentNode.removeChild(el);
                    }
                });
                
                // 启动新动画
                newAnimation();
            }
        });
        
        // 停止当前动画
        catState.currentAnimation.kill();
        
        // 平滑回到正常位置
        resetTimeline.to(cat, {
            x: 0,
            y: 0, 
            rotation: 0,
            scaleX: 1,
            scaleY: 1,
            duration: 0.5,
            ease: "power2.inOut"
        });
        
        // 眼睛状态恢复
        const eyes = svg.querySelector('.eyes');
        const eyesClosed = svg.querySelector('.eyes-closed');
        
        resetTimeline.to(eyes, {
            opacity: 1,
            duration: 0.3
        }, "<");
        
        resetTimeline.to(eyesClosed, {
            opacity: 0,
            duration: 0.3
        }, "<");
        
        // 嘴巴恢复
        const mouth = svg.querySelector('.mouth');
        resetTimeline.to(mouth, {
            attr: { d: "M100 80 Q100 85 95 85 M100 80 Q100 85 105 85" },
            duration: 0.3
        }, "<");
        
        return; // 不立即执行新动画，由回调处理
    }
    
    // 如果没有正在进行的动画，直接启动新动画
    newAnimation();
}

// 修改所有动画触发函数，使用平滑过渡
function walk() {
    // 如果已经在行走，不要重复触发
    if (catState.isWalking) return;
    
    // 检查是否有其他动画正在进行，如有则平滑过渡
    smoothAnimationTransition(walkAnimation);
}

function jump() {
    if (catState.isJumping) return;
    smoothAnimationTransition(jumpAnimation);
}

function sleep() {
    if (catState.isSleeping) return;
    smoothAnimationTransition(sleepAnimation);
}

function play() {
    if (catState.isPlaying) return;
    smoothAnimationTransition(playAnimation);
}

function meow() {
    if (catState.isMeowing) return;
    smoothAnimationTransition(meowAnimation);
}

function roll() {
    if (catState.isRolling) return;
    smoothAnimationTransition(rollAnimation);
}

function stretch() {
    if (catState.isStretching) return;
    smoothAnimationTransition(stretchAnimation);
}

function catchMouse() {
    if (catState.isCatchingMouse) return;
    smoothAnimationTransition(catchMouseAnimation);
}

function clean() {
    if (catState.isCleaning) return;
    smoothAnimationTransition(cleanAnimation);
}

function sunbathe() {
    if (catState.isSunbathing) return;
    smoothAnimationTransition(sunbathingAnimation);
}

function knockWall() {
    if (catState.isKnocking) return;
    smoothAnimationTransition(knockWallAnimation);
}

// 添加CSS样式
const style = document.createElement('style');
style.textContent = `
    .star {
        position: absolute;
        background-color: white;
        border-radius: 50%;
        opacity: 0;
    }
`;
document.head.appendChild(style); 