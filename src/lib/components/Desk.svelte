<script>
    import {Group} from "three";
    import {useFrame, T, forwardEventHandlers} from "@threlte/core";
    import {useGltf} from "@threlte/extras";
    import {ShaderMaterial} from "three";

    import {interactivity} from "@threlte/extras";

    interactivity();

    let colors = ["#e68e8e", "#A3BCEC"];

    $: scrollState.subscribe((value) => {
        if (typeof value !== "undefined") {
            document.documentElement.style.setProperty(
                "--background-color",
                colors[value],
            );
        }
    });

    export const ref = new Group();

    const gltf = useGltf("Desk.glb");

    const component = forwardEventHandlers();

    /** @type {ShaderMaterial | undefined} */
    let floorMaterial = undefined;

    /** @type {import('three').Texture | undefined} */
    let deskMap = undefined;

    // after the component is mounted, we can access the mesh
    // and set the texture uniform
    gltf.subscribe((gltf) => {
        if (gltf) {
            setTimeout(() => {
                if ($scrollState === 0) position.set(0);
                laptop.set(-0.5);
                lamp.set(-0.9);
                chair.set(0.7);
            }, 10);
        }
    });
    $: if (deskMap) {
        floorMaterial = new ShaderMaterial({
            uniforms: {
                uTexture: {type: "t", value: deskMap},
            },
            vertexShader: `
      varying vec2 vUv;

      void main() {
        vUv = uv1;
        gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
      }
    `,
            fragmentShader: `
      varying vec2 vUv;
      uniform sampler2D uTexture;

      void main() {
        float alpha = texture2D(uTexture, vUv).x;
        gl_FragColor = vec4(vec3(0.0), 0.7 - 1.3 * alpha);
      }
    `,
        });
    }

    import {writable} from "svelte/store";
    import {spring, tweened} from "svelte/motion";
    import {cubicInOut} from "svelte/easing";
    import {scrollState} from "./App.svelte";

    const mousePos = {
        x: 0.5,
        y: 0.5,
    };

    let dampenedMousePos = writable({
        x: 0.5,
        y: 0.5,
    });

    addEventListener("pointermove", (event) => {
        let x = event.clientX / innerWidth;
        let y = event.clientY / innerHeight;

        mousePos.x = x;
        mousePos.y = y;
    });

    let plantCooldown = 0;

    useFrame(({}, delta) => {
        // mouse pos dampening
        dampenedMousePos.update((pos) => {
            return {
                x: pos.x + delta * 5 * (mousePos.x - pos.x),
                y: pos.y + delta * 5 * (mousePos.y - pos.y),
            };
        });
        if (plantCooldown > 0) {
            plantCooldown -= delta;
        }
        let swing = 0.5 * (1 + Math.sin(performance.now() * 0.001));
        plant.set(plantCooldown * $plant + (1 - plantCooldown) * swing);
    });

    const laptop = spring(0, {
        stiffness: 0.1,
        damping: 0.1,
    });

    const lamp = spring(0, {
        stiffness: 0.1,
        damping: 0.4,
    });

    const chair = spring(0, {
        stiffness: 0.1,
        damping: 0.1,
    });

    const plant = spring(0.5 * (1 + Math.sin(performance.now() * 0.001)), {
        stiffness: 0.07,
        damping: 0.1,
    });

    let position = tweened(1.3, {
        duration: 700,
        easing: cubicInOut,
    });

    scrollState.subscribe((state) => {
        if (state === 0) {
            if ($gltf) position.set(0);
        } else {
            position.set(1.3);
        }
    });
</script>

{#if $position > -1.3}
    <T is={ref} dispose={false} {...$$restProps} bind:this={$component}>
        {#await gltf}
            <slot name="fallback"/>
        {:then gltf}
            <T.Group position={[0, 0, $position]} rotation={[0, $position * 2, 0]}>
                <T.Mesh
                        position={[0.03, 0.0, +0.32]}
                        visible={false}
                        on:pointerenter={(event) => {
            const x = event.nativeEvent.movementX * 0.04;
            plant.set(x);
            plantCooldown = 1.0;
          }}
                        on:pointerdown={() => {
            plant.set(
              Math.round(Math.random()) * 10 - 5 + Math.random() * 4 - 2,
            );
            plantCooldown = 1.0;
          }}
                >
                    <T.BoxGeometry args={[0.13, 0.13, 0.13]}/>
                </T.Mesh>
                <T.Group position={[0.04, -0.1, 0.32]} scale={0.09}>
                    <T
                            on:create={({ ref }) => {
              let relevant = ref.children[0];
              plant.subscribe((x) => {
                relevant.rotation.x = 0.2 * (0.2 - x);
              });
            }}
                            is={gltf.nodes.Bone}
                    />
                    <T.SkinnedMesh
                            geometry={gltf.nodes.Plant001.geometry}
                            material={gltf.materials.Material}
                            skeleton={gltf.nodes.Plant001.skeleton}
                    />
                </T.Group>

                <T.Mesh
                        position={[0.03, 0.15, -0.2]}
                        visible={false}
                        on:pointerenter={(event) => {
            const x = event.nativeEvent.movementX * 0.005;
            lamp.set(x);
          }}
                        on:pointerdown={() => {
            lamp.set(
              Math.round(Math.random()) - 0.5 + Math.random() * 0.3 - 0.14,
            );
          }}
                >
                    <T.BoxGeometry args={[0.09, 0.14, 0.09]}/>
                </T.Mesh>
                <T.Group
                        position={[0.09, 0.09, -0.01]}
                        rotation={[0, 0, Math.PI / 2]}
                        scale={0.08}
                >
                    <T
                            is={gltf.nodes.Bone_1}
                            on:create={({ ref }) => {
              let relevant = ref.children[0];
              laptop.subscribe((x) => {
                relevant.rotation.z = -2 + 0.5 * (0.5 - x);
              });
            }}
                    />
                    <T.SkinnedMesh
                            geometry={gltf.nodes.Laptop001.geometry}
                            material={gltf.materials.Material}
                            skeleton={gltf.nodes.Laptop001.skeleton}
                    />
                </T.Group>

                <T.Mesh
                        position={[0.03, 0.1, -0.01]}
                        visible={false}
                        on:pointerenter={(event) => {
            const x = event.nativeEvent.movementY * 0.005;
            laptop.set(x);
          }}
                        on:pointerdown={() => {
            laptop.set(
              Math.round(Math.random()) - 0.5 + Math.random() * 0.3 - 0.14,
            );
          }}
                >
                    <T.BoxGeometry args={[0.13, 0.13, 0.13]}/>
                </T.Mesh>

                <T.Mesh
                        position={[0.25, 0.0, -0.04]}
                        visible={false}
                        on:pointerenter={(event) => {
            const x = event.nativeEvent.movementY * 0.005;
            chair.set(x);
          }}
                        on:pointerdown={() => {
            chair.set(
              Math.round(Math.random()) - 0.5 + Math.random() * 0.3 - 0.14,
            );
          }}
                >
                    <T.BoxGeometry args={[0.13, 0.13, 0.18]}/>
                </T.Mesh>

                <T.Group
                        position={[0.2, -0.13, -0.03]}
                        rotation={[0, 0.64, 0]}
                        scale={0.07}
                >
                    <T
                            on:create={({ ref }) => {
              let relevant = ref.children[0];
              chair.subscribe((x) => {
                relevant.rotation.z = -0.1 + 0.1 * (0.1 - x);
              });
            }}
                            is={gltf.nodes.Bone_2}
                    />

                    <T.SkinnedMesh
                            geometry={gltf.nodes.Chair001.geometry}
                            material={gltf.materials.Material}
                            skeleton={gltf.nodes.Chair001.skeleton}
                    />
                </T.Group>
                <T.Group
                        position={[0.01, 0.03, -0.18]}
                        rotation={[0, 0.47, 0]}
                        scale={0.05}
                >
                    <T
                            is={gltf.nodes.Bone_3}
                            on:create={({ ref }) => {
              let lower = ref.children[0];
              let upper = lower.children[0];
              lamp.subscribe((x) => {
                lower.rotation.z = 0.4 * (0.2 - x);
                upper.rotation.z = -1 - lower.rotation.z;
              });
            }}
                    />
                    <T.SkinnedMesh
                            geometry={gltf.nodes.Lamp001.geometry}
                            material={gltf.materials.Material}
                            skeleton={gltf.nodes.Lamp001.skeleton}
                    />
                </T.Group>
                <T.Mesh
                        on:create={({ ref }) => {
            deskMap = ref.material.emissiveMap;
          }}
                        geometry={gltf.nodes.Plane_003002.geometry}
                        material={gltf.materials.Material}
                />
                <T.Mesh
                        geometry={gltf.nodes.Plane_003002_1.geometry}
                        material={floorMaterial}
                />
            </T.Group>
            <T.PerspectiveCamera
                    makeDefault={true}
                    far={1000}
                    near={0.1}
                    fov={22.9}
                    position={[1.55, 0.54, 0.7]}
                    rotation={[-0.64, 1.06, 0.58]}
                    on:create={({ ref }) => {
          dampenedMousePos.subscribe(({ x, y }) => {
            ref.position.z = 0.5 * (x - 0.5);
            ref.position.y = 1.0 - 0.5 * (0.5 - y);
            ref.position.x = window.innerWidth < 500 ? 4 : 1.55;
            ref.lookAt(0, 0, 0);
          });
        }}
            />
        {:catch error}
            <slot name="error" {error}/>
        {/await}
    </T>
{/if}
