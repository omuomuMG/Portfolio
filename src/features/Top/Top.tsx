import * as React from "react";
import { Canvas, useFrame, useLoader, useThree } from "@react-three/fiber";
import { OrbitControls, Stars, Line } from "@react-three/drei";
import * as THREE from "three";
import { OBJLoader } from "three/examples/jsm/loaders/OBJLoader";
import { MTLLoader } from "three/examples/jsm/loaders/MTLLoader";
import styles from "./Top.module.css";

// 地球の半径と飛行パスの高さの余裕
const EARTH_RADIUS = 5;
const EXTRA_HEIGHT = 2;

// 空港情報: 空港コードをキーにして、緯度・経度を定義
const AIRPORT_COORDINATES: { [code: string]: { lat: number; lon: number } } = {
  KIX: { lat: 34.4347, lon: 135.244 }, // 関西国際空港
  SIN: { lat: 1.3644, lon: 103.9915 }, // チャンギ空港
  ICN: { lat: 37.4602, lon: 126.4407 }, // 仁川空港
  KUL: { lat: 2.7456, lon: 101.7099 }, // クアラルンプール空港
  DLC: { lat: 38.9657, lon: 121.5386 }, // 大連周水子国際空港
  PVG: { lat: 31.1434, lon: 121.8052 }, // 上海浦東国際空港
  TPE: { lat: 25.0777, lon: 121.233 }, // 台湾桃園国際空港
  DMK: { lat: 13.9125, lon: 100.6067 }, // ドンムアン空港
  HNL: { lat: 21.3187, lon: -157.9224 }, // ホノルル空港
};

// フライトルートの定義（roundTrip が true の場合は往復飛行、false の場合は行きのみ）
const FLIGHT_ROUTES: {
  from: string;
  to: string;
  roundTrip: boolean;
}[] = [
  { from: "KIX", to: "HNL", roundTrip: true },
  { from: "KIX", to: "ICN", roundTrip: true }, // 1-summer
  { from: "KIX", to: "KUL", roundTrip: true }, // 1-spring
  { from: "KUL", to: "SIN", roundTrip: true }, // 1-spring
  { from: "KIX", to: "DLC", roundTrip: true }, // 2-summer
  { from: "KIX", to: "PVG", roundTrip: true },
  { from: "KIX", to: "DMK", roundTrip: false }, // 2-spring
  { from: "DMK", to: "TPE", roundTrip: false }, // 2-spring
  { from: "TPE", to: "KIX", roundTrip: false }, // 2-spring
];

// 緯度経度からTHREE.Vector3 に変換
const convertLatLonToVector3 = (lat: number, lon: number, radius: number) => {
  const phi = (90 - lat) * (Math.PI / 180);
  const theta = (lon + 180) * (Math.PI / 180);
  const x = -radius * Math.sin(phi) * Math.cos(theta);
  const z = radius * Math.sin(phi) * Math.sin(theta);
  const y = radius * Math.cos(phi);
  return new THREE.Vector3(x, y, z);
};

// 地球儀コンポーネント
const Globe: React.FC<{ onLoaded?: () => void }> = ({ onLoaded }) => {
  const globeRef = React.useRef<THREE.Mesh>(null!);
  const [loaded, setLoaded] = React.useState(false);

  const texture = React.useMemo(
    () =>
      new THREE.TextureLoader().load(
        process.env.PUBLIC_URL + "/earth_material.png",
        () => setLoaded(true)
      ),
    []
  );

  React.useEffect(() => {
    if (loaded && onLoaded) onLoaded();
  }, [loaded, onLoaded]);

  return (
    <>
      <mesh ref={globeRef}>
        <sphereGeometry args={[EARTH_RADIUS, 64, 64]} />
        <meshStandardMaterial map={texture} />
      </mesh>
      <mesh>
        <sphereGeometry args={[EARTH_RADIUS + 0.1, 64, 64]} />
        <meshBasicMaterial
          color="#87ceeb"
          transparent
          opacity={0.2}
          side={THREE.BackSide}
        />
      </mesh>
    </>
  );
};

// 飛行機コンポーネント
const Airplane: React.FC<{
  start: THREE.Vector3;
  end: THREE.Vector3;
  roundTrip: boolean;
  onLoaded?: () => void;
}> = ({ start, end, roundTrip, onLoaded }) => {
  const [loaded, setLoaded] = React.useState(false);

  const mtl = useLoader(
    MTLLoader,
    process.env.PUBLIC_URL + "/models/11803_Airplane_v1_l1.mtl"
  );

  React.useEffect(() => {
    mtl.preload();
  }, [mtl]);

  const airplane = useLoader(
    OBJLoader,
    process.env.PUBLIC_URL + "/models/11803_Airplane_v1_l1.obj",
    (loader) => {
      loader.setMaterials(mtl);
    }
  );

  React.useEffect(() => {
    setLoaded(true);
  }, [airplane]);

  React.useEffect(() => {
    if (loaded && onLoaded) onLoaded();
  }, [loaded, onLoaded]);

  // useLoader はキャッシュするため、各インスタンスでモデルを clone する
  const airplaneObject = React.useMemo(() => airplane.clone(), [airplane]);

  // モデルのスケールや回転の調整
  const toRadian = (degrees: number) => (degrees * Math.PI) / 180;
  airplaneObject.scale.set(0.0001, 0.0001, 0.0001);
  airplaneObject.rotation.set(toRadian(0), toRadian(90), toRadian(180));

  const ref = React.useRef<THREE.Group>(null!);

  const flightDuration = 5; // 片道の移動時間（秒）
  const minWait = 1;
  const maxWait = 3;

  type Phase =
    | "waitingAtDeparture"
    | "going"
    | "waitingAtDestination"
    | "returning";
  const phaseRef = React.useRef<Phase>("waitingAtDeparture");
  const phaseTime = React.useRef(0); // 現在のフェーズでの経過時間
  const currentWaitTime = React.useRef(0); // 待機フェーズでの待機時間

  // 初期遅延：各飛行機はランダムな秒数まつ
  const initialDelay = React.useRef(Math.random() * 3);

  // 共通の制御点：出発地点と目的地の中間位置（余裕高さを加える）
  const midPoint = start
    .clone()
    .add(end)
    .multiplyScalar(0.5)
    .normalize()
    .multiplyScalar(EARTH_RADIUS + EXTRA_HEIGHT);

  const goingCurve = new THREE.QuadraticBezierCurve3(start, midPoint, end);
  const returnCurve = new THREE.QuadraticBezierCurve3(end, midPoint, start);

  useFrame((state, delta) => {
    // 初期遅延がまだある場合はカウントダウンする
    if (initialDelay.current > 0) {
      initialDelay.current -= delta;
      return;
    }
    phaseTime.current += delta;

    if (roundTrip) {
      // 往復の場合の状態遷移
      switch (phaseRef.current) {
        case "waitingAtDeparture": {
          ref.current.visible = false;
          if (phaseTime.current >= currentWaitTime.current) {
            phaseRef.current = "going";
            phaseTime.current = 0;
          }
          break;
        }
        case "going": {
          ref.current.visible = true;
          const progress = Math.min(phaseTime.current / flightDuration, 1);
          const currentPos = goingCurve.getPoint(progress);
          ref.current.position.copy(currentPos);
          const tangent = goingCurve.getTangent(progress);
          const normal = currentPos.clone().normalize();
          const projectedTangent = tangent.clone().projectOnPlane(normal);
          ref.current.lookAt(currentPos.clone().add(projectedTangent));
          if (progress >= 1) {
            phaseRef.current = "waitingAtDestination";
            phaseTime.current = 0;
            currentWaitTime.current =
              Math.random() * (maxWait - minWait) + minWait;
            ref.current.visible = false;
          }
          break;
        }
        case "waitingAtDestination": {
          ref.current.position.copy(end);
          ref.current.visible = false;
          if (phaseTime.current >= currentWaitTime.current) {
            phaseRef.current = "returning";
            phaseTime.current = 0;
            ref.current.visible = true;
          }
          break;
        }
        case "returning": {
          ref.current.visible = true;
          const progress = Math.min(phaseTime.current / flightDuration, 1);
          const currentPos = returnCurve.getPoint(progress);
          ref.current.position.copy(currentPos);
          const tangent = returnCurve.getTangent(progress);
          const normal = currentPos.clone().normalize();
          const projectedTangent = tangent.clone().projectOnPlane(normal);
          ref.current.lookAt(currentPos.clone().add(projectedTangent));
          if (progress >= 1) {
            phaseRef.current = "waitingAtDeparture";
            phaseTime.current = 0;
            currentWaitTime.current =
              Math.random() * (maxWait - minWait) + minWait;
            ref.current.visible = false;
          }
          break;
        }
        default:
          break;
      }
    } else {
      // 行きのみの場合の状態遷移
      switch (phaseRef.current) {
        case "waitingAtDeparture": {
          ref.current.visible = false;
          if (phaseTime.current >= currentWaitTime.current) {
            phaseRef.current = "going";
            phaseTime.current = 0;
          }
          break;
        }
        case "going": {
          ref.current.visible = true;
          const progress = Math.min(phaseTime.current / flightDuration, 1);
          const currentPos = goingCurve.getPoint(progress);
          ref.current.position.copy(currentPos);
          const tangent = goingCurve.getTangent(progress);
          const normal = currentPos.clone().normalize();
          const projectedTangent = tangent.clone().projectOnPlane(normal);
          ref.current.lookAt(currentPos.clone().add(projectedTangent));
          if (progress >= 1) {
            phaseRef.current = "waitingAtDestination";
            phaseTime.current = 0;
            currentWaitTime.current =
              Math.random() * (maxWait - minWait) + minWait;
            // 一度行きが完了したら、非表示にする
            ref.current.visible = false;
          }
          break;
        }
        case "waitingAtDestination": {
          // 行きのみの場合、目的地で待機後、瞬時に出発地点へ戻し次回の飛行を開始
          ref.current.position.copy(end);
          ref.current.visible = false;
          if (phaseTime.current >= currentWaitTime.current) {
            // 瞬時に出発地点へ戻す
            ref.current.position.copy(start);
            phaseRef.current = "waitingAtDeparture";
            phaseTime.current = 0;
            currentWaitTime.current =
              Math.random() * (maxWait - minWait) + minWait;
          }
          break;
        }
        default:
          break;
      }
    }
  });

  return (
    <group ref={ref}>
      <primitive object={airplaneObject} />
    </group>
  );
};

// 飛行機の軌道ガイドラインコンポーネント
const FlightPath: React.FC<{
  start: THREE.Vector3;
  end: THREE.Vector3;
}> = ({ start, end }) => {
  const midPoint = start
    .clone()
    .add(end)
    .multiplyScalar(0.5)
    .normalize()
    .multiplyScalar(EARTH_RADIUS + EXTRA_HEIGHT);
  const goingCurve = new THREE.QuadraticBezierCurve3(start, midPoint, end);
  const goingPoints = goingCurve.getPoints(50);
  const colors = goingPoints.map((_, i, arr) =>
    new THREE.Color().lerpColors(
      new THREE.Color("#fff176"),
      new THREE.Color("#f44336"),
      i / (arr.length - 1)
    )
  );
  return (
    <>
      <Line
        points={goingPoints}
        color="yellow"
        lineWidth={2}
        vertexColors={colors}
      />
    </>
  );
};

// 各フライトルートに基づき、飛行機と軌道を生成
const FlightRoutes: React.FC<{ onLoaded?: () => void }> = ({ onLoaded }) => {
  // すべてのAirplaneのロード完了を検知
  const [loadedCount, setLoadedCount] = React.useState(0);
  const total = FLIGHT_ROUTES.length;

  React.useEffect(() => {
    if (loadedCount >= total && onLoaded) {
      onLoaded();
    }
  }, [loadedCount, total, onLoaded]);

  const flights = FLIGHT_ROUTES.map((route, index) => {
    const fromData = AIRPORT_COORDINATES[route.from];
    const toData = AIRPORT_COORDINATES[route.to];
    if (!fromData || !toData) return null;
    const start = convertLatLonToVector3(
      fromData.lat,
      fromData.lon,
      EARTH_RADIUS
    );
    const end = convertLatLonToVector3(toData.lat, toData.lon, EARTH_RADIUS);
    return (
      <React.Fragment key={index}>
        <FlightPath start={start} end={end} />
        <Airplane
          start={start}
          end={end}
          roundTrip={route.roundTrip}
          onLoaded={() => setLoadedCount((c) => c + 1)}
        />
      </React.Fragment>
    );
  });
  return <>{flights}</>;
};

const AnimatedCamera: React.FC = () => {
  const { camera } = useThree();
  const angularSpeed = 0.5;

  useFrame((state, delta) => {
    const angle = angularSpeed * delta;
    const { x, z } = camera.position;
    camera.position.x = x * Math.cos(angle) - z * Math.sin(angle);
    camera.position.z = x * Math.sin(angle) + z * Math.cos(angle);
    camera.lookAt(0, 0, 0);
  });
  return null;
};

// シーン全体の構成
const Scene: React.FC<{ onLoaded?: () => void }> = ({ onLoaded }) => {
  // GlobeとFlightRoutesの両方のロード完了を待つ
  const [globeLoaded, setGlobeLoaded] = React.useState(false);
  const [flightsLoaded, setFlightsLoaded] = React.useState(false);

  React.useEffect(() => {
    if (globeLoaded && flightsLoaded && onLoaded) {
      onLoaded();
    }
  }, [globeLoaded, flightsLoaded, onLoaded]);

  return (
    <>
      <ambientLight intensity={0.8} />
      <directionalLight position={[10, 10, 5]} intensity={1} />
      <Globe onLoaded={() => setGlobeLoaded(true)} />
      <FlightRoutes onLoaded={() => setFlightsLoaded(true)} />
      <OrbitControls enableZoom={false} />
    </>
  );
};

// アプリケーションのメインコンポーネント
const App: React.FC<{ onLoaded?: () => void }> = ({ onLoaded }) => {
  // Sceneのロード完了を親に伝える
  return (
    <div className={styles.wrapper}>
      <Canvas camera={{ position: [0, 0, 13], fov: 50 }}>
        <AnimatedCamera />
        <Scene onLoaded={onLoaded} />
      </Canvas>
    </div>
  );
};

export default App;
