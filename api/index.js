import { POST, GET } from "@/utils/axios/request.js";
export const postDemo = (data) => POST("", data);
// 获取流域信息
export const getFindRiverBasinList = (data) => GET("/bjsw-prediction/prediction/findRiverBasinList", data);
// 根据流域id获取当前下雨场次信息
export const getFindRainSeasonList = (data) => GET("/bjsw-prediction/prediction/findRainSeasonList", data);
// 展示暴雨特征信息
export const getRainSeasonInfoByName = (data) => GET("/bjsw-prediction/prediction/getRainSeasonInfoByName", data);
// 展示下雨场次专题图片
export const getRainSeasonThematicPic = (data) => GET("/bjsw-prediction/prediction/getRainSeasonThematicPic", data);
// 获取相似雨量场次信息
export const getFindSimlarRainSeasonList = (data) => GET("/bjsw-prediction/prediction/findSimlarRainSeasonList", data);
// 获取降雨场次测站降雨量信息
export const getFindRainDetailList = (data) => GET("/bjsw-prediction/prediction/findRainDetailList", data);
// 获取降雨场次小时降雨量信息
export const getFindRainHourDetailList = (data) => GET("/bjsw-prediction/prediction/findRainHourDetailList", data);
// 获取特定时间段的河道水情信息
export const getFindRiverRunoffList = (data) => GET("/bjsw-prediction/prediction/findRiverRunoffList", data);
