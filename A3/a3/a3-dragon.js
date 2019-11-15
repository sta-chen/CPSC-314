/////////////////////////////////////////////////////////////////////////////////////////
//  UBC CPSC 314,  Vsep2019
//  Assignment 3 Template
/////////////////////////////////////////////////////////////////////////////////////////

console.log('hello world');

a=5;
b=2.6;
console.log('a=',a,'b=',b);
myvector = new THREE.Vector3(0,1,2);
console.log('myvector =',myvector);

var animation = true;

var dragonMotion = new Motion(dragonSetMatrices);
var dragonMotion2 = new Motion(dragonSetMatrices2);
var isMatrices1 = true;
var isMatrices2 = false;
var link1, link2, link3, link4, link5, link6, link7, link8, link9, link10, link11, link12, link13, link14, link15,
    link16, link17;
var linkFrame1, linkFrame2, linkFrame3, linkFrame4, linkFrame5, linkFrame6, linkFrame7, linkFrame8, linkFrame9,
    linkFrame10, linkFrame11, linkFrame12, linkFrame13, linkFrame14, linkFrame15, linkFrame16, linkFrame17;
var meshes = {};
var RESOURCES_LOADED = false;

// SETUP RENDERER & SCENE

var canvas = document.getElementById('canvas');
var camera;
var light;
var ambientLight;
var scene = new THREE.Scene();
var renderer = new THREE.WebGLRenderer();
// renderer.setClearColor(0xd0f0d0);     // set background colour
var myTexture = new THREE.TextureLoader().load("./images/IMG_8900.jpg");
// renderer.loadTexture();
canvas.appendChild(renderer.domElement);
scene.background = myTexture;

//////////////////////////////////////////////////////////
//  initCamera():   SETUP CAMERA
//////////////////////////////////////////////////////////

function initCamera() {
    // set up M_proj    (internally:  camera.projectionMatrix )
    var cameraFov = 30;     // initial camera vertical field of view, in degrees
      // view angle, aspect ratio, near, far
    camera = new THREE.PerspectiveCamera(cameraFov,1,0.1,1000);

    var width = 10;  var height = 5;
//    camera = new THREE.OrthographicCamera( width / - 2, width / 2, height / 2, height / - 2, 0.1, 1000 );

    // set up M_view:   (internally:  camera.matrixWorldInverse )
    camera.position.set(0,12,20);
    camera.up = new THREE.Vector3(0,1,0);
    camera.lookAt(0,0,0);
    scene.add(camera);

      // SETUP ORBIT CONTROLS OF THE CAMERA
    var controls = new THREE.OrbitControls(camera);
    controls.damping = 0.2;
    controls.autoRotate = false;
};

// ADAPT TO WINDOW RESIZE
function resize() {
  renderer.setSize(window.innerWidth,window.innerHeight);
  camera.aspect = window.innerWidth/window.innerHeight;
  camera.updateProjectionMatrix();
}

//SCROLLBAR FUNCTION DISABLE
window.onscroll = function () {
     window.scrollTo(0,0);
}

////////////////////////////////////////////////////////////////////////
// init():  setup up scene
////////////////////////////////////////////////////////////////////////

function init() {
    console.log('init called');

    initCamera();
    initMotions();
    initLights();
    initObjects();
    initDragon();

    window.addEventListener('resize',resize);
    resize();
};

////////////////////////////////////////////////////////////////////////
// initMotions():  setup Motion instances for each object that we wish to animate
////////////////////////////////////////////////////////////////////////

function initMotions() { //                                                     x, y, t1

    dragonMotion.addKeyFrame(new Keyframe('wings down', 0.0, [0, 3, 0,-30,30, 0.1, 20]));
    dragonMotion.addKeyFrame(new Keyframe('moves forward', 1.0, [-1, 3.5, -10,0,0, 0, 0]));
    dragonMotion.addKeyFrame(new Keyframe('wings up', 2.0, [-1.5, 4, 0,30,-30, -0.1, -20]));
    dragonMotion.addKeyFrame(new Keyframe('wings up', 3.0, [-2, 4, 0, 0, 0,0.1,0]));
    dragonMotion.addKeyFrame(new Keyframe('moves forward', 4.0, [-2.5, 3.5, 10,-30,30, 0, 0]));
    dragonMotion.addKeyFrame(new Keyframe('moves forward', 5.0, [-3, 3, 0, 0, 0,0,0]));

    dragonMotion2.addKeyFrame(new Keyframe('1', 0.0, [0,5,-4,0,-10,10,0,0.0,0.0,0.0]));
    dragonMotion2.addKeyFrame(new Keyframe('2', 1.0, [-1.5,5,-4,10,0,0,-10,0.03,0.02,0.01]));
    dragonMotion2.addKeyFrame(new Keyframe('3', 2.0, [-2,5,-4,20,10,-10,-20,0.05,0.04,0.02]));
    dragonMotion2.addKeyFrame(new Keyframe('4', 3.0, [-3,5,-4,40,0,0,-10,0.03,0.02,0.01]));
    dragonMotion2.addKeyFrame(new Keyframe('5', 4.0, [-4,5,-4,90,-10,10,0,0.0,0.0,0.0]));
    dragonMotion2.addKeyFrame(new Keyframe('6', 5.0, [-4,5,-3,90,0,0,10,-0.03,-0.02,-0.01]));
    dragonMotion2.addKeyFrame(new Keyframe('7', 6.0, [-4,5,-2,90,10,-10,20,-0.05,-0.04,-0.02]));
    dragonMotion2.addKeyFrame(new Keyframe('8', 7.0, [-4,5,-1,90,0,0,10,-0.03,-0.02,-0.01]));
    dragonMotion2.addKeyFrame(new Keyframe('9', 8.0, [-4,5,0,90,-10,10,0,0.0,0.0,0.0]));
    dragonMotion2.addKeyFrame(new Keyframe('10', 9.0, [-4,5,1,90,0,0,-10,0.03,0.02,0.01]));
    dragonMotion2.addKeyFrame(new Keyframe('11', 10.0, [-4,5,2,90,10,-10,-20,0.05,0.04,0.02]));
    dragonMotion2.addKeyFrame(new Keyframe('12', 11.0, [-4,5,3,120,0,0,-10,0.03,0.02,0.01]));
    dragonMotion2.addKeyFrame(new Keyframe('13', 12.0, [-4,5,4,180,-10,10,0,0.0,0.0,0.0]));
    dragonMotion2.addKeyFrame(new Keyframe('14', 13.0, [-3,5,4,180,0,0,10,-0.03,-0.02,-0.01]));
    dragonMotion2.addKeyFrame(new Keyframe('15', 14.0, [-2,5,4,180,10,-10,20,-0.05,-0.04,-0.02]));
    dragonMotion2.addKeyFrame(new Keyframe('16', 15.0, [-1,5,4,180,0,0,10,-0.03,-0.02,-0.01]));

    dragonMotion2.addKeyFrame(new Keyframe('17', 16.0, [0,5,4,180,-10,10,0,0.0,0.0,0.0]));
    dragonMotion2.addKeyFrame(new Keyframe('18', 17.0, [1,5,4,180,0,0,-10,0.03,0.02,0.01]));
    dragonMotion2.addKeyFrame(new Keyframe('19', 18.0, [2,5,4,180,10,-10,-20,0.05,0.04,0.02]));
    dragonMotion2.addKeyFrame(new Keyframe('20', 19.0, [3,5,4,210,0,0,-10,0.03,0.02,0.01]));
    dragonMotion2.addKeyFrame(new Keyframe('21', 20.0, [4,5,3,270,-10,10,0,0.0,0.0,0.0]));
    dragonMotion2.addKeyFrame(new Keyframe('22', 21.0, [4,5,2,270,0,0,10,-0.03,-0.02,-0.01]));
    dragonMotion2.addKeyFrame(new Keyframe('23', 22.0, [4,5,1,270,10,-10,20,-0.05,-0.04,-0.02]));
    dragonMotion2.addKeyFrame(new Keyframe('24', 23.0, [4,5,0,270,0,0,10,-0.03,-0.02,-0.01]));

    dragonMotion2.addKeyFrame(new Keyframe('25', 24.0, [4,5,-1,270,-10,10,0,0.0,0.0,0.0]));
    dragonMotion2.addKeyFrame(new Keyframe('26', 25.0, [4,5,-2,270,0,0,-10,0.03,0.02,0.01]));
    dragonMotion2.addKeyFrame(new Keyframe('27', 26.0, [4,5,-3,300,10,-10,-20,0.05,0.04,0.02]));
    dragonMotion2.addKeyFrame(new Keyframe('28', 27.0, [4,5,-4,360,0,0,-10,0.03,0.02,0.01]));
    dragonMotion2.addKeyFrame(new Keyframe('29', 28.0, [3,5,-4,360,-10,10,0,0.0,0.0,0.0]));
    dragonMotion2.addKeyFrame(new Keyframe('30', 29.0, [2,5,-4,360,0,0,10,-0.03,-0.02,-0.01]));
    dragonMotion2.addKeyFrame(new Keyframe('31', 30.0, [1,5,-4,360,10,-10,20,-0.05,-0.04,-0.02]));
    dragonMotion2.addKeyFrame(new Keyframe('32', 31.0, [0,5,-4,360,0,0,10,-0.03,-0.02,-0.01]));



}


///////////////////////////////////////////////////////////////////////////////////////
// dragonSetMatrices(avars)
///////////////////////////////////////////////////////////////////////////////////////

// todo
function dragonSetMatrices(avars) {
    var deg2rad = Math.PI/180;
    var xPosition = avars[0];
    var yPosition = avars[1];
    var theta1 = avars[2]*deg2rad; // body angle
    var theta2 = avars[3]*deg2rad;
    var theta3 = avars[4]*deg2rad;
    var y1 = avars[5];
    var theta5 = avars[6]*deg2rad;

    // link1 green body
    linkFrame1.matrix.identity();
    linkFrame1.matrix.multiply(new THREE.Matrix4().makeTranslation(xPosition, yPosition, 0));
    linkFrame1.matrix.multiply(new THREE.Matrix4().makeRotationZ(theta1));
    link1.matrix.copy(linkFrame1.matrix);
    link1.matrix.multiply(new THREE.Matrix4().makeTranslation(0, 0, 0));
    link1.matrix.multiply(new THREE.Matrix4().makeScale(2,1,1));
    // link2 left arm
    linkFrame2.matrix.copy(linkFrame1.matrix);
    linkFrame2.matrix.multiply(new THREE.Matrix4().makeTranslation(0,0,0.6));
    linkFrame2.matrix.multiply(new THREE.Matrix4().makeRotationZ(theta2));
    link2.matrix.copy(linkFrame2.matrix);
    link2.matrix.multiply(new THREE.Matrix4().makeTranslation(0,0,0));
    link2.matrix.multiply(new THREE.Matrix4().makeScale(0.5,0.5,0.2));
    // link 3 right arm
    linkFrame3.matrix.copy(linkFrame1.matrix);
    linkFrame3.matrix.multiply(new THREE.Matrix4().makeTranslation(0,0,-0.6));
    linkFrame3.matrix.multiply(new THREE.Matrix4().makeRotationZ(-theta3));
    link3.matrix.copy(linkFrame3.matrix);
    link3.matrix.multiply(new THREE.Matrix4().makeTranslation(0,0,0));
    link3.matrix.multiply(new THREE.Matrix4().makeScale(0.5,0.5,0.2));
    // link4 left wings
    linkFrame4.matrix.copy(linkFrame2.matrix);
    linkFrame4.matrix.multiply(new THREE.Matrix4().makeRotationX(theta2));
    link4.matrix.copy(linkFrame4.matrix);
    link4.matrix.multiply(new THREE.Matrix4().makeTranslation(0,0,0));
    link4.matrix.multiply(new THREE.Matrix4().makeRotationX(90*deg2rad));
    link4.matrix.multiply(new THREE.Matrix4().makeScale(0.1,0.1,0.1));
    // link5 right wings
    linkFrame5.matrix.copy(linkFrame3.matrix);
    linkFrame5.matrix.multiply(new THREE.Matrix4().makeRotationX(theta3));
    link5.matrix.copy(linkFrame5.matrix);
    link5.matrix.multiply(new THREE.Matrix4().makeTranslation(0,0,0));
    link5.matrix.multiply(new THREE.Matrix4().makeRotationX(-90*deg2rad));
    link5.matrix.multiply(new THREE.Matrix4().makeScale(0.1,0.1,0.1));
    // link6 neck1 linked to link1
    linkFrame6.matrix.copy(linkFrame1.matrix);
    linkFrame6.matrix.multiply(new THREE.Matrix4().makeTranslation(-1.05, y1, 0));
    link6.matrix.copy(linkFrame6.matrix);
    link6.matrix.multiply(new THREE.Matrix4().makeTranslation(0,0,0));
    link6.matrix.multiply(new THREE.Matrix4().makeScale(0.1,0.4,0.2));
    // link7 neck2 linked to link6
    linkFrame7.matrix.copy(linkFrame6.matrix);
    linkFrame7.matrix.multiply(new THREE.Matrix4().makeTranslation(-0.1, 0, 0));
    link7.matrix.copy(linkFrame7.matrix);
    link7.matrix.multiply(new THREE.Matrix4().makeTranslation(0,0,0));
    link7.matrix.multiply(new THREE.Matrix4().makeScale(0.1,0.3,0.2));
    // link8 neck3 linked to link7
    linkFrame8.matrix.copy(linkFrame7.matrix);
    linkFrame8.matrix.multiply(new THREE.Matrix4().makeTranslation(-0.1, 0, 0));
    link8.matrix.copy(linkFrame8.matrix);
    link8.matrix.multiply(new THREE.Matrix4().makeTranslation(0,0,0));
    link8.matrix.multiply(new THREE.Matrix4().makeScale(0.1,0.2,0.2));
    // link9 head linked to link8
    linkFrame9.matrix.copy(linkFrame8.matrix);
    linkFrame9.matrix.multiply(new THREE.Matrix4().makeTranslation(-0.4,0,0));
    linkFrame9.matrix.multiply(new THREE.Matrix4().makeRotationZ(theta5));
    link9.matrix.copy(linkFrame9.matrix);
    link9.matrix.multiply(new THREE.Matrix4().makeTranslation(0,0,0));
    link9.matrix.multiply(new THREE.Matrix4().makeScale(0.4,0.3,0.3));
    // link10 tail1 linked to link1
    linkFrame10.matrix.copy(linkFrame1.matrix);
    linkFrame10.matrix.multiply(new THREE.Matrix4().makeTranslation(1.1, 0, 0));
    link10.matrix.copy(linkFrame10.matrix);
    link10.matrix.multiply(new THREE.Matrix4().makeTranslation(0,0,0));
    link10.matrix.multiply(new THREE.Matrix4().makeScale(0.2,0.2,0.2));
    // link11 tail2 linked to link10
    linkFrame11.matrix.copy(linkFrame10.matrix);
    linkFrame11.matrix.multiply(new THREE.Matrix4().makeTranslation(0.17, 0, 0));
    link11.matrix.copy(linkFrame11.matrix);
    link11.matrix.multiply(new THREE.Matrix4().makeTranslation(0,0,0));
    link11.matrix.multiply(new THREE.Matrix4().makeScale(0.15,0.15,0.15));
    // link12 tail3 linked to link11 0.15/2 = 0.075
    linkFrame12.matrix.copy(linkFrame11.matrix);
    linkFrame12.matrix.multiply(new THREE.Matrix4().makeTranslation(0.12, 0, 0));
    link12.matrix.copy(linkFrame12.matrix);
    link12.matrix.multiply(new THREE.Matrix4().makeTranslation(0,0,0));
    link12.matrix.multiply(new THREE.Matrix4().makeScale(0.1,0.1,0.1));
    // link13 tail4 linked to link12
    linkFrame13.matrix.copy(linkFrame12.matrix);
    linkFrame13.matrix.multiply(new THREE.Matrix4().makeTranslation(0.09,0,0));
    link13.matrix.copy(linkFrame13.matrix);
    link13.matrix.multiply(new THREE.Matrix4().makeTranslation(0,0,0));
    link13.matrix.multiply(new THREE.Matrix4().makeScale(0.08, 0.08, 0.08));
    // link14 left thigh linked to link1
    linkFrame14.matrix.copy(linkFrame1.matrix);
    linkFrame14.matrix.multiply(new THREE.Matrix4().makeTranslation(0,-0.5,0.25));
    link14.matrix.copy(linkFrame14.matrix);
    link14.matrix.multiply(new THREE.Matrix4().makeScale(0.1,0.3,0.1));
    // link15 right thigh linked to link1
    linkFrame15.matrix.copy(linkFrame1.matrix);
    linkFrame15.matrix.multiply(new THREE.Matrix4().makeTranslation(0,-0.5,-0.25));
    link15.matrix.copy(linkFrame15.matrix);
    link15.matrix.multiply(new THREE.Matrix4().makeScale(0.1,0.3,0.1));
    // link16 left foot linked to link14
    linkFrame16.matrix.copy(linkFrame14.matrix);
    linkFrame16.matrix.multiply(new THREE.Matrix4().makeTranslation(0,-0.3,0));
    link16.matrix.copy(linkFrame16.matrix);
    // link16.matrix.multiply(new THREE.Matrix4().makeRotationZ(-30*deg2rad));
    link16.matrix.multiply(new THREE.Matrix4().makeScale(0.1,0.3,0.1));
    // link17 right foot linked to link15
    linkFrame17.matrix.copy(linkFrame15.matrix);
    linkFrame17.matrix.multiply(new THREE.Matrix4().makeTranslation(0,-0.3,0));
    link17.matrix.copy(linkFrame17.matrix);
    // link16.matrix.multiply(new THREE.Matrix4().makeRotationZ(-30*deg2rad));
    link17.matrix.multiply(new THREE.Matrix4().makeScale(0.1,0.3,0.1));

    link1.updateMatrixWorld();
    link2.updateMatrixWorld();
    link3.updateMatrixWorld();
    link4.updateMatrixWorld();
    link5.updateMatrixWorld();
    link6.updateMatrixWorld();
    link7.updateMatrixWorld();
    link8.updateMatrixWorld();
    link9.updateMatrixWorld();
    link10.updateMatrixWorld();
    link11.updateMatrixWorld();
    link12.updateMatrixWorld();
    link13.updateMatrixWorld();
    link14.updateMatrixWorld();
    link15.updateMatrixWorld();
    link16.updateMatrixWorld();
    link17.updateMatrixWorld();

    linkFrame1.updateMatrixWorld();
    linkFrame2.updateMatrixWorld();
    linkFrame3.updateMatrixWorld();
    linkFrame4.updateMatrixWorld();
    linkFrame5.updateMatrixWorld();
    linkFrame6.updateMatrixWorld();
    linkFrame7.updateMatrixWorld();
    linkFrame8.updateMatrixWorld();
    linkFrame9.updateMatrixWorld();
    linkFrame10.updateMatrixWorld();
    linkFrame11.updateMatrixWorld();
    linkFrame12.updateMatrixWorld();
    linkFrame13.updateMatrixWorld();
    linkFrame14.updateMatrixWorld();
    linkFrame15.updateMatrixWorld();
    linkFrame16.updateMatrixWorld();
    linkFrame17.updateMatrixWorld();
}

function dragonSetMatrices2(avars) {
    var deg2rad = Math.PI/180;
    var xPosition = avars[0];
    var yPosition = avars[1];
    var zPosition = avars[2];
    var theta1 = avars[3]*deg2rad; // flying direction
    var theta2 = avars[4]*deg2rad;
    var theta3 = avars[5]*deg2rad;
    var theta5 = avars[6]*deg2rad;

    var z2 = avars[7];
    var z3 = avars[8];
    var z4 = avars[9];
    // could change direction
    // link1 green body
    linkFrame1.matrix.identity();
    linkFrame1.matrix.multiply(new THREE.Matrix4().makeTranslation(xPosition, yPosition, zPosition));
    linkFrame1.matrix.multiply(new THREE.Matrix4().makeRotationY(theta1));
    link1.matrix.copy(linkFrame1.matrix);
    link1.matrix.multiply(new THREE.Matrix4().makeTranslation(0, 0, 0));
    link1.matrix.multiply(new THREE.Matrix4().makeScale(2,1,1));
    // link2 left arm
    linkFrame2.matrix.copy(linkFrame1.matrix);
    linkFrame2.matrix.multiply(new THREE.Matrix4().makeTranslation(0,0,0.6));
    linkFrame2.matrix.multiply(new THREE.Matrix4().makeRotationZ(theta2));
    link2.matrix.copy(linkFrame2.matrix);
    link2.matrix.multiply(new THREE.Matrix4().makeTranslation(0,0,0));
    link2.matrix.multiply(new THREE.Matrix4().makeScale(0.5,0.5,0.2));
    // link 3 right arm
    linkFrame3.matrix.copy(linkFrame1.matrix);
    linkFrame3.matrix.multiply(new THREE.Matrix4().makeTranslation(0,0,-0.6));
    linkFrame3.matrix.multiply(new THREE.Matrix4().makeRotationZ(-theta3));
    link3.matrix.copy(linkFrame3.matrix);
    link3.matrix.multiply(new THREE.Matrix4().makeTranslation(0,0,0));
    link3.matrix.multiply(new THREE.Matrix4().makeScale(0.5,0.5,0.2));
    // link4 left wings
    linkFrame4.matrix.copy(linkFrame2.matrix);
    linkFrame4.matrix.multiply(new THREE.Matrix4().makeRotationX(theta2));
    link4.matrix.copy(linkFrame4.matrix);
    link4.matrix.multiply(new THREE.Matrix4().makeTranslation(0,0,0));
    link4.matrix.multiply(new THREE.Matrix4().makeRotationX(90*deg2rad));
    link4.matrix.multiply(new THREE.Matrix4().makeScale(0.1,0.1,0.1));
    // link5 right wings
    linkFrame5.matrix.copy(linkFrame3.matrix);
    linkFrame5.matrix.multiply(new THREE.Matrix4().makeRotationX(theta3));
    link5.matrix.copy(linkFrame5.matrix);
    link5.matrix.multiply(new THREE.Matrix4().makeTranslation(0,0,0));
    link5.matrix.multiply(new THREE.Matrix4().makeRotationX(-90*deg2rad));
    link5.matrix.multiply(new THREE.Matrix4().makeScale(0.1,0.1,0.1));
    // link6 neck1 linked to link1
    linkFrame6.matrix.copy(linkFrame1.matrix);
    linkFrame6.matrix.multiply(new THREE.Matrix4().makeTranslation(-1.05, 0, 0));
    link6.matrix.copy(linkFrame6.matrix);
    link6.matrix.multiply(new THREE.Matrix4().makeTranslation(0,0,0));
    link6.matrix.multiply(new THREE.Matrix4().makeScale(0.1,0.4,0.2));
    // link7 neck2 linked to link6
    linkFrame7.matrix.copy(linkFrame6.matrix);
    linkFrame7.matrix.multiply(new THREE.Matrix4().makeTranslation(-0.1, 0, 0));
    link7.matrix.copy(linkFrame7.matrix);
    link7.matrix.multiply(new THREE.Matrix4().makeTranslation(0,0,0));
    link7.matrix.multiply(new THREE.Matrix4().makeScale(0.1,0.3,0.2));
    // link8 neck3 linked to link7
    linkFrame8.matrix.copy(linkFrame7.matrix);
    linkFrame8.matrix.multiply(new THREE.Matrix4().makeTranslation(-0.1, 0, 0));
    link8.matrix.copy(linkFrame8.matrix);
    link8.matrix.multiply(new THREE.Matrix4().makeTranslation(0,0,0));
    link8.matrix.multiply(new THREE.Matrix4().makeScale(0.1,0.2,0.2));
    // link9 head linked to link8
    linkFrame9.matrix.copy(linkFrame8.matrix);
    linkFrame9.matrix.multiply(new THREE.Matrix4().makeTranslation(-0.4,0,0));
    // linkFrame9.matrix.multiply(new THREE.Matrix4().makeRotationZ(theta5));
    link9.matrix.copy(linkFrame9.matrix);
    link9.matrix.multiply(new THREE.Matrix4().makeTranslation(0,0,0));
    link9.matrix.multiply(new THREE.Matrix4().makeScale(0.4,0.3,0.3));
    // link10 tail1 linked to link1
    linkFrame10.matrix.copy(linkFrame1.matrix);
    linkFrame10.matrix.multiply(new THREE.Matrix4().makeTranslation(1.1, 0, 0));
    linkFrame10.matrix.multiply(new THREE.Matrix4().makeRotationY(theta5));
    link10.matrix.copy(linkFrame10.matrix);
    link10.matrix.multiply(new THREE.Matrix4().makeTranslation(0,0,0));
    link10.matrix.multiply(new THREE.Matrix4().makeScale(0.2,0.2,0.2));
    // link11 tail2 linked to link10
    linkFrame11.matrix.copy(linkFrame10.matrix);
    linkFrame11.matrix.multiply(new THREE.Matrix4().makeTranslation(0.17, 0, z2));
    link11.matrix.copy(linkFrame11.matrix);
    link11.matrix.multiply(new THREE.Matrix4().makeTranslation(0,0,0));
    link11.matrix.multiply(new THREE.Matrix4().makeScale(0.15,0.15,0.15));
    // link12 tail3 linked to link11 0.15/2 = 0.075
    linkFrame12.matrix.copy(linkFrame11.matrix);
    linkFrame12.matrix.multiply(new THREE.Matrix4().makeTranslation(0.12, 0, z3));
    link12.matrix.copy(linkFrame12.matrix);
    link12.matrix.multiply(new THREE.Matrix4().makeTranslation(0,0,0));
    link12.matrix.multiply(new THREE.Matrix4().makeScale(0.1,0.1,0.1));
    // link13 tail4 linked to link12
    linkFrame13.matrix.copy(linkFrame12.matrix);
    linkFrame13.matrix.multiply(new THREE.Matrix4().makeTranslation(0.09,0,z4));
    link13.matrix.copy(linkFrame13.matrix);
    link13.matrix.multiply(new THREE.Matrix4().makeTranslation(0,0,0));
    link13.matrix.multiply(new THREE.Matrix4().makeScale(0.08, 0.08, 0.08));
    // link14 left thigh linked to link1
    linkFrame14.matrix.copy(linkFrame1.matrix);
    linkFrame14.matrix.multiply(new THREE.Matrix4().makeTranslation(0,-0.5,0.25));
    link14.matrix.copy(linkFrame14.matrix);
    link14.matrix.multiply(new THREE.Matrix4().makeScale(0.1,0.3,0.1));
    // link15 right thigh linked to link1
    linkFrame15.matrix.copy(linkFrame1.matrix);
    linkFrame15.matrix.multiply(new THREE.Matrix4().makeTranslation(0,-0.5,-0.25));
    link15.matrix.copy(linkFrame15.matrix);
    link15.matrix.multiply(new THREE.Matrix4().makeScale(0.1,0.3,0.1));
    // link16 left foot linked to link14
    linkFrame16.matrix.copy(linkFrame14.matrix);
    linkFrame16.matrix.multiply(new THREE.Matrix4().makeTranslation(0,-0.3,0));
    link16.matrix.copy(linkFrame16.matrix);
    // link16.matrix.multiply(new THREE.Matrix4().makeRotationZ(-30*deg2rad));
    link16.matrix.multiply(new THREE.Matrix4().makeScale(0.1,0.3,0.1));
    // link17 right foot linked to link15
    linkFrame17.matrix.copy(linkFrame15.matrix);
    linkFrame17.matrix.multiply(new THREE.Matrix4().makeTranslation(0,-0.3,0));
    link17.matrix.copy(linkFrame17.matrix);
    // link16.matrix.multiply(new THREE.Matrix4().makeRotationZ(-30*deg2rad));
    link17.matrix.multiply(new THREE.Matrix4().makeScale(0.1,0.3,0.1));

    link1.updateMatrixWorld();
    link2.updateMatrixWorld();
    link3.updateMatrixWorld();
    link4.updateMatrixWorld();
    link5.updateMatrixWorld();
    link6.updateMatrixWorld();
    link7.updateMatrixWorld();
    link8.updateMatrixWorld();
    link9.updateMatrixWorld();
    link10.updateMatrixWorld();
    link11.updateMatrixWorld();
    link12.updateMatrixWorld();
    link13.updateMatrixWorld();
    link14.updateMatrixWorld();
    link15.updateMatrixWorld();
    link16.updateMatrixWorld();
    link17.updateMatrixWorld();

    linkFrame1.updateMatrixWorld();
    linkFrame2.updateMatrixWorld();
    linkFrame3.updateMatrixWorld();
    linkFrame4.updateMatrixWorld();
    linkFrame5.updateMatrixWorld();
    linkFrame6.updateMatrixWorld();
    linkFrame7.updateMatrixWorld();
    linkFrame8.updateMatrixWorld();
    linkFrame9.updateMatrixWorld();
    linkFrame10.updateMatrixWorld();
    linkFrame11.updateMatrixWorld();
    linkFrame12.updateMatrixWorld();
    linkFrame13.updateMatrixWorld();
    linkFrame14.updateMatrixWorld();
    linkFrame15.updateMatrixWorld();
    linkFrame16.updateMatrixWorld();
    linkFrame17.updateMatrixWorld();
}

/////////////////////////////////////
// initLights():  SETUP LIGHTS
/////////////////////////////////////

function initLights() {
    light = new THREE.PointLight(0xffffff);
    light.position.set(0,4,2);
    scene.add(light);
    ambientLight = new THREE.AmbientLight(0x606060);
    scene.add(ambientLight);
}

/////////////////////////////////////
// MATERIALS
/////////////////////////////////////

var diffuseMaterial = new THREE.MeshLambertMaterial( {color: 0xffffff} );
var diffuseMaterial2 = new THREE.MeshLambertMaterial( {color: 0xffffff, side: THREE.DoubleSide } );
var basicMaterial = new THREE.MeshBasicMaterial( {color: 0xff0000} );
var armadilloMaterial = new THREE.MeshBasicMaterial( {color: 0x7fff7f} );

/////////////////////////////////////
// initObjects():  setup objects in the scene
/////////////////////////////////////

function initObjects() {
    worldFrame = new THREE.AxesHelper(5) ;
    scene.add(worldFrame);

    // textured floor
    floorTexture = new THREE.TextureLoader().load('images/floor.jpg');
    floorTexture.wrapS = floorTexture.wrapT = THREE.RepeatWrapping;
    floorTexture.repeat.set(1, 1);
    floorMaterial = new THREE.MeshBasicMaterial({ map: floorTexture, side: THREE.DoubleSide });
    floorGeometry = new THREE.PlaneBufferGeometry(15, 15);
    floor = new THREE.Mesh(floorGeometry, floorMaterial);
    floor.position.y = -1.1;
    floor.rotation.x = Math.PI / 2;
    // scene.add(floor);

    // sphere, located at light position
    sphereGeometry = new THREE.SphereGeometry(0.3, 32, 32);    // radius, segments, segments
    sphere = new THREE.Mesh(sphereGeometry, basicMaterial);
    sphere.position.set(0,4,2);
    sphere.position.set(light.position.x, light.position.y, light.position.z);
    scene.add(sphere);

}

/////////////////////////////////////////////////////////////////////////////////////
//  initDragon():  define all geometry associated with the dragon
/////////////////////////////////////////////////////////////////////////////////////
// todo
function initDragon() {
    dragonGreenMaterial = new THREE.MeshLambertMaterial({color: 0x5da683}); // green
    dragonLightGreenMaterial = new THREE.MeshLambertMaterial({color: 0x81e6b5}); // light green
    dragonYellowMaterial = new THREE.MeshLambertMaterial({color: 0xfdde8c, side: THREE.DoubleSide}); // yellow
    boxGeometry = new THREE.BoxGeometry(1, 1, 1);
    sphereGeometry = new THREE.SphereGeometry(1, 32, 32);
    // reference: https://threejs.org/docs/#api/en/geometries/ShapeGeometry
    var x = 5, y = 19;
    heartShape = new THREE.Shape();
    heartShape.moveTo( x - 5, y - 5 );
    heartShape.bezierCurveTo( x - 5, y - 5, x - 4, y, x, y );
    heartShape.bezierCurveTo( x + 6, y, x + 6, y - 7,x + 6, y - 7 );
    heartShape.bezierCurveTo( x + 6, y - 11, x + 3, y - 15.4, x - 5, y - 19 );
    heartShape.bezierCurveTo( x - 12, y - 15.4, x - 16, y - 11, x - 16, y - 7 );
    heartShape.bezierCurveTo( x - 16, y - 7, x - 16, y, x - 10, y );
    heartShape.bezierCurveTo( x - 7, y, x - 5, y - 5, x - 5, y - 5 );

    heartGeometry = new THREE.ShapeGeometry( heartShape );
    // link1 = body
    link1 = new THREE.Mesh(boxGeometry, dragonGreenMaterial);
    scene.add(link1);
    linkFrame1 = new THREE.AxesHelper(1);
    scene.add(linkFrame1);
    // link2 = left arm
    link2 = new THREE.Mesh(boxGeometry, dragonYellowMaterial);
    scene.add(link2);
    linkFrame2 = new THREE.AxesHelper(1);
    scene.add(linkFrame2);
    // link3 = right arm
    link3 = new THREE.Mesh(boxGeometry, dragonYellowMaterial);
    scene.add(link3);
    linkFrame3 = new THREE.AxesHelper(1);
    scene.add(linkFrame3);
    // link4 = left wing
    link4 = new THREE.Mesh(heartGeometry, dragonYellowMaterial);
    scene.add(link4);
    linkFrame4 = new THREE.AxesHelper(1);
    scene.add(linkFrame4);
    // link5 = right wing
    link5 = new THREE.Mesh(heartGeometry, dragonYellowMaterial);
    scene.add(link5);
    linkFrame5 = new THREE.AxesHelper(1);
    scene.add(linkFrame5);
    // link6 = neck1
    link6 = new THREE.Mesh(boxGeometry, dragonGreenMaterial);
    scene.add(link6);
    linkFrame6 = new THREE.AxesHelper(1);
    scene.add(linkFrame6);
    // link7 = neck2
    link7 = new THREE.Mesh(boxGeometry, dragonLightGreenMaterial);
    scene.add(link7);
    linkFrame7 = new THREE.AxesHelper(1);
    scene.add(linkFrame7);
    // link8 = neck3
    link8 = new THREE.Mesh(boxGeometry, dragonGreenMaterial);
    scene.add(link8);
    linkFrame8 = new THREE.AxesHelper(1);
    scene.add(linkFrame8);
    // link9 = head
    link9 = new THREE.Mesh(sphereGeometry, dragonLightGreenMaterial);
    scene.add(link9);
    linkFrame9 = new THREE.AxesHelper(1);
    scene.add(linkFrame9);
    // link10 = tail1
    link10 = new THREE.Mesh(boxGeometry, dragonGreenMaterial);
    scene.add(link10);
    linkFrame10 = new THREE.AxesHelper(1);
    scene.add(linkFrame10);
    // link11 = tail2
    link11 = new THREE.Mesh(boxGeometry, dragonLightGreenMaterial);
    scene.add(link11);
    linkFrame11 = new THREE.AxesHelper(1);
    scene.add(linkFrame11);
    // link12 = tail3
    link12 = new THREE.Mesh(boxGeometry, dragonGreenMaterial);
    scene.add(link12);
    linkFrame12 = new THREE.AxesHelper(1);
    scene.add(linkFrame12);
    // link13 = tail4
    link13 = new THREE.Mesh(boxGeometry, dragonLightGreenMaterial);
    scene.add(link13);
    linkFrame13 = new THREE.AxesHelper(1);
    scene.add(linkFrame13);
    // link14 = left thigh
    link14 = new THREE.Mesh(boxGeometry, dragonLightGreenMaterial);
    scene.add(link14);
    linkFrame14 = new THREE.AxesHelper(1);
    scene.add(linkFrame14);
    // link15 = right thigh
    link15 = new THREE.Mesh(boxGeometry, dragonLightGreenMaterial);
    scene.add(link15);
    linkFrame15 = new THREE.AxesHelper(1);
    scene.add(linkFrame15);
    // link16 = left foot
    link16 = new THREE.Mesh(boxGeometry, dragonGreenMaterial);
    scene.add(link16);
    linkFrame16 = new THREE.AxesHelper(1);
    scene.add(linkFrame16);
    // link17 = right foot
    link17 = new THREE.Mesh(boxGeometry, dragonGreenMaterial);
    scene.add(link17);
    linkFrame17 = new THREE.AxesHelper(1);
    scene.add(linkFrame17);

    link1.matrixAutoUpdate = false;
    link2.matrixAutoUpdate = false;
    link3.matrixAutoUpdate = false;
    link4.matrixAutoUpdate = false;
    link5.matrixAutoUpdate = false;
    link6.matrixAutoUpdate = false;
    link7.matrixAutoUpdate = false;
    link8.matrixAutoUpdate = false;
    link9.matrixAutoUpdate = false;
    link10.matrixAutoUpdate = false;
    link11.matrixAutoUpdate = false;
    link12.matrixAutoUpdate = false;
    link13.matrixAutoUpdate = false;
    link14.matrixAutoUpdate = false;
    link15.matrixAutoUpdate = false;
    link16.matrixAutoUpdate = false;
    link17.matrixAutoUpdate = false;

    linkFrame1.matrixAutoUpdate = false;
    linkFrame2.matrixAutoUpdate = false;
    linkFrame3.matrixAutoUpdate = false;
    linkFrame4.matrixAutoUpdate = false;
    linkFrame5.matrixAutoUpdate = false;
    linkFrame6.matrixAutoUpdate = false;
    linkFrame7.matrixAutoUpdate = false;
    linkFrame8.matrixAutoUpdate = false;
    linkFrame9.matrixAutoUpdate = false;
    linkFrame10.matrixAutoUpdate = false;
    linkFrame11.matrixAutoUpdate = false;
    linkFrame12.matrixAutoUpdate = false;
    linkFrame13.matrixAutoUpdate = false;
    linkFrame14.matrixAutoUpdate = false;
    linkFrame15.matrixAutoUpdate = false;
    linkFrame16.matrixAutoUpdate = false;
    linkFrame17.matrixAutoUpdate = false;
}


/////////////////////////////////////////////////////////////////////////////////////
//  create customShader material
/////////////////////////////////////////////////////////////////////////////////////

var customShaderMaterial = new THREE.ShaderMaterial( {
//        uniforms: { textureSampler: {type: 't', value: floorTexture}},
	vertexShader: document.getElementById( 'customVertexShader' ).textContent,
	fragmentShader: document.getElementById( 'customFragmentShader' ).textContent
} );

var ctx = renderer.context;
ctx.getShaderInfoLog = function () { return '' };   // stops shader warnings, seen in some browsers





///////////////////////////////////////////////////////////////////////////////////////
// LISTEN TO KEYBOARD
///////////////////////////////////////////////////////////////////////////////////////

var keyboard = new THREEx.KeyboardState();
function checkKeyboard() {
  if (keyboard.pressed("W"))
    light.position.y += 0.1;
  else if (keyboard.pressed("S"))
    light.position.y -= 0.1;
  else if (keyboard.pressed("A"))
    light.position.x -= 0.1;
  else if (keyboard.pressed("D"))
    light.position.x += 0.1;
  else if (keyboard.pressed(" "))
    animation = !animation;
  else if (keyboard.pressed("X")) {
      isMatrices1 = false;
      isMatrices2 = true;
  } else if (keyboard.pressed("Y")) {
      isMatrices1 = true;
      isMatrices2 = false;
  } else if (keyboard.pressed("R")) {
      dragonMotion2.currTime+=0.5;
  } else if (keyboard.pressed("O")) {
      dragonMotion2.reset();
  }


}

///////////////////////////////////////////////////////////////////////////////////////
// UPDATE CALLBACK:    This is the main animation loop
///////////////////////////////////////////////////////////////////////////////////////

function update() {
    var dt=0.02;
    checkKeyboard();
    if (animation) {
	  // advance the motion of all the animated objects
        if (isMatrices1) {
            dragonMotion.timestep(dt);
        } else if (isMatrices2) {
            dragonMotion2.timestep(dt);
        }
    }

    sphere.position.set(light.position.x, light.position.y, light.position.z);
    requestAnimationFrame(update);      // requests the next update call;  this creates a loop
    renderer.render(scene, camera);
}

init();
update();
