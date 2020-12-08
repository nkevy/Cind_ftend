import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { unwrapResult } from '@reduxjs/toolkit'
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
	const [ requestStatus, setRequestStatus ] = useState('idle')
	const dispatch = useDispatch()
	// find the search arg in store.words
	let word
	word = useSelector(selectAllWords).find(i => i.word === search)
	//on render add word from url if not already added
	useEffect(() => {
		if (!word && requestStatus === 'idle') {
			try {
				setRequestStatus('loading')
				//returns payload get the json then get the word value 
				const resultAction = dispatch(addWord({'word': search}))
				console.log(resultAction)
				word = unwrapResult(resultAction)[0].word
			} catch (error) {
				setRequestStatus('fail')
				
			} finally {
				setRequestStatus('complete')
			}//catch
		}//if
	},[search])
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
