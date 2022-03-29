import boxModel from './boxModel';
import threeRenderer from './threeRenderer';

class BoxView
{
    constructor()
    {
        threeRenderer.addToScene(boxModel.model);
    }

    render()
    {
        threeRenderer.render();
    }

    resize(length,depth,width,open)
    {
        boxModel.resizeBox(length,width,depth,open);
    }

    remove()
    {
        threeRenderer.removeFromScene(boxModel.model);
    }

    appendRenderer(elementRef)
    {
        threeRenderer.appendRenderer(elementRef)
    }

    changeView(viewName)
    {
        boxModel.changeView(viewName);
    }

    changeMaterial(matrerialName)
    {
        boxModel.changeMaterial(matrerialName);
    }
}

const boxView = new BoxView();

export default boxView;