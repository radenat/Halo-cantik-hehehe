document.addEventListener("DOMContentLoaded", () => {
  const yesBtn = document.getElementById("yesBtn");
  const noBtn = document.getElementById("noBtn");

  // Halaman index
  if (yesBtn && noBtn) {
    function moveButton() {
      const btnWidth = noBtn.offsetWidth;
      const btnHeight = noBtn.offsetHeight;
      const screenWidth = window.innerWidth;
      const screenHeight = window.innerHeight;

      const x = Math.random() * (screenWidth - btnWidth - 20);
      const y = Math.random() * (screenHeight - btnHeight - 20);
      const rotate = Math.random() * 60 - 30;

      noBtn.style.position = "fixed";
      noBtn.style.left = `${x}px`;
      noBtn.style.top = `${y}px`;
      noBtn.style.transform = `rotate(${rotate}deg)`;
      noBtn.style.transition = "all 0.25s ease";
    }

    ["mouseover", "click", "touchstart"].forEach((evt) =>
      noBtn.addEventListener(evt, moveButton)
    );

    yesBtn.addEventListener("click", () => {
      window.location.href = "main.html";
    });
  }

  // Halaman love (canvas hearts)
  const canvas = document.getElementById("heartCanvas");
  if (canvas) {
    const ctx = canvas.getContext("2d");
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    let hearts = [];
    for (let i = 0; i < 50; i++) {
      hearts.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        size: Math.random() * 10 + 5,
        speed: Math.random() * 1 + 0.5,
        opacity: Math.random(),
      });
    }

    function drawHeart(x, y, size, opacity) {
      ctx.save();
      ctx.translate(x, y);
      ctx.scale(size / 10, size / 10);
      ctx.globalAlpha = opacity;
      ctx.beginPath();
      ctx.moveTo(0, 0);
      ctx.bezierCurveTo(0, -3, -5, -3, -5, 0);
      ctx.bezierCurveTo(-5, 3, 0, 5, 0, 7);
      ctx.bezierCurveTo(0, 5, 5, 3, 5, 0);
      ctx.bezierCurveTo(5, -3, 0, -3, 0, 0);
      ctx.fillStyle = "#f28ab2";
      ctx.fill();
      ctx.restore();
    }

    function animate() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      hearts.forEach((heart) => {
        drawHeart(heart.x, heart.y, heart.size, heart.opacity);
        heart.y += heart.speed;
        if (heart.y > canvas.height) {
          heart.y = -10;
          heart.x = Math.random() * canvas.width;
        }
      });
      requestAnimationFrame(animate);
    }

    animate();

    window.addEventListener("resize", () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    });
  }
});

const slides = document.querySelectorAll('.slide');
    const dots = document.querySelectorAll('.dot');
    const slideContainer = document.getElementById('carouselSlide');
    let currentIndex = 0;

    function showSlide(index) {
      slideContainer.style.transform = `translateX(-${index * 100}%)`;
      dots.forEach(dot => dot.classList.remove('active'));
      dots[index].classList.add('active');
    }

    // Auto-slide every 3 seconds
    setInterval(() => {
      currentIndex = (currentIndex + 1) % slides.length;
      showSlide(currentIndex);
    }, 5000);

    // Dot navigation
    dots.forEach((dot, index) => {
      dot.addEventListener('click', () => {
        currentIndex = index;
        showSlide(currentIndex);
      });
    });