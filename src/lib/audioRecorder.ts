interface AudioRecorder {
  streamBeingCaptured: MediaStream | null;
  mediaRecorder: MediaRecorder | null;
  audioBlobs: Array<Blob>;
  start(): Promise<void>;
  stop(): Promise<Blob>;
  cancel(): void;
  stopStream(): void;
  resetRecordingProperties(): void;
}

const audioRecorder: AudioRecorder = {
  streamBeingCaptured: null,
  mediaRecorder: null,
  audioBlobs: [],
  async start() {
    if (!(navigator.mediaDevices && navigator.mediaDevices.getUserMedia)) {
      return Promise.reject(
        new Error(
          "mediaDevices API or getUserMedia method is not supported in this browser."
        )
      );
    } else {
      return navigator.mediaDevices
        .getUserMedia({ audio: true })
        .then((stream) => {
          audioRecorder.streamBeingCaptured = stream;
          audioRecorder.mediaRecorder = new MediaRecorder(stream);
          audioRecorder.mediaRecorder.addEventListener(
            "dataavailable",
            (event) => {
              audioRecorder.audioBlobs.push(event.data);
            }
          );
          audioRecorder.mediaRecorder.start();
        });
    }
  },
  stop() {
    return new Promise((resolve) => {
      if (audioRecorder.mediaRecorder) {
        const mimType = audioRecorder.mediaRecorder.mimeType;
        audioRecorder.mediaRecorder.addEventListener("stop", () => {
          const audioBlob = new Blob(audioRecorder.audioBlobs, {
            type: mimType,
          });
          resolve(audioBlob);
        });

        audioRecorder.cancel();
      }
    });
  },
  stopStream() {
    if (audioRecorder.streamBeingCaptured) {
      audioRecorder.streamBeingCaptured
        .getTracks()
        .forEach((track) => track.stop());
    }
  },
  resetRecordingProperties() {
    audioRecorder.streamBeingCaptured = null;
    audioRecorder.mediaRecorder = null;
    audioRecorder.audioBlobs = [];
  },
  cancel() {
    audioRecorder.mediaRecorder?.stop();
    audioRecorder.stopStream();
    audioRecorder.resetRecordingProperties();
  },
};

export default audioRecorder;
