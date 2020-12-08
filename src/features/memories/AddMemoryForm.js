import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { unwrapResult } from '@reduxjs/toolkit'
import { addMemory } from './memoriesSlice'
import { addWord } from './../words/wordsSlice'

export const AddMemoryForm = ({ src }) => {
	const word1 = src
	const [word2, setWord2] = useState('')
	const [requestStatus, setRequestStatus] = useState('idle')
	const onWord2Changed = e => setWord2(e.target.value)
	const dispatch = useDispatch()
	let resultAction
	const onSavePostClicked = async () => {
		if (word1 && word2 && requestStatus==='idle') {
			try{
				setRequestStatus('loading')
				//add word first
				resultAction = await dispatch(addWord({
					'word':word2
				}))
				unwrapResult(resultAction)
				resultAction = await dispatch(addMemory({
					'src':word1,
					'dst':word2,
					'decrement':false
				}))
				unwrapResult(resultAction)
				setWord2('')
			}catch (err){
				console.error('failed to save memory', err)
			}finally{
				setRequestStatus('idle')
			}//try
		}//if
	}
	return (
	  <section>
	  	<h3>Associate <p>{src}</p> with another word!</h3>
	  	<form>
	  		<label htmlFor="word2">Other Word:</label>
	  		<input
	  		type="text"
	  		id="word2"
	  		name="word2"
	  		value={word2}
	  		onChange={onWord2Changed}
	  		/>
	  		<button type="button" onClick={onSavePostClicked}>
	  			Link
	  		</button>
	  	</form>
	  </section>
	)
}
