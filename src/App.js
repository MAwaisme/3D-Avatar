import { Suspense, useRef, useState, useEffect } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
// import { useThree, useResource } from 'react-three-fiber'
// import { Canvas, extend, useThree, useResource } from 'react-three-fiber'

import { ContactShadows, Environment, useGLTF, OrbitControls, Stage, Html } from "@react-three/drei";
import { HexColorPicker } from "react-colorful";
import { proxy, useSnapshot } from "valtio";
import { Scene } from 'three';
import { DragControls } from 'three/examples/jsm/controls/DragControls'

// Using a Valtio state model to bridge reactivity between
// the canvas and the dom, both can write to it and/or react to it.
const state = proxy({
  current: null,
  items: {
    Std_Tongue: "#ffffff",
    Std_Upper_Teeth: "#ffffff",
    Std_Lower_Teeth: "#ffffff",
    Std_Skin_Head: "#ffffff",
    Std_Skin_Body: "#ffffff",
    Std_Skin_Arm: "#ffffff",
    Std_Skin_Leg: "#ffffff",
    Std_Nails: "#ffffff",
    Std_Eye_R: "#ffffff",
    Std_Cornea_R: "#ffffff",
    Std_Eye_L: "#ffffff",
    Std_Cornea_L: "#ffffff",
    Jeans: "#ffffff",
    Plaid_Punk_Shirt: "#ffffff",
    "Plaid_Punk_Shirt.001": "red",
    Boots: "#ffffff",
  },
})

function Shoe() {

  const ref = useRef()
  // const snap = useSnapshot(state)
  // Drei's useGLTF hook sets up draco automatically, that's how it differs from useLoader(GLTFLoader, url)
  // { nodes, materials } are extras that come from useLoader, these do not exist in threejs/GLTFLoader
  // nodes is a named collection of meshes, materials a named collection of materials
  // const { nodes, materials } = useGLTF("ganja.glb")
  const { scene, nodes, materials } = useGLTF("NewManModal.glb")
  console.log("🚀 ~ file: App.js ~ line 45 ~ Shoe ~ nodes", nodes)
  const MainModal = useGLTF("NewManModal.glb")
  const shirt = useGLTF("shirt.glb");
  const pant = useGLTF("pant.glb");
  const shoes = useGLTF("shoes.glb");
  const mooch = useGLTF("mooch.glb");

  console.log("🚀 ~ file: App.js ~ line 47 ~ Shoe ~ MainModal", MainModal)
  console.log("🚀 ~ file: App.js ~ line 44 ~ Shoe ~ nodes", scene);
  // let check = new Scene();
  // check.add(scene);
  // let temp1 = []

  // for (let nodess in nodes) {
  //   if (nodes[nodess].type === 'Mesh') {
  //     temp1.push({
  //       geometry: nodes[nodess].geometry,
  //       material: nodes[nodess].material,
  //       id: nodes[nodess].uuid,
  //       name: nodes[nodess].name
  //     })
  //   }
  // }

  let [arr, setArr] = useState()

  useEffect(() => {
    // for (let nodess in nodes) {
    //   if (nodes[nodess].type === 'Mesh') {
    //     temp.push({
    //       geometry: nodes[nodess].geometry,
    //       material: nodes[nodess].material,
    //       id: nodes[nodess].uuid,
    //       name: nodes[nodess].name
    //     })
    //   }
    // }

    setArr(scene)
  }, [])

  console.log('arr:::', arr)


  let shirtGem = shirt.nodes.shirt;
  let pantGem = pant.nodes.pant;
  let shoesGem = shoes.nodes.shoes;
  let moochGem = mooch.nodes.mooch;
  let MainModalGem = mooch.nodes.mooch;

  // console.log('arr of all mesh and geometry"""""', arr)

  // const [chnageShirt, setChangeShirt] = useState(null);

  const shirtHandl = (id) => {
    const findMeshId = arr.find(element => element.id == id);

    if (!findMeshId) {
      return;
    }

    const indexOf = arr.indexOf(findMeshId);
    // if(findMeshId === 'd0650dbb-2dc6-4169-abbf-b64756cf6785'){
    let temp = arr;
    let toReplace = {
      geometry: shirtGem.geometry,
      material: shirtGem.material,
      id: shirtGem.uuid,
      name: shirtGem.name
    }
    temp.splice(indexOf, 1, toReplace);
    setArr(temp)

  }

  // const { nodes : newNodes, materials : newMaterials } = useGLTF("shirt.glb")

  // const { nodes, materials } = useGLTF("modelAssets/shirt1.glb")
  // console.log("🚀 ~ file: App.js ~ line 232 ~ App ~ nodes", nodes)

  // Animate model
  useFrame((state) => {
    // const t = state.clock.getElapsedTime()
    ref.current.rotation.z = 0
    ref.current.rotation.x = 0
    ref.current.rotation.y = 0
    // ref.current.position.y = (1 + Math.sin(t / 1.5)) / 10
  })

  // Cursor showing current color

  // const [hovered, set] = useState();
  // const [shirtColor, setShirtColor] = useState();
  // useEffect(() => {
  //   const cursor = `<svg width="64" height="64" fill="none" xmlns="http://www.w3.org/2000/svg"><g clip-path="url(#clip0)"><path fill="rgba(255, 255, 255, 0.5)" d="M29.5 54C43.031 54 54 43.031 54 29.5S43.031 5 29.5 5 5 15.969 5 29.5 15.969 54 29.5 54z" stroke="#000"/><g filter="url(#filter0_d)"><path d="M29.5 47C39.165 47 47 39.165 47 29.5S39.165 12 29.5 12 12 19.835 12 29.5 19.835 47 29.5 47z" fill="${snap.items[hovered]}"/></g><path d="M2 2l11 2.947L4.947 13 2 2z" fill="#000"/><text fill="#000" style="white-space:pre" font-family="Inter var, sans-serif" font-size="10" letter-spacing="-.01em"><tspan x="35" y="63">${hovered}</tspan></text></g><defs><clipPath id="clip0"><path fill="#fff" d="M0 0h64v64H0z"/></clipPath><filter id="filter0_d" x="6" y="8" width="47" height="47" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB"><feFlood flood-opacity="0" result="BackgroundImageFix"/><feColorMatrix in="SourceAlpha" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"/><feOffset dy="2"/><feGaussianBlur stdDeviation="3"/><feColorMatrix values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.15 0"/><feBlend in2="BackgroundImageFix" result="effect1_dropShadow"/><feBlend in="SourceGraphic" in2="effect1_dropShadow" result="shape"/></filter></defs></svg>`
  //   const auto = `<svg width="64" height="64" fill="none" xmlns="http://www.w3.org/2000/svg"><path fill="rgba(255, 255, 255, 0.5)" d="M29.5 54C43.031 54 54 43.031 54 29.5S43.031 5 29.5 5 5 15.969 5 29.5 15.969 54 29.5 54z" stroke="#000"/><path d="M2 2l11 2.947L4.947 13 2 2z" fill="#000"/></svg>`
  //   if (hovered) {
  //     document.body.style.cursor = `url('data:image/svg+xml;base64,${btoa(cursor)}'), auto`
  //     return () => (document.body.style.cursor = `url('data:image/svg+xml;base64,${btoa(auto)}'), auto`)
  //   }
  // }, [hovered])

  // const { camera, gl } = useThree()
  // const [reff, object] = useResource()

  // Using the GLTFJSX output here to wire in app-state and hook up events


  // const ModalMainArray = [
  //   {
  //     nodeName: nodes.ganja_1.geometry,
  //     materialsName: materials.Std_Tongue,
  //     // materialsColorName: snap.items.base_1_Head,
  //     MeshID: '1'
  //   },
  //   {
  //     nodeName: nodes.ganja_2.geometry,
  //     materialsName: materials.Std_Upper_Teeth,
  //     // materialsColorName: snap.items.base_2_Body,
  //     MeshID: '2'
  //   },
  //   {
  //     nodeName: nodes.ganja_3.geometry,
  //     materialsName: materials.Std_Lower_Teeth,
  //     // materialsColorName: snap.items.base_1_Arm,
  //     MeshID: '3'
  //   },
  //   {
  //     nodeName: nodes.ganja_4.geometry,
  //     materialsName: materials.Std_Skin_Head,
  //     // materialsColorName: snap.items.base_1_Leg,
  //     MeshID: '4'
  //   },
  //   {
  //     nodeName: nodes.ganja_5.geometry,
  //     materialsName: materials.Std_Skin_Body,
  //     // materialsColorName: snap.items.base_2_Nails,
  //     MeshID: '5'
  //   },
  //   {
  //     nodeName: nodes.ganja_6.geometry,
  //     materialsName: materials.Std_Skin_Arm,
  //     // materialsColorName: snap.items.base_1_Eyelash,
  //     MeshID: '6'
  //   },
  //   {
  //     nodeName: nodes.ganja_7.geometry,
  //     materialsName: materials.Std_Skin_Leg,
  //     // materialsColorName: snap.items.Std_Cornea_R,
  //     MeshID: '7'
  //   },
  //   {
  //     nodeName: nodes.ganja_7.geometry,
  //     materialsName: materials["base_2_Head 2"],
  //     // materialsColorName: snap.items["base_2_Head 2"],
  //     MeshID: '8'
  //   },
  //   {
  //     nodeName: nodes.base_2_2.geomety,
  //     materialsName: materials.base_2_Body,
  //     materialsColorName: snap.items.base_2_Body,
  //     MeshID: '9'
  //   },
  //   {
  //     nodeName: nodes.base_2_3.geometry,
  //     materialsName: materials["base_2_Arm 2"],
  //     materialsColorName: snap.items["base_2_Arm 2"],
  //     MeshID: '10'
  //   },
  //   {
  //     nodeName: nodes.base_2_4.geometry,
  //     materialsName: materials["base_2_Leg 2"],
  //     materialsColorName: snap.items["base_2_Leg 2"],
  //     MeshID: '11'
  //   },
  //   {
  //     nodeName: nodes.base_2_5.geometry,
  //     materialsName: materials.base_2_Nails,
  //     materialsColorName: snap.items.base_2_Nails,
  //     MeshID: '12'
  //   },
  //   {
  //     nodeName: nodes.base_2_6.geometry,
  //     materialsName: materials["base_2_Eyelash 2"],
  //     materialsColorName: snap.items["base_2_Eyelash 2"],
  //     MeshID: '13'
  //   },
  //   {
  //     nodeName: nodes.eyes_1_1.geometry,
  //     materialsName: materials.eyes_1_Eye_R,
  //     materialsColorName: snap.items.eyes_1_Eye_R,
  //     MeshID: '14'
  //   },
  //   {
  //     nodeName: nodes.eyes_1_2.geometry,
  //     materialsName: materials.eyes_1_Cornea_R,
  //     materialsColorName: snap.items.eyes_1_Cornea_R,
  //     MeshID: '15'
  //   },
  //   {
  //     nodeName: nodes.eyes_1_3.geometry,
  //     materialsName: materials.eyes_1_Eye_L,
  //     materialsColorName: snap.items.eyes_1_Eye_L,
  //     MeshID: '16'
  //   },
  //   {
  //     nodeName: nodes.eyes_1_4.geometry,
  //     materialsName: materials.eyes_1_Cornea_L,
  //     materialsColorName: snap.items.eyes_1_Cornea_L,
  //     MeshID: '16'
  //   },
  //   {
  //     nodeName: nodes.eyes_2_1.geometry,
  //     materialsName: materials.eyes_1_Eye_R,
  //     materialsColorName: snap.items.eyes_1_Eye_R,
  //     MeshID: '16'
  //   },
  //   {
  //     nodeName: nodes.eyes_1_3.geometry,
  //     materialsName: materials.eyes_1_Eye_L,
  //     materialsColorName: snap.items.eyes_1_Eye_L,
  //     MeshID: '16'
  //   },
  //   {
  //     nodeName: nodes.eyes_1_3.geometry,
  //     materialsName: materials.eyes_1_Eye_L,
  //     materialsColorName: snap.items.eyes_1_Eye_L,
  //     MeshID: '16'
  //   },
  //   {
  //     nodeName: nodes.eyes_1_3.geometry,
  //     materialsName: materials.eyes_1_Eye_L,
  //     materialsColorName: snap.items.eyes_1_Eye_L,
  //     MeshID: '16'
  //   },
  // ];



  //  function waleedMagic(){
  //     let main

  //   }


  // const [cnageData, setChangeData] = useState();

  const setChangeDataHandl = () => {
    let obj = scene.getObjectByProperty("name", "Wolf3D_Outfit_Top");
    console.log('scnee:::', scene)
    console.log('obj:::', obj)
    scene.remove(obj);
    scene.add(shirtGem)
  }

  const setChangeDataHandl2 = () => {
    let obj = scene.getObjectByProperty("name", "pant");
    console.log('scnee:::', scene)
    console.log('obj:::', obj)
    scene.remove(obj);
    scene.add(pantGem)
  }

  const setChangeDataHandl3 = () => {
    let obj = scene.getObjectByProperty("name", "shoes");
    console.log('scnee:::', scene)
    console.log('obj:::', obj)
    scene.remove(obj);
    scene.add(shoesGem)
  }

  const setChangeDataHandl4 = () => {
    let obj = scene.getObjectByProperty("name", "mooch");
    console.log('scnee:::', scene)
    console.log('obj:::', obj)
    scene.remove(obj);
    scene.add(moochGem)
  }

  const setChangeDataHandl5 = () => {
    let obj = scene.getObjectByProperty("name", "");
    console.log('scnee:::', scene)
    console.log('obj:::', obj)
    scene.clear(scene.children);
    // scene.remove(obj);
    // scene.add(MainModalGem)
    // clear(scene.children[0])
    // while (scene.children.length > 0) {
    //   scene.remove(scene.children[0]);
    // }
  }


  return (
    <>

      <Html>
        <div style={{ width: '400px' }}>
          <h1>Check Our Magic</h1>
        </div>
        <div className="Controls">
          <button onClick={setChangeDataHandl}>  Shirt </button>
          <button onClick={setChangeDataHandl2}> pant  </button>
          <button onClick={setChangeDataHandl3}>  shoes </button>
          <button onClick={setChangeDataHandl4}>  mooch </button>
          <button onClick={() => window.location.reload(false)}>  reset </button>
        </div>
      </Html>

      <group ref={ref} dispose={null}>
        <scene name="Scene">
          <mesh
            name="Object_0"
          >
            <primitive object={scene} />
          </mesh>
        </scene>
      </group>
      {/* <Suspense> */}
      {/* <group */}
      {/* ref={ref}
        scale={1}
        isGroup={true}
        isObject3D={true}
        dispose={null}
        

      > */}
      {/* {arr.map((data) =>
          <mesh ref={ref}  receiveShadow castShadow key={data.id} geometry={data.geometry} material={data.material} onClick={() => shirtHandl(data.id)}  />
        )} */}
      {/* <mesh onClick={() => shirtHandl(data.id)} receiveShadow castShadow geometry={nodes.ganja_2.geometry} material={materials.Std_Upper_Teeth} material-color={snap.items.Std_Upper_Teeth} />
        <mesh receiveShadow castShadow geometry={nodes.ganja_3.geometry} material={materials.Std_Lower_Teeth} material-color={snap.items.Std_Lower_Teeth} />
        <mesh receiveShadow castShadow geometry={nodes.ganja_5.geometry} material={materials.Std_Skin_Body} material-color={snap.items.Std_Skin_Body} />
        <mesh receiveShadow castShadow geometry={nodes.ganja_6.geometry} material={materials.Std_Skin_Arm} material-color={snap.items.Std_Skin_Arm} />
        <mesh receiveShadow castShadow geometry={nodes.ganja_7.geometry} material={materials.Std_Skin_Leg} material-color={snap.items.Std_Skin_Leg} />
        <mesh receiveShadow castShadow geometry={nodes.ganja_8.geometry} material={materials.Std_Nails} material-color={snap.items.Std_Nails} />
        <mesh receiveShadow castShadow geometry={nodes.ganja_9.geometry} material={materials.Std_Eyelash} material-color={snap.items.Std_Eyelash} />
        <mesh receiveShadow castShadow geometry={nodes.ganja_10.geometry} material={materials.Std_Eye_R} material-color={snap.items.Std_Eye_R} />
        <mesh receiveShadow castShadow geometry={nodes.ganja_11.geometry} material={materials.Std_Cornea_R} material-color={snap.items.Std_Cornea_R} />
        <mesh receiveShadow castShadow geometry={nodes.ganja_12.geometry} material={materials.Std_Eye_L} material-color={snap.items.Std_Eye_L} />
        <mesh receiveShadow castShadow geometry={nodes.ganja_13.geometry} material={materials.Std_Cornea_L} material-color={snap.items.Std_Cornea_L} />
        <mesh receiveShadow castShadow geometry={nodes.ganja_14.geometry} material={materials.Jeans} material-color={snap.items.Jeans} />
        <mesh receiveShadow castShadow geometry={nodes.ganja_15.geometry} material={materials.Plaid_Punk_Shirt} material-color={snap.items.Plaid_Punk_Shirt} />
        <mesh receiveShadow castShadow geometry={nodes.ganja_16.geometry} material={materials.Boots} material-color={snap.items.Boots} /> */}
      {/* </group> */}
      {/* </Suspense> */}
      {/* <dragControls args={[[object], camera, gl.domElement]} /> */}

    </>
  )
}

function Picker() {
  const snap = useSnapshot(state)
  return (
    <div style={{ display: snap.current ? "block" : "none" }}>
      <HexColorPicker className="picker" color={snap.items[snap.current]} onChange={(color) => (state.items[snap.current] = color)} />
      <h1>{snap.current}</h1>
    </div>
  )
}

export default function App() {

  return (

    <>
      <Canvas>
        <ambientLight intensity={0.7} />
        {/* <spotLight castShadow /> */}
        <Suspense >
          <Stage environment={'city'} intensity={'0.6'}>
            <Shoe />
          </Stage>
        </Suspense>
        <OrbitControls enableZoom={true} enablePan={true} />
      </Canvas>
      {/* <Picker /> */}
    </>
  )
}