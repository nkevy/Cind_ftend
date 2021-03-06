import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux' 
import { selectAllMemories, getListMemory, addMemory, memoryWipe } from './memoriesSlice'
import { addWord } from './../words/wordsSlice'
import { Link } from 'react-router-dom'

export const MemoriesList = ({ src }) => {
	//fields
	const word1 = src
	const dispatch = useDispatch()
	const memories = useSelector(selectAllMemories)
	const memoriesStatus = useSelector(state => state.memories.status)
	const error = useSelector(state => state.memories.error)
	//update list
	useEffect(() => {
		if (memoriesStatus === 'idle'){
			dispatch(getListMemory({'word':word1, 'length':10}))
		}
	}, [memoriesStatus,dispatch,word1])
	//display the proper html
	let display
	if (memoriesStatus === 'loading'){
		display = <div class='loader'>Loading</div>
	}else if (memoriesStatus === 'complete'){
		//list memories in order
		const orderedMemories = memories.slice().sort((a,b) => (a.rank - b.rank))
		//memory link on click:
		//	wipe memory
		//	add the word again for clock update
		//	add the memory agin for rank update
		display = orderedMemories.map((memory, index) => (
			<article className="memory-exerpt" key={memory.word2}>
				<Link
					to = {`/words/${memory.word2}`}
					className = "button muted-button"
					onClick = {() => {
						dispatch(memoryWipe)
						dispatch(addWord(
							{'word':memory.word2}
						))
						dispatch(addMemory(
							{'src':memory.word1, 'dst':memory.word2, 'decrement':false}
						))
					}}
				>
					<h4>{memory.word2}</h4>
					<p>associative strength: {memory.rank}</p>
				</Link>
			</article>
		))
	}else if (memoriesStatus === 'fail'){
		display = <div><p>error: {error}</p></div>
	}
	let title
	if (memories.length){
		title = <h2>Associations:</h2>
	}else{
		title = <h2>No Associations Found</h2>
	}
	return (
		<section>
			{title}
			{display}
		</section>
	)
}
//EOF
