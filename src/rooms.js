var rooms = {};
rooms.default = {
  map:[
    'aabs',
    'saba'
  ],
  mapParsed: [],
  entitys: ['0,0,texture1','10,10,texture2'],
  textureMap: {a:'texture3',b:'texture4',s:'texture0'}
};
rooms.Bed={
  map:[
    'ccccc',
    'btlll',
    'ccccc',
  ],
  mapParsed: [],
  textureMap:{t:'bed_head_top',b:'bed_feet_top',c:'wool_colored_cyan',l:'brick'}
};
var parseTextures=(obj)=>{
  if(!obj.mapParsed.length){
    for(var a in obj.map){
      obj.mapParsed[a]=[];
      for(var b in obj.map[a]){
        obj.mapParsed[a].push(obj.textureMap[obj.map[a][b]]);
      }
    }
  }
  return obj.mapParsed;
};
var parseEnt=(str)=>{return str.split(','); };

var API = {
  parse: parseTextures,
  rooms
};
export default API;
