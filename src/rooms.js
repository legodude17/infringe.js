var rooms = {};
rooms.default = {
  map:[
    'aabs',
    'saba'
  ],
  mapParsed: [],
  entitys: ['0,0,texture1','10,10,texture2'],
  textureMap: {a:'texture3',b:'texture4',s:'texture0'},
  music: 'room.music',
  next: 'next room'
};
rooms.Bed={
  map:[
    'wwwwwwwwww',
    'ccccccwwww',
    'cbtllwwwwp',
    'ccccccwwww',
    'wwwwwwwwww'
  ],
  mapParsed: [],
  textureMap:{t:'bed_head_top',b:'bed_feet_top',c:'wool_colored_cyan',l:'brick', p:'portal', w: 'planks_big_oak'},
  music: 'Dumdum.wav',
  next: 'Lab'
};
/*rooms.Lab = {
  map:[

  ],
  mapParsed: [],
  textureMap:{},
  music:'Lab Room.wav',
  next: 'Test'
};*/

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
