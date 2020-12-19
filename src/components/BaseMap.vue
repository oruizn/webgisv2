<template>
  <div>
    <div id="map">
    </div>
  </div>
</template>

<script>
  import Baselayers from "@c/js/baselayers";
  import {Map, View} from 'ol';
  import {addCoordinateTransforms, addProjection, fromLonLat} from 'ol/proj';
  import {controls} from "@c/js/controls";
  import Projection from "ol/proj/Projection";
  import {applyTransform} from "ol/extent";
  import projzh from "projzh";
  import saveAs from "file-saver";

export default {
  name: "base-map",
  data(){
    return{

    }
  },
  components: {

  },
  methods: {

  },
  computed: {

  },
  mounted() {
    //添加百度地图的投影
    let extent = [-179.9, -90, 179.9, 90];
    let baiduMercator = new Projection({
      code: 'baidu',
      extent: applyTransform(extent, projzh.ll2bmerc),
      units: 'm'
    });
    addProjection(baiduMercator);
    addCoordinateTransforms('EPSG:4326', baiduMercator, projzh.ll2bmerc, projzh.bmerc2ll);
    addCoordinateTransforms('EPSG:3857', baiduMercator, projzh.smerc2bmerc, projzh.bmerc2smerc);

    let bingMap = Baselayers.BingMapLayer(Baselayers.BingMapLayerTypes.AerialWithLabels);
    let osm = Baselayers.OSMLayer(true, false);
    let bdMapLayer = Baselayers.BaiDuLayer('百度地图');
    let bdMapLayerCustom = Baselayers.BaiDuLayerCustom('自定义百度地图');
    let baseLayerGroup = Baselayers.BaseLayersGroup([bingMap, osm, bdMapLayer, bdMapLayerCustom]);
    let vectorLayer = Baselayers.VectorLayer();

    let centerPoint = fromLonLat([118.8, 32.0]);
    let view = new View({
      center: centerPoint,
      zoom: 11
    });

    //设置显示两个滑动地图
    controls.swipe.addLayer(bingMap);
    controls.swipe.addLayer(osm, true);

    // 组织控件工具栏
    controls.controlBar.addControl(controls.fullScreen);
    controls.controlBar.addControl(controls.wmsCapabilities);
    controls.controlBar.addControl(controls.zoomToExtend);
    controls.controlBar.addControl(controls.rotate);
    controls.controlBar.setPosition('right');

    // 监听点击事件，设置图片保存事件
    controls.print.on(['print', 'error'], (e) => {
      e.canvas.toBlob((blob => {
        saveAs(blob, 'map.' + e.imageType.replace('image/', ''))
      }), e.imageType);
    });

    new Map({
      //挂载元素
      target: 'map',
      //显示的地图
      layers: [baseLayerGroup, vectorLayer],
      //表层图层
      overlays: [],
      //在此设置地图控件
      controls: [controls.zoom, controls.clickOverview, controls.switcher, controls.controlBar, controls.print, controls.legend],
      //开启交互时加载瓦片
      loadTilesWhileInteracting: true,
      //地图显示中心
      view: view
    });
  }
}
</script>

<style lang="scss">
 @import "../assets/scss/widgets.scss";
  #map {
    height: 100%;
    width: 100%;
    position: fixed;
  }
</style>