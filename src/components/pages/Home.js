import React, {useEffect, useState, useRef} from "react";
import material1 from '../../media/img/material1.png'
import material2 from '../../media/img/material2.png'
import material3 from '../../media/img/material3.png'

import boxView from "../layouts/boxView/boxView";
import Design from "../layouts/Design";

import StateSlider from "../layouts/ui/StateSlider.js";
import Sidebar from "../layouts/Sidebar";

import Header from "../layouts/Header";

import settings from '../../settings/appSettings.json';

const Home = () => {


// App-level state

const {quantityPresets} = settings;

const [appLevelState, setAppLevelState] = useState({...settings.initialState});

/*const setAppLevelState = (obj) => {
  console.log("setting appLevelState",obj);
  setAppLevelState_debug(obj);
}*/

  const canvasHolder = useRef()

// eslint-disable-next-line
  const [materialFormState, setMaterialFormState] = useState('white')

  // eslint-disable-next-line
  const [alertError, setAlertError] = useState('')



  useEffect(()=>{
    boxView.appendRenderer(canvasHolder);
    boxView.render();

    setAppLevelState({...appLevelState, price:computePrice(appLevelState)});
     // eslint-disable-next-line
  },[])


const validateBoxSize = (length, width, depth) => {
  let error = '';

  //all tests for errors
  if(isNaN(length))
  {
    error = "Length must be a number.";
  }
  else if(isNaN(width))
  {
    error = "Width must be a number.";
  }
  else if(isNaN(depth))
  {
    error = "Depth must be a number.";
  }
  else if(length < 3 || length > 21)
  {
    error = "Length must be between 3 and 21";
  }
  else if(width < 2 || width > 20)
  {
    error = "Width must be between 2 and 20";
  }
  else if(depth < 1 || depth > 6)
  {
    error = "Depth must be between 1 and 6";
  }
  else if(length > depth*7)
  {
    error = "For optimal structural integrity, your length cannot be 7 times bigger than its depth.";
  }
  else if(depth > width+0.001)
  {
    error = "For structural integrity, the width must be greater than or equal to the depth.";
  }

  return error;
}

// eslint-disable-next-line
const onBoxSizeChange = ({target}) => {

  let newState = {...appLevelState};
  newState.sizeForm[target.name] = target.value;

  let length = parseFloat(newState.sizeForm.length);
  let width = parseFloat(newState.sizeForm.width);
  let depth = parseFloat(newState.sizeForm.depth);

  let error = validateBoxSize(length,width,depth);

  if(error !== '')
  {
    newState.errors.dimensions = error;
    setAppLevelState(newState);
    return;
  }

  newState.sizeForm.length = length;
  newState.sizeForm.width = width;
  newState.sizeForm.depth = depth;

  
  newState.price = computePrice(newState);
  newState.errors.dimensions = '';

  setAppLevelState(newState);

  boxView.resize(newState.sizeForm.length,newState.sizeForm.width,newState.sizeForm.depth, newState.boxPerspective.open);

}

const onIncrementSize = (propertyName, increment) => {
  let newState = {...appLevelState};
  newState.sizeForm[propertyName] += increment;

  let length = parseFloat(newState.sizeForm.length);
  let width = parseFloat(newState.sizeForm.width);
  let depth = parseFloat(newState.sizeForm.depth);

  let error = validateBoxSize(length,width,depth);

  if(error !== '')
  {
    newState.errors.dimensions = error;
    setAppLevelState(newState);
    return;
  }

  newState.sizeForm.length = length;
  newState.sizeForm.width = width;
  newState.sizeForm.depth = depth;

  newState.price = computePrice(newState);
  newState.errors.dimensions = '';

  setAppLevelState(newState);

  boxView.resize(appLevelState.sizeForm.length,appLevelState.sizeForm.width,appLevelState.sizeForm.depth, appLevelState.boxPerspective.open);
}

const onBoxOpenChange = () => {
  
  let newValue = !appLevelState.boxPerspective.open;
  setAppLevelState({...appLevelState, boxPerspective: {...appLevelState.boxPerspective, open:newValue}});

  boxView.resize(appLevelState.sizeForm.length,appLevelState.sizeForm.width,appLevelState.sizeForm.depth, newValue);
}

const onBoxViewChange = ({target}) => {
  setAppLevelState({...appLevelState, boxPerspective: {...appLevelState.boxPerspective, boxView:target.value}});
  boxView.changeView(target.value);
  boxView.resize(appLevelState.sizeForm.length,appLevelState.sizeForm.width,appLevelState.sizeForm.depth, appLevelState.boxPerspective.open);
}


const materialChangeHandler = (materialName) => {
    let newData = {...appLevelState, materialSelected : materialName};
    newData.price = computePrice(newData);
    setAppLevelState(newData);
    boxView.changeMaterial(materialName);
    boxView.resize(appLevelState.sizeForm.length,appLevelState.sizeForm.width,appLevelState.sizeForm.depth, appLevelState.boxPerspective.open);
  }
  
  const onQuantityChange = ({target}) => {

    let newState = {...appLevelState};
    newState.quantity = target.value;

    let quantity = parseInt(target.value);
    let error = '';

    if(isNaN(quantity))
    {
      error = 'Quantity must be a number.';
    }
    else if(target.value !== quantity.toString())
    {
      error = 'Quantity must be a whole number';
    }
    else if(quantity <= 0)
    {
      error = 'Quantity must be larger than zero.';
    }
    else if(quantity > 2000)
    {
      error = 'Please contact us for orders larger than 2000 units.';
    }

    if(error !== '')
    {
      newState.errors.quantity = error;
      setAppLevelState(newState);
      return;
    }

    newState.quantity = quantity;
    newState.price = computePrice(newState);
    newState.errors.quantity = '';

    setAppLevelState(newState);
  }
  
  const computePrice = (data) => {

    let quantity = data.quantity;

    let discountMultiplier = 1;

    let {discountMap} = settings;

    if(quantity >= discountMap[discountMap.length-1].quantity)
    {
      discountMultiplier = discountMap[discountMap.length-1].multiplier;
    }
    else
    {
      for(let i=discountMap.length-1; i>=0; i--)
      {
        if(quantity >= discountMap[i]["quantity"])
        {
          discountMultiplier = discountMap[i]["multiplier"] + (discountMap[i+1]["multiplier"]-discountMap[i]["multiplier"])*(quantity-discountMap[i]["quantity"])/(discountMap[i+1]["quantity"] - discountMap[i]["quantity"]);
          break;
        }
      }
    }

    let L = data.sizeForm.length;
    let W = data.sizeForm.width;
    let D = data.sizeForm.depth

    const formula = settings.basePriceFunction[data.materialSelected];

    let unitPriceBase = eval(formula);//(0.0085*data.sizeForm.length*data.sizeForm.width*data.sizeForm.depth + 42.77);
    let unitPrice = unitPriceBase*discountMultiplier;
    unitPrice = Math.ceil(unitPrice/0.05)*0.05 - 0.01;
    let totalPrice = unitPrice*data.quantity;

    let byQuantity = [];
    for(let i=0; i<quantityPresets.length;i++)
    {
      byQuantity.push((Math.ceil((unitPriceBase*quantityPresets[i]["multiplier"])/0.05)*0.05 - 0.01).toFixed(2));
    }

    return {"unit":unitPrice, "subtotal": totalPrice, byQuantity};

  }

  const resetAll = () => {
    let newState = {...settings.initialState};
    newState.price = computePrice(newState);
    setAppLevelState(newState);
    boxView.changeView("front");
    boxView.changeMaterial(newState.materialSelected);
    boxView.resize(newState.sizeForm.length,newState.sizeForm.width,newState.sizeForm.depth, newState.boxPerspective.open);
  }
  
  const onUpdateSizeClick = () => {
    setAppLevelState({...appLevelState, price: computePrice(appLevelState)});
    boxView.resize(appLevelState.sizeForm.length,appLevelState.sizeForm.width,appLevelState.sizeForm.depth, appLevelState.boxPerspective.open);
  }

  const onStockSizeOptionClick = ([length, width, depth], selectedStockSize) => {

    let newState = {...appLevelState, sizeForm: {...appLevelState.sizeForm, 
      selectedStockSize,
      length,
      width,
      depth
    }};

    newState.price = computePrice(newState);
  
    setAppLevelState(newState);

    boxView.resize(length,width,depth, appLevelState.boxPerspective.open);
  }

  const {stockSizeOptions} = settings;


  const sizeFormHandle = (value) => {
    setAppLevelState({...appLevelState, sizeForm: {...appLevelState.sizeForm, displayedSizeForm:value}})
  }

  const onCheckoutClick = async () => {
    alert("this is not a real store so you cannot checkout");
  }


  return (
    <div className="homepage">
      <Header />
      
      {/*{JSON.stringify({checkout})}
      <hr/>
      {JSON.stringify({products})}
      <hr/>*/}

      <div className="hero-header">
        <div className="container">

          <div className="select-size column">

            {/* <img className="sidebar" src={image2} alt="" /> */}
            <Sidebar displayedForm={appLevelState.displayedForm} appLevelState={appLevelState} setAppLevelState={setAppLevelState} appSettings={settings}/>
            
            {appLevelState.displayedForm === 'size' && 
            <>
              <div className={`card ${appLevelState.sizeForm.displayedSizeForm === 'stock size'  ? 'open' : ''}`}>
                <div className="row" onClick={()=> sizeFormHandle('stock size')}>
                  <p>Select stock size</p><span className="icon"><i className="fa-solid fa-ruler-triangle"/><i className="fa fa-caret-down"/></span>
                </div>
                {appLevelState.sizeForm.displayedSizeForm === 'stock size' && <>
                <div className="stock-size-options">
                {stockSizeOptions.map((option,index)=>
                <button key={"stockSizeOptions_"+index} className={appLevelState.sizeForm.selectedStockSize === index ? 'option-selected' : ''} onClick={() => onStockSizeOptionClick(option, index)}>
                    {option[0]}" x {option[1]}" x {option[2]}"
                </button>)}
                </div>
                </>}
              </div>
              
              <div className={`card custom-size-card ${appLevelState.sizeForm.displayedSizeForm === 'custom size' ? 'open' : ''}`}>
              <div className="row" onClick={()=> sizeFormHandle('custom size')}><p>Create custom size</p><span className="icon">+</span></div>
              {appLevelState.sizeForm.displayedSizeForm === 'custom size' &&
              <>
                 <ul>
                  <li>Length <div className="custom-input"><input onChange={onBoxSizeChange} name="length" type="number" step="0.01" value={appLevelState.sizeForm.length} /><div className="buttons-box"><button onClick={()=>onIncrementSize("length",1)}>+</button><button onClick={()=>onIncrementSize("length",-1)}>-</button></div></div></li>
                  <li>Width <div className="custom-input"><input onChange={onBoxSizeChange} name="width" type="number" step="0.01" value={appLevelState.sizeForm.width} /><div className="buttons-box"><button onClick={()=>onIncrementSize("width",1)}>+</button><button  onClick={()=>onIncrementSize("width",-1)}>-</button></div></div></li>
                  <li>Depth <div className="custom-input"><input onChange={onBoxSizeChange} name="depth" type="number" step="0.01" value={appLevelState.sizeForm.depth} /><div className="buttons-box"><button onClick={()=>onIncrementSize("depth",1)}>+</button><button  onClick={()=>onIncrementSize("depth",-1)}>-</button></div></div></li>
                </ul>

                {appLevelState.errors.dimensions !== '' && 
                  <>
                    <div className="alert-box">{appLevelState.errors.dimensions}</div>
                  </>
                }
              </>
              }
              </div>

              <p className="details">
                All sizes are listed as interior dimensions in inches.
                <br/>
                {/*<br/>
                Not sure what size you need? <span className="blue bold underline">Let us help.</span>*/}
              </p>
            </>}
            
            {/* material */}
            
            {appLevelState.displayedForm === 'material' &&
            <>
              <div className="select-material card open">
                  <div className="row"><p>Select your material</p></div>
                  
                  <button value='white' onClick={() => materialChangeHandler('white')} className={`material-option ${appLevelState.materialSelected === 'white' ? 'material-option-selected' : ''}`}>
                    <div className="material-name"><img src={material1} alt="" /><h3>White</h3></div>
                    <p className="material-desc">Classic matte white cardboard printed with a satin finish.</p>
                  </button>
                  <button value='dreamcoat' onClick={() => materialChangeHandler('dreamcoat')} className={`material-option ${appLevelState.materialSelected === 'dreamcoat' ? 'material-option-selected' : ''}`}>
                    <div className="material-name"><img src={material2} alt="" /><h3>Dreamcoat</h3></div>
                    <p className="material-desc">Premium bright white cardboard.</p>
                  </button>
                  <button value='kraft' onClick={() => materialChangeHandler('kraft')} className={`material-option ${appLevelState.materialSelected === 'kraft' ? 'material-option-selected' : ''}`}>
                    <div className="material-name"><img src={material3} alt="" /><h3>Kraft</h3></div>
                    <p className="material-desc">Natural matte brown cardboard printed with a satin finish.</p>
                  </button>
              </div>

            {materialFormState === 'kraft' &&<>Print on Kraft will appear muted because it is brown in color. Learn more</>}

            </>}
            

            {/* design */}

            {appLevelState.displayedForm === 'design' && 
            <Design 
            appLevelState={appLevelState}
            setAppLevelState={setAppLevelState}
             />}


            {/* quantity */}

            {appLevelState.displayedForm === 'quantity' && <div className="card quantity-card open"><div className="row"><p>Select quantity</p> <span className="">Unit price</span></div>
            {quantityPresets.map((quantityPreset, index)=>
               <button className={appLevelState.quantity === quantityPreset.quanity ? 'option-selected' : ''} onClick={() => onQuantityChange({"target":{"value":quantityPreset.quanity.toString()}})}>
               <div className="left">{quantityPreset.text}</div><div className="right">{appLevelState.price.byQuantity[index]}</div>
             </button>
            )}
            </div>}


            {/* reset */}

            {appLevelState.displayedForm === 'reset' && 
              <>
                <div className="resetbox">
                  <p>Reset artwork will permanently discard unsaved changes to the artwork, text, and color of your design.</p>
                  <button>Reset Artwork</button>
                </div>
                <div className="resetbox">
                  <p>Reset all will permanently discard unsaved changes to dimensions, material, quantity, artwork, text, and color.</p>
                  <button onClick={resetAll}>Reset All</button>
                </div>
              </>}

          </div>
          



          <div className="size-preview column">
            <div className="side-selector">
              <p>Select side:</p>
              {/* <div className="dropdown"><p>Left <i className="fa fa-caret-down"/></p></div> */}
                <select className="dropdown" value={appLevelState.boxPerspective.boxView} onChange={onBoxViewChange}>
                    <option value="front">front</option>
                    <option value="back">back</option>
                </select>

            </div>
            <div className="render-box">
              <div ref={canvasHolder}></div>
              <div className="open-close-slider">
                <StateSlider onChangeFunction={onBoxOpenChange} currentBoolValue={appLevelState.boxPerspective.open}/>
              </div>
            </div>
          </div>



          <div className="shipping column">

            <div className="shipping-box">
              <h3>Shipping Box</h3>
              <p className="description">
                A strong and economical box in kraft corrugated cardboard that provides extra protection in the mail.
              </p>
              <ul>
                <li><span className="label">Size</span><span className="value">{appLevelState.sizeForm.length}" x {appLevelState.sizeForm.width}" x {appLevelState.sizeForm.depth}"</span></li>
                <li><span className="label">Material</span><span className="value">{appLevelState.materialSelected}</span></li>
                <li>
                  <span className="label">Quantity</span>
                  <div className="custom-input2" style={{display:"block"}}>
                    <input type='number' step="1" className="custom-input2" value={appLevelState.quantity} onChange={onQuantityChange}></input>
                    {appLevelState.errors.quantity !== '' && <p style={{color: "red", transform: "translateX(2rem)"}}>{appLevelState.errors.quantity}</p>}
                  </div>
                </li>
                <li><span className="label">Unit Price</span><span className="value">${appLevelState.price.unit.toFixed(2)}</span></li>
              </ul>
            </div>
              <div className="subtotal"><span className="label">Subtotal</span><span className="value">${appLevelState.price.subtotal.toFixed(2)}</span></div>
              <button className="checkout" disabled={appLevelState.errors.quantity !== '' && appLevelState.errors.dimensions !== ''} onClick={onCheckoutClick}>Checkout</button>
          </div>
        </div>
       
      </div>
      
    </div>
  );
};

export default Home;