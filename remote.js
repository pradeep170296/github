const socket = io();

let pc = new RTCPeerConnection();

navigator.mediaDevices.getDisplayMedia({
video:true
})
.then(stream => {

    stream.getTracks().forEach(track =>
        pc.addTrack(track, stream)
    );

    pc.ontrack = e => {
        video.srcObject = e.streams[0];
    };

    pc.createOffer()
    .then(o => pc.setLocalDescription(o))
    .then(() => {

        socket.emit("offer",
            pc.localDescription
        );

    });

});

socket.on("offer", async data => {

    await pc.setRemoteDescription(data);

    const ans = await pc.createAnswer();

    await pc.setLocalDescription(ans);

    socket.emit("answer", ans);

});

socket.on("answer", async data => {

    await pc.setRemoteDescription(data);

});

pc.onicecandidate = e => {

    if (e.candidate)
        socket.emit("ice", e.candidate);

};

socket.on("ice", async data => {

    await pc.addIceCandidate(data);

});
