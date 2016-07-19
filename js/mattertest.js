var VIEW = {};
VIEW.SAFE_WIDTH = 100;
VIEW.SAFE_HEIGHT = 100;
VIEW.scale = Math.min(window.innerWidth / VIEW.SAFE_WIDTH, window.innerHeight / VIEW.SAFE_HEIGHT);
VIEW.width = window.innerWidth / VIEW.scale;
VIEW.height = window.innerHeight / VIEW.scale;
VIEW.centerX = VIEW.width / 2;
VIEW.centerY = VIEW.height / 2;
VIEW.offsetX = (VIEW.width - VIEW.SAFE_WIDTH) / 2 / VIEW.scale;
VIEW.offsetY = (VIEW.height - VIEW.SAFE_HEIGHT) / 2 / VIEW.scale;

// Matter.js module aliases
var Engine = Matter.Engine,
    World = Matter.World,
    Bodies = Matter.Bodies;

// create a Matter.js engine
var engine = Engine.create({
    render: {
        element: document.getElementById("debug"),
        options: {
            width: 100,
            height: 100,
            background: '#fafafa',
            wireframeBackground: '#222',
            hasBounds: false,
            enabled: true,
            wireframes: true,
            showSleeping: true,
            showDebug: false,
            showBroadphase: false,
            showBounds: false,
            showVelocity: false,
            showCollisions: false,
            showAxes: false,
            showPositions: false,
            showAngleIndicator: false,
            showIds: false,
            showShadows: false
        }
    }
});

var ground = Bodies.rectangle(50, 350, 300, 500, {
    isStatic: true
});

// add all of the bodies to the world
World.add(engine.world, [ground]);

// run the engine
Engine.run(engine);

var bodiesDom = document.querySelectorAll('.block');
var bodies = [];
for (var i = 0, l = bodiesDom.length; i < l; i++) {
    var body = Bodies.rectangle(
        VIEW.centerX,
        20,
        VIEW.width * bodiesDom[i].offsetWidth / window.innerWidth,
        VIEW.height * bodiesDom[i].offsetHeight / window.innerHeight
    );
    bodiesDom[i].id = body.id;
    bodies.push(body);
}
World.add(engine.world, bodies);


window.requestAnimationFrame(update);
function update() {
    for (var i = 0, l = bodiesDom.length; i < l; i++) {
        var bodyDom = bodiesDom[i];
        var body = null;
        for (var j = 0, k = bodies.length; j < k; j++) {
            if (bodies[j].id == bodyDom.id) {
                body = bodies[j];
                break;
            }
        }

        if (body === null) continue;

        bodyDom.style.transform = "translate( "
            + ((VIEW.offsetX + body.position.x) * VIEW.scale - bodyDom.offsetWidth / 2 )
            + "px, "
            + (VIEW.offsetY * 2 + ( body.position.y) * VIEW.scale - bodyDom.offsetHeight / 2)
            + "px )";
        bodyDom.style.transform += "rotate( " + body.angle + "rad )";

    }
    window.requestAnimationFrame(update);
}
