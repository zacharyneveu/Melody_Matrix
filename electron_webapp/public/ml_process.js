var mic, fft;
var nframes;
var frames = [];

export function setup() {
    const session = new onnx.InferenceSession(); 
    await session.loadModel("./genre_classifier.onnx");


    mic = new p5.AudioIn();
    mic.start();
    fft = new p5.FFT();
    fft.setInput(mic);
}

export function accumulate() {
    var frame = fft.analyze();
    if(nframes >= 512) {
        frames.push(frame);
        nframes = 0;
        infer();
    }
    else {
        frames.push(frame);
        nframes += 1;
    }
}

export function infer() {
    const inputTensor = new onnx.Tensor(frames, 'float32');
    const outputMap = await session.run([inputTensor]);
    const outputData = outputMap.values().next().value.data;
    console.log(outputData);
}
