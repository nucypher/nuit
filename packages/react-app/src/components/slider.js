import React from 'react';
import { SliderInput } from '@project/react-app/src/components'


export const Slider = ({ duration, onChange, min=30, max=365 }) => {

   return (
      <SliderInput>
         <input
            type="range"
            min={min}
            step="1"
            value={duration || min }
            max={max}
            onChange={(e) => onChange(e.target.value)}
         />
         <div>
            <span>{min}</span>
            <span>{max}</span>
         </div>
      </SliderInput>
   );
};
