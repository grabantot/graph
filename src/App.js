import React from 'react'
import './index.css'
import GraphApi from './api/graph.api'
import { GraphEditor } from './components/containers'

const helpText = ``

export default class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      backgroundText: helpText
    }
  }

  handleKeyDown = event => {
    const { graphName } = this.props
    let charCode = String.fromCharCode(event.which).toLowerCase()
    if (event.ctrlKey && charCode === 's') {
      const start = Date.now()
      event.preventDefault()
      console.log('Ctrl + S pressed')
      if (!this.state.graph) return
      this.setState({backgroundText: helpText + 'Saving ' + graphName})
      GraphApi.saveGraph(this.state.graph, graphName)
        .then(() => this.setState({backgroundText: helpText + 'Saved ' + graphName + '\n' + new Date() + '\n' + (Date.now() - start) + ' ms'}))
        .catch(err => this.setState({backgroundText: helpText + 'Error while saving\n' + err}))
    }
  }

  openGraph() {
    const { graphName } = this.props
    this.setState({backgroundText: helpText + 'Opening graph ' + graphName})
    const start = Date.now()
    GraphApi.getGraph(graphName)
      .then(graph => {
        window.g = graph
        this.setState({
          graph,
          backgroundText: helpText + 'Opened graph ' + graphName + '\n' + (Date.now() - start) + ' ms'
        })
      })
      .catch(err => {
        this.setState({
          backgroundText: helpText + 'Error while opening\n' + err
        })
      })
  }

  componentDidMount() {
    this.openGraph()
  }

  componentDidUpdate(props) {
    if (props === this.props) return
    console.log('props updated', this.props)
    this.openGraph()
  }

  render() {
    const {
      graph,
      backgroundText,
    } = this.state
    const {
      handleKeyDown,
    } = this
    return (
      <div>
        <div className='graph-container'
          onKeyDown={handleKeyDown}
          tabIndex="0"
        >
          <div className='graph-info-text'>{backgroundText}</div>
          {graph && <GraphEditor graph={graph}/>}
        </div>
      </div>
    )
  }
}
