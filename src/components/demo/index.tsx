import React, { useEffect, useRef, useLayoutEffect, useState } from 'react';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import { Spin } from 'antd';
import { BulbOutlined } from '@ant-design/icons';
const Demo: React.FC = () => {

    const continator = useRef<HTMLDivElement>(null);

    let model: any = null;
    const [isLoading, setIsLoading] = useState(true);
    const scene = new THREE.Scene();
    const renderer = new THREE.WebGLRenderer({
        // 抗锯齿性
        antialias: true,
        // canvas: document.querySelector('#canvas-container') ? ,
        alpha: true,
        // 提示用户代理怎样的配置更适用于当前的WebGL环境
        powerPreference: 'high-performance'
    });

    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    // 定义渲染器是否在渲染每一帧之前自动清除其输出
    renderer.autoClear = true;
    // 定义渲染器的输出编码
    /* 默认情况下，值为 THREE.LinearEncoding，这种线性编码的缺点是看起来不够真实。
    此时可以将值设置为 THREE.sRGBEncoding 提升渲染输出效果的真实性。
    此外还有另一个可选属性值为 THREE.GammaEncoding，它是一种存储颜色的方法, 这种编码的优点在于它允使用一种表现像亮度的 gammaFactor 值，根据人眼的敏感度优化明暗值的存储方式。当使用 sRGBEncoding 时，其实就像使用默认 gammaFactor 值为 2.2 的 GammaEncoding。 */
    renderer.outputEncoding = THREE.sRGBEncoding;
    const fov = 70 // 视野范围
    const aspect = 2 // 相机默认值 画布的宽高比
    const near = 1 // 近平面
    const far = 2000 // 远平面
    const camera = new THREE.PerspectiveCamera(fov, aspect, near, far);
    camera.position.set(0, 0, 0);
    // camera.setViewOffset(1200, 900, 0, 0, 150, 250);
    // const cameraGroup = new THREE.Group();
    // scene.add(cameraGroup);
    // cameraGroup.add(camera);


    const loadModel = () => {
        // 初始化加载管理器
        const loadingManager = new THREE.LoadingManager();
        // 此函数在加载开始时被调用
        loadingManager.onStart = function (url, itemsLoaded, itemsTotal) {
            console.log('Started loading file: ' + url + '.\nLoaded ' + itemsLoaded + ' of ' + itemsTotal + ' files.');
        };
        // 所有的项目加载完成后将调用此函数。默认情况下，该函数是未定义的，除非在构造函数中传入
        loadingManager.onLoad = function () {
            console.log('Loading complete!');
            setIsLoading(false);
            addCursor()
        };

        // Load a glTF resource
        const loader = new GLTFLoader(loadingManager);

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
                renderer.renderLists.dispose();
            },
            // called while loading is progressing
            undefined,
            // called when loading has errors
            (error) => {
                console.log('An error happened', error);
            }
        );
    }
    // 点光源
    const fillLight = new THREE.PointLight(0x88ffee, 2.7, 4, 3);
    // const directionLight = new THREE.DirectionalLight(0x88ffee, 2.7);
    function init() {
        // 特别注意，相机的位置要大于几何体的尺寸
        camera.position.z = -10;
        // 设置背景色
        renderer.setClearColor('#000000', 2);
        renderer.setSize(continator.current?.offsetWidth || 500, continator.current?.offsetHeight || 500);
        continator.current?.appendChild(renderer.domElement);
        // 环境光不能用来投射阴影，因为它没有方向。
        // const ambienLight = new THREE.AmbientLight(0xffffff, 0.5);
        // scene.add(ambienLight,);
        // const directionalLight = new THREE.DirectionalLight(0xffffff, 0.5);
        // scene.add(directionalLight);

        // 直射光
        // const directionLight = new THREE.DirectionalLight(0xffffff, .8);
        // directionLight.position.set(-100, 0, -100);
        // scene.add(directionLight);
        // 点光源
        // const fillLight = new THREE.PointLight(0x88ffee, 2.7, 4, 3);
        fillLight.position.z = 1.8;
        fillLight.power = 1000;
        // fillLight.position.x
        scene.add(fillLight);


        // 初始化轨道控制器
        // 还需要配合animate，不断循环渲染，达到用鼠标旋转物体的作用。
        const orbitControls = new OrbitControls(camera, renderer.domElement);
        // 窗口大小自适应
        window.addEventListener('resize', onWindowResize, false);
    }
    /** 增加虚拟光标 */
    const clock = new THREE.Clock()
    const cursorBox = useRef<HTMLDivElement>(null);
    let previousTime = 0;

    function addCursor() {
        document.addEventListener('mousemove', event => {
            event.preventDefault();
            if (cursorBox.current && continator.current) {
                cursorBox.current.style.left = event.clientX + 'px';
                cursorBox.current.style.top = event.clientY + 'px';

                const elapsedTime = clock.getElapsedTime();
                const deltaTime = elapsedTime - previousTime;
                fillLight.position.x = event.clientX / 500;
                fillLight.position.y = event.clientY / 300;
                console.log(fillLight.position)
            }

        }, false);
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
            console.error("init!!!!!!!!!!!")
            init();
            loadModel();
            animate();
        } catch (error) {
            console.error("Home useEffect catch error:", error)
        }
    }, [])

    return (
        <div>
            <div ref={cursorBox} style={{
                width: '2rem',
                height: '2rem',
                borderRadius: '1rem',
                backgroundColor: '#ccc',
                position: 'relative',
            }} >
            </div>

            {isLoading ? <Spin size="large" /> : ""}
            <div id='home' ref={continator} style={{
                width: '80vw',
                height: '80vh',
                opacity: isLoading ? 0 : 1,
                transition: 'opacity 3s linear 0.5s',
            }}>
            </div>
        </div>
    );
};

export default Demo;

