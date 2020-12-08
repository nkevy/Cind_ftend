import { configureStore } from '@reduxjs/toolkit'

import wordsReducer from '../features/words/wordsSlice'
import memoriesReducer from '../features/memories/memoriesSlice'

export default configureStore({
	reducer:{
		words: wordsReducer,
		memories: memoriesReducer
	}
})
//EOF
