

function rotationCamera(mainScene, angle) {
    mainScene.pause = true;
    mainScene.room.enabled = false;
    const group = new TWEEN.Group();
    createRotationAnimationTween(mainScene.wallsA, mainScene.room.obj, group, angle);
    createRotationAnimationTween(mainScene.elementsA, mainScene.room.obj, group, angle);
    createRotationAnimationTween(mainScene.obstaclesA, mainScene.room.obj, group, angle);
    mainScene.room = null;
    const tween = new TWEEN.Tween(mainScene, group).onComplete(function () {
        mainScene.pause = false;
        for (var i = 0; i < mainScene.tweenGA.length; i++) {
            if (mainScene.tweenGA[i] == group)
                mainScene.tweenGA.splice(i, 1);
        }
        group.removeAll();
    });
    tween.to({pause: true}, 110).start();
    mainScene.tweenGA.push(group);
}

function onWindowResize(camera, window, renderer) {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();

    renderer.setSize( window.innerWidth, window.innerHeight );
}

function onKeyPress(key, mainScene) {
    if (key == "a" && mainScene.cat != null) {
        mainScene.catspeed = -50;
      }
    else if (key == "d" && mainScene.cat != null) {
        mainScene.catspeed = 50;
    }
    else if (key == "t") {
        if (mainScene.room && mainScene.room.enabled && mainScene.room.canRotate(mainScene.cat)) {
            rotationCamera(mainScene, -Math.PI / 2);
        }
    }
    else if (key == "y") {
        if (mainScene.room && mainScene.room.enabled && mainScene.room.canRotate(mainScene.cat)) {
            rotationCamera(mainScene, Math.PI / 2);
        }
    }
    else if (key == "p") {
        if (mainScene.pause == true) mainScene.pause = false;
        else mainScene.pause = true;
    }
    else if (key == "w" && mainScene.cat != null) {
        mainScene.cat.playAnimation("jump", false);
    }
    else if (key == "s" && mainScene.cat != null) {
        mainScene.cat.playAnimation("slip", false);
    }
}

 function setControl(document, window, renderer, scene)
{
    document.addEventListener('keypress', (e) => {
        onKeyPress(e.key, scene);
    }, false);
    window.addEventListener( "resize", function() { onWindowResize(scene.camera, window, renderer)}, false );
}