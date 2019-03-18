export  { VERSION } from './version';
export const NAME = "entropy-engine";
export { GraphicRenderer } from './rendering/GraphicRenderer';
export { CameraManager, CameraHolder } from './rendering/CameraManager';
export { MainLoop, LoopStartStep, SimStep, BeforeDrawStep, DrawStep, LoopEndStep } from './engine/MainLoop';
export { Monitor } from './observability/Monitor';
export { WorldModel } from './engine/WorldModel';
export { AbstractComponent } from './container/AbstractComponent';
export { Container } from './container/Container';
export { ComponentOptions, ComponentMixin } from './container/Component';
export { globalKeyHandler, globalMouseHandler } from './engine/globals';
export * from './utils/random';
export * from './utils/time';
export { PhysicalObjectOptions, PhysicalObject } from './model/PhysicalObject';
export { FocusManager } from './model/FocusManager';
export { SceneManager } from './rendering/SceneManager';

import { Builder } from './engine/Builder';
// import * as logging from './logging';

// const log = logging.createLoggerFromFilename(__filename);

export function builder(): Builder {
    return new Builder();
}
