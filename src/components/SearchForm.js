import {useState} from "react"
export default function SearchForm({onSearching}){
    const[search,setSearch]=useState("")
    function handleChange(e){
        e.preventDefault()
        setSearch(e.target.value)
        onSearching(search)
        
    }
    return (
            <form onChange={handleChange} id="search-form">
                <input value={search} id="search" placeholder="Search Transanctions..." type={"text"}/>
                <button>
                    {/* <FontAwesomeIcon icon={faSearch}/> */}
                    </button>
            </form>
    )
}