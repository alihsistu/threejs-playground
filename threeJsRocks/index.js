// create a scene
const scene = new THREE.Scene()
// create a camera
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000)
camera.position.z = 5
// set up a renderer
const renderer = new THREE.WebGLRenderer({ antialias: true })
// set a clear color on renderer (background color)
renderer.setClearColor("#e5e5e5")
// set the size of the renderer
renderer.setSize(window.innerWidth, window.innerHeight)
// create canvas element with the settings
document.body.appendChild(renderer.domElement)
// make the canvas responsive
window.addEventListener('resize', () => {
    renderer.setSize(window.innerWidth, window.innerHeight)
    camera.aspect = window.innerWidth / window.innerHeight
    camera.updateProjectionMatrix()
})

var raycaster = new THREE.Raycaster()
var mouse = new THREE.Vector2();;


// form and material
var geometry = new THREE.BoxGeometry(1, 1, 1)
var material = new THREE.MeshLambertMaterial({ color: 0xF7F7F7 })
// var mesh = new THREE.Mesh(geometry, material);
// move around the material
// scene.add(mesh);

meshX = -10
for (let index = 0; index < 15; index++) {
    const mesh = new THREE.Mesh(geometry, material)
    mesh.position.x = (Math.random() - 0.5) * 10
    mesh.position.y = (Math.random() - 0.5) * 10
    mesh.position.z = (Math.random() - 0.5) * 10
    scene.add(mesh)
    meshX += 1
}


// add light to the sphere
const lightOne = new THREE.PointLight(0xFFFFFF, 1, 1000)
lightOne.position.set(0, 0, 0)
scene.add(lightOne)

// add light to the sphere
const lightTwo = new THREE.PointLight(0xFFFFFF, 2, 1000)
lightTwo.position.set(0, 0, 25)
scene.add(lightTwo)

const render = function () {
    // fix the distortion issue when resizing the window
    requestAnimationFrame(render)
    // call the render method on the renderer
    renderer.render(scene, camera)
}

function onMouseMove(event) {
    event.preventDefault()
    mouse.x = (event.clientX / window.innerWidth) * 2 - 1
    mouse.y = - (event.clientY / window.innerHeight) * 2 + 1
    raycaster.setFromCamera(mouse, camera)

    var intersects = raycaster.intersectObjects(scene.children, true)

    for (var i = 0; i < intersects.length; i++) {
        // intersects[i].object.material.color.set(0xFF0000);
        this.tl = new TimelineMax()
        this.tl.to(intersects[i].object.scale, 1, { x: 2, ease: Expo.easeOut })
        this.tl.to(intersects[i].object.scale, .5, { x: .5, ease: Expo.easeOut })
        this.tl.to(intersects[i].object.position, .5, { x: 2, ease: Expo.easeOut })
        this.tl.to(intersects[i].object.rotation, .5, { y: Math.PI * .5, ease: Expo.easeOut }, "=-1.5")
    }
}

render()



window.addEventListener('mousemove', onMouseMove)