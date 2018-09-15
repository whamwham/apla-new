function drawFigure() {

    var width = window.innerWidth * .6,
        height = window.innerHeight * 0.9,
        τ = 2 * Math.PI,
        maxLength = 200,
        maxLength2 = maxLength * maxLength;

// width = window.innerHeight*.9;

    var nodes = d3.range(200).map(function () {
        return {
            x: Math.random() * width,
            y: Math.random() * height
        };
    });

    var cha = (window.innerWidth > 600) ? -1 * (window.innerHeight * 0.13 - 40) : -40;

    var force = d3.layout.force()
        .size([width, height])
        .nodes(nodes.slice())
        .charge(function (d, i) {
            return i ? cha : -1500;
        })
        .on("tick", ticked)
        .start();

    var voronoi = d3.geom.voronoi()
        .x(function (d) {
            return d.x;
        })
        .y(function (d) {
            return d.y;
        });

    var root = nodes.shift();

    root.fixed = true;


    d3.select("div.anim canvas").remove();
    var canvas = d3.select("div.anim").append("canvas")
        .attr("width", width)
        .attr("height", height)
        .on("ontouchstart" in document ? "touchmove" : "mousemove", moved);

    var context = canvas.node().getContext("2d");


    function moved() {
        var p1 = d3.mouse(this);
        root.px = p1[0];
        root.py = p1[1];
        force.resume();
    }

    function ticked() {
        var links = voronoi.links(nodes);

        context.clearRect(0, 0, width, height);

        context.beginPath();
        for (var i = 0, n = links.length; i < n; ++i) {
            var link = links[i],
                dx = link.source.x - link.target.x,
                dy = link.source.y - link.target.y;
            if (dx * dx + dy * dy < maxLength2) {
                context.moveTo(link.source.x, link.source.y);
                context.lineTo(link.target.x, link.target.y);
            }
        }
        context.lineWidth = 1;
        context.strokeStyle = "rgba(255,255,255,0.15)";
        context.stroke();

        context.beginPath();
        for (var i = 0, n = nodes.length; i < n; ++i) {
            var node = nodes[i];
            context.moveTo(node.x, node.y);
            context.arc(node.x, node.y, 1, 0, τ);
        }
        context.lineWidth = 1;
        context.strokeStyle = "rgba(255,255,255,0.15)";
        context.stroke();
        context.fillStyle = "rgba(255,255,255,0.15)";
        context.fill();
    }
}
drawFigure();

(function() {
    window.addEventListener("resize", resizeThrottler, false);
    var resizeTimeout;
    function resizeThrottler() {
        // ignore resize events as long as an actualResizeHandler execution is in the queue
        if ( !resizeTimeout ) {
            resizeTimeout = setTimeout(function() {
                resizeTimeout = null;
                drawFigure();
            }, 1000);
        }
    }
}());