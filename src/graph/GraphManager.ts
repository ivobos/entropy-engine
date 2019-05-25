import { AbstractComponent } from "../container/AbstractComponent";
import { ComponentOptions } from "../container/Component";
import { CameraHolder } from "../rendering/CameraManager";
import { FunctionGraphOperation, GraphObjectVisitFunction, GraphOperation } from "./graph-operation";
import { graphNodeInit } from "./node/graph-node";
import { GraphObject, GraphObjectOptions } from "./node/object/graph-object";
import { physicalObjectInit } from "./node/object/concerns/physics";
import { boundingRadiusInit } from "./node/object/concerns/collision";
import { selectableObjectInit } from "./node/object/concerns/selection";
import { renderableObjectInit } from "./node/object/concerns/presentation";
import { simObjectInit } from "./node/object/concerns/simulation";

export class GraphManager extends AbstractComponent {

    private cameraHolder?: CameraHolder;
    private scheduledForRemoval: GraphObject[] = [];

    constructor(options: ComponentOptions) {
        super({...options, key: GraphManager});
    }   

    setCameraHolder(cameraHolder: CameraHolder) {
        this.cameraHolder = cameraHolder;
    }

    getCameraHolder() : CameraHolder | undefined {
        return this.cameraHolder;
    }

    createEntity(options: GraphObjectOptions): GraphObject {
        const graphObject = graphNodeInit(options);
        physicalObjectInit(graphObject, options);
        boundingRadiusInit(graphObject, options);        
        selectableObjectInit(graphObject, options);
        renderableObjectInit(graphObject, options);
        simObjectInit(graphObject, options);
        return graphObject as GraphObject;
    }

    removeEntity(graphObject: GraphObject): void {
        this.scheduledForRemoval.push(graphObject);
    }

    removeScheduledEntities(): void {
        this.scheduledForRemoval.forEach(element => {
           if (element.childObjects.length > 0) throw Error("has child objects"); 
           element.parentObject.removeChildObject(element);
        });
        this.scheduledForRemoval = [];
    }

    accept(visitor: GraphOperation): void {
        const cameraHolder = this.getCameraHolder() as GraphObject;
        if (cameraHolder) {
            cameraHolder.accept(visitor);
        }
    }

    visit(visitFunction: GraphObjectVisitFunction): void {
        this.accept(new FunctionGraphOperation(visitFunction));
    }

    exec<T extends GraphOperation>(operation: T): T {
        this.accept(operation);
        operation.end();
        return operation;
    }

}