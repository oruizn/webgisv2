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
  import {OverviewMap, defaults as defaultControl} from 'ol/control';

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
    // controls.zoom, controls.overview, controls.switcher, controls.fullScreen
    new Map({
      target: 'map',
      layers: [baseLayerGroup, vectorLayer],
      overlays: [],
      controls: [controls.zoom, controls.overview, controls.switcher, controls.fullScreen, controls.attr],
      loadTilesWhileInteracting: true,
      view: view
    });
  }
}
</script>

<style lang="scss" scoped>
  #map {
    height: 100%;
    width: 100%;
    position: fixed;
  }
</style>