import { useState, useCallback, useEffect, useRef } from 'react'

function App() {
  const [length, setLength] = useState(8);
  const [numAllowed, setNumAllowed] = useState(false);
  const [charAllowed, setCharAllowed] = useState(false);
  const [password, setPassword] = useState('');


  //useref hook
  const passwordref = useRef(null);

  const passwordGenerator = useCallback(() => {
    let password = '';
    let charset = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
    if (numAllowed) {
      charset += '0123456789';
    }
    if (charAllowed) {
      charset += '!@#$%^&*()_+';
    }
    for (let i = 0; i < length; i++) {
      password += charset.charAt(Math.floor(Math.random() * charset.length));
    }
    setPassword(password);

  }, [length, numAllowed, charAllowed, setPassword])

  const copyPasswordToClip = useCallback(() => {
    window.navigator.clipboard.writeText(password)
  },[password])

  useEffect(() => { passwordGenerator() }, [passwordGenerator, length, numAllowed, charAllowed])

  return (
    <>
      <div className="w-full max-w-md mx-auto shadow-md rounded-lg px-4 py-2 my-8 text-sky-300 bg-slate-500">
        <h2 className='text-center text-lg '>Password Generator</h2>
        <div className="flex shadow rounded-lg overflow-hidden mb-4">
          <input type="text" value={password} className="outline-none w-full py-1 px-3 text-black" placeholder='Password' readOnly ref={passwordref} />
          <button onClick={copyPasswordToClip} className='px-4 py-2 bg-slate-600'>Copy</button>
        </div>
        <div className="flex text-sm gap-x-2 flex-row">
          <div className='flex items-center gap-x-1'>
            <input type="range"
              min={6}
              max={64}
              value={length}
              className='cursor-pointer'
              onChange={(e) => setLength(e.target.value)}
            />
            <label> Length: {length}</label>
          </div>
        </div>
        <div className="flex item-center gap-x-1">
          <input type="checkbox"
            defaultChecked={numAllowed}
            id='numberInput'
            onClick={() => setNumAllowed(!numAllowed)}
          />
          <label>Numbers</label>
        </div>
        <div className="flex item-center gap-x-1">
          <input type="checkbox"
            defaultChecked={charAllowed}
            id='numberInput'
            onClick={() => setCharAllowed(!charAllowed)}
          />
          <label>Symbols</label>
        </div>
      </div>
    </>
  )
}

export default App
