import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { sendPost } from './../../api/hook'

const initialState = {
	memories: [],
	status: 'idle',
	word: null,
	error: null
}

//thunk api calls
export const addMemory = createAsyncThunk('memories/set', async (msg) => {
	const response = await sendPost('/setmemory', msg)
	console.log('add memory call')
	return response
})

export const getListMemory = createAsyncThunk('memories/getlist', async (msg) => {
	const response = await sendPost('/getlistmemory', msg)
	return response
})

const memoriesSlice = createSlice({
	name: 'memories',
	initialState,
	reducers: {
		memoryAdded: {
			reducer(state, action) {
				state.memories = state.memories.concat(action.payload)
			},
		},
		memoryWipe: state => {
			state.memories = []
		}
	},//reducers
	extraReducers: {
		[addMemory.pending]: (state, action) => {
			state.status = 'loading'
		},
		[addMemory.fulfilled]: (state, action) => {
			state.status = 'complete'
			state.memories = state.memories.concat(action.payload)
		},
		[addMemory.rejected]: (state, action) => {
			state.status = 'fail'
			state.error = action.error.message
		},
		[getListMemory.pending]: (state, action) => {
			state.status = 'loading'
		},
		[getListMemory.fulfilled]: (state, action) => {
			state.status = 'complete'
			state.memories = state.memories.concat(action.payload)
		},
		[getListMemory.rejected]: (state, action) => {
			state.status = 'fail'
			state.error = action.error.message
		}
	}//extraReducers
})

export const { memoryAdded, memoryWipe } = memoriesSlice.actions

export const selectAllMemories = state => state.memories.memories

export default memoriesSlice.reducer
//EOF
