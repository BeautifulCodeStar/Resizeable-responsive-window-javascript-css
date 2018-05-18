function create(htmlStr) {
    var frag = document.createDocumentFragment(),
        temp = document.createElement('div');
    temp.innerHTML = htmlStr;
    while (temp.firstChild) {
        frag.appendChild(temp.firstChild);
    }
    return frag;
}
var interval;

setTimeout(() => {
    var obj = animation();
    interval = setInterval(obj.move, 20);
}, 1200);;


function animation() {
    var next = () => {
        start();
        var main = document.getElementsByClassName('resize-drag')[0];
        if (main.offsetHeight > 430) {
            main.style.height = parseInt(main.offsetHeight) - 1 + 'px';
        } else {
            clearInterval(interval);
            interval = setInterval(final, 20)
        }
    }

    var move = () => {
        start();
        var main = document.getElementsByClassName('resize-drag')[0];
        if (main.offsetHeight < 500) {
            main.style.height = parseInt(main.offsetHeight) + 1 + 'px';
        } else {
            clearInterval(interval)
            interval = setInterval(next, 20)
        }
    };

    var final = () => {
        start();
        var main = document.getElementsByClassName('resize-drag')[0];
        if (main.offsetHeight < 500) {
            main.style.height = parseInt(main.offsetHeight) + 1 + 'px';
        } else {
            clearInterval(interval)
        }
    };
    return {
        next, move
    }
}

function start() {
    var circle = document.getElementsByClassName('circle')[0];
    var main = document.getElementsByClassName("resize-drag")[0];
    var rect = circle.getBoundingClientRect();
    var left = parseInt(rect.left) - 15 + 'px';
    var top = parseInt(main.offsetHeight) - 40 + 'px';

    document.getElementsByClassName("resize-btn")[0].style.left = left;
    document.getElementsByClassName("resize-btn")[0].style.top = top;
    
    var height = main.offsetHeight;
    document.getElementsByClassName("line-bar")[0].style.top = height/2 -10 + 'px';
   
    document.getElementsByClassName('text')[0].style.fontSize = parseInt(height) * 3 / 100 + 'px';
    document.querySelector('div.circle').style.fontSize = parseInt(height) * 5 / 100 + 'px';
    document.getElementsByClassName('circle')[0].style.width = parseInt(height) * 8 / 100 + 'px';
    document.getElementsByClassName('circle')[0].style.height = parseInt(height) * 8 / 100 + 'px';
    var real = parseInt(height) + parseInt(height) * 15 / 100 - 8;

    document.getElementsByClassName('iphone-img')[0].style.height = real + 'px';
}

function resizemove(event) {
    var target = event.target,
        x = (parseFloat(target.getAttribute('data-x')) || 0),
        y = (parseFloat(target.getAttribute('data-y')) || 0);

    // update the element's style
    target.style.width = event.rect.width + 'px';
    target.style.height = event.rect.height + 'px';
    // translate when resizing from top or left edges
    x += event.deltaRect.left;
    y += event.deltaRect.top;

    target.style.webkitTransform = target.style.transform =
        'translate(' + x + 'px,' + y + 'px)';

    target.setAttribute('data-x', x);
    target.setAttribute('data-y', y);
    // target.textContent = Math.round(event.rect.width) + '\u00D7' + Math.round(event.rect.height);

    var content = document.getElementsByClassName('resize-drag')[0];
    var fragment = create(`
        <div class="iphone">
                <img class="iphone-img img-fluid" src="assets/imgs/phone-70.png" alt="phone" />
        </div>
        <div class="line-bar"></div>
        <div class="description">
            <div class="point" align="center">
                <div class="circle">
                    <span>2</span>
                </div>
            </div>
            <div>
                <p class="text">
                    DRAG THE ARROWS <br>
                    TO ADJUST THE HEIGHT OF THE RED AREA <br>
                    TO THE HEIGHT OF YOUR PHONE SCREEN
                </p>
            </div>
        </div>
        <div class="resize-btn">
            <i class="material-icons" style="">expand_less</i>
            <i class="material-icons">expand_more</i>
        </div>
    `);
    var main = document.getElementsByClassName("resize-drag")[0];
    if (main) {
        while (main.firstChild) {
            main.removeChild(main.firstChild);
        }
    }
    document.getElementsByClassName('resize-drag')[0].appendChild(fragment);
    start();
}

interact('.resize-drag,body')
  .resizable({
    // resize from all edges and corners
    edges: { left: false, right: false, bottom: true, top: true },
    // keep the edges inside the parent
    restrictEdges: {
      outer: 'parent',
      endOnly: true,
    },
      autoScroll: {
          container: document.body,
          margin: 50,
          distance: 5,
          interval: 10
      },
    // minimum size
    restrictSize: {
      min: { width: 300, height: 188 },
      max: { width: '100%', height: 600.703 },
    },
    inertia: true,
    // allowFrom: '.resize-drag'
  })
    .on('resizemove', resizemove);
