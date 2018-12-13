import { ARGrid } from "./grid.ios";


export class ARPlane extends SCNNode {


  private plane: SCNPlane;

  static init(anchor: ARPlaneAnchor): ARPlane {

    const result =  <ARPlane>super.alloc();
    
    result.plane = SCNPlane.planeWithWidthHeight(anchor.extent.value, anchor.extent.value);

    result.plane.cornerRadius = 0.008;
    result.plane.materials = NSArray.arrayWithArray([ARGrid.alloc()]);

    const planeNode = SCNNode.nodeWithGeometry(result.plane);
    planeNode.position = new SCNVector3();
    planeNode.position.x = anchor.center.value;
    planeNode.position.y = 0;
    planeNode.position.z = anchor.center.value;

    // Planes are vertical by default, rotate it.
    planeNode.eulerAngles.x = -Math.PI / 2;

    return result;
  }

  updateWith(anchor: ARPlaneAnchor) {
    this.plane.width =  anchor.extent.value;
    this.plane.height = anchor.extent.value;

    const grid = <ARGrid>this.plane.materials.firstObject;
    grid.updateGrid(anchor);

    // TODO how get x, y ,z?
    this.position = new SCNVector3();
    this.position.x = anchor.center.value;
    this.position.y = anchor.center.value;
    this.position.z = anchor.center.value;
  }
}