import { ARSceneManager } from "./scene-manager.ios";

export class ARKitTest extends UIViewController {

  private sceneView: ARSCNView;
  private sceneManager: ARSceneManager;

  static alloc(): ARKitTest {
    return <ARKitTest>super.alloc();
  }

  viewDidLoad() {
    super.viewDidLoad();

    this.sceneManager = ARSceneManager.alloc();
    this.sceneManager.attach(this.sceneView);
  }
} 