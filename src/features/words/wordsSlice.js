import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { sendPost } from './../../api/hook'

const initialState = {
	words: [],
	status: 'idle',
	error: null
}
//thunk api calls 
export const addWord = createAsyncThunk('words/set', async (msg) => {
	const response = await sendPost('/setword', msg)
	return response
})

export const recentWords = createAsyncThunk('words/recent', async (msg) => {
	const response = await sendPost('/recentwords', msg)
	return response
})

export const novelWords = createAsyncThunk('words/novel', async (msg) => {
	const response = await sendPost('/novelwords', msg)
	return response
})

export const oldWords = createAsyncThunk('words/old', async (msg) => {
	const response = await sendPost('/oldwords', msg)
	return response
})

const wordsSlice = createSlice({
	name: 'words', 
	initialState,
	reducers: {
		wordAdded: {
			reducer(state, action) {
				state.words = state.words.concat(action.payload)
			},
		}
	},//reducers
	extraReducers: {
		[recentWords.pending]: (state, action) => {
			state.status = 'loading'
		},
		[recentWords.fulfilled]: (state, action) => {
			state.status = 'complete'
			state.words = state.words.concat(action.payload)
		},
		[recentWords.rejected]: (state, action) => {
			state.status = 'fail'
			state.error = action.error.message
		},
		[novelWords.pending]: (state, action) => {
			state.status = 'loading'
		},
		[novelWords.fulfilled]: (state, action) => {
			state.status = 'complete'
			state.words = state.words.concat(action.payload)
		},
		[novelWords.rejected]: (state, action) => {
			state.status = 'fail'
			state.error = action.error.message
		},
		[oldWords.pending]: (state, action) => {
			state.status = 'loading'
		},
		[oldWords.fulfilled]: (state, action) => {
			state.status = 'complete'
			state.words = state.words.concat(action.payload)
		},
		[oldWords.rejected]: (state, action) => {
			state.status = 'fail'
			state.error = action.error.message
		},
		[addWord.pending]: (state, action) => {
			state.status = 'loading'
		},
		[addWord.fulfilled]: (state, action) => {
			state.status = 'complete'
			const check = state.words.findIndex(word => word.word === action.payload[0].word)
			console.log(check)
			if (check === -1){
				state.words = state.words.concat(action.payload)
			}else{
				state.words[check] = action.payload[0]
			}
		},
		[addWord.rejected]: (state, action) => {
			state.status = 'fail'
			state.error = action.error.message
		}
	}//extreReducers
})

export const { wordAdded } = wordsSlice.actions

export const selectAllWords = state => state.words.words

export const selectWordByWord = (state, search) =>
	state.words.words.find(word => word.word === search)

export default wordsSlice.reducer
//EOF
