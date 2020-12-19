/**
 * 地图控件
 * 方便使用
 */
import {OverviewMap, ZoomSlider, Zoom, ScaleLine, FullScreen, Attribution, MousePosition} from 'ol/control'
import {defaults} from 'ol/control'
import Legend from 'ol-ext/control/Legend'
import LayerSwitcher from 'ol-ext/control/LayerSwitcher'

/**
 * ol 自带控件
 */
export const controls = {
  // 鹰眼图
  overview: new OverviewMap({
    collapsed: true
  }),
  // 缩放滑块
  zoomSlider: new ZoomSlider({
    duration: 800
  }),
  // 缩放
  // className: 'control-right'
  zoom: new Zoom({
    duration: 800,
  }),
  // 比例尺
  // className: 'scale-left ol-scale-line'
  scale: new ScaleLine({

  }),
  // 地图版权
  // className: 'attr-right ol-attribution'
  attr: new Attribution({

  }),
  // 鼠标位置
  mousePosition: new MousePosition(),
  fullScreen: new FullScreen(),
  // 地图图层切换
  switcher: new LayerSwitcher({
    show_progress: true,
    extent: true
  }),
  //图例
  legend: new Legend({
    className: 'legend-right ol-legend',
    title: 'Legend',
    size: [100, 210],
    collapsed: true,
  }),

  // 默认控件（）
  default: defaults() // 没有new
};