import React, { useState, useEffect } from 'react'
import Image from 'next/image'
import { text } from 'stream/consumers'
import ReactDOM from 'react-dom'

interface SearchProp {
    icon: string,
    text: string
}

interface SearchProps {
    searches: SearchProp[]
    showWrongAnswers: boolean
    wrongAnswerId: string
    answer: string
}

const liveSearch = (searchProps:SearchProps) => {
    const [displayedOptions, setDisplayedOptions] = React.useState<SearchProp[]>([])
    const [wrongAnswers, setWrongAnswers] = React.useState<SearchProp[]>([])
    const [isGameOver, setIsGameOver] = React.useState<boolean>(false)
    useEffect(() => {
        onLoaded()
      }, []);
    function onLoaded() {
        setDisplayedOptions(searchProps.searches)
    }
    const buttonHandler = (event: React.MouseEvent<HTMLButtonElement>) => {
        event.preventDefault();
    
        const button: HTMLButtonElement = event.currentTarget;
        if(button.value.toLowerCase() == searchProps.answer) {
            console.log("correct")
            setIsGameOver(true) 
            return
        }
        wrongAnswers.push(searchProps.searches.find(item => item.text == button.value) as unknown as SearchProp)
        if(searchProps.showWrongAnswers) {
            setWrongAnswers(wrongAnswers)
            placeWrongAnswers()
        };
        handleSearch()
    }
    function placeWrongAnswers() {
        const ke = (<ul id='' className='grid w-full pt-10'>
            {wrongAnswers.map((prop, idx) => (
                <div key={idx} className='border-b-2 border-dotted h-12 flex items-center bg-stone-800 hover:bg-stone-600 font-valorant'>
                    <div className='ml-2 h-[80%]'>
                        <img src={prop.icon} alt='' className='w-auto h-full relative' />
                    </div>
                    <p className='ml-4'>{prop.text}</p>
                </div>
            ))}
        </ul>)
        ReactDOM.render(ke, document.getElementById(searchProps.wrongAnswerId))
    }
    function handleSearch() {
        let input = document.getElementById("search-field") as unknown as HTMLInputElement
        let searchQuery = input?.value
        let filteredArray = searchProps.searches.filter(item => item.text.toLowerCase().includes(searchQuery.toLowerCase()) && !wrongAnswers.includes(item))
        setDisplayedOptions(filteredArray)
    }
    return (
        <div className="live-search-dropdown w-min">
            <input type="text" id='search-field' className=" text-black font-bold" onChange={handleSearch}/>
            <ul className="contacs-list grid h-auto">
                {displayedOptions.map((prop, idx) => (
                    <button className='border-b-2 border-dotted h-12 flex items-center bg-stone-800 hover:bg-stone-600 font-valorant aria group ' key={idx} value={prop.text} onClick={buttonHandler}>
                        <div className='ml-2 h-[80%] group-hover:scale-110'>
                            <img src={prop.icon} alt='' className='w-auto h-full relative'/>
                        </div>
                        <p className='ml-4'>{prop.text}</p>
                    </button>
                ))} 
            </ul>
            { isGameOver ? (<p>CONGRATS</p>) : (null) }
        </div>
        
    )
}

export default liveSearch