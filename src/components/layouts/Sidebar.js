import React from 'react'

const Sidebar = ({displayedForm, appLevelState, setAppLevelState, appSettings}) => {

    const sidebarOptionHandle = (value) => {
        setAppLevelState({
            ...appLevelState, displayedForm:value
        })
    }

// const SideBarOptionS = () => {

// }


  return (
            <div className="sidebar">
              {/* <select value={appLevelState.displayedForm} onChange={e => setAppLevelState(
                { ...appLevelState, displayedForm : e.target.value}
                )}> */}
                <div onClick={()=>sidebarOptionHandle('size')} className={`${displayedForm === 'size' ? 'active' : ''}`}><i className="fa-brands fa-accusoft"></i><i className="fa-brands fa-accusoft"></i>size{/*<i className="fa-solid fa-ruler-triangle"></i>*/}</div>
                <div onClick={()=>appSettings.materialTabEnabled ? sidebarOptionHandle('material') : null} className={`${displayedForm === 'material' ? 'active' : ''}`}  style={appSettings.materialTabEnabled ? {} : {color:"#bbb"}}><i className="fa-solid fa-square"></i><i className="fa-solid fa-square"></i>material</div>
                <div onClick={() => {return}/*()=>sidebarOptionHandle('design')*/} className={`${displayedForm === 'design' ? 'active' : ''}`} style={{color:"#bbb"}}><i className="fa-solid fa-paintbrush"></i><i className="fa-solid fa-paintbrush"></i>design</div>
                <div onClick={()=>sidebarOptionHandle('quantity')} className={`${displayedForm === 'quantity' ? 'active' : ''}`}><i className="fa-solid fa-cubes"></i><i className="fa-solid fa-cubes"></i>quantity</div>
                <div onClick={()=>sidebarOptionHandle('reset')} className={`${displayedForm === 'reset' ? 'active' : ''}`}><i className="fa-solid fa-rotate-left"></i><i className="fa-solid fa-rotate-left"></i>reset</div>
              {/* </select> */}
            </div>
  )
}

export default Sidebar