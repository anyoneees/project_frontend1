import { Button } from 'react-bootstrap';
import { useState } from 'react';
 function NavPanel(){
    const colors = ["secondary","success", "warning","danger", "info","light", "dark"]
    const [buttonStyle, setButtonStyle] = useState("primary");
    const ColorChange = () => { 
        const randomNum = Math.floor(Math.random() * (colors.length ));
        console.log(randomNum)
        setButtonStyle(colors[randomNum]);
    }
    return(
        <div className='Nav-block'>
            <Button variant={buttonStyle} onClick={()=>{ColorChange()}}>Primary</Button>
            
            
        </div>
    )
}
export default NavPanel;