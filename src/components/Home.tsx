import React, { useEffect, useRef, useLayoutEffect, useState } from 'react';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import { DRACOLoader } from 'three/examples/jsm/loaders/DRACOLoader';
// import Stats from 'three/examples/jsm/libs/stats.module';
const Home: React.FC = () => {

    const continator = useRef<HTMLDivElement>(null);
    let model: any = useState(null);
    const scene = new THREE.Scene();
    const renderer = new THREE.WebGLRenderer({
        // 抗锯齿性
        antialias: true
    });
    const camera = new THREE.PerspectiveCamera(200, window.innerWidth / window.innerHeight, 0.1, 500);


    const loadModel = () => {
        // Load a glTF resource
        const loader = new GLTFLoader();
        loader.load(
            // resource URL
            'model/robo_obj_pose4/scene.gltf',
            // called when the resource is loaded
            (gltf) => {
                model = gltf.scene;
                model.scale.set(1, 1, 1);
                model.position.y = 1;
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
        renderer.setClearColor('#428bca', 2);
        renderer.setSize(window.innerWidth, window.innerHeight);
        continator.current?.appendChild(renderer.domElement);

        // 环境光不能用来投射阴影，因为它没有方向。
        var ambienLight = new THREE.AmbientLight(0xcccccc);
        scene.add(ambienLight);
        // 初始化轨道控制器
        // 还需要配合animate，不断循环渲染，达到用鼠标旋转物体的作用。
        const orbitControls = new OrbitControls(camera, renderer.domElement);
        // 窗口大小自适应
        window.addEventListener('resize', onWindowResize, false);
    }

    function onWindowResize() {
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(window.innerWidth, window.innerHeight);
    }

    function animate() {
        setTimeout(() => {
            model.rotation.x += 0.01;
            model.rotation.y += 0.01;
            model.rotation.z += 0.01;
        }, 500)
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

