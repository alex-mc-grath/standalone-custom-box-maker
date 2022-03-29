import * as THREE from "three";

class ThreeRenderer
{
  constructor()
  {
    //this.scene
    //this.camera

    this.lookPosition = [-15,-15,-15];
    this.cameraPosition = [3,15.5,5];
    this.viewName = "front";

    this.scene = new THREE.Scene();
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
    this.scene.add(ambientLight);

    this.directionalLight = new THREE.DirectionalLight(0xffffff, 0.7);
    this.directionalLight.position.set(200, 500, 300);
    this.scene.add(this.directionalLight); 

    // Setting up camera
    const aspectRatio = 1; //window.innerWidth / window.innerHeight;
    const cameraWidth = 100;
    const cameraHeight = cameraWidth / aspectRatio;

    this.camera = new THREE.OrthographicCamera(
      cameraWidth / -4.5, // left
      cameraWidth / 4.5, // right
      cameraHeight / 4, // top
      cameraHeight / -4, // bottom
      -100, // near plane
      500 // far plane
    );

    this.camera.position.set(3, 15.5, 5);
    //this.camera.lookAt(-100,-100,0);
    
    this.renderer = new THREE.WebGLRenderer({ antialias: true });
    this.renderer.setSize(512, 512);
    this.renderer.setClearColor(0x000000, 0);
  }

  appendRenderer(elementRef)
  {
    elementRef.current.appendChild(this.renderer.domElement);
  }

  addToScene(model)
  {
    this.scene.add(model);
  }

  removeFromScene(model)
  {
    this.scene.remove(model);
  }

  render()
  {
    this.camera.lookAt(...this.lookPosition);
    this.renderer.render(this.scene, this.camera);
  }

  lookAt(x,y,z)
  {
    this.lookPosition = [x, y, z];

    if(this.viewName==="front")
    {
      this.cameraPosition = [3,y+3.5,5];
      this.camera.position.set(...this.cameraPosition);
      this.lookPosition = [x, y, z];
    }
    else if(this.viewName==="back")
    {
      this.cameraPosition = [90,y+27,-136];
      this.camera.position.set(...this.cameraPosition);
      this.lookPosition = [-1, y, z];
    }
  }

  changeView(viewName)
  {
    this.viewName = viewName;

    if(viewName==="front")
    {
      //this.camera.position.set(220, 220, 220);
      //this.camera.position.set(3, 0, 5);//(10, 30, 20);

      this.directionalLight.position.set(200, 500, 300);
    }
    else if(viewName==="back")
    {
      //this.camera.position.set(100, 100, -220);
      //this.camera.position.set(90, 50, -120);
      //this.camera.lookAt(-this.lookPosition[0], this.lookPosition[1], this.lookPosition[2]);
      //this.render();

      //this.cameraPosition = [90, 50, -120];

      this.directionalLight.position.set(200, 500, -300);
    }
  }
}

const threeRenderer = new ThreeRenderer();

export default threeRenderer;