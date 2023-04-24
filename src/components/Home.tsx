import React, { useEffect, useRef, useLayoutEffect, useState } from 'react';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
const Home: React.FC = () => {

    const continator = useRef<HTMLDivElement>(null);

    let model: any = useState(null);
    const scene = new THREE.Scene();
    const renderer = new THREE.WebGLRenderer({
        // 抗锯齿性
        antialias: true
    });
    renderer.outputEncoding = THREE.sRGBEncoding;
    const fov = 70 // 视野范围
    const aspect = 2 // 相机默认值 画布的宽高比
    const near = 1 // 近平面
    const far = 2000 // 远平面
    const camera = new THREE.PerspectiveCamera(fov, aspect, near, far);
    camera.position.set(0, 0, 0);
    // camera.setViewOffset(1200, 900, 0, 0, 150, 250);

    const loadModel = () => {
        // Load a glTF resource
        const loader = new GLTFLoader();
        loader.load(
            // resource URL
            'model/robo_obj_pose4/scene.gltf',
            // called when the resource is loaded
            (gltf) => {
                model = gltf.scene;
                model.scale.set(0.6, 0.6, 0.5);
                model.position.y = -3.5;
                model.position.x = -1;
                scene.add(model);
            },
            // called while loading is progressing
            undefined,
            // called when loading has errors
            (error) => {
                console.log('An error happened', error);
            }
        );
    }

    function init() {
        // 特别注意，相机的位置要大于几何体的尺寸
        camera.position.z = -10;
        // 设置背景色
        renderer.setClearColor('#cccccc', 2);
        renderer.setSize(continator.current?.offsetWidth || 500, continator.current?.offsetHeight || 500);
        continator.current?.appendChild(renderer.domElement);
        // 环境光不能用来投射阴影，因为它没有方向。
        var ambienLight = new THREE.AmbientLight(0xffffff, 0.5);
        scene.add(ambienLight,);
        var directionalLight = new THREE.DirectionalLight(0xffffff, 0.5);
        scene.add(directionalLight);

        // 初始化轨道控制器
        // 还需要配合animate，不断循环渲染，达到用鼠标旋转物体的作用。
        const orbitControls = new OrbitControls(camera, renderer.domElement);
        // 窗口大小自适应
        window.addEventListener('resize', onWindowResize, false);
    }

    function onWindowResize() {
        camera.aspect = 1.5;
        // camera.aspect = continator.current?.offsetWidth  / continator.current?.offsetHeight ;
        camera.updateProjectionMatrix();
        renderer.setSize(continator.current?.offsetWidth || 500, continator.current?.offsetHeight || 500);
    }

    function animate() {
        setTimeout(() => {
            // model.rotation.x += 0.01;
            model.rotation.y += 0.01;
            // model.rotation.z += 0.01;
        }, 1000)
        requestAnimationFrame(animate);
        renderer.render(scene, camera);
    }



    useEffect(() => {
        try {
            init();
            loadModel();
            animate();
        } catch (error) {
            console.error("Home useEffect catch error:", error)
        }
    }, [])

    return (
        <div id='home' ref={continator} style={{ width: '80vw', height: '80vh' }}>
        </div>
    );
};

export default Home;

