import { useState, useCallback, useEffect, useRef } from 'react'
import './App.css'

function App() {
  const [Length, setLength] = useState(8)
  const[numberAllowed, setnumberAllowed] = useState(false)
  const[charAllowed,setcharAllowed] = useState(false)
  const[Password,setPassword] = useState("")

  //useRef hook
  const passwordRef = useRef(null)


  const passwordGenerator = useCallback(() =>{
  let pass =""
  let str ="abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ"

  if(numberAllowed) str +="0123456789"
  if(charAllowed) str +="(){}[]!@#$%^&*_-=+?/|"

  for(let i = 1; i <Length; i++){
    let char = Math.floor(Math.random() * str.length + 1)
    pass += str.charAt(char) 
  }
  setPassword(pass)

  },[Length, numberAllowed, charAllowed, setPassword ])

  const copyPasswordtoClipBoard = useCallback(() => {
    passwordRef.current?.select()
    passwordRef.current?.setSelectionRange(0,3);
    window.navigator.clipboard.writeText(Password)
  },[Password])


  useEffect(() => {
    passwordGenerator()
  }, [Length, numberAllowed, charAllowed, passwordGenerator])

  return (
    <>

<div className='w-full max-w-md mx-auto shadow-md rounded-lg px-4 my-8 text-orange-600 bg-gray-500 font-bold'>

 <div className='classname =" flex shadow rounded-lg overflow-hidden mb-4"'>

<input type="text"
value={Password}
className='outling-none w-full py-1 px-3'
placeholder='password'
readOnly 
ref = {passwordRef}
/>

<button
onClick={copyPasswordtoClipBoard}
className='outling-none bg-green-500 text-white px-3 py-0.5 shrink-0'
>copy</button>

 </div>

<div className='flex text-sm gap-x-2'>
  <div className='flex items-center gap-x-1'>
 <input 
 type="range" 
  min={6}
  max={100}
  value={Length}
  className='cursor-pointer'
  onChange = {(e) => {setLength(e.target.value)}}
   />
   <label htmlFor=""> Length: {Length}</label>

  </div>

<div className='flex items-center gap-x-1'>
<input 
 type="checkbox" 
  defaultChecked ={numberAllowed}
 id="numberInput"
  onChange = {() => {setnumberAllowed((prev) => !prev);
  }}
   />
   <label htmlFor='numbewrInput'>Numbers</label>
</div>

<div className='flex items-center gap-x-1'>
<input 
 type="checkbox" 
  defaultChecked ={charAllowed}
 id="characterInput"
  onChange = {() => {setcharAllowed(
    (prev) => !prev);
  }}
   />
   <label htmlFor='charaterInput'>Characters</label>
</div>

</div>
</div>
    </>
  )
}

export default App
