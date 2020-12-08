import React from 'react'
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from 'react-router-dom'

import { Navbar } from './app/Navbar'
import { WordsList } from './features/words/WordsList'
import { AddWordForm } from './features/words/AddWordForm'
import { SingleWordPage } from './features/words/SingleWordPage'

function App() {
  return (
    <Router>
      <Navbar />
      <div className="App">
        <Switch>
          <Route
            exact
            path="/"
            render={() => (
		    <React.Fragment>
		    	<AddWordForm />
			<WordsList />
		    </React.Fragment>
            )}
          />
	  <Route exact path="/words/:search" component={SingleWordPage} />
          <Redirect to="/" />
        </Switch>
      </div>
    </Router>
  )
}

export default App
