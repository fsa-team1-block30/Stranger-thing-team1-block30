import { useState } from 'react'
import './App.css'

export default function SearchForm (){

        const post = []
        const [change, setChange] = useState("")


function handleChange (e){
    setChange(e.target.value);


console.log (e)
}



function handleSubmit (e){
    e.preventDefault();
    


console.log (change)
}


return (
    <form>
<label for="search">Search</label>
<input type="search" id="search" name="search" onChange={handleChange} value={change}></input>
<input type="submit" id="submit" name="submit" onClick={handleSubmit}/>
    </form>


) 
    
}
