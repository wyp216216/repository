// arcgis动态图层服务地址
import "ol/ol.css";
import Map from "ol/Map";
import View from "ol/View";
import ImageArcGISRest from "ol/source/ImageArcGISRest";
import {
  Image } from "ol/layer";
import { Text, Fill, Style } from "ol/style";
import Vector from "ol/layer/Vector";
import { Vector as VectorLayer } from "ol/source";
import Static from "ol/source/ImageStatic";
import Feature from "ol/Feature";
import Point from "ol/geom/Point";
import Polygon from "ol/geom/Polygon";
import {
  transform
} from "ol/proj";
/**
 * RainfallMap 降雨等值面地图
 * attribute:
 * url:地图背景链接
 * extent:等值面绘图坐标值
 * interval:定时器
 * layers:除背景外所有图层
 * instance:地图实例
 * length:除背景外所有图层数量
 * methods:
 * danymicLayer():生成对应图层
 * staticImageLayer():生成对应图层
 * addLayers():添加图层
 * removeLayers():删除图层
 * hideLayers():隐藏图层
 * swiperLayers():轮播图层
 * clearSwiper():清空定时器
 * showLayer():显示图层
 */
class RainfallMap {
  constructor(id, zoom = 11) {
    this.url = "http://10.1.100.66:6080/arcgis/rest/services/dhm_wgs84/MapServer";
    this.extent = [116.011524197211, 39.7457417541168, 116.605602081827, 39.9767720425785];
    this.interval = null;
    this.layers = [];
    let danymicLayer = this.danymicLayer();
    this.imageLayer = this.layerImage();
    this.instance = new Map({
      target: id,
      // layers: [],
      layers: [danymicLayer],
      // layers: [danymicLayer, this.imageLayer],
      view: new View({
        center: transform([116.3104, 39.8562], "EPSG:4326", "EPSG:3857"),
        zoom: zoom
      })
    });
    this.length = 0;
    console.log(danymicLayer);
  }
  static getInstance(...params) {
    if (!this.example) {
      this.example = new RainfallMap(...params);
    }
    return this.example;
  }
  danymicLayer() {
    return new Image({
      source: new ImageArcGISRest({
        opacity: 0.3,
        ratio: 1,
        params: {},
        url: this.url
      })
    });
  }
  staticImageLayer(baseImage) {
    return new Image({
      opacity: 0.2,
      source: new Static({
        imageLoadFunction: (image) => {
          image.getImage().src = `data:image/png;base64,${baseImage}`;
        },
        projection: "EPSG:4326",
        imageExtent: this.extent
      })
    });
  }
  layerImage() {
    return new Vector({
      source: new VectorLayer(),
      projection: "EPSG:4326",
      extent: this.extent
    });
  }
  featureImageLayer({ detail }) {
    if (detail.length <= 0) return;
    let imageLayer = this.instance.getLayers().item(1);
    let features = detail.map(x => {
      return x.maxDrpInfos.map(y => {
        var anchor = new Feature({
          geometry: new Point([y.lgtd, y.lttd])
          // labelPoint: new Point(params)
        });
        anchor.setStyle(new Style({
          text: new Text({
            font: "200px sans-serif",
            text: "淡叔所在地成都",
            fill: new Fill({
              color: "blue"
            })
          })
        }));
        return anchor;
      });
    });
    imageLayer.getSource().addFeatures(features.flat());
  }
  addLayers({ seasonPic, detail }) {
    if (!seasonPic && detail) return this;
    let staticImage = this.staticImageLayer(seasonPic);
    let detailImage = detail.filter(x => x.detailPic).map(x => {
      return this.staticImageLayer(x.detailPic);
    });
    this.layers = [staticImage, ...detailImage, this.danymicLayer()];
    this.layers.forEach(x => this.instance.addLayer(x));
    this.length = this.layers.length;
    return this;
  }
  removeLayers() {
    this.layers.forEach(x => {
      this.instance.removeLayer(x);
    });
    this.layers = [];
    this.length = 0;
    return this;
  }
  hideLayers(x = 1) {
    if (this.length > 1) {
      for (let i = x; i < this.length; i++) {
        this.instance.getLayers().item(i).setVisible(false);
      }
    }
  }
  swiperLayers(func) {
    this.hideLayers();
    let i = 2;
    this.interval = setInterval(() => {
      func(i);
      if (i === 2) {
        this.instance.getLayers().item(this.length).setVisible(false);
      }
      this.instance.getLayers().item(i - 1).setVisible(false);
      this.instance.getLayers().item(i).setVisible(true);
      if (i === this.length) {
        i = 2;
      } else {
        i++;
      }
    }, 1000);
  }
  clearSwiper(x = 1) {
    clearInterval(this.interval);
    this.instance.getLayers().item(x).setVisible(true);
    this.hideLayers(x + 1);
  }
  showLayer(x = 0) {
    this.hideLayers();
    this.instance.getLayers().item(x + 1).setVisible(true);
  }
}
export default (...params) => {
  return RainfallMap.getInstance(...params);
};
