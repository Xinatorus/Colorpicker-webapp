$(document).ready(function() {
	console.log("hello");

	setup();

	colorPicker();
	inputs();
	check();
});

var color = "rgb(255,0,0)";

var hsv = {
	"h": 0,
	"s": 1,
	"v": 1,
}

var mod = 1;
var time = 1000;
var status = 1;

function setup(){
	hsv.h = $(".colorPicker .cursor").attr("value");
	hsv.s = $("#sat .move").attr("value");
	hsv.v = $("#bright .move").attr("value");


	$(".colorPicker .cursor").css({
		"left": 100+100 * Math.cos(hsv.h*Math.PI*2)-15,
		"top": 100+100 * Math.sin(hsv.h*Math.PI*2)-15
	});

	$("#sat .move").css("left",hsv.s*200);
	$("#bright .move").css("left",hsv.v*200);

	$(".log").text(toRgb(HSVtoRGB(hsv.h,hsv.s,hsv.v)));

	$(".pallete div").each(function(){
		$(this).css({"background":$(this).attr("value")});
	});

	setcolors();
}

function colorPicker(){
	var CX = 200 / 2,
		 CY = 200 / 2,
		 sx = CX,
		 sy = CY;


	var py = $(".colorPickerW").position().top;
	var px = $(".colorPickerW").position().left;

	var x;
	var y;

	var deg = 0;


	$("body").mousemove(function(e) {
	    x = e.pageX-px;
	    y = e.pageY-py;
	});

	$(".colorPicker .cursor").draggable({
		containment: "parent",
		start: function( event, ui ){
			clearInterval(checkID);
		},
		drag: function( event, ui ) {
			ui.position.top = CY + sy * Math.sin(Math.atan2(y-CY,x-CX))-15;
			ui.position.left = CX + sx * Math.cos(Math.atan2(y-CY,x-CX))-15;

			hue = Math.atan2(y-CY,x-CX) / (2*Math.PI);
			if(hue<0) hue = hue + 1;
			hsv.h = hue;
			setcolors();

			send(false);
	  	},
		stop: function(event, ui){
			send(true);
			check();
		}
	});

	$("#sat .move").draggable({
		containment: "parent",
		axis: "x",
		start: function( event, ui ){
			clearInterval(checkID);
		},
		drag: function( evt, ui ) {
			hsv.s = ui.position.left/$(this).parent().width();
			$(this).attr("value",hsv.s);
			setcolors();
			send(false);
		},
		stop: function(event, ui){
			send(true);
			check();
		}
	});

	$("#bright .move").draggable({
		containment: "parent",
		axis: "x",
		start: function( event, ui ){
			clearInterval(checkID);
		},
		drag: function( evt, ui ) {
			hsv.v = ui.position.left/$(this).parent().width();
			$(this).attr("value",hsv.v);
			setcolors();
			send(false);
		},
		stop: function(event, ui){
			send(true);
			check();
		}
	});

	$(".pallete div").click(function(){
		col = $(this).attr("value").split("(")[1].split(")")[0].split(",");

		h = rgb2hsv(col[0],col[1],col[2]);

		$(".colorPicker .cursor").attr("value",h.h);
		$("#sat .move").attr("value",h.s);
		$("#bright .move").attr("value",h.v);

		console.log(col,h);
		setup();

		send(true);
	});
}

function HSVtoRGB(h, s, v) {
    var r, g, b, i, f, p, q, t;
    if (arguments.length === 1) {
        s = h.s, v = h.v, h = h.h;
    }
    i = Math.floor(h * 6);
    f = h * 6 - i;
    p = v * (1 - s);
    q = v * (1 - f * s);
    t = v * (1 - (1 - f) * s);
    switch (i % 6) {
        case 0: r = v, g = t, b = p; break;
        case 1: r = q, g = v, b = p; break;
        case 2: r = p, g = v, b = t; break;
        case 3: r = p, g = q, b = v; break;
        case 4: r = t, g = p, b = v; break;
        case 5: r = v, g = p, b = q; break;
    }
    return {
        r: Math.round(r * 255),
        g: Math.round(g * 255),
        b: Math.round(b * 255)
    };
}

function setcolors(){
	$(".colorPicker .color").css({"background": toRgb(HSVtoRGB(hsv.h,hsv.s,hsv.v))});
	$(".colorPicker .cursor").css({"background": toRgb(HSVtoRGB(hsv.h,1,1))});

	$("#sat").css({"background": "linear-gradient(to right,white,"+toRgb(HSVtoRGB(hsv.h,1,1))+")"});
	$("#bright").css({"background": "linear-gradient(to right,black,"+toRgb(HSVtoRGB(hsv.h,hsv.s,1))+")"});

	$("#sat .move").css({"background": toRgb(HSVtoRGB(hsv.h,hsv.s,1))});
	$("#bright .move").css({"background": toRgb(HSVtoRGB(hsv.h,hsv.s,hsv.v))});
}

function inputs(){
	$(".mod").click(function(){
		if($(this).hasClass("selected")) return;
		$(".mod.selected").removeClass("selected");
		mod = $(this).addClass("selected").attr("value");
		console.log(mod);

		send(false);
	});

	$(".time").change(function(){
		time = $(this).val();
		console.log(time);

		send(false);
	});

	$(".onoff").click(function(){
		if($(this).hasClass("active")){
			$(this).removeClass("active");
			status = 0;
		}else{
			$(this).addClass("active");
			status = 1;
		}
		send(false);
	});

}

var sending = false;

function send(force){
	if(force == false)
		if(sending == true) return;

	sending = true;

	$(".log").text("Saving...");
	$.ajax({
		type: "GET",
		cache: false,
		url: "gate.php",
		data: {"data":status+":"+toRgb(HSVtoRGB(hsv.h,hsv.s,hsv.v))+":"+mod+":"+time+"| "+hsv.h+" "+hsv.s+" "+hsv.v+" |"},    // multiple data sent using ajax
		success: function (msg) {
			console.log("ok\n",msg);
			$(".log").text("Saving... Saved!");
			setTimeout(function(){
				$(".log").text(toRgb(HSVtoRGB(hsv.h,hsv.s,hsv.v)));
			},100);
			sending = false;
		},
		error: function(errMsg){console.log(errMsg.responseText);sending = false;}
  });

}

var checkID = 0;

// async load of data.txt - change colors while page is oppened
function check(){
	// checkID = setInterval(function(){
		$.ajax({
			dataType: "json",
			url: "./update.php",
			data: {},
			success: function(msg) {
  				console.log(msg);
				$(".colorPicker .cursor").attr("value",msg.h);
				$("#sat .move").attr("value",msg.s);
				$("#bright .move").attr("value",msg.v);
				setup();
			},
			error: function(errMsg){console.log(errMsg.responseText)}
  		});
		console.log("update");
	// },5000);

}


function toRgb(rgb){
	return "rgb("+rgb.r+","+rgb.g+","+rgb.b+")";
}

function rgb2hsv () {
    var rr, gg, bb,
        r = arguments[0] / 255,
        g = arguments[1] / 255,
        b = arguments[2] / 255,
        h, s,
        v = Math.max(r, g, b),
        diff = v - Math.min(r, g, b),
        diffc = function(c){
            return (v - c) / 6 / diff + 1 / 2;
        };

    if (diff == 0) {
        h = s = 0;
    } else {
        s = diff / v;
        rr = diffc(r);
        gg = diffc(g);
        bb = diffc(b);

        if (r === v) {
            h = bb - gg;
        }else if (g === v) {
            h = (1 / 3) + rr - bb;
        }else if (b === v) {
            h = (2 / 3) + gg - rr;
        }
        if (h < 0) {
            h += 1;
        }else if (h > 1) {
            h -= 1;
        }
    }
    return {
        h: h,
        s: s,
        v: v
    };
}
