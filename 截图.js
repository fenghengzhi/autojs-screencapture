if (!requestScreenCapture()) {
    toast('请求截图失败');
    exit();
}
function slp(ms) {
    return new Promise(function (resolve) { setTimeout(resolve, ms) });
}
function delay(ms) {
    const cont = continuation.create();
    setTimeout(function () { cont.resume() }, ms);
    cont.await();
}
function createFloat() {
    const w = floaty.window(
        <frame><button id="capture" text="截图" /></frame>
    );
    w.capture.click(function () {
        threads.start(function () {
            Promise.resolve()
                .then(function () { w.close() })
                .then(function () { return slp(2000) })
                .then(function () {
                    const img = captureScreen();
                    images.saveImage(img, '/sdcard/screenshots/' + new Date().toLocaleString() + '.png');
                })
                .then(function () { return slp(2000) })
                .then(function () { createFloat() });
        });

    });
    w.capture.longClick(function () { exit() });
}

createFloat();

setInterval(function () { }, 1000);
