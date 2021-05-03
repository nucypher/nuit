import React from 'react';
import { SliderInput } from '@project/react-app/src/components'


export const Slider = (props) => {

   return (
      <SliderInput>
         <input
            type="range"
            min={props.min}
            step={props.step || 1}
            value={props.value || props.min }
            max={props.max}
            onChange={(e) => props.onChange(e.target.value)}
         />
         <div>
            <span>{props.min}</span>
            <span>{props.max}</span>
         </div>
      </SliderInput>
   );
};
