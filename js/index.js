const _C = document.getElementById('rotation'),
C = _C.getContext('2d'),
L = _C.width,
O = -.5*L,
R = L/Math.SQRT2,
RC = .05*L,
UA = 2*Math.PI/360,
POLY = [],
N = 170, /* Количество фигур*/
THEME = ['#505559', '#ffffff', '#2e2f30', '#67696b', '#050505'], /* Цвета фигур*/
NT = THEME.length,
OPTS = ['fill', 'stroke'],
NO = OPTS.length,
FN = ['line', 'move'];
function rand(max = 1, min = 0, dec = 0) {
    return +(min + (max - min)*Math.random()).toFixed(dec)
};
class RandPoly {
    constructor() {
        this.n = rand(8, 3);
        this.α = 2*Math.PI/this.n;
        this.o = rand();
        this.b = rand(NT - 1);
        this.r = rand(R + RC);
        this.β = Math.random()*2*Math.PI;
        this.γ = rand(1.5, .125, 2)*UA/30; /* Скорость */
    }
    get coords() {
        let vx = [], f;
        if(--this.r < 0) this.r = R + RC;
        this.β += rand(1.1, .9, 3)*this.γ;
        f = this.r/R;
        for(let i = 0; i < this.n; i++) {
            let ca = this.β + i*this.α;
            vx.push([
                Math.round(this.r*Math.cos(this.β) + f*RC*Math.cos(ca)),
                Math.round(this.r*Math.sin(this.β) + f*RC*Math.sin(ca))
            ])
        }
        return vx
    }
};
function draw() {
    C.clearRect(O, O, L, L);
    for(let i = 0; i < NT; i++) {
        let b = POLY.filter(c => c.b === i);
        for(let j = 0; j < NO; j++) {
            let opt = b.filter(c => c.o === j);
            C[`${OPTS[j]}Style`] = THEME[i];
            C.beginPath();
            opt.forEach(p => {
                let vx = p.coords;
                for(let k = 0; k <= p.n; k++) {
                    C[k ? 'lineTo' : 'moveTo'](...vx[k%p.n])
                }
            });
            C.closePath();
            C[`${OPTS[j]}`]();
        }
    }
    requestAnimationFrame(draw);
};
function init() {
    C.translate(-O, -O);
    C.lineWidth = 3;
    C.globalCompositeOperation = 'screen'
    for(let i = 0; i < N; i++) {
        let p = new RandPoly();
        POLY.push(p);
    }
    draw()
};
init();

// // Слова для анімації
// var words = ["портфоліо", "про мене", "ціна", "слово"];

// // Функція для створення та анімації слів
// function animateWords() {
//   // Отримуємо контейнер для слів
//   var container = document.createElement("div");
//   container.style.position = "fixed";
//   container.style.top = "50%";
//   container.style.left = "50%";
//   container.style.transform = "translate(-50%, -50%)";
//   document.body.appendChild(container);

//   // Додаємо слова до контейнера і анімуємо їх
//   words.forEach(function(word) {
//     var wordElement = document.createElement("span");
//     wordElement.textContent = word;
//     wordElement.style.display = "block";
//     wordElement.style.opacity = "0";
//     wordElement.style.transition = "opacity 2s, transform 2s";
//     container.appendChild(wordElement);

//     // Затримка перед початком анімації
//     setTimeout(function() {
//       // Анімація з'явлення слова
//       wordElement.style.opacity = "1";
//       wordElement.style.transform = "translate(-50%, -50%)";
//     }, 1000);
//   });
// }

// // Виклик функції після завантаження сторінки
// window.addEventListener("load", animateWords);
