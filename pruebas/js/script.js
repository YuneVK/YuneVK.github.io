$(function() {

	var $scene = $('#scene').parallax();
	$scene.parallax('enable');
	$scene.parallax('disable');
	$scene.parallax('updateLayers');
	$scene.parallax('calibrate', false, true);
	$scene.parallax('invert', false, true);
	$scene.parallax('limit', false, 10);
	$scene.parallax('scalar', 1, 2);
	$scene.parallax('friction', 0.2, 0.8);
	$scene.parallax('origin', 0.0, 1.0);




});