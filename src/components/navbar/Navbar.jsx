
import React, { useState } from 'react'
import "./navbar.css"
import Add from "../add/Add"

const Navbar = () => {
     const [isAddOpen, setIsAddOpen] = useState(false)

     const handleAddClick = () => {
          setIsAddOpen(true)
     }

     const handleCloseAdd = () => {
          setIsAddOpen(false)
     }

     return (
          <nav>
               <button className='btn__add' onClick={handleAddClick}>Add</button>
               {isAddOpen && <Add onClose={handleCloseAdd} />}
          </nav>
     )
}

export default Navbar