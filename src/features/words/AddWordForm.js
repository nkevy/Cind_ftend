import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { unwrapResult } from '@reduxjs/toolkit'
import { addWord } from './wordsSlice'

export const AddWordForm = () => {
	const [word, setWord] = useState('')
	const [requestStatus, setRequestStatus] = useState('idle')
	const onWordChanged = e => setWord(e.target.value)
	const dispatch = useDispatch()

	const onSaveWordClicked = async () =>{
		if (word && requestStatus === 'idle') {
			try {
				setRequestStatus('loading')
				const resultAction = await dispatch(addWord({'word':word}))
				unwrapResult(resultAction)
				setWord('')
			} catch (err) {
				console.error('failed to save word', err)
			} finally {
				setRequestStatus('idle')
			}//try
		}//if
	}
	return(
		<section>
			<h2>Enter A New Word</h2>
			<form>
				<label htmlFor="wordWord">Word:</label>
				<input
					type="text"
					id="wordWord"
					name="wordWord"
					value={word}
					onChange={onWordChanged}
				/>
				<button type="button" onClick={onSaveWordClicked}>Save</button>
			</form>
		</section>
	)
}
//EOF
