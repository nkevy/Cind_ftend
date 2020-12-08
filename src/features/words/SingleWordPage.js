import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { MemoriesList } from '../memories/MemoriesList'
import { AddMemoryForm } from '../memories/AddMemoryForm'
import { selectAllWords, addWord } from './wordsSlice'
// add a word assosiation state 
// get a word assosiation state list
// import the render of an assosiation list 
// add the render to the return

export const SingleWordPage = ({ match }) => {
	//fields
	const { search } = match.params
	const dispatch = useDispatch()
	// find the search arg in store.words
	const word = useSelector(selectAllWords).find(i => i.word === search)
	//on render add word from url if not already added
	useEffect(() => {
		if (!word) {
				dispatch(addWord({'word': search}))
		}//if
	},[dispatch, word, search])
	if (!word){
		return (
			<section>
				<h2>Word Not Found!</h2>
			</section>
		)
	}//if 
	return (
		<section>
			<article className="word">
				<h1>{word.word}</h1>
				<React.Fragment>
					<AddMemoryForm src={word.word}/>
					<MemoriesList src={word.word}/>
				</React.Fragment>
			</article>
		</section>
	)
}
//EOF
