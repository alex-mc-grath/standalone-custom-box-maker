
import * as THREE from "three";
import threeRenderer from './threeRenderer';
import topSide from '../../../media/img/topSide.png';
import kraftTexture from '../../../media/img/kraft.png';
import glossTexture from '../../../media/img/gloss.png';
import frontNormal from  '../../../media/img/frontNormal.png';
import frontKraft from  '../../../media/img/frontKraft.png';
import frontWhite from  '../../../media/img/frontWhite.png';

class BoxModel
{
    constructor()
    {
        this.model = null;

        const textureLoader = new THREE.TextureLoader();

        this.texture1 = textureLoader.load(topSide, () => {threeRenderer.render();});
        this.frontNormalTexture = textureLoader.load(frontNormal, () => {threeRenderer.render();});

        this.kraftTexture = textureLoader.load(kraftTexture);
        this.frontKraftTexture = textureLoader.load(frontKraft);

        this.glossTexture = textureLoader.load(glossTexture);
        this.frontGlossTexture = textureLoader.load(frontWhite);

        this.currentTexture = this.texture1;
        this.currentFrontTexture = this.frontNormalTexture;

        this.view = "front";

        this.bottomSide = null;
        this.leftSide = null;
        this.backSide = null;
        this.frontSide = null;
        this.rightSide = null;
        this.topSide = null;
        this.cover = null;
        this.rightFlap = null;
        this.leftFlap = null;

        this.currentBox = null;
        this.newBox = null;
        this.oldLookAt = {};
        this.newLookAt = {};

        this.setupFirstBox(50, 20 ,34, true);

        this.prevTime = (new Date()).getTime();
        this.oldBoxPosition = 0;
        this.newBoxPosition = 70;

        this.positionMulitplier = 1;

        this.animating = false;
    }

    setupFirstBox(length,depth,width,open)
    {
        let modelData = this.createBox(length,depth,width,open)

        this.model = modelData.model;
        this.currentBox = modelData.model;
        threeRenderer.lookAt(modelData.lookAt.x, modelData.lookAt.y, modelData.lookAt.z);
        this.newLookAt = {x:modelData.lookAt.x, y: modelData.lookAt.y, z:modelData.lookAt.z};

        threeRenderer.addToScene(this.model);

        threeRenderer.render();
    }

    changeView(viewName)
    {
        threeRenderer.changeView(viewName);
        if(viewName === "front")
        {
            this.positionMulitplier = 1;
        }
        else if(viewName === "back")
        {
            this.positionMulitplier = -1;
        }
    }


    changeMaterial(materialName)
    {
        if(materialName === "white")
        {
            this.currentTexture = this.texture1;
            this.currentFrontTexture = this.frontNormalTexture;
        }
        else if(materialName === "kraft")
        {
            this.currentTexture = this.kraftTexture;
            this.currentFrontTexture = this.frontKraftTexture;
        }
        else if(materialName === "dreamcoat")
        {
            this.currentTexture = this.glossTexture;
            this.currentFrontTexture = this.frontGlossTexture;
        }
    }

    createBox(length,depth,width,open)
    {
        let max = Math.max(length,Math.max(depth,width));
        length = 30*length/max;
        depth = 30*depth/max;
        width=30*width/max;

        let newModel = new THREE.Group();

        this.bottomSide = new THREE.Mesh(
            new THREE.BoxBufferGeometry(length, 0.5, width),[
                new THREE.MeshLambertMaterial({ map: this.currentTexture }),
                new THREE.MeshLambertMaterial({ map: this.currentTexture }),
                new THREE.MeshLambertMaterial({ map: this.currentTexture }),
                new THREE.MeshLambertMaterial({ map: this.currentTexture }),
                new THREE.MeshLambertMaterial({ map: this.currentTexture }),
                new THREE.MeshLambertMaterial({ map: this.currentTexture })
            ]
        );


        this.leftSide = new THREE.Mesh(
            new THREE.BoxBufferGeometry(0.5, depth, width),[
                new THREE.MeshLambertMaterial({ map: this.currentTexture }),
                new THREE.MeshLambertMaterial({ map: this.currentTexture }),
                new THREE.MeshLambertMaterial({ map: this.currentTexture }),
                new THREE.MeshLambertMaterial({ map: this.currentTexture }),
                new THREE.MeshLambertMaterial({ map: this.currentTexture }),
                new THREE.MeshLambertMaterial({ map: this.currentTexture })
            ]
        );
        this.leftSide.position.x = -(length/2);
        this.leftSide.position.y = depth/2;


        this.rightSide = new THREE.Mesh(
            new THREE.BoxBufferGeometry(0.5, depth, width),[
                new THREE.MeshLambertMaterial({ map: this.currentTexture }),
                new THREE.MeshLambertMaterial({ map: this.currentTexture }),
                new THREE.MeshLambertMaterial({ map: this.currentTexture }),
                new THREE.MeshLambertMaterial({ map: this.currentTexture }),
                new THREE.MeshLambertMaterial({ map: this.currentTexture }),
                new THREE.MeshLambertMaterial({ map: this.currentTexture })
            ]
        );
        this.rightSide.position.x = length/2;
        this.rightSide.position.y = depth/2;

        this.backSide = new THREE.Mesh(
            new THREE.BoxBufferGeometry(length, depth, 0.5),[
                new THREE.MeshLambertMaterial({ map: this.currentTexture }),
                new THREE.MeshLambertMaterial({ map: this.currentTexture }),
                new THREE.MeshLambertMaterial({ map: this.currentTexture }),
                new THREE.MeshLambertMaterial({ map: this.currentTexture }),
                new THREE.MeshLambertMaterial({ map: this.currentTexture }),
                new THREE.MeshLambertMaterial({ map: this.currentTexture })
            ]
        );
        this.backSide.position.x = 0;
        this.backSide.position.y = depth/2;
        this.backSide.position.z = -(width/2);


        if(!open)
        {
            this.frontSide = new THREE.Mesh(
                new THREE.BoxBufferGeometry(length, depth, 0.5),[
                    new THREE.MeshLambertMaterial({ map: this.currentTexture }),
                    new THREE.MeshLambertMaterial({ map: this.currentTexture }),
                    new THREE.MeshLambertMaterial({ map: this.currentTexture }),
                    new THREE.MeshLambertMaterial({ map: this.currentTexture }),
                    new THREE.MeshLambertMaterial({ map: this.currentTexture }),
                    new THREE.MeshLambertMaterial({ map: this.currentTexture })
                ]
            );
        }
        else
        {
            this.frontSide = new THREE.Mesh(
                new THREE.BoxBufferGeometry(length, depth, 0.5),[
                    new THREE.MeshLambertMaterial({ map: this.currentFrontTexture }),
                    new THREE.MeshLambertMaterial({ map: this.currentFrontTexture }),
                    new THREE.MeshLambertMaterial({ map: this.currentFrontTexture }),
                    new THREE.MeshLambertMaterial({ map: this.currentFrontTexture }),
                    new THREE.MeshLambertMaterial({ map: this.currentFrontTexture }),
                    new THREE.MeshLambertMaterial({ map: this.currentFrontTexture })
                ]
            );
        }

        this.frontSide.position.x = 0;
        this.frontSide.position.y = depth/2;
        this.frontSide.position.z = width/2;


        let lookAtPosition = {};


        if(!open)
        {
            this.topSide = new THREE.Mesh(
                new THREE.BoxBufferGeometry(length, 0.5, width),[
                    new THREE.MeshLambertMaterial({ map: this.currentTexture }),
                    new THREE.MeshLambertMaterial({ map: this.currentTexture }),
                    new THREE.MeshLambertMaterial({ map: this.currentFrontTexture }),
                    new THREE.MeshLambertMaterial({ map: this.currentTexture }),
                    new THREE.MeshLambertMaterial({ map: this.currentTexture }),
                    new THREE.MeshLambertMaterial({ map: this.currentTexture })
                ]
            );
            this.topSide.position.y = depth;//20;
        }
        else
        {

            this.topSide = new THREE.Mesh(
                new THREE.BoxBufferGeometry(length, 0.5, width),[
                    new THREE.MeshLambertMaterial({ map: this.currentTexture }),
                    new THREE.MeshLambertMaterial({ map: this.currentTexture }),
                    new THREE.MeshLambertMaterial({ map: this.currentTexture }),
                    new THREE.MeshLambertMaterial({ map: this.currentTexture }),
                    new THREE.MeshLambertMaterial({ map: this.currentTexture }),
                    new THREE.MeshLambertMaterial({ map: this.currentTexture })
                ]
            );
            this.topSide.position.y = depth+(width/2)/2;//20;
            this.topSide.position.z = -(width/2)-(width/2)*0.866;//-17;
            this.topSide.rotation.x = THREE.Math.degToRad(30);


            this.cover = new THREE.Mesh(
                new THREE.BoxBufferGeometry(length, depth, 0.5),[
                    new THREE.MeshLambertMaterial({ map: this.currentTexture }),
                    new THREE.MeshLambertMaterial({ map: this.currentTexture }),
                    new THREE.MeshLambertMaterial({ map: this.currentTexture }),
                    new THREE.MeshLambertMaterial({ map: this.currentTexture }),
                    new THREE.MeshLambertMaterial({ map: this.currentTexture }),
                    new THREE.MeshLambertMaterial({ map: this.currentTexture })
                ]
            );
            this.cover.position.y = depth+depth/2+width/2;//20;
            this.cover.position.z = -(width/2)-width*0.866;//-17;



           this.rightFlap = new THREE.Mesh(
                new THREE.CylinderGeometry(depth,depth,0.5,length/2,1,false,0,Math.PI/2),[
                    new THREE.MeshLambertMaterial({ map: this.currentTexture }),
                    new THREE.MeshLambertMaterial({ map: this.currentTexture }),
                    new THREE.MeshLambertMaterial({ map: this.currentTexture })
                ]
            );
            this.rightFlap.position.x = length/2;
            this.rightFlap.position.y = depth +width/2;
            this.rightFlap.position.z = -(width/2) -width*0.866;
            this.rightFlap.rotation.x = THREE.Math.degToRad(-90);
            this.rightFlap.rotation.z = THREE.Math.degToRad(-15);

            /*this.leftFlap = new THREE.Mesh(
                new THREE.CylinderGeometry(depth,depth,0.5,length/2,1,false,0,Math.PI/2),[
                    new THREE.MeshLambertMaterial({ map: this.currentTexture }),
                    new THREE.MeshLambertMaterial({ map: this.currentTexture }),
                    new THREE.MeshLambertMaterial({ map: this.currentTexture })
                ]
            );
            this.leftFlap.position.x = -length/2;
            this.leftFlap.position.y = depth +width/2;
            this.leftFlap.position.z = -(width/2) -width*0.866;
            this.leftFlap.rotation.x = THREE.Math.degToRad(-90);
            this.leftFlap.rotation.y = THREE.Math.degToRad(-90);*/

            this.leftFlap = new THREE.Mesh(
                new THREE.CylinderGeometry(depth,depth,0.5,length/2,1,false,0,Math.PI/2),[
                    new THREE.MeshLambertMaterial({ map: this.currentTexture }),
                    new THREE.MeshLambertMaterial({ map: this.currentTexture }),
                    new THREE.MeshLambertMaterial({ map: this.currentTexture })
                ]
            );
            this.leftFlap.position.x = -length/2;
            this.leftFlap.position.y = depth +width/2;
            this.leftFlap.position.z = -(width/2) -width*0.866;
            this.leftFlap.rotation.x = THREE.Math.degToRad(-90);
            this.leftFlap.rotation.z = THREE.Math.degToRad(-165);

            //threeRenderer.lookAt(length/2, (depth+this.cover.position.y)*0.40, this.cover.position.z/2);
        }


        newModel.add(this.bottomSide);
        newModel.add(this.leftSide);
        newModel.add(this.backSide);
        newModel.add(this.frontSide);
        newModel.add(this.rightSide);
        newModel.add(this.topSide);

        if(open)
        {
            newModel.add(this.cover);
            newModel.add(this.rightFlap);
            newModel.add(this.leftFlap);
        }

        return {model: newModel, lookAt: {x:0,y:depth,z:0}};
    }


    resizeBox(length,depth,width,open)
    {

        if(this.animating)
        {
            threeRenderer.removeFromScene(this.model);
            this.model = this.newBox;
        }

        this.prevTime = (new Date()).getTime();
        this.oldBoxPosition = 0;
        this.newBoxPosition = 70;

        let boxData = this.createBox(length,depth,width,open);

        this.newBox = boxData.model;
        this.newBox.position.z = -70;
        this.newBox.position.x = 70;

        this.oldLookAt = this.newLookAt;
        this.newLookAt = {x:boxData.lookAt.x, y: boxData.lookAt.y, z:boxData.lookAt.z};

        threeRenderer.addToScene(boxData.model);

        if(!this.animating)
        {
            this.animating = true;
            this.boxAnimation();
        }
    }


    boxAnimation()
    {
        let moveVectorOld = Math.max((70-this.oldBoxPosition)*7,7);
        let moveVectorNew = Math.max(this.newBoxPosition*7,7);

        let newTime = (new Date()).getTime();
        let deltaTime = ((newTime-this.prevTime)/1000);

        this.oldBoxPosition += moveVectorOld*deltaTime;
        this.newBoxPosition -= moveVectorNew*deltaTime;
        let fraction = (70-this.newBoxPosition)/70;

        this.prevTime = newTime;

        if(this.newBoxPosition > 0)
        {
            threeRenderer.lookAt(
                this.newLookAt.x*fraction + this.oldLookAt.x*(1-fraction), 
                this.newLookAt.y*fraction + this.oldLookAt.y*(1-fraction), 
                this.newLookAt.z*fraction + this.oldLookAt.z*(1-fraction)
            );

            this.model.position.z = this.oldBoxPosition;
            this.model.position.x = -this.positionMulitplier*this.oldBoxPosition;

            this.newBox.position.z = -this.newBoxPosition;
            this.newBox.position.x = this.positionMulitplier*this.newBoxPosition;

            requestAnimationFrame(this.boxAnimation.bind(this));
        }
        else
        {
            threeRenderer.lookAt(this.newLookAt.x, this.newLookAt.y, this.newLookAt.z);

            this.newBox.position.z = 0;
            this.newBox.position.x = 0;

            threeRenderer.removeFromScene(this.model);

            this.model = this.newBox;
            this.animating = false;
        }


        threeRenderer.render();
    }
}

const boxModel = new BoxModel();

export default boxModel;
