import {Component} from 'react'
import Header from './Header';
import Search from './Search';
import StatusBar from './StatusBar';
import List from './List';
import Footer from './Footer';

class App extends Component {
	// правило React - нельзя изменять state напрямую! Только перезаписывая в новый [] или {}
	state = {
		todoData: [
			{ id: 0, title: 'Выпить кофе', important: false, done: false },
			{ id: 1, title: 'Сделать React приложение', important: false, done: false },
			{ id: 2, title: 'Позавтракать', important: false, done: false },
		],
		term: '',
		status: 'all' // all, actice, done
	}

	onToggleImportantOld = (id) => {
		this.setState((state) => {
			// необходимо, чтобы в массиве обновлялось только то, что изменилось
			// нахожу id задачи в массиве todoData 
			const index = state.todoData.findIndex((el) => {return el.id === id})

			//сформировать новый {} с обратным значением important
			const oldItem = state.todoData[index]
			const newItem = { ...oldItem, important: !oldItem.important }
			//формирую новый массив с новым {} задачи и вставляю его на тоже самое место
			const part1 = state.todoData.slice(0, index)
			const part2 = state.todoData.slice(index + 1)
			const newArray = [...part1, newItem, ...part2]
			return {

				todoData: newArray
			}
		})
	}

	onToggleImportant = (id) => {
		this.setState((state) => {
			const newArray = state.todoData.map((task) => {
				return {
					...task,
					important: id === task.id ? !task.important : task.important 
				}

			})
			return {
				todoData: newArray
			}
		})
	}

	onToggleDone = (id) => {
		this.setState((state) => {
			const newArray = state.todoData.map((task) => {
				return {
					...task,
					important: id === task.id ? false : task.important,
					done: id === task.id ? !task.done : task.done 
				}

			})
			return {
				todoData: newArray
			}
		})
	}
	
	deleteItem = (id) => {
		this.setState((state) => {
			return {
				todoData: state.todoData.filter((task) => task.id !== id)
			}
		})
	}

	addItem = (title) => {
		this.setState((state)=>{
			const ID = state.todoData.length ? state.todoData.at(-1).id + 1 : 1
			const newItem = {id: ID, title: title, important: false, done: false}
			const newArray = [...state.todoData, newItem]
			return {
				todoData: newArray
			}
		})
	}

	search = (items, term) => {
		if (term.trim().length === 0) {
			return items
		}

		return items.filter((item)=>{
			if (item.title.toLowerCase().indexOf(term.toLowerCase().trim()) > -1) {
				return true
			}
		})
	}

	changeTerm = (term) => {
		this.setState({
			term: term
		})
	}

	filterByStatus = (items, status) => {
		switch (status) {
			case 'all': 
				return items
			case 'active':
				return items.filter((item) => item.done === false)
			case 'done':
				return items.filter((item) => item.done === true)
			default:
				return items

		}
	}

	changeStatus = (status) => {
		this.setState({status: status})
	}

	render() {

		const filterBySearchItems = this.search(this.state.todoData, this.state.term)
		const filterByStatusItems = this.filterByStatus(filterBySearchItems, this.state.status)
		
		return (
			<div>
				<Header />
				<div className="search">
				<Search 
					changeTerm={this.changeTerm} 
					term={this.state.term} 
				/>
				<StatusBar 
					changeStatus={this.changeStatus} 
					status={this.state.status} 
				/>
				</div>
				<List 
					data={filterByStatusItems} 
					onToggleImportant={this.onToggleImportant} 
					onToggleDone={this.onToggleDone}
					deleteItem={this.deleteItem}
				/>
				<Footer 
					addItem={this.addItem} 
				/>
			</div>
		)
	}
}



export default App;
