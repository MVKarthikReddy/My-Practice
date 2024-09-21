import React, { useEffect } from 'react'

function Circle() {
    useEffect(() => {
        const documetL = document.querySelectorAll('body *');
        console.log('document : ',documetL);
        if(documetL.length == 5){
                documetL.forEach((ele,ind) => {
                    document.removeChild(ele);
                })
            }
        
        document.body.addEventListener('click', (e) => {

            const documetLength = document.body.querySelectorAll('body *');
            console.log(documetLength);
            if(documetLength.length == 5){
                documetLength.forEach((ele,ind) => {
                    document.body.removeChild(ele);
                })
            }
            const x = e.clientX;
            const y = e.clientY;

            console.log(x,y)

            const circle = document.createElement('div');
           
            circle.style.cssText += `width:100px;height:100px;border:1px solid red;position:absolute;left:${x-50}px;top:${y-50}px;border-radius:50%;`;
          
            document.body.appendChild(circle);

            

            
        })
    },[])
  return (
    <></>
  )
}

export default Circle