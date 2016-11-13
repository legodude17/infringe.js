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
  next: 'Lab',
  text: 'You are the brilliant Dr. Syphla. You have been ordered to test the new wormhole device. You were also told to be ready for anything, hence the gun.'
};
rooms.Lab = {
  map:[
    'wwwwwwwwwwwwwwwwww',
    'wwwwwwwwwwwwwwwwww',
    'wwwwwwwcccwwwwwwww',
    'wwwwwwwc cwwwwwwww',
    'wwwwwwwcccwwwwwwww',
    'wwwwwwwwwwwwwwwwwp'
  ],
  mapParsed: [],
  textureMap:{w:'planks_big_oak', c:'wool_colored_cyan', p: 'portal', 'i': 'cauldron_inner'},
  music:'Lab Room.wav',
  next: 'Test',
  walls: ['8,3'],
  text: 'This is your lab, where you make the most important discoveries. You must go the the ajointed hall before you can run the test.'
};
rooms.Test = {
  map:[
    'wwwwwwwwwwwwwwwwwwwwwwww',
    'wwwwwwwwwwwdwwwwwwwwwww',
    'wwwwwwwwwggdggwwwwwwwwww',
    'wwwwwwwwwgeeegwwwwwwwwww',
    'wwwwwwwwddebedddwwwwwwww',
    'wwwwwwwwwgeeegwwwwwwwwww',
    'wwwwwwwwwggdggwwwwwwwwww',
    'wwwwwwwwwwwdwwwwwwwwwwww',
    'wwwwwwwwwwwwwwwwwwwwwwww'
  ],
  mapParsed: [],
  textureMap: {w: 'planks_big_oak', p:'portal', b: 'activate', e: 'emerald_block', d: 'diamond_block', g: 'gold_block'},
  music: '',
  next: 'Outside',
  text: 'This is where the text happens...\nPress the button in the middle to run the experiment.',
  onButtonPress: function () {
    this.advance();
  }
};
rooms.Outside = {
  map: [
    'ssssssssssssssssssssss',
    'ssssssssssssssssssssss',
    'ssssssssssssssssssssss',
    'ssssssssssssssssssssss',
    'ssssssssssssssssssssss',
    'ssssssssssssssssssssss',
    'ssssssssssssssssssssss',
    'ssssssssssssssssssssss',
    'ssssssssssssssssssssss'
  ],
  mapParsed: [],
  textureMap: {s: 'snow'},
  music: '',
  next: "?",
  text: 'Wha? What should have been a controlled experiment somehow got you in the middle of a barren tundra, even though you live in florida.'
};

var parseTextures=function(obj){
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
var parseEnt=function(str){return str.split(','); };

var API = {
  parse: parseTextures,
  rooms
};
export default API;
