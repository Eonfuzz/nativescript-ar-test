
export class ARGrid extends SCNMaterial {

  static alloc(): SCNMaterial {
    const material = <SCNMaterial>super.alloc();
    
    let image = new UIImage({contentsOfFile: 'Grid'});
    material.diffuse.contents = image;
    material.diffuse.wrapS = SCNWrapMode.Repeat;
    material.diffuse.wrapT = SCNWrapMode.Repeat;

    return material;
  }

  updateGrid(anchor: ARPlaneAnchor) {
    const mmPerMeter = 1000;
    const mmOfImage = 65;
    const repeatAmount = mmPerMeter / mmOfImage;

    console.log("Update grid: ", anchor.extent.value);
    // grid.diffuse.contentsTransform = SCNMatrix4Scale(anchor.extent.value * repeatAmount, anchor.extent * repeatAmount, 1, 1);
  }
}