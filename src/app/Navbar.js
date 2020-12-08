import React from 'react'
import { Link } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { memoryWipe } from './../features/memories/memoriesSlice'

export const Navbar = () => {
	const dispatch = useDispatch()
	return (
		<nav>
			<section>
				<h1>My Computer Memory</h1>
				<div className="navContent">
					<div className="navLinks">
						<Link
							to="/"
							onClick={() => dispatch(memoryWipe())}
						>
							Add Words
						</Link>
					</div>
				</div>
			</section>
		</nav>
	)
}
