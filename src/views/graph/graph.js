import React from 'react'
import PropTypes from 'prop-types'
import './graph.css'

export default function graph(Node, Edge) {
  class Graph extends React.Component {
    componentDidUpdate() {
      console.log('graph did update')
    }

    render() {
      const graph = this.props.graph
      return (
        <div className="graph">
          <svg className="edges">
            <defs>
              <marker id="arrow" markerWidth="30" markerHeight="10" refX="30" refY="3" orient="auto" markerUnits="strokeWidth">
                <path d="M0,0 L0,6 L30,3 z" fill="#000" />
              </marker>
            </defs>
            <g>
              {
                graph.edges.map(edge => {
                  return (
                    <Edge
                      key={edge.id}
                      edge={edge}
                      onDoubleClick={this.props.onEdgeDoubleClick && (evt => this.props.onEdgeDoubleClick(edge, evt))}
                    />
                  )
                })
              }
            </g>
          </svg>
          <div className='nodes'>
            {
              graph.nodes.map(node => {
                return (
                  <Node
                    key={node.id}
                    node={node}
                    onMouseDown={this.props.onNodeMouseDown && (evt => this.props.onNodeMouseDown(node, evt))}
                    onMouseUp={this.props.onNodeMouseUp && (evt => this.props.onNodeMouseUp(node, evt))}
                    onDoubleClick={this.props.onNodeDoubleClick && (evt => this.props.onNodeDoubleClick(node, evt))}
                  />
                )
              })
            }
          </div>
        </div>
      )
    }
  }

  Graph.propTypes = {
    graph: PropTypes.object,
    onNodeMouseDown: PropTypes.func,
    onNodeMouseUp: PropTypes.func,
    onNodeDoubleClick: PropTypes.func,
    onEdgeMouseDown: PropTypes.func,
    onEdgeMouseUp: PropTypes.func,
    onEdgeDoubleClick: PropTypes.func,
  }

  return Graph
}