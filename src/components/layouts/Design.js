import React,{useState} from 'react'
import { SketchPicker } from 'react-color';


const Design = ({appLevelState : {designForm}, appLevelState, setAppLevelState}) => {

const [background, setBackground] = useState({})

const handleChange = (color, event) => {
  setBackground(color)
}

  const clickHandler = (value) => {
    setAppLevelState({
      ...appLevelState, designForm:{...designForm, displayedDesignForm:value}
      })
  }
  // const toggleHandler = (buttonState) => {
  //   let newState = {
  //     ...appLevelState, designForm:{...designForm, whiteInkToggle:buttonState}
  //     };
  //   console.log("newState",newState);
  //   setAppLevelState(newState);
  //     //console.log(appLevelState)
  // }
  
  return (
    <div className='column'>
        {/* <div className={`card white-ink ${designForm.displayedDesignForm === 'white ink' ? 'open' : ''}`} 
        // onClick={()=>setAppLevelState({
        //   ...appLevelState, designForm:{displayedDesignForm:'white ink'}
        //   })}
        // onClick={(e)=>clickHandler(e)}
          >
          <div className="row" onClick={()=>clickHandler('white ink')}><p>White ink</p> <i className="icon fa fa-caret-down"/></div>
          {designForm.displayedDesignForm === 'white ink' && 
          <div className='card-content'>
            <p><i className="fa-solid fa-ruler-triangle"></i>Turn on to add dazzling white elements to your design. Turn off to display natural kraft material instead.</p>
            <div className="white-ink-toggle">
              <button className={`${designForm.whiteInkToggle ? 'toggle-on' : ''}`} onClick={()=>toggleHandler(true)}>On</button><button onClick={()=>toggleHandler(false)} className={`${designForm.whiteInkToggle ? '' : 'toggle-on'}`}>Off</button>
            </div>
          </div>}
        </div> */}

        <div className={`card ${designForm.displayedDesignForm === 'select color' ? 'open' : ''}`} 
        // onClick={()=>setAppLevelState({
        //   ...appLevelState, designForm:{displayedDesignForm:'select color'}
        //   })}
          onClick={()=>clickHandler('select color')}
        >
          <div className="row"><p>Select color</p> <i className="icon fa fa-caret-down"/> </div>
          {designForm.displayedDesignForm === 'select color' && 
          <SketchPicker
          color={background}
          onChange={handleChange}
           />}
        </div>

        {/* <div onClick={()=>clickHandler('add images')} className={`card ${designForm.displayedDesignForm === 'add images' ? 'open' : ''}`}><div className="row"><p>Add Images</p> <i className="icon fa fa-caret-down"/> </div></div> */}

        <div onClick={()=>clickHandler('add text')} className={`card ${designForm.displayedDesignForm === 'add text' ? 'open' : ''}`}><div className="row"><p>Add text</p> <i className="icon fa fa-caret-down"/> </div>
        {designForm.displayedDesignForm === 'add text' && <>
          <div className='font-list'>
            <p>Arial</p>
            <p>Times</p>
            <p>Micro</p>
          </div>
          <div className='insert-remove'>
            <button>Insert Text</button>
            <button>Remove Text</button>
          </div>
          <div className="fit-center-cover">
            <button>Fit</button>
            <button>Center</button>
            <button>Cover</button>
            </div>
            </>}</div>
        {/* <div  onClick={()=>clickHandler('request dieline')} className={`card ${designForm.displayedDesignForm === 'request dieline' ? 'open' : ''}`}><div className="row"><p>Request dieline</p> <i className="icon fa fa-caret-down"/> </div></div>
        <div  onClick={()=>clickHandler('upload dieline')} className={`card ${designForm.displayedDesignForm === 'upload dieline' ? 'open' : ''}`}><div className="row"><p>Upload dieline</p> <i className="icon fa fa-caret-down"/> </div></div> */}
    </div>
  )
}

export default Design