import { SimulationModule, MainLoop } from "./MainLoop";
import { Containable } from "./Containable";
import { Container } from "./Container";
import { HelloWorldCube } from "./HelloWorldCube";
import { randReal } from "./random";
import { WorldModel } from "./WorldModel";
import { GraphicRenderer } from "./GraphicRenderer";
import { Monitor } from "./Monitor";


export class HelloWorldSimulation implements SimulationModule, Containable {

    resolve(key: Function) {
        return this.container.resolve(key);
    }

    private container: Container;

    constructor(container: Container) {
        this.container = container;
    }

    begin(timestamp: number, frameDelta: number): void {
       
    }  

    update(simulationTimestep: number): void {
        let i = 30;
        while (i > 0) {
            let object3d: HelloWorldCube; 
            object3d = new HelloWorldCube();
            const material: THREE.MeshBasicMaterial = (<THREE.MeshBasicMaterial>object3d.material);
            material.color.setRGB(randReal(0,1), randReal(0,1), randReal(0,1));
            object3d.position.set(randReal(-5, 5), randReal(-5, 5), randReal(-5, 5));
            this.resolve(WorldModel).addObject3D(object3d);
            i--;
        }
    }

    draw(interpolationPercentage: number): void {
        this.resolve(GraphicRenderer).render();
    }

    end(fps: number, panic: boolean): void {
        this.resolve(Monitor).render_debug(0);
        if (this.resolve(WorldModel).objectCount() > 10000) {
            this.resolve(MainLoop).stop();
        }
    }

}
