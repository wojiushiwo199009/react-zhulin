import React from 'react'
import './Relation.scss'
import * as d3 from 'd3'
import PropTypes from 'prop-types'

export default class Relation extends React.Component {
  componentDidMount () {
    window.addEventListener('resize', this.resize)
    this.renderRelation(this.container.clientWidth, this.container.clientHeight, this.props)
  }
  componentWillUnmount () {
    window.removeEventListener('resize', this.resize)
  }
  componentWillReceiveProps (nextProps) {
    // console.log(nextProps)
    this.renderRelation(this.container.clientWidth, this.container.clientHeight, nextProps)
  }
  // 自适应，重新渲染
  resize = () => {
    this.renderRelation(this.container.clientWidth, this.container.clientHeight)
  }
  // d3 力图layout
  force = (width, height, linkDistance, charge, props) => {
    console.log(props, 'props')
    return d3.layout.force()
      .nodes(props.root.nodes)
      .links(props.root.edges)
      .size([width, height])
      .linkDistance(linkDistance)
      .charge(charge)
      .start()
  }
  renderRelation = (width, height, props) => {
    this.container.innerHTML = ''
    let svg = d3.select(this.container).append('svg').attr('width', width).attr('height', height)

    let force = this.force(width, height, 200, -1500, props)
    // 添加连线
    let edgesLine = svg.selectAll('line')
      .data(props.root.edges)
      .enter()
      .append('line')
      .style('stroke', '#ccc')
      .style('stroke-width', 5)
      .on('mouseover', function (d, i) {
        d3.select(this).style('stroke', 'yellow')
      })
      .on('mouseout', function (d, i) {
        d3.select(this).style('stroke', '#ccc')
      })
      .on('click', (d, i) => { props.onLineClick && props.onLineClick(d) })
    // 添加连线文字
    let edgesText = svg.selectAll('.linetext')
      .data(props.root.edges)
      .enter()
      .append('text')
      .attr('class', 'linetext')
      .text(function (d) {
        return d.relation
      })
    // 添加节点图片
    let imgWidth = 20
    let imgHeight = 20
    let nodesImg = svg.selectAll('image')
      .data(props.root.nodes)
      .enter()
      .append('image')
      .attr('width', imgWidth)
      .attr('heigth', imgHeight)
      .attr('xlink:href', function (d) {
        return d.image
      })
      .on('mouseover', function (d) {
        // 显示连接线上的文字
        edgesText.style('fill-opacity', function (edge) {
          if (edge.source === d || edge.target === d) {
            return 1.0
          }
        })
      })
      .on('mouseout', function (d, i) {
        // 隐去连接线的文字
        edgesText.style('fill-opacity', function (edge) {
          if (edge.source === d || edge.target === d) {
            return 0.0
          }
        })
      })
      .call(force.drag)
    // 添加节点文字
    let textDx = -20
    let textDy = 20
    let nodesText = svg.selectAll('.nodetext')
      .data(props.root.nodes)
      .enter()
      .append('text')
      .attr('class', 'nodetext')
      .attr('dx', textDx)
      .attr('dy', textDy)
      .text(function (d) {
        return d.name
      })
    force.on('tick', () => {
      // 限制节点的边界
      props.root.nodes.forEach(function (d, i) {
        d.x = d.x - imgWidth / 2 < 0 ? imgWidth / 2 : d.x
        d.x = d.x + imgWidth / 2 > width ? width - imgWidth / 2 : d.x
        d.y = d.y - imgHeight / 2 < 0 ? imgHeight / 2 : d.y
        d.y = d.y + imgHeight / 2 + textDy > height ? height - imgHeight / 2 - textDy : d.y
      })

      // 更新连接线的位置
      edgesLine.attr('x1', function (d) { return d.source.x })
      edgesLine.attr('y1', function (d) { return d.source.y })
      edgesLine.attr('x2', function (d) { return d.target.x })
      edgesLine.attr('y2', function (d) { return d.target.y })

      // 更新连接线上文字的位置
      edgesText.attr('x', function (d) { return (d.source.x + d.target.x) / 2 })
      edgesText.attr('y', function (d) { return (d.source.y + d.target.y) / 2 })

      // 更新结点图片和文字
      nodesImg.attr('x', function (d) { return d.x - imgWidth / 2 })
      nodesImg.attr('y', function (d) { return d.y - imgHeight / 2 })

      nodesText.attr('x', function (d) { return d.x })
      nodesText.attr('y', function (d) { return d.y + imgWidth / 2 })
    })
  }
  render () {
    return <div ref={container => { this.container = container }} {...this.props} className='svg-container' />
  }
}
Relation.propTypes = {
  onLineClick: PropTypes.func,
  root: PropTypes.object
}
