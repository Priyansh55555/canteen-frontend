import React, { useId } from 'react'

const Checkbox = ({ state, setState, props }) => {
  const id = useId();
  return (
    <div className='flex items-center'>
      <input {...props} id={id} type="checkbox" value={state} onChange={setState}  className='hidden'/>
      <label 
      className={`cursor-pointer w-9 h-4.5 relative rounded-full flex items-center justify-center transition-all duration-300 ${state ?"bg-black":"bg-gray-300 "}`}
      for={id}>
            <div className={`w-4.5  h-4.5 absolute top-1/2 -translate-y-1/2 border border-gray-200 left-0 transition-all duration-300  ${state? "translate-x-full": ""} left-0 rounded-full bg-white`}></div>
      </label>
    </div>
  )
}

export default Checkbox