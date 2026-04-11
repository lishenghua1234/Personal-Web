document.addEventListener("DOMContentLoaded", () => {
  // ===========================================
  // 惊人的极致科幻消融碎片特效 (The Pixel Dissolve Gen)
  // ===========================================
  const hoverWord = document.querySelector(".hover-word");
  
  if (hoverWord) {
    let particleInterval = null;
    
    // 渲染浅紫色星系碎片的光学颜色表
    const colors = ["#f3e8ff", "#e9d5ff", "#c084fc", "#a855f7", "#ffffff"];

    hoverWord.addEventListener("mouseenter", () => {
      // 开启文本底层光晕的半透明科幻态
      hoverWord.classList.add("dissolve");
      
      const rect = hoverWord.getBoundingClientRect();
      
      // 每 30 毫秒高频爆发出数十个漂浮的光晕方块像素，构成壮阔的科技解体感
      particleInterval = setInterval(() => {
        // 多线程视觉并发：一次射流出 4~5 个点
        for (let i = 0; i < 5; i++) {
          createPixelParticle(rect);
        }
      }, 30); 
    });

    hoverWord.addEventListener("mouseleave", () => {
      // 关闭幻象，重归坚实
      hoverWord.classList.remove("dissolve");
      if (particleInterval) {
        clearInterval(particleInterval);
        particleInterval = null;
      }
    });

    function createPixelParticle(rect) {
      const p = document.createElement("div");
      p.classList.add("pixel-particle");
      
      // 控制粒子为极小的锋锐方块以体现网络碎片感
      const size = Math.random() < 0.8 ? Math.random() * 2 + 1 : Math.random() * 4 + 2;
      p.style.width = `${size}px`;
      p.style.height = `${size}px`;
      
      const color = colors[Math.floor(Math.random() * colors.length)];
      p.style.backgroundColor = color;
      
      // 小方块带着强大的高光光晕
      p.style.boxShadow = `0 0 ${Math.random() * 15 + 5}px 1px ${color}`;

      // 在字母范围内产生（从字体的各个角落剥落）
      const startX = Math.random() * rect.width;
      const startY = Math.random() * rect.height;
      
      p.style.left = `${startX}px`;
      p.style.top = `${startY}px`;
      
      hoverWord.appendChild(p);

      // 上浮的散落路径模拟了粒子被风或高能场吹上极光带
      const animX = (Math.random() - 0.5) * 150; 
      // 绝对向上的浮力逃离重力
      const animY = -(Math.random() * 180 + 80); 
      const rotation = (Math.random() - 0.5) * 720; // 狂乱翻转

      // 寿命控制在 0.7 - 2 毫秒内消失在天际
      const duration = Math.random() * 1300 + 700; 

      const animation = p.animate([
        { transform: `translate(0, 0) rotate(0deg)`, opacity: Math.random() * 0.4 + 0.6 },
        { transform: `translate(${animX}px, ${animY}px) rotate(${rotation}deg)`, opacity: 0 }
      ], {
        duration: duration,
        easing: "cubic-bezier(0.25, 1, 0.5, 1)", 
        fill: "forwards"
      });

      // 运动结束必须手动垃圾回收清除节点，防止页面长时间挂机节点崩溃
      animation.onfinish = () => {
        if (hoverWord.contains(p)) {
          hoverWord.removeChild(p);
        }
      };
    }
  }
});
