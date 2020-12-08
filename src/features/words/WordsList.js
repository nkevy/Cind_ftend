import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { selectAllWords, recentWords } from './wordsSlice'
import { Link } from 'react-router-dom'

export const WordsList = () => {
	//fields
	const dispatch = useDispatch()
	const words = useSelector(selectAllWords)
	const wordsStatus = useSelector(state => state.words.status)
	const error = useSelector(state => state.words.error)
	//call the fetchWords api hook on page load 
	useEffect(() => {
		if (wordsStatus === 'idle'){
			dispatch(recentWords({'length':10}))
		}
	}, [wordsStatus, dispatch])
	//display diffrent html for each wordsStatus option
	let display
	if (wordsStatus === 'loading'){
		display = <div className="loader">Loading...</div>
	}else if (wordsStatus === 'complete'){
		const orderedWords = words.slice().sort((a,b) => b.clock.localeCompare(a.clock))
		display = orderedWords.map(word => (
			<article className="word-exerpt" key={word.word}>
				<Link to={`/words/${word.word}`} className="button muted-button">
					<h3>{word.word}</h3>
					<p>{word.clock}</p>
				</Link>
			</article>
		))
	}else if (wordsStatus === 'fail'){
		display = <div><p>error: {error}</p></div>
	}
	//check words array for correct title
	let title
	if (words.length === 0){
		title = 'No Recent Words'
	}else{
		title = 'Do you remember these words?'
	}
	//return the html
	return (
		<section>
			<h2>{title}</h2>
			{display}
		</section>
	)
}
//EOF
