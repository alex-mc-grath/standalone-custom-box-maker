const StateSlider = ({onChangeFunction, currentBoolValue}) => {
    return (
        <div className="open-close-slider-wrapper" onClick={onChangeFunction}>
            <div className="slider-holder">
                {/*<div className="line"></div>*/}
                <div className={currentBoolValue ? "slider-handle float-right" : "slider-handle float-left"}>
                    <div className="indent" style={{marginLeft:"30%"}}></div>
                    <div className="indent" ></div>
                    <div className="indent" ></div>
                </div>
            </div>
            <div>
                <div className="label-holder">
                    <div className={currentBoolValue ? '' : 'active'} style={{float: "left"}}>Closed</div>
                    <div className={currentBoolValue ? 'active' : ''} style={{float: "right"}}>Open</div>
                </div>
            </div>
        </div>
    );
}

export default StateSlider;