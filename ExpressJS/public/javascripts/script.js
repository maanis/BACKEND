window.addEventListener('mousemove', (dets) => {
    gsap.to('#cursor', {
        x: dets.x,
        y: dets.y,
        opacity: 1
    })
})