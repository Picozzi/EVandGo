import React, {useState, useRef, useEffect, Suspense, createRef} from 'react';
import './App.css';
import { OrbitControls} from 'three/examples/jsm/controls/OrbitControls';
import { GLTFLoader} from 'three/examples/jsm/loaders/GLTFLoader';
import { Canvas, extend, useThree, useFrame, useLoader } from 'react-three-fiber';
import {useSpring, a} from 'react-spring/three';
import * as THREE from 'three'; 
import { TextureLoader } from 'three/src/loaders/TextureLoader.js';
import Model from './Tesla_CyberTruck_v2_Condensed.js';
import Maven_Pro_Black_Regular from './Maven_Pro_Black_Regular.json';
// import acceleratorpedal from './Accelerator.png';
// import brakepedal from './Brake.png';

extend({OrbitControls});

const Controls = () => {

  const orbitRef = useRef();
  const {camera, gl} = useThree();

  useFrame(()=>{
    orbitRef.current.update()
  })

  return (
    <orbitControls 
      //autoRotate
      args = {[camera, gl.domElement]}  
      ref = {orbitRef}
    />
  );
};

const Road = (props) => {
  const roadViewingLength = 240
  const roadUnitX = 10
  const roadUnitZ = 10
  const speed = props.speed
  const numRoadUnits = 2 * Math.ceil((roadViewingLength/roadUnitX)/2);

  const roadBreakPoint = -1*((roadUnitX/2)*(numRoadUnits+1))
  const roadRespawnPoint = (-1*roadBreakPoint)-roadUnitX

  const floor_text = useLoader(TextureLoader, '/road_v1.jpg')
  
  var roadRefs = [];
  var temp;
  var negativeTemp = ((roadUnitX/2)*numRoadUnits)-(roadUnitX/2);
  var positiveTemp = -1*(((roadUnitX/2)*numRoadUnits)-(roadUnitX/2));
  for (var i = 0; i < numRoadUnits; i++)
  {
    if(i < numRoadUnits/2)
    {
      temp = negativeTemp;
      negativeTemp -= roadUnitX;
    }
    else
    {
      temp = positiveTemp;
      positiveTemp += roadUnitX;
    }
    roadRefs.push([createRef(), temp]);
  }
  useFrame(() => {
    for (var j = 0; j < numRoadUnits; j++)
    {
      if (roadRefs[j][0].current.position.x < roadBreakPoint)
      {
      roadRefs[j][0].current.position.x = roadRespawnPoint;
      }
      else
      {
      roadRefs[j][0].current.position.x -= speed;
      } 
    }
  });
    return (
      <group>
        {roadRefs.map(roadRef => (
          <mesh
          key = {roadRef[1]}
          visible
          position={[roadRef[1], 0, 0]}
          rotation={[-Math.PI / 2, 0, 0]}
          ref={roadRef[0]}
          receiveShadow>
          <planeBufferGeometry attach="geometry" args={[roadUnitX, roadUnitZ]} />
          <meshStandardMaterial
            attach="material"
            map={floor_text}/>
        </mesh>
        ))}
        <mesh rotation={[-Math.PI/2, 0 , 0]} position={[-roadUnitX/2, -0.01, 0]}>
        <planeBufferGeometry attach="geometry" args={[roadViewingLength+roadUnitX, roadUnitZ]}/>
        <meshPhysicalMaterial attach="material" color="lightgrey"/>
        </mesh>
      </group>
  );
};

const Text = () => {
  const font = new THREE.FontLoader().parse(Maven_Pro_Black_Regular);
  const textOptions = {
    font, 
    size: 20,
    height: 1
  };
  return (
    <mesh position={[-50,0,55]} rotation={[0, Math.PI/2, 0]}>
        <textGeometry attach='geometry' args={['EV & GO', textOptions]} />
        <meshStandardMaterial attach='material' />
    </mesh>
  );
};

// const Accelerate = (props) => {
//   const intervalRef = useRef(null);

//   useEffect(()=>{
//     return () => stopCounter();
//   }, []);

// const startCounter = () => {
//   if(intervalRef.current) return;
//   intervalRef.current = setInterval(() => {
//     props.counter((prevCounter) => prevCounter + 1);
//   }, 100);
// };

// // const elementStyle = {
// //   margin: '5px',
// //   height: `50px`,
// //   width: `50px`,
// //   background: 'radial-gradient(at 25% 25%, #2b86c5, #562b7c, #ff3cac)',
// //   border: '2px solid black',
// //   borderRadius: '50%',
// //   boxShadow: '10px 5px 5px #BEBEBE',
// // };

// const stopCounter = () => {
//   if (intervalRef.current) {
//     clearInterval(intervalRef.current);
//     intervalRef.current = null;
//   }
// };

//   return (
//       <div
//         onMouseDown={startCounter}
//         onMouseUp={stopCounter}
//         onMouseLeave={stopCounter}
//         //style={elementStyle}
//       >
//       <img src = {acceleratorpedal} className="pedal"/>
//       </div>
//   );
// };

// const Deaccelerate = (props) => {
//   const intervalRef = useRef(null);

//   useEffect(()=>{
//     return () => stopCounter();
//   }, []);

// const startCounter = () => {
//   if(intervalRef.current) return;
//   intervalRef.current = setInterval(() => {
//     props.counter((prevCounter) => prevCounter - 1);
//   }, 100);
// };

// // const elementStyle = {
// //   margin: '5px',
// //   height: `100px`,
// //   width: `100px`,
// //   background: 'radial-gradient(at 25% 25%, #03fcfc, #fca103, #3b754e)',
// //   border: '2px solid black',
// //   borderRadius: '50%',
// //   boxShadow: '10px 5px 5px #BEBEBE',
// // };

// const stopCounter = () => {
//   if (intervalRef.current) {
//     clearInterval(intervalRef.current);
//     intervalRef.current = null;
//   }
// };

//   return (
//       <div 
//         onMouseDown={startCounter}
//         onMouseUp={stopCounter}
//         onMouseLeave={stopCounter}
//         //style={elementStyle}
//       >
//       <img src = {brakepedal} className = 'pedal'/>
//       </div>
//   );
// };

function speedCalculation(pedalcount, basespeed, maxspeed) {
  if(pedalcount <= 0)
  {
    return 0
  }
  else
  {
    return basespeed + (maxspeed/100)*pedalcount
  }
};

export default function HomeScreen() {
  const [speedcounter, setCounter] = useState(0.1);
  
  const basespeed = 0.1;
  const maxspeed = 0.2;
  var currentspeed = speedCalculation(speedcounter, basespeed, maxspeed);
  if(currentspeed > maxspeed)
  {
    currentspeed = maxspeed
  }
  return(
    <div className="temp">
      {/*<div className = "buttonb">
      <Deaccelerate counter={setCounter}/>
      <Accelerate counter={setCounter}/>
  </div>*/}
      {/*old cam position {position:[4.55, 1.61, -3.09]}*/}
      <Canvas colorManagement camera={{position:[7.55, 1.75, 0]}} onCreated={({ gl }) => {
        gl.shadowMap.enabled = true
        gl.shadowMap.type = THREE.PCFSoftShadowMap
      }}>
      <ambientLight intensity={0.3}/>
      <pointLight position={[2.5, 2, 0]} intensity={1} />
      <directionalLight position={[6, 1, 0]} intensity={1} />
      <directionalLight position={[6, 1, -6]} intensity={1} />
      <directionalLight position={[0, 1, -6]} intensity={1} />
      <spotLight position={[3, 3, -3]} intensity={0.5} penumbra={1} castShadow/>
      <fog attach="fog" args = {["white", 100, 120]}/>
      {/*<Controls />*/}
      <Suspense fallback={null}>
        <Model speed={0.18}/>{/*urrentspeed}/>*/}
        <Road speed={0.18}/>{/*urrentspeed}/>*/}
        <Text/>
      </Suspense>
      </Canvas>
    </div>
  );
};
