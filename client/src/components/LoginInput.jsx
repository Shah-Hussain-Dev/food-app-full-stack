import {useState} from 'react'
import { motion } from 'framer-motion';
import { fadeInOut } from '../animations';
const LoginInput = ({placeHolder,icon,type,inputState,inputStateFunction,isSignUp}) => {
    const [isFocus,setIsFocus] = useState(false)
  return (
    <motion.div
    {...fadeInOut}
    className={`flex items-center transition-transform  justify-center gap-4 bg-lightOverlay backdrop-blue-md rounded-md w-full px-4 py-2 
    ${ isFocus ? "shadow-3xl scale-105 shadow-black-600":"shadow-none"}
    `}>
    {icon}
    <input className={`w-full h-full  bg-transparent text-headingColor text-lg font-semibold border-none outline-none`} 
    type={type} placeholder={placeHolder}  value={inputState} 
    onChange={(e)=>inputStateFunction(e.target.value)}
    onFocus={()=>setIsFocus(true)}
    onBlur={()=>setIsFocus(false)}
    />
    </motion.div>
  )
}

export default LoginInput