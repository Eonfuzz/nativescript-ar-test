import { ARPlane } from "./plane.ios";

export class ARSceneManager extends NSObject implements ARSCNViewDelegate {

  private planes = new Map<NSUUID, ARPlane>();
  private sceneView?: ARSCNView;
  private configuration = new ARWorldTrackingConfiguration();

  private showPlanes = true;

  static alloc(): ARSceneManager {
    return <ARSceneManager>super.alloc();
  }

  public attach(sceneView: ARSCNView) {
    this.sceneView = sceneView;
    this.sceneView.autoenablesDefaultLighting = true;

    this.sceneView.delegate = this;

    this.startPlaneDetection();
    this.configuration.lightEstimationEnabled = true;

    const gravity = new SCNVector3();
    gravity.x = 0;
    gravity.y = -3;
    gravity.z = 0;

    this.sceneView.scene.physicsWorld.gravity = gravity;
  }

  public startPlaneDetection() {
    this.configuration.planeDetection = ARPlaneDetection.Vertical;
    this.sceneView.session.runWithConfiguration(this.configuration);
  }

  public stopPlaneDetection() {
    this.configuration.planeDetection = ARPlaneDetection.None;
    this.sceneView.session.runWithConfiguration(this.configuration);
  }

  rendererDidAddNodeForAnchor(renderer: SCNSceneRenderer, node: SCNNode, anchor: ARAnchor) {
    if (anchor instanceof ARPlaneAnchor) {
      const plane = ARPlane.init(anchor);
      plane.opacity = this.showPlanes ? 1 : 0;

      // Reference to the plane
      this.planes.set(anchor.identifier, plane);

      node.addChildNode(plane);
    }
  }

  rendererDidUpdateNodeForAnchor(renderer: SCNSceneRenderer, node: SCNNode, anchor: ARAnchor) {
    if (anchor instanceof ARPlaneAnchor) {
      const plane = this.planes.get(anchor.identifier);
      plane.updateWith(anchor);
    }
  }

  rendererDidRemoveNodeForAnchor(renderer: SCNSceneRenderer, node: SCNNode, anchor: ARAnchor) {
    this.planes.delete(anchor.identifier);
  }
}